<script lang="ts">
  import Editor from '$lib/components/admin/Editor.svelte';
  import Field from '$lib/components/admin/Field.svelte';
  import LinesField from '$lib/components/admin/LinesField.svelte';
</script>

<Editor title="About" hint="The Who I am section.">
  {#snippet children(draft)}
    <div class="grid max-w-3xl gap-4">
      <Field label="Lead paragraph" bind:value={draft.aboutLead} rows={4} />
      <LinesField label="Checklist points" bind:value={draft.aboutPoints} hint="One point per line" />
    </div>
  {/snippet}
</Editor>
