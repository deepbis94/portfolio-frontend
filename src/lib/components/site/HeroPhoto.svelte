<script lang="ts">
  let {
    skills,
    reduce = false,
    photo = '/hero.jpg',
    alt = '',
    openLabel = 'Open to work',
    yearsLabel = '6+ yrs backend',
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
  let current = $state(reduce ? skills.slice(0, 2).join(' · ') : skills[0]);
  let swapping = $state(false);

  $effect(() => {
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
      class="photo-chip photo-chip--a absolute top-[8%] left-[-6px] z-[2] inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2 text-[12.5px] font-bold shadow-[0_10px_28px_rgba(0,0,0,0.45)] max-md:px-2.5 max-md:py-1 max-md:text-[10px]"
    >
      <i class="inline-block h-2 w-2 rounded-full bg-green not-italic"></i>{openLabel}
    </span>
    <span
      class="photo-chip photo-chip--b absolute top-[8%] right-[-6px] z-[2] inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2 text-[12.5px] font-bold text-green-bright shadow-[0_10px_28px_rgba(0,0,0,0.45)] max-md:px-2.5 max-md:py-1 max-md:text-[10px]"
    >
      {yearsLabel}
    </span>
    <span
      class="photo-chip photo-chip--c absolute bottom-[8%] left-[-6px] z-[2] inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2 text-[12.5px] font-bold shadow-[0_10px_28px_rgba(0,0,0,0.45)] max-md:px-2.5 max-md:py-1 max-md:text-[10px] {swapping
        ? 'swapping'
        : ''}"
    >
      <i class="inline-block h-2 w-2 rounded-full bg-green not-italic"></i>
      <span class="skill-text">{current}</span>
    </span>
    <span
      class="photo-chip photo-chip--f absolute right-[-6px] bottom-[8%] z-[2] inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2 text-[12.5px] font-bold shadow-[0_10px_28px_rgba(0,0,0,0.45)] max-md:px-2.5 max-md:py-1 max-md:text-[10px]"
    >
      <i class="inline-block h-2 w-2 rounded-full bg-green not-italic"></i>{location}
    </span>
  </div>
</figure>
