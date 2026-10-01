<script lang="ts">
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import { isSignedIn, signOut } from '$lib/admin/session';

  let { children }: { children: import('svelte').Snippet } = $props();

  const links = [
    { href: '/admin', label: 'Overview' },
    { href: '/admin/hero', label: 'Hero' },
    { href: '/admin/about', label: 'About' },
    { href: '/admin/skills', label: 'Skills' },
    { href: '/admin/projects', label: 'Projects' },
    { href: '/admin/experience', label: 'Experience' },
    { href: '/admin/education', label: 'Education' },
    { href: '/admin/services', label: 'Services' },
    { href: '/admin/why', label: 'Why me' },
    { href: '/admin/contact', label: 'Contact' }
  ];

  const isLogin = $derived(page.url.pathname === '/admin/login');
  const path = $derived(page.url.pathname);

  $effect(() => {
    if (!browser || isLogin) return;
    isSignedIn().then((ok) => {
      if (!ok) goto('/admin/login');
    });
  });

  async function logout() {
    await signOut();
    goto('/admin/login');
  }
</script>

<svelte:head>
  <title>Admin · Deep Biswas</title>
  <meta name="robots" content="noindex,nofollow" />
</svelte:head>

{#if isLogin}
  {@render children()}
{:else}
  <div class="min-h-screen bg-bg text-ink">
    <aside class="fixed inset-y-0 left-0 hidden w-60 overflow-y-auto border-r border-border bg-surface p-6 md:block">
      <p class="font-mono text-xs tracking-[2px] text-green uppercase">Backend UI</p>
      <h1 class="mt-2 text-lg font-extrabold">Portfolio admin</h1>
      <nav class="mt-8 grid gap-1">
        {#each links as link}
          <a
            href={link.href}
            class="rounded-lg px-3 py-2 text-sm font-medium {path === link.href
              ? 'bg-green-dim text-green'
              : 'text-ink/80 hover:bg-surface-2 hover:text-ink'}"
          >
            {link.label}
          </a>
        {/each}
      </nav>
      <div class="mt-10 grid gap-2 pb-4">
        <a href="/" class="text-sm text-green hover:text-green-bright">View public site</a>
        <button class="text-left text-sm text-ink/70 hover:text-ink" type="button" onclick={logout}>Sign out</button>
      </div>
    </aside>
    <div class="md:pl-60">
      <header class="flex items-center justify-between border-b border-border px-5 py-4 md:px-8">
        <p class="font-mono text-xs text-ink/70">{page.url.pathname}</p>
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1 md:hidden">
          {#each links as link}
            <a class="text-xs {path === link.href ? 'text-green' : 'text-ink/70'}" href={link.href}>{link.label}</a>
          {/each}
        </div>
      </header>
      <main class="px-5 py-8 md:px-8">
        {@render children()}
      </main>
    </div>
  </div>
{/if}
