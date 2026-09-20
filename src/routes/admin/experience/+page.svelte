<script lang="ts">
  import Editor from '$lib/components/admin/Editor.svelte';
  import Field from '$lib/components/admin/Field.svelte';
  import LinesField from '$lib/components/admin/LinesField.svelte';
</script>

<Editor title="Experience" hint="Timeline jobs. The first current role is highlighted.">
  {#snippet children(draft)}
    <div class="mb-3 flex justify-end">
      <button
        class="text-sm text-green"
        type="button"
        onclick={() =>
          (draft.experience = [...draft.experience, { title: '', when: '', org: '', bullets: [], current: false }])}
      >
        Add role
      </button>
    </div>
    <div class="grid gap-4">
      {#each draft.experience as job, i}
        <article class="grid gap-3 rounded-2xl border border-border bg-surface p-4">
          <div class="grid gap-3 md:grid-cols-2">
            <Field label="Title" bind:value={job.title} />
            <Field label="When" bind:value={job.when} />
          </div>
          <Field label="Organisation" bind:value={job.org} />
          <LinesField label="Bullets" bind:value={job.bullets} />
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" bind:checked={job.current} />
            Current role
          </label>
          <button class="justify-self-start text-sm text-red-400" type="button" onclick={() => (draft.experience = draft.experience.filter((_, j) => j !== i))}
            >Remove</button
          >
        </article>
      {/each}
    </div>
  {/snippet}
</Editor>
