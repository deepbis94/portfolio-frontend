import { portfolio, withDefaults, type Portfolio, type ProjectDetail } from '$lib/data/content';
import { isSupabaseConfigured, type KitFetch } from '$lib/supabase/client';
import { fetchPortfolio, fetchProject, pingSupabase, savePortfolioToCloud } from '$lib/supabase/portfolio';

export async function getPortfolio(fetchImpl?: KitFetch): Promise<Portfolio> {
  if (!isSupabaseConfigured()) return portfolio;
  try {
    return withDefaults(await fetchPortfolio(fetchImpl));
  } catch (error) {
    console.error('Supabase portfolio fetch failed', error);
    return portfolio;
  }
}

export async function getProject(slug: string, fetchImpl?: KitFetch): Promise<ProjectDetail> {
  return fetchProject(slug, fetchImpl);
}

export async function savePortfolio(data: Portfolio): Promise<Portfolio> {
  const { source: _s, ...payload } = data as Portfolio & { source?: string };
  const cleaned: Portfolio = {
    ...payload,
    typePhrases: payload.typePhrases.map((s) => s.trim()).filter(Boolean),
    chipSkills: payload.chipSkills.map((s) => s.trim()).filter(Boolean),
    aboutPoints: payload.aboutPoints.map((s) => s.trim()).filter(Boolean),
    certifications: payload.certifications.map((s) => s.trim()).filter(Boolean)
  };
  return withDefaults(await savePortfolioToCloud(cleaned));
}

export async function getHealth(fetchImpl?: KitFetch): Promise<{ ok: boolean; supabase: boolean }> {
  const supabase = await pingSupabase(fetchImpl);
  return { ok: supabase, supabase };
}
