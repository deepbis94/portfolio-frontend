<script lang="ts">
  import Editor from '$lib/components/admin/Editor.svelte';
  import Field from '$lib/components/admin/Field.svelte';
  import CsvField from '$lib/components/admin/CsvField.svelte';
  import LinesField from '$lib/components/admin/LinesField.svelte';
</script>

<Editor title="Hero & identity" hint="Name, headline, photo and SEO. This is the first screen visitors see.">
  {#snippet children(draft)}
    <div class="grid max-w-3xl gap-4">
      <Field label="Name" bind:value={draft.name} />
      <Field label="Role" bind:value={draft.role} />
      <Field label="Location" bind:value={draft.location} />
      <Field label="Email" bind:value={draft.email} type="email" />
      <Field label="Phone display" bind:value={draft.phone} />
      <Field label="Phone link" bind:value={draft.phoneHref} hint="tel:+91..." />
      <Field label="LinkedIn URL" bind:value={draft.linkedin} />
      <Field label="GitHub URL" bind:value={draft.github} />
      <Field label="Photo URL" bind:value={draft.photo} hint="/profile/your-photo.jpg maps to Supabase Storage, or use a full https URL" />
      <Field label="Photo alt text" bind:value={draft.photoAlt} />
      <Field label="Photo chip — availability" bind:value={draft.photoChipOpen} />
      <Field label="Photo chip — experience" bind:value={draft.photoChipYears} />
      <Field
        label="Availability line"
        bind:value={draft.availabilityLine}
        hint="Shown under the hero and on Hire me bands"
        rows={2}
      />
      <Field label="Headline (before accent)" bind:value={draft.headline} />
      <Field label="Headline accent" bind:value={draft.headlineAccent} />
      <Field label="Headline suffix" bind:value={draft.headlineSuffix} />
      <Field label="Subcopy" bind:value={draft.sub} rows={4} />
      <LinesField label="Typewriter phrases" bind:value={draft.typePhrases} hint="One phrase per line" />
      <CsvField label="Rotating skill chips" bind:value={draft.chipSkills} />
      <Field label="Browser title" bind:value={draft.metaTitle} />
      <Field label="Meta description" bind:value={draft.metaDescription} rows={3} />
      <Field label="Footer left" bind:value={draft.footerLeft} hint={'Use {year} for the current year'} />
      <Field label="Footer right" bind:value={draft.footerRight} />

      <div>
        <div class="mb-2 flex items-center justify-between">
          <h3 class="text-sm font-bold">Credibility stats</h3>
          <button
            class="text-sm text-green"
            type="button"
            onclick={() => (draft.stats = [...draft.stats, { accent: '', label: '', wide: false }])}
          >
            Add stat
          </button>
        </div>
        <div class="grid gap-3">
          {#each draft.stats as pill, i}
            <div class="grid gap-2 rounded-xl border border-border bg-surface p-3 sm:grid-cols-[1fr_2fr_auto]">
              <Field label="Accent" bind:value={pill.accent} />
              <Field label="Label" bind:value={pill.label} />
              <button class="self-end pb-2 text-sm text-red-400" type="button" onclick={() => (draft.stats = draft.stats.filter((_, j) => j !== i))}
                >Remove</button
              >
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/snippet}
</Editor>
