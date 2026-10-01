<script lang="ts">
  import { onMount } from 'svelte';
  import { reveal } from '$lib/actions/reveal';
  import Button from '$lib/components/ui/Button.svelte';
  import type { Channel } from '$lib/data/content';
  import { isSupabaseConfigured } from '$lib/supabase/client';
  import { fetchResumePdf } from '$lib/supabase/storage';

  let { email, channels, resumePdf = '', name = 'CV' }: { email: string; channels: Channel[]; resumePdf?: string; name?: string } =
    $props();
  let copyLabel = $state('Copy email address');
  let cvHref = $state('');
  let downloading = $state(false);

  $effect(() => {
    cvHref = resumePdf;
  });

  onMount(() => {
    if (!isSupabaseConfigured()) return;
    fetchResumePdf()
      .then((url) => (cvHref = url))
      .catch(() => {});
  });

  async function copyMail() {
    try {
      await navigator.clipboard.writeText(email);
      copyLabel = `Copied — ${email}`;
    } catch {
      copyLabel = email;
    }
    setTimeout(() => (copyLabel = 'Copy email address'), 1800);
  }

  function fileName() {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return `${slug || 'cv'}-cv.pdf`;
  }

  async function downloadCv() {
    if (!cvHref || downloading) return;
    downloading = true;
    try {
      const url = `${cvHref}${cvHref.includes('?') ? '&' : '?'}t=${Date.now()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Download failed');
      const blob = await res.blob();
      const href = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = href;
      a.download = fileName();
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(href);
    } catch {
      window.open(cvHref, '_blank', 'noopener');
    } finally {
      downloading = false;
    }
  }
</script>

<section class="border-t border-border-soft py-[72px]" id="contact">
  <div
    use:reveal={0}
    class="rounded-3xl border border-border px-10 py-[60px] pb-12 text-center"
    style="background: radial-gradient(ellipse 70% 90% at 50% -20%, rgba(185,243,50,0.14) 0%, transparent 60%), var(--color-surface);"
  >
    <p class="mb-2.5 font-mono text-xs tracking-[2px] text-green uppercase">Get In Touch</p>
    <h2 class="text-[clamp(30px,4.6vw,44px)] font-extrabold leading-[1.12] tracking-[-1px]">
      Let's talk about <span class="text-green">your project</span>
    </h2>
    <p class="mt-3.5 mb-9 text-ink/80">Pick whichever channel is easiest for you.</p>
    <div class="grid grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
      {#each channels as channel}
        <a
          class="rounded-[14px] border border-border bg-bg px-[18px] py-5 text-ink transition hover:-translate-y-[3px] hover:border-green-deep hover:text-green-bright"
          href={channel.href}
        >
          <small class="mb-2 block font-mono text-[10px] tracking-[1.5px] text-ink/80 uppercase">{channel.label}</small>
          <b class="text-sm font-semibold break-all">{channel.value}</b>
        </a>
      {/each}
    </div>
    <div class="no-print mt-6 flex flex-wrap justify-center gap-3">
      <Button href={`mailto:${email}?subject=Project%20inquiry`} solid class="min-h-11">Hire me / Start a project</Button>
      <Button ghost onclick={copyMail} type="button">{copyLabel}</Button>
      {#if cvHref}
        <Button ghost onclick={downloadCv} type="button">{downloading ? 'Downloading…' : 'Download CV (PDF)'}</Button>
      {/if}
    </div>
  </div>
</section>
