import { env } from '$env/dynamic/public';
import { portfolio, withDefaults, type Portfolio, type ProjectDetail } from '$lib/data/content';

const base = (env.PUBLIC_API_URL ?? 'http://localhost:8080').replace(/\/$/, '');

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${base}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    }
  });
  if (!res.ok) {
    const text = await res.text();
    try {
      const json = JSON.parse(text) as { error?: string };
      throw new Error(json.error || text || `API ${res.status}: ${path}`);
    } catch (e) {
      if (e instanceof SyntaxError) throw new Error(text || `API ${res.status}: ${path}`);
      throw e;
    }
  }
  return res.json() as Promise<T>;
}

export async function getPortfolio(): Promise<Portfolio> {
  if (!base) return portfolio;
  try {
    return withDefaults(await request<Partial<Portfolio>>('/portfolio'));
  } catch {
    return portfolio;
  }
}

export async function getProject(slug: string): Promise<ProjectDetail> {
  return request<ProjectDetail>(`/projects/${encodeURIComponent(slug)}`);
}

export async function savePortfolio(token: string, data: Portfolio): Promise<Portfolio> {
  const { source: _s, ...payload } = data as Portfolio & { source?: string };
  const cleaned: Portfolio = {
    ...payload,
    typePhrases: payload.typePhrases.map((s) => s.trim()).filter(Boolean),
    chipSkills: payload.chipSkills.map((s) => s.trim()).filter(Boolean),
    aboutPoints: payload.aboutPoints.map((s) => s.trim()).filter(Boolean),
    certifications: payload.certifications.map((s) => s.trim()).filter(Boolean)
  };
  return withDefaults(await adminMutate<Partial<Portfolio>>('/admin/portfolio', token, 'PUT', cleaned));
}

export async function getHealth(): Promise<{ ok: boolean; supabase: boolean }> {
  try {
    return await request('/health');
  } catch {
    return { ok: false, supabase: false };
  }
}

export function adminHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

export async function adminGet<T>(path: string, token: string): Promise<T> {
  return request<T>(path, { headers: adminHeaders(token) });
}

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, { method: 'POST', body: JSON.stringify(body) });
}

export async function adminMutate<T>(path: string, token: string, method: string, body?: unknown): Promise<T> {
  return request<T>(path, {
    method,
    headers: adminHeaders(token),
    body: body ? JSON.stringify(body) : undefined
  });
}
