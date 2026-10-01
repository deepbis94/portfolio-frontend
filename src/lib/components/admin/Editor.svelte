<script lang="ts">
  import { onMount } from 'svelte';
  import { getPortfolio, savePortfolio } from '$lib/api';
  import { isSignedIn } from '$lib/admin/session';
  import type { Portfolio } from '$lib/data/content';

  let {
    title,
    hint,
    children
  }: {
    title: string;
    hint?: string;
    children: import('svelte').Snippet<[Portfolio]>;
  } = $props();

  let draft = $state<Portfolio | null>(null);
  let status = $state('');
  let error = $state('');
  let saving = $state(false);

  onMount(() => {
    getPortfolio().then((p) => (draft = p));
  });

  async function save() {
    if (!draft) return;
    if (!(await isSignedIn())) {
      error = 'Sign in again to save.';
      return;
    }
    saving = true;
    status = '';
    error = '';
    try {
      draft = await savePortfolio(draft);
      status = 'Saved. Open the public site to see it.';
    } catch (e) {
      error = e instanceof Error ? e.message : 'Save failed';
    } finally {
      saving = false;
    }
  }
</script>

<div class="mb-6 flex flex-wrap items-end justify-between gap-4">
  <div>
    <h2 class="text-2xl font-extrabold">{title}</h2>
    {#if hint}
      <p class="mt-1 max-w-2xl text-sm text-ink/70">{hint}</p>
    {/if}
  </div>
  <button
    class="rounded-full bg-green px-5 py-2.5 text-sm font-bold text-ink-dark hover:bg-green-bright disabled:opacity-60"
    type="button"
    disabled={saving || !draft}
    onclick={save}
  >
    {saving ? 'Saving…' : 'Save changes'}
  </button>
</div>

{#if status}
  <p class="mb-4 rounded-xl border border-green/40 bg-green-dim px-3 py-2 text-sm text-green">{status}</p>
{/if}
{#if error}
  <p class="mb-4 rounded-xl border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>
{/if}

{#if draft}
  {@render children(draft)}
{:else}
  <p class="text-sm text-ink/60">Loading content…</p>
{/if}
