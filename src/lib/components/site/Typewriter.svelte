<script lang="ts">
  let { phrases, reduce = false }: { phrases: string[]; reduce?: boolean } = $props();
  let text = $state(reduce ? phrases.join('   ·   ') : '');

  $effect(() => {
    if (reduce) return;
    let pi = 0;
    let ci = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const cur = phrases[pi];
      text = cur.slice(0, ci);
      let delay = deleting ? 34 : 62;
      if (!deleting && ci === cur.length) {
        delay = 1700;
        deleting = true;
      } else if (deleting && ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        delay = 350;
      } else {
        ci += deleting ? -1 : 1;
      }
      timer = setTimeout(tick, delay);
    };
    tick();
    return () => clearTimeout(timer);
  });
</script>

<p class="type-line mt-4 min-h-6 font-mono text-[14.5px] text-green-bright" aria-hidden="true">
  <span>{text}</span><span class="type-caret"></span>
</p>
