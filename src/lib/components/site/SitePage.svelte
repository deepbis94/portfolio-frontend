<script lang="ts">
  import About from '$lib/components/site/About.svelte';
  import BackToTop from '$lib/components/site/BackToTop.svelte';
  import Contact from '$lib/components/site/Contact.svelte';
  import Education from '$lib/components/site/Education.svelte';
  import Experience from '$lib/components/site/Experience.svelte';
  import Footer from '$lib/components/site/Footer.svelte';
  import Hero from '$lib/components/site/Hero.svelte';
  import Nav from '$lib/components/site/Nav.svelte';
  import ProgressBar from '$lib/components/site/ProgressBar.svelte';
  import Projects from '$lib/components/site/Projects.svelte';
  import Services from '$lib/components/site/Services.svelte';
  import Skills from '$lib/components/site/Skills.svelte';
  import WhyMe from '$lib/components/site/WhyMe.svelte';
  import type { Portfolio } from '$lib/data/content';

  let { data }: { data: Portfolio } = $props();
  let reduce = $state(false);

  $effect(() => {
    reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
</script>

<ProgressBar />
<a class="skip-link" href="#main">Skip to content</a>
<Nav name={data.name} links={data.nav} />

<main class="wrap" id="main">
  <Hero {data} {reduce} />
  <About lead={data.aboutLead} points={data.aboutPoints} />
  <Skills skills={data.skills} />
  <Projects projects={data.projects} filters={data.projectFilters} />
  <Experience items={data.experience} />
  <Education items={data.education} certifications={data.certifications} languages={data.languages} />
  <Services items={data.services} />
  <WhyMe items={data.why} />
  <Contact email={data.email} channels={data.channels} resumePdf={data.resumePdf} name={data.name} />
  <Footer left={data.footerLeft} right={data.footerRight} />
</main>

<BackToTop />
