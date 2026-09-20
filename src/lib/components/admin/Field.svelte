<script lang="ts">
  let {
    label,
    value = $bindable(''),
    type = 'text',
    rows,
    hint
  }: {
    label: string;
    value?: string;
    type?: string;
    rows?: number;
    hint?: string;
  } = $props();

  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
</script>

<label class="grid gap-1 text-sm font-medium" for={id}>
  {label}
  {#if rows}
    <textarea
      {id}
      class="w-full rounded-xl border border-border bg-bg px-3 py-2.5 font-normal outline-none focus:border-green"
      {rows}
      bind:value
    ></textarea>
  {:else}
    <input
      {id}
      class="w-full rounded-xl border border-border bg-bg px-3 py-2.5 font-normal outline-none focus:border-green"
      {type}
      bind:value
    />
  {/if}
  {#if hint}
    <span class="font-normal text-xs text-ink/50">{hint}</span>
  {/if}
</label>
