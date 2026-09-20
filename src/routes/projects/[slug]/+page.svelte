<script lang="ts">
  import { getPortfolio, getProject } from '$lib/api';
  import BackToTop from '$lib/components/site/BackToTop.svelte';
  import Footer from '$lib/components/site/Footer.svelte';
  import Nav from '$lib/components/site/Nav.svelte';
  import ProgressBar from '$lib/components/site/ProgressBar.svelte';
  import ProjectCaseStudy from '$lib/components/site/ProjectCaseStudy.svelte';
  import ProjectLoader from '$lib/components/site/ProjectLoader.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { portfolio, type Portfolio, type ProjectDetail } from '$lib/data/content';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let chrome = $state<Portfolio>(portfolio);
  let project = $state<ProjectDetail | null>(null);
  let missing = $state(false);
  let loading = $state(true);

  $effect(() => {
    const slug = data.slug;
    let cancelled = false;
    loading = true;
    missing = false;
    project = null;

    Promise.all([getPortfolio(), getProject(slug)])
      .then(([site, row]) => {
        if (cancelled) return;
        chrome = site;
        project = row;
        missing = false;
      })
      .catch(() => {
        if (cancelled) return;
        project = null;
        missing = true;
        getPortfolio().then((site) => {
          if (!cancelled) chrome = site;
        });
      })
      .finally(() => {
        if (!cancelled) loading = false;
      });

    return () => {
      cancelled = true;
    };
  });
</script>

<svelte:head>
  <title>{project ? `${project.name} — ${chrome.name}` : `Project — ${chrome.name}`}</title>
  {#if project}
    <meta name="description" content={project.description || project.overview} />
  {/if}
</svelte:head>

<ProgressBar />
<a class="skip-link" href="#main">Skip to content</a>
<Nav name={chrome.name} links={chrome.nav} />

<main class="wrap py-[72px]" id="main">
  {#if loading}
    <ProjectLoader />
  {:else if missing || !project}
    <div class="mx-auto max-w-xl py-20 text-center">
      <p class="font-mono text-xs tracking-[2px] text-green uppercase">404</p>
      <h1 class="mt-3 text-3xl font-extrabold">Project not found</h1>
      <p class="mt-3 text-ink/80">That case study is missing or no longer published.</p>
      <a class="mt-8 inline-block font-bold text-green hover:text-green-bright" href="/#projects">← Back to projects</a>
    </div>
  {:else}
    <nav class="font-mono text-[12px] text-ink/70" aria-label="Breadcrumb">
      <a class="hover:text-green" href="/">Home</a>
      <span class="mx-2">/</span>
      <a class="hover:text-green" href="/#projects">Projects</a>
      <span class="mx-2">/</span>
      <span class="text-ink">{project.name}</span>
    </nav>

    <div class="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        {#if project.category}
          <span class="inline-flex rounded-full bg-green-dim px-3 py-1 font-mono text-[11px] font-semibold tracking-[1px] text-green uppercase">
            {project.category}
          </span>
        {/if}
        <h1 class="mt-3 text-[clamp(32px,4.6vw,52px)] font-extrabold leading-[1.12] tracking-[-1px]">{project.name}</h1>
        {#if project.subtitle}
          <p class="mt-2 text-lg text-ink/80">{project.subtitle}</p>
        {/if}
      </div>
      <div class="flex flex-wrap gap-3">
        {#if project.liveUrl}
          <Button href={project.liveUrl} solid target={project.liveUrl.startsWith('http') ? '_blank' : undefined}>Live demo</Button>
        {/if}
        {#if project.url}
          <Button href={project.url} ghost target={project.url.startsWith('http') ? '_blank' : undefined}>{project.liveUrl && project.url !== project.liveUrl ? 'View code' : 'Open project'}</Button>
        {/if}
      </div>
    </div>

    <div class="mt-10">
      <ProjectCaseStudy {project} />
    </div>

    <p class="mt-14 border-t border-border-soft pt-8">
      <a class="text-sm font-bold text-green hover:text-green-bright" href="/#projects">← Back to all projects</a>
    </p>
  {/if}

  {#if !loading}
    <Footer left={chrome.footerLeft} right={chrome.footerRight} />
  {/if}
</main>

<BackToTop />
