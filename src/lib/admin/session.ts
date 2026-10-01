import { getSupabase, isSupabaseConfigured } from '$lib/supabase/client';

export async function getSession() {
  if (!isSupabaseConfigured()) return null;
  const { data } = await getSupabase().auth.getSession();
  return data.session;
}

export async function isSignedIn(): Promise<boolean> {
  return Boolean((await getSession())?.access_token);
}

export async function signIn(email: string, password: string): Promise<void> {
  const { error } = await getSupabase().auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
}

export async function signOut(): Promise<void> {
  if (!isSupabaseConfigured()) return;
  await getSupabase().auth.signOut();
}
