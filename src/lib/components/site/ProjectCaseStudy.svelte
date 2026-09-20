<script lang="ts">
  import type { ProjectDetail } from '$lib/data/content';

  const tabs = ['Overview', 'Features', 'Tech Stack', 'Architecture', 'Challenges', 'Results'] as const;
  type Tab = (typeof tabs)[number];

  let { project }: { project: ProjectDetail } = $props();

  let tab = $state<Tab>('Overview');
  let active = $state(0);
  let lightbox = $state(false);

  const gallery = $derived(project.gallery.length ? project.gallery : project.image ? [project.image] : []);
  const cover = $derived(gallery[active] ?? project.image);

  const available = $derived(
    tabs.filter((item) => {
      if (item === 'Overview') return Boolean(project.overview);
      if (item === 'Features') return project.features.length > 0;
      if (item === 'Tech Stack') return project.stack.length > 0;
      if (item === 'Architecture') return project.architecture.length > 0;
      if (item === 'Challenges') return project.challenges.length > 0;
      return project.results.length > 0;
    })
  );

  $effect(() => {
    if (!available.includes(tab) && available[0]) tab = available[0];
  });

  $effect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') lightbox = false;
      if (gallery.length < 2) return;
      if (event.key === 'ArrowRight') active = (active + 1) % gallery.length;
      if (event.key === 'ArrowLeft') active = (active - 1 + gallery.length) % gallery.length;
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  });
</script>

<button
  type="button"
  class="group relative block aspect-[16/9] w-full overflow-hidden rounded-[16px] border border-border bg-[#141016]"
  aria-label="Enlarge {project.name} screenshot"
  onclick={() => (lightbox = true)}
>
  {#if cover}
    <img src={cover} alt="{project.name} screenshot" class="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]" />
  {/if}
  <span class="pointer-events-none absolute right-3 bottom-3 rounded-full bg-surface/90 px-3 py-1.5 font-mono text-[11px] font-semibold text-green opacity-0 transition group-hover:opacity-100">
    Click to enlarge
  </span>
</button>

{#if gallery.length > 1}
  <ul class="mt-4 grid grid-cols-3 gap-3">
    {#each gallery as src, index}
      <li>
        <button
          type="button"
          class="relative aspect-[16/10] w-full overflow-hidden rounded-xl border bg-surface-2 transition {index === active
            ? 'border-green ring-2 ring-green/40'
            : 'border-border hover:border-green-deep'}"
          aria-label="Enlarge {project.name} gallery image {index + 1}"
          aria-current={index === active ? 'true' : undefined}
          onclick={() => {
            active = index;
            lightbox = true;
          }}
        >
          <img src={src} alt="{project.name} gallery {index + 1}" class="h-full w-full object-cover object-top" />
        </button>
      </li>
    {/each}
  </ul>
{/if}

{#if lightbox && cover}
  <div
    class="fixed inset-0 z-[80] flex items-center justify-center bg-bg/80 p-4 backdrop-blur-sm sm:p-8"
    role="dialog"
    aria-modal="true"
    aria-label="{project.name} image preview"
    onclick={() => (lightbox = false)}
    onkeydown={(event) => event.key === 'Escape' && (lightbox = false)}
  >
    <button
      type="button"
      class="absolute top-4 right-4 z-10 rounded-full bg-surface px-3 py-2 text-sm font-semibold text-ink hover:bg-green hover:text-ink-dark"
      aria-label="Close enlarged image"
      onclick={() => (lightbox = false)}
    >
      Close
    </button>
    {#if gallery.length > 1}
      <button
        type="button"
        class="absolute top-1/2 left-3 z-10 -translate-y-1/2 rounded-full bg-surface px-3 py-2 text-sm font-semibold sm:left-6"
        aria-label="Previous image"
        onclick={(event) => {
          event.stopPropagation();
          active = (active - 1 + gallery.length) % gallery.length;
        }}
      >
        ←
      </button>
      <button
        type="button"
        class="absolute top-1/2 right-3 z-10 -translate-y-1/2 rounded-full bg-surface px-3 py-2 text-sm font-semibold sm:right-6"
        aria-label="Next image"
        onclick={(event) => {
          event.stopPropagation();
          active = (active + 1) % gallery.length;
        }}
      >
        →
      </button>
    {/if}
    <img
      src={cover}
      alt="{project.name} enlarged screenshot"
      class="max-h-[min(80vh,720px)] w-full max-w-5xl rounded-[16px] border border-border object-contain"
      onclick={(event) => event.stopPropagation()}
    />
  </div>
{/if}

{#if project.metrics.length}
  <dl class="mt-8 grid gap-4 sm:grid-cols-3">
    {#each project.metrics as metric}
      <div class="rounded-[16px] border border-border bg-surface p-5">
        <dt class="font-mono text-[11px] tracking-[1px] text-steel uppercase">{metric.label}</dt>
        <dd class="mt-2 text-2xl font-extrabold text-green">{metric.value}</dd>
      </div>
    {/each}
  </dl>
{/if}

{#if available.length}
  <div class="mt-10 flex flex-wrap gap-2 border-b border-border-soft pb-3">
    {#each available as item}
      <button
        type="button"
        class="rounded-full px-4 py-2 text-sm font-semibold transition {tab === item
          ? 'bg-green text-ink-dark'
          : 'bg-surface-2 text-ink/80 hover:text-green-bright'}"
        onclick={() => (tab = item)}
      >
        {item}
      </button>
    {/each}
  </div>
{/if}

<div class="mt-8 grid gap-10 lg:grid-cols-3">
  <div class="lg:col-span-2">
    {#if tab === 'Overview'}
      <p class="text-[16.5px] leading-relaxed text-ink/80">{project.overview}</p>
    {:else if tab === 'Features'}
      <ul class="grid gap-3">
        {#each project.features as feature}
          <li class="relative pl-[18px] text-ink/80 before:absolute before:left-0 before:font-bold before:text-green before:content-['›']">{feature}</li>
        {/each}
      </ul>
    {:else if tab === 'Tech Stack'}
      <ul class="flex flex-wrap gap-2">
        {#each project.stack as tech}
          <li class="rounded-full border border-border-soft bg-surface-2 px-4 py-2 text-sm font-medium">{tech}</li>
        {/each}
      </ul>
    {:else if tab === 'Architecture'}
      <ol class="grid gap-3">
        {#each project.architecture as node}
          <li class="rounded-xl border border-border bg-surface-2 p-4">
            <p class="font-bold text-green">{node.label}</p>
            <p class="mt-1 text-sm text-ink/80">{node.detail}</p>
          </li>
        {/each}
      </ol>
    {:else if tab === 'Challenges'}
      <ul class="grid gap-3">
        {#each project.challenges as item}
          <li class="rounded-xl border border-border bg-surface-2 p-4 text-ink/80">{item}</li>
        {/each}
      </ul>
    {:else}
      <ul class="grid gap-3">
        {#each project.results as item}
          <li class="flex gap-3 text-ink/80">
            <span class="font-bold text-green">✓</span>
            <span>{item}</span>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  {#if project.architecture.length}
    <aside>
      <div class="rounded-[16px] border border-border bg-surface p-5">
        <h2 class="text-lg font-bold">Architecture flow</h2>
        <ol class="mt-5">
          {#each project.architecture as node, index}
            <li class="relative pb-6 pl-6 last:pb-0">
              {#if index < project.architecture.length - 1}
                <span class="absolute top-3 left-[7px] h-[calc(100%-0.75rem)] w-px bg-green-dim" aria-hidden="true"></span>
              {/if}
              <span class="absolute top-1.5 left-0 h-3.5 w-3.5 rounded-full border-2 border-surface bg-green" aria-hidden="true"></span>
              <p class="text-sm font-bold text-green">{node.label}</p>
              <p class="mt-1 text-sm text-ink/80">{node.detail}</p>
            </li>
          {/each}
        </ol>
      </div>
    </aside>
  {/if}
</div>
