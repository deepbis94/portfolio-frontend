<script lang="ts">
  let {
    label,
    value = $bindable<string[]>([]),
    hint
  }: {
    label: string;
    value?: string[];
    hint?: string;
  } = $props();

  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
</script>

<label class="grid gap-1 text-sm font-medium" for={id}>
  {label}
  <textarea
    {id}
    class="w-full rounded-xl border border-border bg-bg px-3 py-2.5 font-normal outline-none focus:border-green"
    rows="5"
    value={value.join('\n')}
    oninput={(e) => (value = e.currentTarget.value.split('\n'))}
  ></textarea>
  {#if hint}
    <span class="font-normal text-xs text-ink/50">{hint}</span>
  {/if}
</label>
