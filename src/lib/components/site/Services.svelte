<script lang="ts">
  import SectionHead from '$lib/components/ui/SectionHead.svelte';
  import Icon from '$lib/components/ui/Icon.svelte';
  import { reveal } from '$lib/actions/reveal';
  import type { Service } from '$lib/data/content';

  let { items }: { items: Service[] } = $props();
</script>

<section class="border-t border-border-soft py-[72px]" id="services">
  <SectionHead
    center
    eyebrow="What I Offer"
    title="Services & solutions"
    desc="Everything you need to launch or grow online."
  />
  <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
    {#each items as item, i}
      <article
        use:reveal={i}
        class="svc-accent relative rounded-[16px] border border-border bg-surface px-6 py-[26px] transition hover:-translate-y-[3px] hover:[&_h3]:text-green-bright hover:[&_p]:text-ink"
      >
        <span
          class="mb-4 flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-green-dim text-green-bright transition group-hover:shadow-[0_0_0_3px_var(--color-green-dim)]"
        >
          <Icon name={item.icon} class="h-[22px] w-[22px]" />
        </span>
        <h3 class="mb-1.5 text-[16.5px] font-bold">{item.title}</h3>
        <p class="text-[13px] text-ink/80">{item.body}</p>
      </article>
    {/each}
  </div>
</section>
