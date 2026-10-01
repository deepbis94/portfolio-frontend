<script lang="ts">
  import SitePage from '$lib/components/site/SitePage.svelte';
  import { absoluteAssetUrl, publicSiteUrl } from '$lib/site';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let live = $derived(data.portfolio);
  let origin = $derived(publicSiteUrl());
  let pageUrl = $derived(`${origin}/`);
  let ogImage = $derived(absoluteAssetUrl(live.photo));
</script>

<svelte:head>
  <title>{live.metaTitle}</title>
  <meta name="description" content={live.metaDescription} />
  <link rel="canonical" href={pageUrl} />
  <meta property="og:title" content={live.metaTitle} />
  <meta property="og:description" content={live.metaDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={pageUrl} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:alt" content={live.photoAlt} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={live.metaTitle} />
  <meta name="twitter:description" content={live.metaDescription} />
  <meta name="twitter:image" content={ogImage} />
  <script type="application/ld+json">
    {@html JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: live.name,
      jobTitle: live.role,
      url: pageUrl,
      image: ogImage,
      email: `mailto:${live.email}`,
      telephone: live.phoneHref.replace('tel:', ''),
      address: { '@type': 'PostalAddress', addressLocality: live.location, addressCountry: 'IN' },
      sameAs: [live.github, live.linkedin]
    })}
  </script>
</svelte:head>

<SitePage data={live} />
