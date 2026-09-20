export function reveal(node: HTMLElement, index = 0) {
  node.style.setProperty('--i', String(index));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    node.classList.add('in');
    return;
  }
  node.classList.add('reveal');
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 }
  );
  io.observe(node);
  return {
    destroy() {
      io.disconnect();
    }
  };
}
