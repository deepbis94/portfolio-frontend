<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import Button from '$lib/components/ui/Button.svelte';
  import type { Channel } from '$lib/data/content';

  let { email, channels }: { email: string; channels: Channel[] } = $props();
  let copyLabel = $state('Copy email address');

  async function copyMail() {
    try {
      await navigator.clipboard.writeText(email);
      copyLabel = `Copied — ${email}`;
    } catch {
      copyLabel = email;
    }
    setTimeout(() => (copyLabel = 'Copy email address'), 1800);
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
      <Button ghost onclick={copyMail} type="button">{copyLabel}</Button>
      <Button ghost onclick={() => window.print()} type="button">Download CV (PDF)</Button>
    </div>
  </div>
</section>
