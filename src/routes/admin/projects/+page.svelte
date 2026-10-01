<script lang="ts">
  import Editor from '$lib/components/admin/Editor.svelte';
  import Field from '$lib/components/admin/Field.svelte';
  import CsvField from '$lib/components/admin/CsvField.svelte';
  import LinesField from '$lib/components/admin/LinesField.svelte';
</script>

<Editor title="Projects" hint="Card image is Media URL. Extra case-study photos go in Gallery — one URL per line.">
  {#snippet children(draft)}
    <div class="mb-6 max-w-3xl">
      <h3 class="mb-3 text-sm font-bold">Filters</h3>
      <button
        class="mb-3 text-sm text-green"
        type="button"
        onclick={() => (draft.projectFilters = [...draft.projectFilters, { id: '', label: '' }])}
      >
        Add filter
      </button>
      <div class="grid gap-3">
        {#each draft.projectFilters as filter, i}
          <div class="grid gap-2 rounded-xl border border-border bg-surface p-3 sm:grid-cols-2">
            <Field label="ID" bind:value={filter.id} hint="all, laravel, vue…" />
            <Field label="Label" bind:value={filter.label} />
            <button class="text-sm text-red-400" type="button" onclick={() => (draft.projectFilters = draft.projectFilters.filter((_, j) => j !== i))}
              >Remove</button
            >
          </div>
        {/each}
      </div>
    </div>

    <div class="mb-3 flex items-center justify-between">
      <h3 class="text-sm font-bold">Project cards</h3>
      <button
        class="text-sm text-green"
        type="button"
        onclick={() =>
          (draft.projects = [
            ...draft.projects,
            {
              id: `project-${Date.now()}`,
              title: '',
              category: '',
              summary: '',
              tags: [],
              facts: [],
              href: '',
              repoUrl: '',
              liveUrl: '',
              media: '',
              gallery: [],
              filters: []
            }
          ])}
      >
        Add project
      </button>
    </div>
    <div class="grid gap-4">
      {#each draft.projects as project, i}
        <article class="grid gap-3 rounded-2xl border border-border bg-surface p-4 md:grid-cols-2">
          <Field label="ID / slug" bind:value={project.id} hint="Used as /projects/slug" />
          <Field label="Title" bind:value={project.title} />
          <Field label="Category" bind:value={project.category} />
          <Field label="Repository URL" bind:value={project.repoUrl} />
          <Field label="Live demo URL" bind:value={project.liveUrl} />
          <div class="md:col-span-2">
            <Field label="Summary" bind:value={project.summary} rows={3} />
          </div>
          <Field
            label="Media URL"
            bind:value={project.media}
            hint="Card + cover. /projects/name.jpg uses the portfolio storage bucket, or paste a full https URL"
          />
          <div class="md:col-span-2">
            <LinesField
              label="Gallery URLs"
              bind:value={project.gallery}
              hint="One image URL per line. Shown on the case-study page. Same path rules as Media URL."
            />
          </div>
          <CsvField label="Filter IDs" bind:value={project.filters} hint="Must match filter IDs above" />
          <CsvField label="Tags" bind:value={project.tags} />
          <CsvField label="Facts" bind:value={project.facts} />
          <a class="text-sm text-green" href="/projects/{project.id}" target="_blank" rel="noreferrer">Open case study</a>
          <button class="text-sm text-red-400" type="button" onclick={() => (draft.projects = draft.projects.filter((_, j) => j !== i))}
            >Remove</button
          >
        </article>
      {/each}
    </div>
  {/snippet}
</Editor>
