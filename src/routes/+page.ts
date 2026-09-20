import { withDefaults, portfolio } from '$lib/data/content';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  return { portfolio: withDefaults(portfolio) };
};
