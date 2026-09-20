<script lang="ts">
  import SectionHead from '$lib/components/ui/SectionHead.svelte';
  import { reveal } from '$lib/actions/reveal';
  import type { Experience } from '$lib/data/content';

  let { items }: { items: Experience[] } = $props();
</script>

<section class="border-t border-border-soft py-[72px]" id="experience">
  <SectionHead center eyebrow="Career" title="Work experience" desc="Where I've worked and what I've delivered." />
  <div class="xp-rail relative grid gap-[18px] pl-10">
    {#each items as job, i}
      <article
        use:reveal={i}
        class="xp-card relative rounded-[16px] border bg-surface px-[30px] py-[26px] transition duration-150 hover:translate-x-1 hover:border-green-deep {job.current
          ? 'top border-[rgba(185,243,50,0.35)]'
          : 'border-border'}"
      >
        <h3 class="text-xl font-bold">{job.title}</h3>
        <span
          class="mt-2 mb-1 inline-flex items-center whitespace-nowrap rounded-full bg-green-dim px-3 py-1 font-mono text-xs text-green"
          >{job.when}</span
        >
        <p class="mt-1.5 mb-3.5 text-sm font-bold">{job.org}</p>
        <ul class="grid gap-1.5">
          {#each job.bullets as bullet}
            <li class="relative pl-[18px] text-sm text-ink/80">{bullet}</li>
          {/each}
        </ul>
      </article>
    {/each}
  </div>
</section>
