import { withDefaults, portfolio } from '$lib/data/content';
import { getPortfolio } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    return { portfolio: await getPortfolio(fetch) };
  } catch {
    return { portfolio: withDefaults(portfolio) };
  }
};
