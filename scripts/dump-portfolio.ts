import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { portfolio } from '../src/lib/data/content.ts';

const root = dirname(fileURLToPath(import.meta.url));
const outDir = join(root, '../../portfolio-backend/data');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'portfolio.json'), JSON.stringify(portfolio, null, 2));
console.log('wrote', join(outDir, 'portfolio.json'));
