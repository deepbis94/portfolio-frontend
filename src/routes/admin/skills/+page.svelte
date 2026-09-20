<script lang="ts">
  import Editor from '$lib/components/admin/Editor.svelte';
  import Field from '$lib/components/admin/Field.svelte';
  import { iconNames } from '$lib/data/content';
</script>

<Editor title="Skills" hint="Toolbox cards on the public site.">
  {#snippet children(draft)}
    <div class="mb-3 flex justify-end">
      <button
        class="text-sm text-green"
        type="button"
        onclick={() => (draft.skills = [...draft.skills, { title: '', body: '', icon: 'code' }])}
      >
        Add skill
      </button>
    </div>
    <div class="grid gap-4">
      {#each draft.skills as skill, i}
        <article class="grid gap-3 rounded-2xl border border-border bg-surface p-4 md:grid-cols-2">
          <Field label="Title" bind:value={skill.title} />
          <label class="grid gap-1 text-sm font-medium">
            Icon
            <select
              class="w-full rounded-xl border border-border bg-bg px-3 py-2.5 font-normal outline-none focus:border-green"
              bind:value={skill.icon}
            >
              {#each iconNames as name}
                <option value={name}>{name}</option>
              {/each}
            </select>
          </label>
          <div class="md:col-span-2">
            <Field label="Description" bind:value={skill.body} rows={3} />
          </div>
          <button class="justify-self-start text-sm text-red-400" type="button" onclick={() => (draft.skills = draft.skills.filter((_, j) => j !== i))}
            >Remove</button
          >
        </article>
      {/each}
    </div>
  {/snippet}
</Editor>
