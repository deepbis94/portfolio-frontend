<script lang="ts">
  let { label = 'Loading case study' }: { label?: string } = $props();
</script>

<div class="flex min-h-[70vh] flex-col justify-center py-10" role="status" aria-live="polite" aria-busy="true">
  <div class="mb-8 flex items-center gap-3">
    <span class="loader-ring" aria-hidden="true"></span>
    <p class="font-mono text-xs tracking-[2px] text-green uppercase">{label}</p>
  </div>

  <div class="animate-pulse">
    <div class="flex gap-2">
      <span class="h-3 w-12 rounded bg-surface-2"></span>
      <span class="h-3 w-16 rounded bg-surface-2"></span>
      <span class="h-3 w-24 rounded bg-surface-2"></span>
    </div>
    <div class="mt-6 h-4 w-20 rounded-full bg-green-dim"></div>
    <div class="mt-4 h-12 w-2/3 max-w-md rounded-xl bg-surface-2"></div>
    <div class="mt-3 h-5 w-1/2 max-w-sm rounded bg-surface-2"></div>
    <div class="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[16px] border border-border bg-surface">
      <span class="loader-shimmer" aria-hidden="true"></span>
    </div>
    <div class="mt-4 grid grid-cols-3 gap-3">
      <span class="aspect-[16/10] rounded-xl bg-surface-2"></span>
      <span class="aspect-[16/10] rounded-xl bg-surface-2"></span>
      <span class="aspect-[16/10] rounded-xl bg-surface-2"></span>
    </div>
    <div class="mt-8 grid gap-4 sm:grid-cols-3">
      <span class="h-24 rounded-[16px] border border-border bg-surface"></span>
      <span class="h-24 rounded-[16px] border border-border bg-surface"></span>
      <span class="h-24 rounded-[16px] border border-border bg-surface"></span>
    </div>
  </div>
</div>

<style>
  .loader-ring {
    display: inline-block;
    width: 22px;
    height: 22px;
    border: 2px solid rgb(185 243 50 / 0.2);
    border-top-color: var(--color-green);
    border-radius: 50%;
    animation: loader-spin 0.7s linear infinite;
  }

  .loader-shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      110deg,
      transparent 20%,
      rgb(185 243 50 / 0.08) 45%,
      transparent 70%
    );
    animation: loader-shimmer 1.4s ease-in-out infinite;
  }

  @keyframes loader-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes loader-shimmer {
    from {
      transform: translateX(-60%);
    }
    to {
      transform: translateX(60%);
    }
  }
</style>
