<script lang="ts">
  let {
    skills,
    reduce = false,
    photo = '/hero.jpg',
    alt = '',
    openLabel = 'Full-stack · AI',
    yearsLabel = '6+ yrs full-stack',
    location = ''
  }: {
    skills: string[];
    reduce?: boolean;
    photo?: string;
    alt?: string;
    openLabel?: string;
    yearsLabel?: string;
    location?: string;
  } = $props();
  let current = $state('');
  let swapping = $state(false);

  $effect(() => {
    current = reduce ? skills.slice(0, 2).join(' · ') : (skills[0] ?? '');
    if (reduce || skills.length === 0) return;
    let i = 0;
    const id = setInterval(() => {
      swapping = true;
      setTimeout(() => {
        i = (i + 1) % skills.length;
        current = skills[i];
        swapping = false;
      }, 320);
    }, 2400);
    return () => clearInterval(id);
  });
</script>

<figure class="flex items-center justify-center">
  <div class="photo-frame relative mx-auto w-full max-w-[360px] max-md:max-w-[200px]">
    <img
      src={photo}
      alt={alt}
      class="relative z-[1] aspect-square w-full rounded-full border border-border object-cover shadow-[0_0_0_6px_var(--color-green-dim),0_0_0_12px_rgba(185,243,50,0.05),0_24px_64px_rgba(0,0,0,0.55)]"
    />
    <span
      class="photo-chip photo-chip--a absolute top-[8%] left-0 z-[2] inline-flex max-w-[46%] items-center gap-2 overflow-hidden rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[10px] font-bold whitespace-nowrap shadow-[0_10px_28px_rgba(0,0,0,0.45)] lg:left-[-6px] lg:max-w-none lg:px-4 lg:py-2 lg:text-[12.5px]"
    >
      <i class="inline-block h-2 w-2 shrink-0 rounded-full bg-green not-italic"></i>{openLabel}
    </span>
    <span
      class="photo-chip photo-chip--b absolute top-[8%] right-0 z-[2] inline-flex max-w-[46%] items-center gap-2 overflow-hidden rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[10px] font-bold whitespace-nowrap text-green-bright shadow-[0_10px_28px_rgba(0,0,0,0.45)] lg:right-[-6px] lg:max-w-none lg:px-4 lg:py-2 lg:text-[12.5px]"
    >
      {yearsLabel}
    </span>
    <span
      class="photo-chip photo-chip--c absolute bottom-[8%] left-0 z-[2] inline-flex max-w-[46%] items-center gap-2 overflow-hidden rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[10px] font-bold whitespace-nowrap shadow-[0_10px_28px_rgba(0,0,0,0.45)] lg:left-[-6px] lg:max-w-none lg:px-4 lg:py-2 lg:text-[12.5px] {swapping
        ? 'swapping'
        : ''}"
    >
      <i class="inline-block h-2 w-2 shrink-0 rounded-full bg-green not-italic"></i>
      <span class="skill-text">{current}</span>
    </span>
    <span
      class="photo-chip photo-chip--f absolute right-0 bottom-[8%] z-[2] inline-flex max-w-[46%] items-center gap-2 overflow-hidden rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[10px] font-bold whitespace-nowrap shadow-[0_10px_28px_rgba(0,0,0,0.45)] lg:right-[-6px] lg:max-w-none lg:px-4 lg:py-2 lg:text-[12.5px]"
    >
      <i class="inline-block h-2 w-2 shrink-0 rounded-full bg-green not-italic"></i>{location}
    </span>
  </div>
</figure>
