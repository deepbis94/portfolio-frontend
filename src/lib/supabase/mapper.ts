import type { Channel, Experience, Portfolio, Project, ProjectDetail } from '$lib/data/content';
import { publicMediaUrl, toStoredPath } from './client';

export const EXTRA_KEYS = [
  'photoAlt',
  'photoChipYears',
  'metaTitle',
  'metaDescription',
  'footerLeft',
  'footerRight',
  'headline',
  'headlineAccent',
  'headlineSuffix',
  'typePhrases',
  'chipSkills',
  'nav',
  'pills',
  'aboutPoints',
  'skills',
  'projectFilters',
  'education',
  'certifications',
  'languages',
  'services',
  'why',
  'channels',
  'projectFilterMap'
] as const;

export type CloudRow = Record<string, unknown>;

function str(value: unknown): string {
  return value == null ? '' : String(value);
}

export function slugify(value: string): string {
  const cleaned = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-');
  return cleaned.replace(/^-+|-+$/g, '') || 'project';
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === 'string' || typeof item === 'number' ? String(item).trim() : ''))
    .filter((item) => item !== '');
}

function labeledList(value: unknown, left: string, right: string): Array<Record<string, string>> {
  if (!Array.isArray(value)) return [];
  const out: Array<Record<string, string>> = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') continue;
    const row = item as Record<string, unknown>;
    const mapped = { [left]: str(row[left]).trim(), [right]: str(row[right]).trim() };
    if (mapped[left] === '' && mapped[right] === '') continue;
    out.push(mapped);
  }
  return out;
}

function urlLabel(url: string): string {
  return url.replace(/^https?:\/\//i, '').replace(/\/$/, '');
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'DB';
  const first = parts[0] ?? '';
  const last = parts[parts.length - 1] ?? first;
  return (first.charAt(0) + last.charAt(0)).toUpperCase();
}

function splitOrg(org: string): [string, string | null] {
  const [company = '', location] = org.split(' · ').map((part) => part.trim());
  return [company, location ? location : null];
}

function channelsFromProfile(
  email: string,
  phone: string,
  phoneHref: string,
  linkedin: string,
  github: string
): Channel[] {
  const channels: Channel[] = [];
  if (email) channels.push({ label: 'Email', value: email, href: `mailto:${email}` });
  if (linkedin) channels.push({ label: 'LinkedIn', value: urlLabel(linkedin), href: linkedin });
  if (github) channels.push({ label: 'GitHub', value: urlLabel(github), href: github });
  if (phone) {
    channels.push({
      label: 'Phone',
      value: phone,
      href: phoneHref || `tel:${phone.replace(/\s+/g, '')}`
    });
  }
  return channels;
}

function mapExperiences(rows: CloudRow[]): Experience[] {
  return rows.map((row, i) => {
    const company = str(row.company);
    const location = str(row.location).trim();
    const period = str(row.period);
    const current = i === 0 || period.includes('Current') || period.includes('Present');
    return {
      title: str(row.title),
      when: current && !period.includes('Current') ? `${period} · Current` : period,
      org: location ? `${company} · ${location}` : company,
      bullets: stringList(row.bullets),
      current
    };
  });
}

function filtersMatch(filters: unknown, projects: Project[]): boolean {
  const ids: Record<string, true> = {};
  for (const project of projects) {
    for (const id of project.filters) ids[id] = true;
  }
  if (!Array.isArray(filters)) return false;
  return filters.some((filter) => {
    if (!filter || typeof filter !== 'object') return false;
    const id = str((filter as CloudRow).id);
    return id !== '' && id !== 'all' && ids[id];
  });
}

export function fromCloud(
  profile: CloudRow,
  experiences: CloudRow[],
  projects: CloudRow[],
  extras: CloudRow
): Record<string, unknown> {
  const name = str(profile.name);
  const role = str(profile.role);
  const headline = str(profile.headline);
  const email = str(profile.email);
  const phone = str(profile.phone);
  const phoneHref = str(profile.phone_href);
  const linkedin = str(profile.linkedin);
  const github = str(profile.github);
  const photo = publicMediaUrl(str(profile.photo));
  const filterMap = extras.projectFilterMap && typeof extras.projectFilterMap === 'object'
    ? (extras.projectFilterMap as Record<string, unknown>)
    : {};

  const mappedProjects: Project[] = [];
  const categories: Record<string, string> = {};

  for (const row of projects) {
    const slug = str(row.slug);
    const category = str(row.category);
    const categoryId = slugify(category);
    if (category && categoryId) categories[categoryId] = category;
    const features = stringList(row.features);
    const metrics = Array.isArray(row.metrics) ? row.metrics : [];
    let facts = features;
    if (facts.length === 0) {
      for (const metric of metrics) {
        if (!metric || typeof metric !== 'object') continue;
        const m = metric as CloudRow;
        facts.push(`${str(m.value)} ${str(m.label)}`.trim());
      }
    }
    const repo = str(row.url);
    const live = str(row.live_url);
    const id = slug || slugify(str(row.name) || 'project');
    const filters = stringList(filterMap[slug] ?? (categoryId ? [categoryId] : []));
    mappedProjects.push({
      id,
      title: str(row.name),
      category,
      summary: str(row.description || row.subtitle),
      tags: stringList(row.stack),
      facts: facts.filter(Boolean),
      href: `/projects/${id}`,
      repoUrl: repo,
      liveUrl: live,
      media: publicMediaUrl(str(row.image)),
      gallery: stringList(row.gallery).map(publicMediaUrl),
      filters
    });
  }

  const payload: Record<string, unknown> = { ...extras };
  payload.name = name;
  payload.role = role;
  payload.location = str(profile.location);
  payload.email = email;
  payload.phone = phone;
  payload.phoneHref = phoneHref || (phone ? `tel:${phone.replace(/\s+/g, '')}` : '');
  payload.linkedin = linkedin;
  payload.github = github;
  payload.photo = photo;
  payload.resumePdf = publicMediaUrl(str(profile.resume_pdf));
  payload.photoAlt = str(extras.photoAlt) || `${name} — ${role}`.trim();
  payload.photoChipOpen = str(profile.availability || extras.photoChipOpen);
  payload.sub = str(profile.tagline);
  payload.aboutLead = str(profile.summary);
  payload.experience = mapExperiences(experiences);
  payload.projects = mappedProjects;

  if (extras.headline === undefined && extras.headlineAccent === undefined) {
    payload.headline = headline;
    payload.headlineAccent = '';
    payload.headlineSuffix = '';
  } else {
    payload.headline = str(extras.headline);
    payload.headlineAccent = str(extras.headlineAccent);
    payload.headlineSuffix = str(extras.headlineSuffix);
  }

  if (!extras.projectFilters || !filtersMatch(extras.projectFilters, mappedProjects)) {
    payload.projectFilters = [
      { id: 'all', label: 'All' },
      ...Object.entries(categories).map(([id, label]) => ({ id, label }))
    ];
  }

  if (!extras.channels) {
    payload.channels = channelsFromProfile(email, phone, phoneHref, linkedin, github);
  }
  if (!extras.metaTitle) payload.metaTitle = `${name} — ${role}`.replace(/^ — | — $/g, '');
  if (!extras.metaDescription) payload.metaDescription = str(profile.tagline || profile.summary);

  delete payload.projectFilterMap;
  payload.source = 'supabase';
  return payload;
}

export function fromProjectRow(row: CloudRow): ProjectDetail {
  const image = publicMediaUrl(str(row.image));
  const gallery = stringList(row.gallery).map(publicMediaUrl).filter(Boolean);
  return {
    slug: str(row.slug),
    name: str(row.name),
    subtitle: str(row.subtitle),
    description: str(row.description),
    overview: str(row.overview || row.description),
    category: str(row.category),
    stack: stringList(row.stack),
    features: stringList(row.features),
    architecture: labeledList(row.architecture, 'label', 'detail') as ProjectDetail['architecture'],
    challenges: stringList(row.challenges),
    metrics: labeledList(row.metrics, 'label', 'value') as ProjectDetail['metrics'],
    results: stringList(row.results),
    url: str(row.url).trim(),
    liveUrl: str(row.live_url).trim(),
    image,
    gallery: gallery.length > 0 ? gallery : image ? [image] : []
  };
}

export function toProfile(payload: Portfolio, existing: CloudRow): CloudRow {
  const name = payload.name.trim();
  const headline = [payload.headline, payload.headlineAccent, payload.headlineSuffix]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' ');
  const row: CloudRow = {
    name,
    initials: str(existing.initials) || initials(name),
    role: payload.role,
    headline: headline || str(existing.headline) || name,
    location: payload.location,
    phone: payload.phone,
    phone_href: payload.phoneHref,
    email: payload.email,
    email_href: str(existing.email_href) || (payload.email ? `mailto:${payload.email}` : ''),
    linkedin: payload.linkedin,
    linkedin_label: str(existing.linkedin_label) || urlLabel(payload.linkedin),
    github: payload.github,
    github_label: str(existing.github_label) || urlLabel(payload.github),
    photo: toStoredPath(payload.photo || str(existing.photo)),
    resume_pdf: toStoredPath(payload.resumePdf),
    availability: payload.photoChipOpen || str(existing.availability),
    tagline: payload.sub,
    summary: payload.aboutLead
  };
  if ('upwork' in existing) row.upwork = existing.upwork;
  if ('upwork_label' in existing) row.upwork_label = existing.upwork_label;
  return row;
}

export function toExperiences(payload: Portfolio): CloudRow[] {
  return payload.experience.map((job, i) => {
    const [company, location] = splitOrg(job.org);
    const when = job.when.replace(' · Current', '').trim();
    return {
      sort_order: i,
      title: job.title,
      company,
      location,
      period: when,
      bullets: stringList(job.bullets)
    };
  });
}

export function toProjects(payload: Portfolio, existing: CloudRow[]): CloudRow[] {
  const bySlug: Record<string, CloudRow> = {};
  for (const row of existing) {
    const slug = str(row.slug);
    if (slug) bySlug[slug] = row;
  }

  return payload.projects.map((project, i) => {
    const slug = slugify(project.id || project.title || 'project');
    const current = bySlug[slug] ?? {};
    const summary = project.summary;
    const href = project.repoUrl.trim();
    const live = project.liveUrl.trim();
    const image = toStoredPath(project.media || str(current.image));
    const gallery = stringList(project.gallery).map(toStoredPath).filter(Boolean);
    return {
      slug,
      name: project.title,
      subtitle: str(current.subtitle) || project.category,
      description: summary || str(current.description),
      overview: str(current.overview) || summary,
      category: project.category || str(current.category) || 'Web Application',
      stack: stringList(project.tags.length ? project.tags : current.stack),
      features: stringList(project.facts.length ? project.facts : current.features),
      architecture: Array.isArray(current.architecture) ? current.architecture : [],
      challenges: Array.isArray(current.challenges) ? current.challenges : [],
      metrics: Array.isArray(current.metrics) ? current.metrics : [],
      results: Array.isArray(current.results) ? current.results : [],
      url: href || str(current.url),
      live_url: live || current.live_url || null,
      image: image || str(current.image),
      gallery,
      sort_order: i
    };
  });
}

export function extrasFrom(payload: Portfolio): CloudRow {
  const extras: CloudRow = {};
  const source = payload as unknown as CloudRow;
  for (const key of EXTRA_KEYS) {
    if (key === 'projectFilterMap') continue;
    if (key in source) extras[key] = source[key];
  }
  const map: Record<string, string[]> = {};
  for (const project of payload.projects) {
    const id = slugify(project.id || project.title);
    if (id) map[id] = stringList(project.filters);
  }
  extras.projectFilterMap = map;
  return extras;
}
