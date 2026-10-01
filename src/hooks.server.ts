import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  return resolve(event, {
    filterSerializedResponseHeaders: (name) =>
      name === 'content-range' ||
      name === 'content-profile' ||
      name === 'x-supabase-api-version'
  });
};
