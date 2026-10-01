<script lang="ts">
  import { onMount } from 'svelte';
  import { getHealth, getPortfolio } from '$lib/api';
  import type { Portfolio } from '$lib/data/content';

  const sections = [
    { href: '/admin/hero', label: 'Hero & identity', body: 'Name, photo, headline, SEO, footer' },
    { href: '/admin/about', label: 'About', body: 'Lead copy and checklist' },
    { href: '/admin/skills', label: 'Skills', body: 'Toolbox cards' },
    { href: '/admin/projects', label: 'Projects', body: 'Filters and case studies' },
    { href: '/admin/experience', label: 'Experience', body: 'Career timeline' },
    { href: '/admin/education', label: 'Education', body: 'Degrees and certifications' },
    { href: '/admin/services', label: 'Services', body: 'What you offer' },
    { href: '/admin/why', label: 'Why me', body: 'Reasons to hire' },
    { href: '/admin/contact', label: 'Contact & nav', body: 'Header links and channels' }
  ];

  let health = $state({ ok: false, supabase: false });
  let data = $state<Portfolio | null>(null);

  onMount(() => {
    getHealth().then((h) => (health = h));
    getPortfolio().then((p) => (data = p));
  });
</script>

<h2 class="text-2xl font-extrabold">Configure the site</h2>
<p class="mt-2 max-w-2xl text-sm text-ink/70">
  Every block on the public page is edited here. Identity, experience and
  projects save to Supabase (<span class="font-mono text-green">profile</span>,
  <span class="font-mono text-green">experiences</span>,
  <span class="font-mono text-green">projects</span>). Other sections live in
  <span class="font-mono text-green">site_content</span>. The live site reads those tables directly.
</p>

<div class="mt-8 grid gap-4 sm:grid-cols-3">
  <div class="rounded-2xl border border-border bg-surface p-5">
    <p class="font-mono text-xs text-green uppercase">Supabase</p>
    <p class="mt-2 text-lg font-bold">{health.supabase ? 'Connected' : 'Unreachable'}</p>
  </div>
  <div class="rounded-2xl border border-border bg-surface p-5">
    <p class="font-mono text-xs text-green uppercase">Auth</p>
    <p class="mt-2 text-lg font-bold">{health.ok ? 'Ready' : 'Check keys'}</p>
  </div>
  <div class="rounded-2xl border border-border bg-surface p-5">
    <p class="font-mono text-xs text-green uppercase">Projects</p>
    <p class="mt-2 text-lg font-bold">{data?.projects.length ?? '—'}</p>
  </div>
</div>

<div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
  {#each sections as section}
    <a class="rounded-2xl border border-border bg-surface p-5 transition hover:border-green-deep" href={section.href}>
      <h3 class="font-bold">{section.label}</h3>
      <p class="mt-1 text-sm text-ink/70">{section.body}</p>
    </a>
  {/each}
</div>
