<script lang="ts">
  let width = $state(0);

  function onScroll() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    width = max > 0 ? (h.scrollTop / max) * 100 : 0;
  }
</script>

<svelte:window onscroll={onScroll} />

<div class="progress-bar no-print" style="width: {width}%"></div>
