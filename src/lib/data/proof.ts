export type SkillGroup = 'core' | 'strong' | 'working';
export type ProcessStep = { n: string; title: string; body: string };
export type StatPill = { label: string; accent: string; wide?: boolean };

export const CANONICAL_TITLE = 'Senior Full-Stack Engineer';

export const skillGroupLabels: { id: SkillGroup; label: string }[] = [
  { id: 'core', label: 'Core' },
  { id: 'strong', label: 'Strong' }
];

export function unifyTitleCopy(text: string): string {
  return text
    .replace(/Senior Backend Engineer/g, CANONICAL_TITLE)
    .replace(/Senior Full-Stack Developer/g, CANONICAL_TITLE)
    .replace(/Senior Fullstack Developer/gi, CANONICAL_TITLE)
    .replace(/\ba backend engineer\b/gi, 'a full-stack engineer')
    .replace(/\bscalable backend systems\b/gi, 'scalable web systems')
    .replace(/\bCore backend\b/gi, 'Core stack');
}

export function normalizeWhen(when: string, currentFlag = false): { when: string; current: boolean } {
  const currentToken = /current|present/i.test(when);
  const stripped = when
    .replace(/\s*[·,]\s*(current|present)\s*$/i, '')
    .replace(/\s*\((current|present)\)\s*$/i, '')
    .trim();
  const years = [...stripped.matchAll(/\b(19|20)\d{2}\b/g)].map((match) => Number(match[0]));
  const endYear = years.at(-1) ?? 0;
  const current = currentFlag || currentToken || (years.length >= 2 && endYear >= new Date().getFullYear());
  if (!current) return { when: stripped, current: false };
  const start = stripped.split(/\s*[–—-]\s+/)[0]?.trim() || stripped;
  return { when: `${start} – Present`, current: true };
}

export function inferSkillGroup(title: string): SkillGroup {
  const t = title.toLowerCase();
  if (/php|laravel|mysql|redis|docker|ci\/cd|rest api/.test(t)) return 'core';
  return 'strong';
}

export function withSkillGroup<T extends { title: string; group?: SkillGroup }>(skill: T): T & { group: SkillGroup } {
  const group = skill.group === 'working' ? 'strong' : (skill.group ?? inferSkillGroup(skill.title));
  return { ...skill, group };
}

export function legacyPills(pills: StatPill[]): boolean {
  const labels = pills.map((pill) => pill.label.toLowerCase()).join(' | ');
  return /crm & checkout|architecture & integration/.test(labels);
}

export const defaultStats: StatPill[] = [
  { accent: '6+', label: 'Years Experience' },
  { accent: '6', label: 'Featured Projects' },
  { accent: '40+', label: 'APIs Delivered' },
  { accent: '12+', label: 'Payment Integrations' },
  { accent: '99.9%', label: 'Uptime Targets Met' }
];

export const defaultProcess: ProcessStep[] = [
  {
    n: '01',
    title: 'Discover',
    body: 'Clarify the problem, constraints, and what “done” looks like before writing code.'
  },
  {
    n: '02',
    title: 'Design',
    body: 'Map APIs, data, and failure modes so the build has a contract you can test against.'
  },
  {
    n: '03',
    title: 'Build',
    body: 'Ship in slices — working endpoints, tests, and something you can actually demo.'
  },
  {
    n: '04',
    title: 'Harden',
    body: 'Auth, observability, deploys, and the production details that keep the system up.'
  }
];

export const defaultAvailability =
  'Available for freelance & full-time full-stack roles — usually replies within 24 hours.';

export const defaultProjectFacts: Record<string, string[]> = {
  supportmind: ['ReAct loop', 'Tool calling', 'Guardrails', 'Conversation audit trail'],
  tenantshare: ['Per-tenant isolation', 'RBAC', 'Zero cross-tenant leakage'],
  knowledgedoc: ['Semantic search', 'Cited passages w/ similarity scores'],
  deepsearch: ['Multi-step research', 'Cited findings'],
  pixelpro: ['Responsive breakpoints', 'ARIA/keyboard nav', 'localStorage cart'],
  mstore: ['11+ modules', 'CSV/PDF export', 'Dual-session billing'],
  'mstore-api': ['11+ modules', 'CSV/PDF export', 'Dual-session billing']
};

export function factsFor(id: string, current: string[]): string[] {
  if (current.length >= 2) return current;
  return defaultProjectFacts[id] ?? current;
}
