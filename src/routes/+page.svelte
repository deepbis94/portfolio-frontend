<script lang="ts">
  import SitePage from '$lib/components/site/SitePage.svelte';
  import { getPortfolio } from '$lib/api';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let live = $state(data.portfolio);

  $effect(() => {
    getPortfolio().then((p) => (live = p));
  });
</script>

<svelte:head>
  <title>{live.metaTitle}</title>
  <meta name="description" content={live.metaDescription} />
  <meta property="og:title" content={live.metaTitle} />
  <meta property="og:description" content={live.metaDescription} />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <script type="application/ld+json">
    {@html JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: live.name,
      jobTitle: live.role,
      email: `mailto:${live.email}`,
      telephone: live.phoneHref.replace('tel:', ''),
      address: { '@type': 'PostalAddress', addressLocality: live.location, addressCountry: 'IN' },
      sameAs: [live.github, live.linkedin]
    })}
  </script>
</svelte:head>

<SitePage data={live} />
