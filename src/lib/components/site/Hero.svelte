<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import HeroPhoto from '$lib/components/site/HeroPhoto.svelte';
  import Typewriter from '$lib/components/site/Typewriter.svelte';
  import type { Portfolio } from '$lib/data/content';

  let { data, reduce = false }: { data: Portfolio; reduce?: boolean } = $props();
</script>

<header class="hero grid items-center gap-14 py-[72px] max-md:grid-cols-1 max-md:gap-10 md:grid-cols-[1.15fr_0.85fr]" id="top">
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
    <div class="mt-[34px] flex justify-start gap-3.5 max-md:justify-center max-sm:flex-col max-sm:items-center">
      <Button href="#projects" solid>View My Work</Button>
      <Button href="#contact" ghost>Get In Touch</Button>
    </div>
    <div class="mt-12 flex flex-wrap justify-start gap-2.5 max-md:justify-center">
      {#each data.pills as pill}
        <span
          class="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-[18px] py-2.5 text-[13.5px] font-semibold {pill.wide
            ? 'font-medium text-ink/80'
            : ''}"
        >
          {#if pill.accent}<i class="not-italic font-mono text-[11px] text-green">{pill.accent}</i>{/if}
          {pill.label}
        </span>
      {/each}
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
</header>
