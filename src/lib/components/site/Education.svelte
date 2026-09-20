<script lang="ts">
  import SectionHead from '$lib/components/ui/SectionHead.svelte';
  import { reveal } from '$lib/actions/reveal';
  import type { Education } from '$lib/data/content';

  let {
    items,
    certifications,
    languages
  }: { items: Education[]; certifications: string[]; languages: string } = $props();
</script>

<section class="border-t border-border-soft py-[72px]" id="education">
  <SectionHead
    center
    eyebrow="Background"
    title="Education & certifications"
    desc="The formal layer under the engineering."
  />
  <div class="grid grid-cols-1 gap-3.5 md:grid-cols-2">
    {#each items as edu, i}
      <article
        use:reveal={i}
        class="flex items-start gap-[18px] rounded-[16px] border border-border bg-surface px-6 py-[26px] transition hover:-translate-y-[3px] hover:border-green-deep"
      >
        <span
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-green-dim font-mono text-xs font-medium text-green-bright"
          >{edu.glyph}</span
        >
        <div>
          <h3 class="text-[16.5px] font-bold">{edu.title}</h3>
          <p class="mt-[3px] text-[13px] text-ink/80">{edu.detail}</p>
        </div>
      </article>
    {/each}
    <article use:reveal={2} class="rounded-[16px] border border-border bg-surface px-7 py-[26px] md:col-span-2">
      <h4 class="mb-3.5 font-mono text-[11px] font-medium tracking-[2px] text-green uppercase">Certifications</h4>
      <div class="flex flex-wrap gap-2">
        {#each certifications as cert}
          <span class="rounded-full border border-border bg-surface-2 px-4 py-2 text-[13px] font-semibold">
            <i class="mr-1.5 not-italic text-green">✓</i>{cert}
          </span>
        {/each}
      </div>
      <p class="mt-4 border-t border-border-soft pt-3.5 font-mono text-xs text-ink/80">Languages — {languages}</p>
    </article>
  </div>
</section>
