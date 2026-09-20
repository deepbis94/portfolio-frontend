<script lang="ts">
  let { left, right, year = new Date().getFullYear() }: { left: string; right: string; year?: number } = $props();
</script>

<footer
  class="mt-16 flex flex-wrap justify-between gap-2.5 border-t border-border-soft pt-[26px] pb-9 font-mono text-[11.5px] text-ink/80"
>
  <span>{left.replace('{year}', String(year))}</span>
  <span>{right}</span>
</footer>
