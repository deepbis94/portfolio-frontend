import type { Portfolio, ProjectDetail } from '$lib/data/content';
import { getSupabase, isSupabaseConfigured, type KitFetch } from './client';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  extrasFrom,
  fromCloud,
  fromProjectRow,
  toExperiences,
  toProfile,
  toProjects,
  type CloudRow
} from './mapper';

function fail(table: string, message: string | null): never {
  throw new Error(message || `Supabase ${table} request failed`);
}

async function fetchProfile(sb: SupabaseClient): Promise<CloudRow | null> {
  const { data, error } = await sb.from('profile').select('*').eq('id', 1).maybeSingle();
  if (error) fail('profile', error.message);
  return data as CloudRow | null;
}

async function fetchExperiences(sb: SupabaseClient): Promise<CloudRow[]> {
  const { data, error } = await sb
    .from('experiences')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('id', { ascending: true });
  if (error) fail('experiences', error.message);
  return (data ?? []) as CloudRow[];
}

async function fetchProjects(sb: SupabaseClient): Promise<CloudRow[]> {
  const { data, error } = await sb
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('id', { ascending: true });
  if (error) fail('projects', error.message);
  return (data ?? []) as CloudRow[];
}

async function fetchSiteContent(sb: SupabaseClient): Promise<CloudRow> {
  const { data, error } = await sb.from('site_content').select('payload').eq('id', 1).maybeSingle();
  if (error) {
    if (error.code === 'PGRST205' || error.code === '42P01') return {};
    fail('site_content', error.message);
  }
  const payload = data && typeof data === 'object' ? (data as CloudRow).payload : null;
  return payload && typeof payload === 'object' ? (payload as CloudRow) : {};
}

export async function pingSupabase(fetchImpl?: KitFetch): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  const { error } = await getSupabase(fetchImpl).from('profile').select('id').limit(1);
  return !error;
}

export async function fetchPortfolio(fetchImpl?: KitFetch): Promise<Record<string, unknown>> {
  const sb = getSupabase(fetchImpl);
  const profile = await fetchProfile(sb);
  if (!profile) throw new Error('No profile row in Supabase');
  return fromCloud(profile, await fetchExperiences(sb), await fetchProjects(sb), await fetchSiteContent(sb));
}

export async function fetchProject(slug: string, fetchImpl?: KitFetch): Promise<ProjectDetail> {
  const cleaned = slug.toLowerCase().trim();
  if (!/^[a-z0-9-]+$/.test(cleaned)) throw new Error('Project not found');
  const { data, error } = await getSupabase(fetchImpl).from('projects').select('*').eq('slug', cleaned).maybeSingle();
  if (error) fail('projects', error.message);
  if (!data) throw new Error('Project not found');
  return fromProjectRow(data as CloudRow);
}

async function upsertProfile(row: CloudRow): Promise<void> {
  const sb = getSupabase();
  const existing = await fetchProfile(sb);
  if (existing) {
    const { error } = await sb.from('profile').update(row).eq('id', 1);
    if (error) fail('profile', error.message);
    return;
  }
  const { error } = await sb.from('profile').insert({ ...row, id: 1 });
  if (error) fail('profile', error.message);
}

async function replaceExperiences(rows: CloudRow[], existing: CloudRow[]): Promise<void> {
  const sb = getSupabase();
  for (let i = 0; i < rows.length; i += 1) {
    const current = existing[i];
    if (current?.id != null) {
      const { error } = await sb.from('experiences').update(rows[i]).eq('id', current.id);
      if (error) fail('experiences', error.message);
    } else {
      const { error } = await sb.from('experiences').insert(rows[i]);
      if (error) fail('experiences', error.message);
    }
  }
  const extraIds = existing.slice(rows.length).map((row) => row.id).filter((id) => id != null);
  if (extraIds.length > 0) {
    const { error } = await sb.from('experiences').delete().in('id', extraIds);
    if (error) fail('experiences', error.message);
  }
}

async function replaceProjects(rows: CloudRow[], existing: CloudRow[]): Promise<void> {
  const sb = getSupabase();
  const bySlug: Record<string, CloudRow> = {};
  for (const row of existing) {
    const slug = String(row.slug ?? '');
    if (slug) bySlug[slug] = row;
  }
  const keep = new Set<string>();
  for (const row of rows) {
    const slug = String(row.slug ?? '');
    const current = slug ? bySlug[slug] : undefined;
    if (current?.id != null) {
      const { error } = await sb.from('projects').update(row).eq('id', current.id);
      if (error) fail('projects', error.message);
    } else {
      const { error } = await sb.from('projects').insert(row);
      if (error) fail('projects', error.message);
    }
    if (slug) keep.add(slug);
  }
  const extraIds = existing
    .filter((row) => !keep.has(String(row.slug ?? '')) && row.id != null)
    .map((row) => row.id);
  if (extraIds.length > 0) {
    const { error } = await sb.from('projects').delete().in('id', extraIds);
    if (error) fail('projects', error.message);
  }
}

async function saveSiteContent(payload: CloudRow): Promise<void> {
  const { error } = await getSupabase()
    .from('site_content')
    .upsert({ id: 1, payload, updated_at: new Date().toISOString() });
  if (error) fail('site_content', error.message);
}

export async function savePortfolioToCloud(payload: Portfolio): Promise<Record<string, unknown>> {
  const sb = getSupabase();
  const extras = extrasFrom(payload);
  const profile = (await fetchProfile(sb)) ?? {};
  const experiences = await fetchExperiences(sb);
  const projects = await fetchProjects(sb);
  await upsertProfile(toProfile(payload, profile));
  await replaceExperiences(toExperiences(payload), experiences);
  await replaceProjects(toProjects(payload, projects), projects);
  await saveSiteContent(extras);
  return fetchPortfolio();
}
