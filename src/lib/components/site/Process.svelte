<script lang="ts">
  import SectionHead from '$lib/components/ui/SectionHead.svelte';
  import { reveal } from '$lib/actions/reveal';
  import type { ProcessStep } from '$lib/data/content';

  let { steps }: { steps: ProcessStep[] } = $props();
</script>

<section class="border-t border-border-soft py-[72px]" id="process">
  <SectionHead
    center
    eyebrow="How I work"
    title="Discover → Design → Build → Harden"
    desc="A short delivery loop. One screen, no theatre."
  />
  <ol class="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
    {#each steps as step, i}
      <li
        use:reveal={i}
        class="rounded-[16px] border border-border bg-surface px-6 py-[26px] transition hover:-translate-y-[3px] hover:border-green-deep"
      >
        <span
          class="mb-4 flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-green-dim font-mono text-xs text-green-bright"
          >{step.n}</span
        >
        <h3 class="mb-1.5 text-[16.5px] font-bold">{step.title}</h3>
        <p class="text-[13px] text-ink/80">{step.body}</p>
      </li>
    {/each}
  </ol>
</section>
