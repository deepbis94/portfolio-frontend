<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';

  let {
    href = '#contact',
    note = '',
    compact = false
  }: { href?: string; note?: string; compact?: boolean } = $props();
</script>

<div class={compact ? 'flex flex-col items-center gap-3 text-center' : 'flex flex-col items-center gap-4 text-center'}>
  {#if !compact}
    <p class="font-mono text-xs tracking-[2px] text-green uppercase">Next step</p>
    <h2 class="text-[clamp(24px,3.4vw,34px)] font-extrabold leading-[1.15] tracking-[-0.6px]">
      Hire me / Start a project
    </h2>
  {/if}
  {#if note}
    <p class="max-w-[46ch] text-[14.5px] text-ink/80">{note}</p>
  {/if}
  <Button href={href} solid class="min-h-11 min-w-[12rem]">Hire me / Start a project</Button>
</div>
