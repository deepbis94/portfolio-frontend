<script lang="ts">
  import SectionHead from '$lib/components/ui/SectionHead.svelte';
  import { reveal } from '$lib/actions/reveal';

  let { lead, points }: { lead: string; points: string[] } = $props();
</script>

<section class="border-t border-border-soft py-12" id="about">
  <SectionHead eyebrow="Who I am" title="A backend engineer dedicated to systems that work for your business." />
  <div class="grid items-center gap-9 md:grid-cols-[1.2fr_1fr]">
    <p class="text-[17px] font-medium tracking-[-0.2px]">{lead}</p>
    <ul class="grid gap-2">
      {#each points as point, i}
        <li
          use:reveal={i}
          class="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 text-[13.5px] transition hover:border-green-deep"
        >
          <span
            class="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[7px] bg-green-dim text-xs font-extrabold text-green"
            >✓</span
          >
          {point}
        </li>
      {/each}
    </ul>
  </div>
</section>
