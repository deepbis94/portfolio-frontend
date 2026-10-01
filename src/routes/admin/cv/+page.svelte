<script lang="ts">
  import Editor from '$lib/components/admin/Editor.svelte';
  import { deleteResumePdf, uploadResumePdf } from '$lib/supabase/storage';

  let busy = $state(false);
  let localError = $state('');
  let localStatus = $state('');
  let inputEl = $state<HTMLInputElement | null>(null);

  async function onFile(event: Event, draft: { resumePdf: string }) {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    busy = true;
    localError = '';
    localStatus = '';
    try {
      draft.resumePdf = await uploadResumePdf(file);
      localStatus = 'PDF uploaded to Supabase Storage. Click Save changes to publish it on the site.';
    } catch (e) {
      localError = e instanceof Error ? e.message : 'Upload failed';
    } finally {
      busy = false;
      input.value = '';
    }
  }

  async function removeCv(draft: { resumePdf: string }) {
    busy = true;
    localError = '';
    localStatus = '';
    try {
      await deleteResumePdf();
      draft.resumePdf = '';
      localStatus = 'Removed from Storage. Click Save changes so Download CV disappears on the site.';
    } catch (e) {
      draft.resumePdf = '';
      localStatus = 'Cleared the saved link. Click Save changes. Storage delete: ' + (e instanceof Error ? e.message : 'failed');
    } finally {
      busy = false;
    }
  }
</script>

<Editor
  title="CV"
  hint="Upload a PDF to the Supabase portfolio bucket. The Contact section Download CV button serves this file."
>
  {#snippet children(draft)}
    <div class="max-w-xl rounded-2xl border border-border bg-surface p-5">
      <p class="text-sm font-medium">Resume PDF</p>
      <p class="mt-1 text-xs text-ink/50">Stored as <span class="font-mono">profile/cv.pdf</span> in Storage. Path is saved on <span class="font-mono">profile.resume_pdf</span>.</p>

      {#if draft.resumePdf}
        <p class="mt-4 truncate text-sm">
          Current file:
          <a class="text-green hover:text-green-bright" href={draft.resumePdf} target="_blank" rel="noreferrer">Open CV</a>
        </p>
      {:else}
        <p class="mt-4 text-sm text-ink/60">No CV uploaded yet.</p>
      {/if}

      <div class="mt-5 flex flex-wrap gap-3">
        <button
          class="rounded-full bg-green px-5 py-2.5 text-sm font-bold text-ink-dark hover:bg-green-bright disabled:opacity-60"
          type="button"
          disabled={busy}
          onclick={() => inputEl?.click()}
        >
          {busy ? 'Working…' : draft.resumePdf ? 'Replace PDF' : 'Upload PDF'}
        </button>
        {#if draft.resumePdf}
          <button
            class="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-red-400 hover:border-red-400 disabled:opacity-60"
            type="button"
            disabled={busy}
            onclick={() => removeCv(draft)}
          >
            Remove
          </button>
        {/if}
      </div>
      <input
        bind:this={inputEl}
        class="hidden"
        type="file"
        accept="application/pdf,.pdf"
        onchange={(event) => onFile(event, draft)}
      />

      {#if localStatus}
        <p class="mt-4 text-sm text-green">{localStatus}</p>
      {/if}
      {#if localError}
        <p class="mt-4 text-sm text-red-400">{localError}</p>
      {/if}
    </div>
  {/snippet}
</Editor>
