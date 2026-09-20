<script lang="ts">
  let show = $state(false);

  function onScroll() {
    show = window.scrollY > 600;
  }

  function toTop() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }
</script>

<svelte:window onscroll={onScroll} />

<button
  class="no-print fixed right-6 bottom-6 z-[70] h-11 w-11 rounded-xl border border-green bg-surface-2 text-lg text-green-bright transition {show
    ? 'visible translate-y-0 opacity-100'
    : 'invisible translate-y-2 opacity-0'} hover:-translate-y-[3px] hover:bg-green hover:text-ink-dark hover:shadow-[0_8px_24px_rgba(185,243,50,0.25)]"
  type="button"
  aria-label="Back to top"
  onclick={toTop}
>
  ↑
</button>
