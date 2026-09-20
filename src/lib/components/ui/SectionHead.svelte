<script lang="ts">
  let {
    eyebrow,
    title,
    desc,
    center = false
  }: { eyebrow: string; title: string; desc?: string; center?: boolean } = $props();
</script>

<div class="mb-11 {center ? 'sec-head-center text-center' : ''}">
  <p
    class="sec-eyebrow mb-3 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[2px] text-green {center
      ? 'justify-center'
      : ''}"
  >
    {eyebrow}
  </p>
  <h2 class="text-[clamp(26px,3.6vw,38px)] font-extrabold leading-[1.15] tracking-[-0.8px]">{title}</h2>
  {#if desc}
    <p class="mt-2.5 max-w-[60ch] text-ink/80 {center ? 'mx-auto' : ''}">{desc}</p>
  {/if}
</div>
