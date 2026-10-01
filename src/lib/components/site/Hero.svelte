<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import HeroPhoto from '$lib/components/site/HeroPhoto.svelte';
  import Typewriter from '$lib/components/site/Typewriter.svelte';
  import type { Portfolio } from '$lib/data/content';

  let { data, reduce = false }: { data: Portfolio; reduce?: boolean } = $props();
  const hire = $derived(data.contactHref || '#contact');
</script>

<header class="hero py-[72px]" id="top">
  <div class="grid items-center gap-14 max-md:grid-cols-1 max-md:gap-10 md:grid-cols-[1.15fr_0.85fr]">
    <div class="max-md:text-center">
      <span
        class="mb-[26px] inline-flex items-center gap-2 rounded-full border border-green-dim bg-green-dim px-4 py-1.5 font-mono text-xs text-green-bright"
      >
        <i class="inline-block h-2 w-2 rounded-full bg-green not-italic"></i>{data.role} · {data.location}
      </span>
      <h1 class="max-w-[16ch] text-[clamp(34px,5.4vw,58px)] font-extrabold leading-[1.12] tracking-[-1.2px] max-md:mx-auto">
        {data.headline} <span class="text-green">{data.headlineAccent}</span> {data.headlineSuffix}
      </h1>
      <p class="sub mt-5 max-w-[54ch] text-[17px] text-ink/80 max-md:mx-auto">
        {data.sub}
      </p>
      <Typewriter phrases={data.typePhrases} {reduce} />
      <p class="mt-5 max-w-[50ch] text-[14.5px] font-medium text-green-bright max-md:mx-auto">
        {data.availabilityLine}
      </p>
      <div class="mt-[34px] flex justify-start gap-3.5 max-md:justify-center max-sm:flex-col max-sm:items-center">
        <Button href={hire} solid class="min-h-11 w-full min-w-[12rem] text-center sm:w-auto">Hire me / Start a project</Button>
        <Button href="#projects" ghost class="min-h-11 w-full min-w-[12rem] text-center sm:w-auto">View My Work</Button>
      </div>
    </div>
    <HeroPhoto
      photo={data.photo}
      alt={data.photoAlt}
      openLabel={data.photoChipOpen}
      yearsLabel={data.photoChipYears}
      location={data.location}
      skills={data.chipSkills}
      {reduce}
    />
  </div>
  <dl class="mt-12 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5" aria-label="Career stats">
    {#each data.stats as stat}
      <div class="rounded-xl border border-border bg-surface px-[18px] py-4">
        {#if stat.accent}
          <dt class="font-mono text-lg font-bold tracking-tight text-green">{stat.accent}</dt>
        {/if}
        <dd class="text-[13px] font-semibold {stat.accent ? 'mt-0.5 text-ink/80' : 'text-ink'}">{stat.label}</dd>
      </div>
    {/each}
  </dl>
</header>
