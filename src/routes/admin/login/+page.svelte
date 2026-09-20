<script lang="ts">
  import { goto } from '$app/navigation';
  import { getHealth, postJson } from '$lib/api';
  import { setToken } from '$lib/admin/session';

  let email = $state('');
  let password = $state('');
  let error = $state('');
  let busy = $state(false);
  let apiOk = $state<boolean | null>(null);

  $effect(() => {
    getHealth().then((h) => (apiOk = h.ok));
  });

  async function submit(e: Event) {
    e.preventDefault();
    error = '';
    busy = true;
    try {
      const res = await postJson<{ token: string }>('/admin/login', { email, password });
      setToken(res.token);
      await goto('/admin');
    } catch (err) {
      error = err instanceof Error ? err.message : 'Login failed. Check API URL and credentials.';
    } finally {
      busy = false;
    }
  }
</script>

<div class="flex min-h-screen items-center justify-center bg-bg px-4">
  <form class="w-full max-w-md rounded-2xl border border-border bg-surface p-8" onsubmit={submit}>
    <p class="font-mono text-xs tracking-[2px] text-green uppercase">Backend UI</p>
    <h1 class="mt-2 text-2xl font-extrabold">Sign in</h1>
    <p class="mt-2 text-sm text-ink/70">
      Sign in with your Supabase Auth email and password.
    </p>
    <p class="mt-3 font-mono text-xs {apiOk ? 'text-green' : apiOk === false ? 'text-red-400' : 'text-ink/50'}">
      API {apiOk === null ? 'checking…' : apiOk ? 'reachable' : 'offline — start portfolio-backend'}
    </p>
    <label class="mt-6 block text-sm font-medium" for="admin-email">Email</label>
    <input
      id="admin-email"
      class="mt-1 w-full rounded-xl border border-border bg-bg px-3 py-2.5 outline-none focus:border-green"
      type="email"
      bind:value={email}
      required
      autocomplete="username"
    />
    <label class="mt-4 block text-sm font-medium" for="admin-password">Password</label>
    <input
      id="admin-password"
      class="mt-1 w-full rounded-xl border border-border bg-bg px-3 py-2.5 outline-none focus:border-green"
      type="password"
      bind:value={password}
      required
      autocomplete="current-password"
    />
    {#if error}
      <p class="mt-3 text-sm text-red-400">{error}</p>
    {/if}
    <button
      class="mt-6 w-full rounded-full bg-green py-3 text-sm font-bold text-ink-dark hover:bg-green-bright disabled:opacity-60"
      type="submit"
      disabled={busy}
    >
      {busy ? 'Signing in…' : 'Continue'}
    </button>
    <p class="mt-4 text-center text-xs text-ink/60">
      Create the admin user in Supabase → Authentication → Users.
    </p>
  </form>
</div>
