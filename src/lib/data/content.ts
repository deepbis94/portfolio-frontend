import {
  hireMailto,
  fullStackAvailability,
  photoChipLabel,
  yearsChipLabel
} from '$lib/site';
import {
  CANONICAL_TITLE,
  defaultAvailability,
  defaultProcess,
  defaultStats,
  factsFor,
  legacyPills,
  normalizeWhen,
  unifyTitleCopy,
  withSkillGroup,
  type ProcessStep,
  type SkillGroup
} from './proof';

export type NavLink = { href: string; label: string };
export type Pill = { label: string; accent: string; wide?: boolean };
export type Skill = { title: string; body: string; icon: string; group?: SkillGroup };
export type { ProcessStep, SkillGroup };
export type Project = {
  id: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  facts: string[];
  href: string;
  repoUrl: string;
  liveUrl: string;
  media: string;
  gallery: string[];
  filters: string[];
};
export type ProjectMetric = { label: string; value: string };
export type ProjectArchitecture = { label: string; detail: string };
export type ProjectDetail = {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  overview: string;
  category: string;
  stack: string[];
  features: string[];
  architecture: ProjectArchitecture[];
  challenges: string[];
  metrics: ProjectMetric[];
  results: string[];
  url: string;
  liveUrl?: string;
  image: string;
  gallery: string[];
};
export type Experience = {
  title: string;
  when: string;
  org: string;
  bullets: string[];
  current?: boolean;
};
export type Education = { glyph: string; title: string; detail: string };
export type Service = { title: string; body: string; icon: string };
export type WhyItem = { n: string; title: string; body: string };
export type Channel = { label: string; value: string; href: string };

export type Portfolio = {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  phoneHref: string;
  linkedin: string;
  github: string;
  photo: string;
  photoAlt: string;
  photoChipOpen: string;
  photoChipYears: string;
  metaTitle: string;
  metaDescription: string;
  footerLeft: string;
  footerRight: string;
  headline: string;
  headlineAccent: string;
  headlineSuffix: string;
  sub: string;
  typePhrases: string[];
  chipSkills: string[];
  nav: NavLink[];
  pills: Pill[];
  stats: Pill[];
  aboutTitle: string;
  aboutLead: string;
  aboutPoints: string[];
  availabilityLine: string;
  contactHref: string;
  skills: Skill[];
  process: ProcessStep[];
  projectFilters: { id: string; label: string }[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: string[];
  languages: string;
  services: Service[];
  why: WhyItem[];
  channels: Channel[];
  resumePdf: string;
};

export const portfolio: Portfolio = {
  name: 'Deep Biswas',
  role: CANONICAL_TITLE,
  location: 'Kolkata, India',
  email: 'biswasd94@gmail.com',
  phone: '+91 84201 05680',
  phoneHref: 'tel:+918420105680',
  linkedin: 'https://linkedin.com/in/deep-biswas-enthusiast',
  github: 'https://github.com/deepbiswaslabs',
  photo: '/hero.jpg',
  photoAlt: `Deep Biswas — ${CANONICAL_TITLE}`,
  photoChipOpen: 'Full-stack · AI',
  photoChipYears: '6+ yrs full-stack',
  metaTitle: `Deep Biswas — ${CANONICAL_TITLE}`,
  metaDescription:
    `Deep Biswas — ${CANONICAL_TITLE} in Kolkata. 6+ years building scalable APIs, eCommerce backends and AI-powered platforms (RAG, agents) with Laravel, Node.js and AWS/GCP.`,
  footerLeft: `© {year} Deep Biswas · ${CANONICAL_TITLE}`,
  footerRight: 'Reference-based design · emerald green',
  headline: 'Building modern,',
  headlineAccent: 'scalable web systems',
  headlineSuffix: 'that hold under real traffic.',
  sub: `${CANONICAL_TITLE} with 6+ years building SaaS, CRM, checkout, eCommerce, and AI-powered platforms using Laravel, Node.js, and cloud-native infrastructure.`,
  typePhrases: [
    'PHP 8+ · Laravel',
    'Symfony · Node.js',
    'MySQL · Redis · RabbitMQ',
    'AWS · GCP · Docker · CI/CD'
  ],
  chipSkills: ['Laravel', 'Symfony', 'Node.js', 'MySQL', 'Redis', 'RabbitMQ', 'AWS', 'GCP', 'Docker'],
  nav: [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#services', label: 'Services' }
  ],
  pills: defaultStats,
  stats: defaultStats,
  aboutTitle: 'A full-stack engineer dedicated to systems that work for your business.',
  aboutLead:
    `I'm Deep Biswas — a ${CANONICAL_TITLE} with 6+ years building scalable systems in PHP, Laravel, Symfony and Node.js.`,
  aboutPoints: [
    'Scalable REST APIs — checkout, orders, CRM, inventory',
    'Payments — Sticky.io, Konnektive, CheckoutChamp',
    'Database & cloud — MySQL, Redis, Docker, AWS & GCP'
  ],
  availabilityLine: defaultAvailability,
  contactHref: hireMailto('biswasd94@gmail.com'),
  skills: [
    {
      title: 'PHP 8+ / Laravel',
      body: 'Core stack — clean architecture, SOLID, queue workers, service layers.',
      icon: 'code',
      group: 'core'
    },
    {
      title: 'REST APIs',
      body: 'Clear contracts, versioning, and integrations your team can keep shipping against.',
      icon: 'api',
      group: 'core'
    },
    {
      title: 'MySQL',
      body: 'Schema design, indexing, transactions, and query tuning for real traffic.',
      icon: 'db',
      group: 'core'
    },
    {
      title: 'Redis',
      body: 'Caching, sessions, and queues where latency actually matters.',
      icon: 'gauge',
      group: 'core'
    },
    {
      title: 'Docker & CI/CD',
      body: 'Containerized environments and GitHub Actions pipelines.',
      icon: 'box',
      group: 'core'
    },
    {
      title: 'Node.js',
      body: 'JavaScript services, APIs and realtime workflows.',
      icon: 'share',
      group: 'strong'
    },
    {
      title: 'Symfony',
      body: 'Enterprise apps & legacy-to-modern PHP 8.3 migrations.',
      icon: 'grid',
      group: 'strong'
    },
    {
      title: 'PostgreSQL / pgvector',
      body: 'Relational data plus embeddings for search and RAG workloads.',
      icon: 'db',
      group: 'strong'
    },
    {
      title: 'RabbitMQ',
      body: 'Message queues and asynchronous job processing.',
      icon: 'queue',
      group: 'strong'
    },
    {
      title: 'AWS',
      body: 'EC2, S3, RDS, Lambda, CloudWatch — production deploys that stay boring.',
      icon: 'cloud',
      group: 'strong'
    },
    {
      title: 'Vue.js',
      body: 'SPAs that pair cleanly with my APIs — TypeScript, Pinia, Vite.',
      icon: 'window',
      group: 'strong'
    },
    {
      title: 'React / Next.js',
      body: 'Component UIs and App Router frontends when the product needs them.',
      icon: 'window',
      group: 'strong'
    },
    {
      title: 'TypeScript',
      body: 'Typed frontends and Node services so contracts stay honest.',
      icon: 'code',
      group: 'strong'
    },
    {
      title: 'GCP',
      body: 'Cloud Run and Compute Engine alongside AWS when the workload lives there.',
      icon: 'cloud',
      group: 'strong'
    }
  ],
  process: defaultProcess,
  projectFilters: [
    { id: 'all', label: 'All' },
    { id: 'laravel', label: 'Laravel' },
    { id: 'vue', label: 'Vue.js' },
    { id: 'mysql', label: 'MySQL' },
    { id: 'docker', label: 'Docker' }
  ],
  projects: [
    {
      id: 'mstore-api',
      title: 'MSTORE API',
      category: 'eCommerce · Backend API',
      summary:
        'RESTful backend for retail operations — customer management, invoicing, inventory, billing and payments, with CSV import/export and PDF invoice generation.',
      tags: ['Laravel 12', 'PHP 8.2+', 'MySQL', 'Docker', 'TCPDF', 'Pest'],
      facts: ['11+ modules', 'CSV/PDF export', 'Dual-session billing'],
      href: 'https://github.com/deepbiswaslabs/mstore-api',
      repoUrl: 'https://github.com/deepbiswaslabs/mstore-api',
      liveUrl: '',
      media: '/projects/mstore-api.svg',
      gallery: [],
      filters: ['laravel', 'mysql', 'docker']
    },
    {
      id: 'mstore',
      title: 'MSTORE — Sales & Billing',
      category: 'eCommerce · Frontend',
      summary:
        'Retail frontend for sales entry, billing, payments, reports and filters, wired to REST API workflows for the MSTORE platform.',
      tags: ['Vue.js', 'TypeScript', 'Pinia', 'Vite'],
      facts: ['5 sales workflows', 'TypeScript SPA'],
      href: 'https://github.com/deepbiswaslabs/mstore',
      repoUrl: 'https://github.com/deepbiswaslabs/mstore',
      liveUrl: '',
      media: '/projects/mstore.svg',
      gallery: [],
      filters: ['vue']
    },
    {
      id: 'ainvent',
      title: 'AINVENT',
      category: 'Inventory · Web App',
      summary:
        'Inventory & distributor management — products, warehouses, invoicing, shipments, returns, payments, profit analysis and reporting.',
      tags: ['Laravel 11', 'PHP 8.2+', 'MySQL', 'Blade', 'Tailwind', 'Pest'],
      facts: ['8 modules', 'profit analytics'],
      href: 'https://github.com/deepbiswaslabs/ainvent',
      repoUrl: 'https://github.com/deepbiswaslabs/ainvent',
      liveUrl: '',
      media: '/projects/ainvent.svg',
      gallery: [],
      filters: ['laravel', 'mysql']
    },
    {
      id: 'checkout-crm',
      title: 'Checkout & CRM Systems',
      category: 'eCommerce · SaaS',
      summary:
        'High-volume production APIs — Sticky.io, Konnektive, CheckoutChamp integrations across Shopify, WordPress and BigCommerce, on AWS & GCP.',
      tags: ['Laravel', 'Symfony', 'Node.js', 'Redis', 'RabbitMQ'],
      facts: ['3 payment platforms', '3 commerce ecosystems'],
      href: 'https://github.com/deepbiswaslabs',
      repoUrl: 'https://github.com/deepbiswaslabs',
      liveUrl: '',
      media: '/projects/checkout-crm.svg',
      gallery: [],
      filters: ['laravel', 'mysql', 'docker']
    }
  ],
  experience: [
    {
      title: 'Senior Engineer, Web',
      when: 'June 2021 – Present',
      org: 'Codeclouds IT Solutions Pvt. Ltd. · Kolkata',
      bullets: [
        'Owned full-stack delivery for SaaS, CRM and checkout products across eCommerce clients.',
        'Integrated Sticky.io, Konnektive & CheckoutChamp payment platforms for high-volume stores.',
        'Migrated legacy Symfony apps to PHP 8.3+; optimized queries and caching for performance.',
        'Managed AWS/GCP deployments, Docker environments and CI/CD — faster, reliable releases.',
        'Led code reviews and mentored developers on clean architecture and testing practices.'
      ],
      current: true
    },
    {
      title: 'Web Developer',
      when: 'Jan 2021 — Sep 2021',
      org: 'S M Solutions',
      bullets: ['Developed Laravel REST APIs and third-party integrations for business applications.']
    },
    {
      title: 'Web Developer',
      when: 'Jan 2020 — Nov 2020',
      org: 'Sleek Infosolutions Pvt. Ltd.',
      bullets: ['Built and maintained CodeIgniter applications and Laravel REST APIs for client projects.']
    },
    {
      title: 'Web Developer',
      when: 'Jan 2017 — Apr 2017',
      org: 'Vrisini Infotech LLP',
      bullets: ['Developed TYPO3 CMS applications, integrated frontend designs and reusable templates.']
    }
  ],
  education: [
    {
      glyph: 'B.Sc',
      title: 'B.Sc. Botany (Hons)',
      detail: 'Dum Dum Motijheel Science College · 2012–2016'
    },
    {
      glyph: 'APT',
      title: 'Computer Application Certifications',
      detail: 'APTECH Konnagar · 2017–2020'
    }
  ],
  certifications: [
    'Smart Professional Java',
    'Smart Professional Python',
    'Python Pro Bootcamp',
    'Node.js, Express & MongoDB Bootcamp',
    'Ultimate AWS Certified Developer Associate 2026 · DVA-C02'
  ],
  languages: 'English · Hindi · Bengali',
  services: [
    {
      title: 'API Development',
      body: 'RESTful APIs designed for clarity, versioned safely, and documented for your team.',
      icon: 'api'
    },
    {
      title: 'eCommerce Backends',
      body: 'Checkout, orders, subscriptions — Shopify, BigCommerce and WordPress ecosystems.',
      icon: 'cart'
    },
    {
      title: 'Payment Integrations',
      body: 'Sticky.io, Konnektive, CheckoutChamp — reliable, high-volume payment pipelines.',
      icon: 'card'
    },
    {
      title: 'Database Optimization',
      body: 'Query tuning, indexing, caching with MySQL & Redis — measurable performance gains.',
      icon: 'gauge'
    },
    {
      title: 'Cloud & DevOps',
      body: 'Deployments on AWS & GCP, Docker environments, CI/CD automation.',
      icon: 'upload'
    },
    {
      title: 'Legacy Modernization',
      body: 'Migrating aging PHP codebases to modern, maintainable PHP 8+ architecture.',
      icon: 'refresh'
    }
  ],
  why: [
    {
      n: '01',
      title: 'Clean, Maintainable Code',
      body: 'SOLID principles, repository pattern and automated tests — systems your team can extend for years.'
    },
    {
      n: '02',
      title: 'Performance Focused',
      body: 'Query optimization, indexing, Redis caching and queue workers — speed built into the architecture.'
    },
    {
      n: '03',
      title: 'Production Ready',
      body: 'Docker, CI/CD and cloud deployments on AWS & GCP — releases that go out calmly, not heroically.'
    },
    {
      n: '04',
      title: 'End-to-End Ownership',
      body: 'From API design to production support — one engineer accountable for the whole system.'
    },
    {
      n: '05',
      title: 'Mentor Mindset',
      body: "Code reviews, standards and mentoring — I raise the whole team's output, not just my own."
    },
    {
      n: '06',
      title: 'Clear Communication',
      body: 'Honest timelines, plain-language updates and documentation that actually gets read.'
    }
  ],
  channels: [
    { label: 'Email', value: 'biswasd94@gmail.com', href: 'mailto:biswasd94@gmail.com' },
    {
      label: 'LinkedIn',
      value: '/deep-biswas-enthusiast',
      href: 'https://linkedin.com/in/deep-biswas-enthusiast'
    },
    { label: 'GitHub', value: 'github.com/deepbiswaslabs', href: 'https://github.com/deepbiswaslabs' },
    { label: 'Phone', value: '+91 84201 05680', href: 'tel:+918420105680' }
  ],
  resumePdf: ''
};

export function withDefaults(input: Partial<Portfolio> & Record<string, unknown> = {}): Portfolio {
  const { source: _s, error: _e, ...rest } = input;
  const incomingPills = Array.isArray(rest.pills)
    ? (rest.pills as Portfolio['pills']).map((p) => ({ ...p, accent: p.accent ?? '', label: p.label ?? '' }))
    : [];
  const incomingStats = Array.isArray(rest.stats)
    ? (rest.stats as Portfolio['stats']).map((p) => ({ ...p, accent: p.accent ?? '', label: p.label ?? '' }))
    : [];
  const stats =
    incomingStats.length > 0 ? incomingStats : incomingPills.length > 0 && !legacyPills(incomingPills) ? incomingPills : defaultStats;
  const incomingSkills = Array.isArray(rest.skills) ? (rest.skills as Portfolio['skills']) : [];
  const legacySkillSet = incomingSkills.some((skill) =>
    /mysql & redis|vue\.js & react|cloud — aws/i.test(skill.title)
  );
  const skills = (incomingSkills.length > 0 && !legacySkillSet ? incomingSkills.map(withSkillGroup) : portfolio.skills).map(
    (skill) => ({ ...skill, body: unifyTitleCopy(skill.body) })
  );
  const experience = (
    Array.isArray(rest.experience) ? (rest.experience as Portfolio['experience']) : portfolio.experience
  ).map((job) => {
    const normalized = normalizeWhen(job.when ?? '', Boolean(job.current));
    return {
      ...job,
      bullets: (job.bullets ?? []).map((bullet) =>
        bullet.replace(/\bOwned backend delivery\b/g, 'Owned full-stack delivery')
      ),
      when: normalized.when,
      current: normalized.current
    };
  });
  const projects = (
    Array.isArray(rest.projects) ? (rest.projects as Portfolio['projects']) : portfolio.projects
  ).map((project) => ({
    ...project,
    tags: project.tags ?? [],
    facts: factsFor(project.id, project.facts ?? []),
    filters: project.filters ?? [],
    repoUrl: project.repoUrl ?? '',
    liveUrl: project.liveUrl ?? '',
    gallery: Array.isArray(project.gallery) ? project.gallery : []
  }));
  const featured = String(projects.length);
  const resolvedStats = stats.map((pill) =>
    /featured projects/i.test(pill.label) ? { ...pill, accent: featured } : pill
  );

  return {
    ...portfolio,
    ...(rest as Partial<Portfolio>),
    role: unifyTitleCopy((rest.role as string) || portfolio.role),
    photo: (rest.photo as string) || portfolio.photo,
    photoAlt: unifyTitleCopy((rest.photoAlt as string) || portfolio.photoAlt),
    metaTitle: unifyTitleCopy((rest.metaTitle as string) || portfolio.metaTitle),
    metaDescription: (() => {
      const incoming = unifyTitleCopy((rest.metaDescription as string) || '');
      if (incoming.trim() === '' || /cloud deployments with PHP, Laravel, Symfony and Node\.js/i.test(incoming)) {
        return portfolio.metaDescription;
      }
      return incoming;
    })(),
    footerLeft: unifyTitleCopy((rest.footerLeft as string) || portfolio.footerLeft),
    sub: unifyTitleCopy((rest.sub as string) || portfolio.sub),
    aboutTitle: unifyTitleCopy((rest.aboutTitle as string) || portfolio.aboutTitle),
    aboutLead: unifyTitleCopy((rest.aboutLead as string) || portfolio.aboutLead),
    headline: (rest.headline as string) || portfolio.headline,
    headlineAccent: (() => {
      const headline = String((rest.headline as string) || portfolio.headline);
      const complete = headline.length > 40 && !/[,:—–-]\s*$/.test(headline);
      if (complete) return '';
      return unifyTitleCopy((rest.headlineAccent as string) || portfolio.headlineAccent);
    })(),
    headlineSuffix: (() => {
      const headline = String((rest.headline as string) || portfolio.headline);
      const complete = headline.length > 40 && !/[,:—–-]\s*$/.test(headline);
      if (complete) return '';
      return (rest.headlineSuffix as string) || portfolio.headlineSuffix;
    })(),
    photoChipOpen: photoChipLabel((rest.photoChipOpen as string) || portfolio.photoChipOpen),
    photoChipYears: yearsChipLabel((rest.photoChipYears as string) || portfolio.photoChipYears),
    availabilityLine: fullStackAvailability((rest.availabilityLine as string) || defaultAvailability),
    contactHref: hireMailto((rest.email as string) || portfolio.email),
    nav: Array.isArray(rest.nav) ? (rest.nav as Portfolio['nav']) : portfolio.nav,
    pills: resolvedStats,
    stats: resolvedStats,
    aboutPoints: Array.isArray(rest.aboutPoints) ? (rest.aboutPoints as string[]) : portfolio.aboutPoints,
    skills,
    process: Array.isArray(rest.process) && (rest.process as ProcessStep[]).length > 0
      ? (rest.process as ProcessStep[])
      : defaultProcess,
    projectFilters: Array.isArray(rest.projectFilters)
      ? (rest.projectFilters as Portfolio['projectFilters'])
      : portfolio.projectFilters,
    projects,
    experience,
    education: Array.isArray(rest.education) ? (rest.education as Portfolio['education']) : portfolio.education,
    certifications: Array.isArray(rest.certifications) ? (rest.certifications as string[]) : portfolio.certifications,
    services: Array.isArray(rest.services) ? (rest.services as Portfolio['services']) : portfolio.services,
    why: (Array.isArray(rest.why) ? (rest.why as Portfolio['why']) : portfolio.why).map((item) => ({
      ...item,
      body: item.body.replace(/\bthe whole backend\b/g, 'the whole system').replace(/\bwhole backend\b/g, 'whole system')
    })),
    channels: (Array.isArray(rest.channels) ? (rest.channels as Portfolio['channels']) : portfolio.channels).map(
      (channel) =>
        /^mailto:/i.test(channel.href) || channel.label.toLowerCase() === 'email'
          ? { ...channel, href: hireMailto(channel.value.includes('@') ? channel.value : (rest.email as string) || portfolio.email) }
          : channel
    ),
    resumePdf: typeof rest.resumePdf === 'string' ? rest.resumePdf : portfolio.resumePdf,
    typePhrases: Array.isArray(rest.typePhrases) ? (rest.typePhrases as string[]) : portfolio.typePhrases,
    chipSkills: Array.isArray(rest.chipSkills) ? (rest.chipSkills as string[]) : portfolio.chipSkills
  };
}

export const iconNames = [
  'code',
  'grid',
  'share',
  'db',
  'queue',
  'cloud',
  'box',
  'window',
  'api',
  'cart',
  'card',
  'gauge',
  'upload',
  'refresh'
] as const;

