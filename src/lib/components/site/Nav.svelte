<script lang="ts">
  import { page } from '$app/state';
  import type { NavLink } from '$lib/data/content';

  let { name, links, hireHref = '#contact' }: { name: string; links: NavLink[]; hireHref?: string } = $props();

  let open = $state(false);
  let active = $state('');
  const home = $derived(page.url.pathname === '/' ? '#top' : '/');

  function hrefFor(href: string) {
    if (href.startsWith('#')) {
      return page.url.pathname === '/' ? href : `/${href}`;
    }
    return href;
  }

  function close() {
    open = false;
  }

  function onScroll() {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is HTMLElement => Boolean(el));
    const mid = window.innerHeight * 0.4;
    let current = '';
    for (const el of sections) {
      const top = el.getBoundingClientRect().top;
      if (top <= mid) current = `#${el.id}`;
    }
    active = current;
  }
</script>

<svelte:window onscroll={onScroll} />

<nav class="no-print sticky top-0 z-[60] border-b border-border-soft bg-bg/85 backdrop-blur-md">
  <div class="wrap flex h-16 items-center justify-between">
    <a href={home} class="flex items-center gap-3 text-base font-extrabold text-ink">
      <span
        class="flex h-[38px] w-[38px] items-center justify-center rounded-[11px] border-[1.5px] border-green"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5">
          <text x="12" y="16.2" font-family="Georgia, 'Times New Roman', serif" font-weight="600" font-size="15" fill="#fff" text-anchor="middle">D</text>
        </svg>
      </span>
      {name}
    </a>
    <div class="hidden items-center gap-1.5 md:flex">
      {#each links as link}
        <a
          href={hrefFor(link.href)}
          class="rounded-[9px] px-3.5 py-2 text-sm font-medium text-ink/80 hover:bg-surface-2 hover:text-ink {active ===
          link.href
            ? 'bg-surface-2 text-green'
            : ''}"
        >
          {link.label}
        </a>
      {/each}
      <a
        href={hrefFor(hireHref)}
        class="ml-1 inline-flex min-h-11 items-center rounded-full bg-green px-5 py-2 text-[13px] font-bold text-ink-dark hover:bg-green-bright hover:text-ink-dark"
      >
        Hire me
      </a>
    </div>
    <button
      class="nav-toggle flex h-[42px] w-[42px] flex-col items-center justify-center gap-[5px] rounded-[10px] border border-green bg-surface-2 transition hover:bg-green hover:shadow-[0_8px_24px_rgba(185,243,50,0.25)] md:hidden"
      type="button"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      onclick={() => (open = !open)}
    >
      <i></i><i></i><i></i>
    </button>
  </div>
  {#if open}
    <div class="border-t border-border-soft md:hidden">
      {#each links as link}
        <a
          href={hrefFor(link.href)}
          onclick={close}
          class="block border-b border-border-soft px-7 py-[15px] text-[15px] font-medium text-ink/80 hover:bg-green-dim hover:text-green-bright"
        >
          {link.label}
        </a>
      {/each}
      <a
        href={hrefFor(hireHref)}
        onclick={close}
        class="block min-h-11 px-7 py-[15px] text-[15px] font-bold text-green hover:bg-green-dim"
      >
        Hire me
      </a>
    </div>
  {/if}
</nav>
