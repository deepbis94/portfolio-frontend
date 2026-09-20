<script lang="ts">
  import { icons } from '$lib/icons';

  let { name, class: className = 'h-6 w-6' }: { name: string; class?: string } = $props();
</script>

<svg
  class={className}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.8"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  {@html icons[name] ?? ''}
</svg>
