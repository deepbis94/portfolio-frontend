<script lang="ts">
  let {
    href,
    solid = false,
    ghost = false,
    class: className = '',
    onclick,
    type = 'link',
    target,
    children
  }: {
    href?: string;
    solid?: boolean;
    ghost?: boolean;
    class?: string;
    onclick?: () => void;
    type?: 'link' | 'button';
    target?: string;
    children: import('svelte').Snippet;
  } = $props();

  const classes = $derived(
    'inline-block rounded-full px-[30px] py-3.5 text-sm font-bold transition duration-150 hover:-translate-y-0.5 ' +
      (solid
        ? 'bg-green text-ink-dark hover:bg-green-bright'
        : ghost
          ? 'border border-green text-green-bright hover:bg-green hover:text-ink-dark hover:shadow-[0_8px_24px_rgba(185,243,50,0.25)]'
          : '') +
      ' ' +
      className
  );
</script>

{#if type === 'button' || !href}
  <button class={classes} {onclick} type="button">
    {@render children()}
  </button>
{:else}
  <a class={classes} {href} {target} rel={target === '_blank' ? 'noreferrer' : undefined}>
    {@render children()}
  </a>
{/if}
