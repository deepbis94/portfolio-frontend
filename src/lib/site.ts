import { PUBLIC_SITE_URL } from '$env/static/public';

export const PRODUCTION_SITE_URL = 'https://portfolio-new.creativeventure.space';

export function publicSiteUrl(): string {
  const raw = (PUBLIC_SITE_URL ?? '').replace(/\/$/, '');
  if (raw !== '' && !/localhost|127\.0\.0\.1/i.test(raw)) return raw;
  return PRODUCTION_SITE_URL;
}

export function absoluteAssetUrl(path: string): string {
  const trimmed = path.trim();
  if (trimmed === '') return `${publicSiteUrl()}/favicon.svg`;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `${publicSiteUrl()}${trimmed.startsWith('/') ? trimmed : `/${trimmed}`}`;
}

export function hireMailto(email: string): string {
  const address = email.trim() || 'biswasd94@gmail.com';
  return `mailto:${address}?subject=${encodeURIComponent('Project inquiry')}`;
}

export function photoChipLabel(value: string): string {
  if (value.trim() === '' || /available|open to work/i.test(value)) return 'Full-stack · AI';
  return value;
}

export function yearsChipLabel(value: string): string {
  if (value.trim() === '' || /backend/i.test(value)) return '6+ yrs full-stack';
  return value;
}

export function fullStackAvailability(value: string): string {
  const next = value.replace(/backend roles/gi, 'full-stack roles');
  if (next.trim() === '' || /backend/i.test(next)) {
    return 'Available for freelance & full-time full-stack roles — usually replies within 24 hours.';
  }
  return next;
}
