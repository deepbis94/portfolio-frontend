<script lang="ts">
  import Editor from '$lib/components/admin/Editor.svelte';
  import Field from '$lib/components/admin/Field.svelte';
  import LinesField from '$lib/components/admin/LinesField.svelte';
</script>

<Editor title="Education" hint="Degrees, course cards, certifications and languages.">
  {#snippet children(draft)}
    <div class="mb-3 flex justify-end">
      <button
        class="text-sm text-green"
        type="button"
        onclick={() => (draft.education = [...draft.education, { glyph: '', title: '', detail: '' }])}
      >
        Add education
      </button>
    </div>
    <div class="grid gap-4">
      {#each draft.education as edu, i}
        <article class="grid gap-3 rounded-2xl border border-border bg-surface p-4 md:grid-cols-3">
          <Field label="Glyph" bind:value={edu.glyph} />
          <Field label="Title" bind:value={edu.title} />
          <Field label="Detail" bind:value={edu.detail} />
          <button class="text-sm text-red-400" type="button" onclick={() => (draft.education = draft.education.filter((_, j) => j !== i))}
            >Remove</button
          >
        </article>
      {/each}
    </div>
    <div class="mt-8 max-w-3xl grid gap-4">
      <LinesField label="Certifications" bind:value={draft.certifications} hint="One per line" />
      <Field label="Languages" bind:value={draft.languages} />
    </div>
  {/snippet}
</Editor>
