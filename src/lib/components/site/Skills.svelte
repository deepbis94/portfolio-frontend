<script lang="ts">
  import SectionHead from '$lib/components/ui/SectionHead.svelte';
  import Icon from '$lib/components/ui/Icon.svelte';
  import { reveal } from '$lib/actions/reveal';
  import type { Skill } from '$lib/data/content';

  let { skills }: { skills: Skill[] } = $props();
</script>

<section class="border-t border-border-soft py-[72px]" id="skills">
  <SectionHead
    center
    eyebrow="My Toolbox"
    title="Skills & technologies I work with"
    desc="The tools behind the systems I ship."
  />
  <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
    {#each skills as skill, i}
      <article
        use:reveal={i}
        class="rounded-[16px] border border-border bg-surface px-[22px] py-6 transition duration-150 hover:-translate-y-1 hover:border-green-deep"
      >
        <span
          class="mb-4 flex h-11 w-11 items-center justify-center rounded-[13px] bg-green-dim text-green-bright"
        >
          <Icon name={skill.icon} />
        </span>
        <h3 class="mb-1.5 text-[16.5px] font-bold">{skill.title}</h3>
        <p class="text-[13px] text-ink/80">{skill.body}</p>
      </article>
    {/each}
  </div>
</section>
