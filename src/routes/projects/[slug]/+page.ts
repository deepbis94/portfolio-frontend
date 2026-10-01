import { getPortfolio, getProject } from '$lib/api';
import { portfolio } from '$lib/data/content';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const chrome = await getPortfolio(fetch);
  try {
    const project = await getProject(params.slug, fetch);
    return { slug: params.slug, chrome, project };
  } catch {
    return { slug: params.slug, chrome: chrome ?? portfolio, project: null };
  }
};
