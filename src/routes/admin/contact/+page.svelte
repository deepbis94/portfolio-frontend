<script lang="ts">
  import Editor from '$lib/components/admin/Editor.svelte';
  import Field from '$lib/components/admin/Field.svelte';
</script>

<Editor title="Contact & nav" hint="Header links and Get In Touch channels.">
  {#snippet children(draft)}
    <div class="mb-8">
      <div class="mb-3 flex items-center justify-between">
        <h3 class="text-sm font-bold">Navigation</h3>
        <button
          class="text-sm text-green"
          type="button"
          onclick={() => (draft.nav = [...draft.nav, { href: '#', label: '' }])}
        >
          Add link
        </button>
      </div>
      <div class="grid gap-3">
        {#each draft.nav as link, i}
          <div class="grid gap-2 rounded-xl border border-border bg-surface p-3 sm:grid-cols-2">
            <Field label="Label" bind:value={link.label} />
            <Field label="Href" bind:value={link.href} hint="#about, #projects…" />
            <button class="text-sm text-red-400" type="button" onclick={() => (draft.nav = draft.nav.filter((_, j) => j !== i))}
              >Remove</button
            >
          </div>
        {/each}
      </div>
    </div>

    <div>
      <div class="mb-3 flex items-center justify-between">
        <h3 class="text-sm font-bold">Contact channels</h3>
        <button
          class="text-sm text-green"
          type="button"
          onclick={() => (draft.channels = [...draft.channels, { label: '', value: '', href: '' }])}
        >
          Add channel
        </button>
      </div>
      <div class="grid gap-3">
        {#each draft.channels as channel, i}
          <article class="grid gap-3 rounded-2xl border border-border bg-surface p-4 md:grid-cols-3">
            <Field label="Label" bind:value={channel.label} />
            <Field label="Value" bind:value={channel.value} />
            <Field label="Href" bind:value={channel.href} />
            <button class="text-sm text-red-400" type="button" onclick={() => (draft.channels = draft.channels.filter((_, j) => j !== i))}
              >Remove</button
            >
          </article>
        {/each}
      </div>
    </div>
  {/snippet}
</Editor>
