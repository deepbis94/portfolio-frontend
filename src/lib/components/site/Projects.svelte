<script lang="ts">
  import SectionHead from '$lib/components/ui/SectionHead.svelte';
  import { reveal } from '$lib/actions/reveal';
  import type { Project } from '$lib/data/content';

  let {
    projects,
    filters
  }: { projects: Project[]; filters: { id: string; label: string }[] } = $props();

  let active = $state('all');
  let visible = $derived(
    projects.filter((p) => active === 'all' || p.filters.includes(active))
  );

  function repoUrl(project: Project) {
    if (project.repoUrl) return project.repoUrl;
    return /^https?:\/\//i.test(project.href) ? project.href : '';
  }

  function detailHref(project: Project) {
    return `/projects/${project.id}`;
  }
</script>

<section class="border-t border-border-soft py-[72px]" id="projects">
  <SectionHead
    center
    eyebrow="Portfolio"
    title="Selected projects & live work"
    desc="Systems I've designed and built — filter by stack."
  />
  <div class="no-print mb-10 flex flex-wrap justify-center gap-2.5">
    {#each filters as filter}
      <button
        type="button"
        class="rounded-full border px-[18px] py-2 font-mono text-xs transition {active === filter.id
          ? 'border-green bg-green text-ink-dark'
          : 'border-border bg-surface text-ink/80 hover:border-green hover:text-green-bright'}"
        aria-pressed={active === filter.id}
        onclick={() => (active = filter.id)}
      >
        {filter.label}
      </button>
    {/each}
  </div>
  <div class="grid grid-cols-1 gap-[18px] lg:grid-cols-3">
    {#each visible as project, i (project.id)}
      <article
        use:reveal={i}
        class="group relative flex flex-col gap-3.5 overflow-hidden rounded-[16px] border border-border bg-surface px-[30px] pt-[30px] pb-[26px] transition duration-150 hover:-translate-y-1 hover:border-green-deep"
      >
        <a class="proj-media relative mb-1 block overflow-hidden rounded-xl border border-border-soft bg-[#141016]" href={detailHref(project)}>
          <img
            src={project.media}
            alt="{project.title} mockup"
            class="block h-auto w-full transition duration-700 group-hover:scale-[1.07]"
          />
        </a>
        <span class="font-mono text-[11px] tracking-[1px] text-steel uppercase">{project.category}</span>
        <h3 class="text-2xl font-extrabold tracking-[-0.4px]">
          <a class="hover:text-green" href={detailHref(project)}>{project.title}</a>
        </h3>
        <p class="flex-1 text-[14.5px] text-ink/80">{project.summary}</p>
        <div class="flex flex-wrap gap-1.5">
          {#each project.tags as tag}
            <span class="rounded-full border border-border-soft bg-surface-2 px-2.5 py-1 font-mono text-[10.5px] text-ink/80"
              >{tag}</span
            >
          {/each}
        </div>
        <div class="flex flex-wrap gap-1.5">
          {#each project.facts as fact}
            <span class="rounded-full bg-green-dim px-2.5 py-1 font-mono text-[10.5px] font-medium text-green-bright"
              >{fact}</span
            >
          {/each}
        </div>
        <div class="mt-0.5 flex flex-wrap gap-2">
          <a
            class="project-go inline-flex w-fit items-center gap-2 rounded-full border border-border px-[22px] py-[11px] text-[13.5px] font-bold text-green transition hover:border-green hover:bg-green hover:text-ink-dark hover:-translate-y-0.5"
            href={detailHref(project)}
          >
            View case study
          </a>
          {#if repoUrl(project)}
            <a
              class="inline-flex w-fit items-center rounded-full px-3 py-[11px] text-[13px] font-semibold text-ink/70 hover:text-green"
              href={repoUrl(project)}
              target="_blank"
              rel="noreferrer"
            >
              Repository
            </a>
          {/if}
        </div>
      </article>
    {/each}
  </div>
</section>
