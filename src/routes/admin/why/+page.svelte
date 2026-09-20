<script lang="ts">
  import Editor from '$lib/components/admin/Editor.svelte';
  import Field from '$lib/components/admin/Field.svelte';
</script>

<Editor title="Why me" hint="Numbered reasons.">
  {#snippet children(draft)}
    <div class="mb-3 flex justify-end">
      <button
        class="text-sm text-green"
        type="button"
        onclick={() =>
          (draft.why = [
            ...draft.why,
            { n: String(draft.why.length + 1).padStart(2, '0'), title: '', body: '' }
          ])}
      >
        Add item
      </button>
    </div>
    <div class="grid gap-4">
      {#each draft.why as item, i}
        <article class="grid gap-3 rounded-2xl border border-border bg-surface p-4 md:grid-cols-[80px_1fr]">
          <Field label="No." bind:value={item.n} />
          <Field label="Title" bind:value={item.title} />
          <div class="md:col-span-2">
            <Field label="Body" bind:value={item.body} rows={3} />
          </div>
          <button class="text-sm text-red-400" type="button" onclick={() => (draft.why = draft.why.filter((_, j) => j !== i))}
            >Remove</button
          >
        </article>
      {/each}
    </div>
  {/snippet}
</Editor>
