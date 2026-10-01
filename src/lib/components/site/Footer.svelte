<script lang="ts">
  let {
    left,
    right,
    hireHref = '#contact',
    year = new Date().getFullYear()
  }: { left: string; right: string; hireHref?: string; year?: number } = $props();
</script>

<footer
  class="mt-16 flex flex-col gap-4 border-t border-border-soft pt-[26px] pb-9 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
>
  <span class="font-mono text-[11.5px] text-ink/80">{left.replace('{year}', String(year))}</span>
  <div class="flex flex-wrap items-center gap-3">
    <a
      class="inline-flex min-h-11 items-center rounded-full bg-green px-5 py-2 text-[13px] font-bold text-ink-dark hover:bg-green-bright"
      href={hireHref}
    >
      Hire me / Start a project
    </a>
    <span class="font-mono text-[11.5px] text-ink/80">{right}</span>
  </div>
</footer>
