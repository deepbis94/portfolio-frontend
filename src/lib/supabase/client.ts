import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_STORAGE_BUCKET,
  PUBLIC_SUPABASE_URL
} from '$env/static/public';

const url = (PUBLIC_SUPABASE_URL ?? '').replace(/\/$/, '');
const anon = PUBLIC_SUPABASE_ANON_KEY ?? '';

export function storageBucket(): string {
  return PUBLIC_SUPABASE_STORAGE_BUCKET || 'portfolio';
}

let client: SupabaseClient | null = null;

export type KitFetch = typeof fetch;

function createClientWith(customFetch?: KitFetch): SupabaseClient {
  const browser = typeof window !== 'undefined';
  return createClient(url, anon, {
    ...(customFetch ? { global: { fetch: customFetch } } : {}),
    auth: {
      persistSession: browser,
      autoRefreshToken: browser,
      detectSessionInUrl: browser,
      storageKey: 'portfolio-auth'
    }
  });
}

export function isSupabaseConfigured(): boolean {
  return url !== '' && anon !== '';
}

export function getSupabase(customFetch?: KitFetch): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error('PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are not set');
  }
  if (typeof window !== 'undefined') {
    if (!client) client = createClientWith();
    return client;
  }
  return createClientWith(customFetch);
}

export function publicMediaUrl(path: string): string {
  if (path === '' || /^https?:\/\//i.test(path)) return path;
  const normalized = '/' + path.replace(/^\/+/, '');
  if (normalized.startsWith('/projects/') || normalized.startsWith('/profile/')) {
    const encoded = normalized
      .slice(1)
      .split('/')
      .map(encodeURIComponent)
      .join('/');
    return `${url}/storage/v1/object/public/${encodeURIComponent(storageBucket())}/${encoded}`;
  }
  return normalized;
}

export function toStoredPath(path: string): string {
  if (path === '') return path;
  const prefix = `${url}/storage/v1/object/public/${storageBucket()}/`;
  if (path.startsWith(prefix)) {
    return '/' + decodeURIComponent(path.slice(prefix.length)).replace(/^\/+/, '');
  }
  return path;
}
