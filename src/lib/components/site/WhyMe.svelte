<script lang="ts">
  import SectionHead from '$lib/components/ui/SectionHead.svelte';
  import { reveal } from '$lib/actions/reveal';
  import type { WhyItem } from '$lib/data/content';

  let { items }: { items: WhyItem[] } = $props();
</script>

<section class="border-t border-border-soft py-[72px]" id="why">
  <SectionHead center eyebrow="Why Me" title="Why work with me" desc="The habits behind dependable delivery." />
  <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
    {#each items as item, i}
      <article
        use:reveal={i}
        class="rounded-[16px] border border-border bg-surface px-6 py-[26px] transition hover:-translate-y-[3px] hover:border-green-deep"
      >
        <span
          class="mb-4 flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-green-dim font-mono text-xs text-green-bright"
          >{item.n}</span
        >
        <h3 class="mb-1.5 text-[16.5px] font-bold">{item.title}</h3>
        <p class="text-[13px] text-ink/80">{item.body}</p>
      </article>
    {/each}
  </div>
</section>
