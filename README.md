# portfolio-frontend
Public site + admin UI (`/admin`). SvelteKit + Tailwind. Static adapter for shared hosting.

Content comes from the same Supabase project as `portfolio-app` (`profile`, `experiences`, `projects`, `site_content`). The Slim API is not used.

## Local (Docker)

From the parent `portfolio/` folder:

```bash
cp portfolio-frontend/.env.example portfolio-frontend/.env
# fill PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY
docker compose up --build
```

- Site: http://localhost:5173
- Admin: http://localhost:5173/admin

## Local (without Docker)

```bash
cp .env.example .env
npm install
npm run dev
```

Operations use the `production` branch. Keep `main` for development.

## Shared hosting

Set in `.env` **before** `npm run build`:

```bash
PUBLIC_SUPABASE_URL=https://miznzplwxqzhhokplgac.supabase.co
PUBLIC_SUPABASE_ANON_KEY=<anon key>
PUBLIC_SUPABASE_STORAGE_BUCKET=portfolio
```

```bash
npm run build
```

Upload the contents of `build/` into `public_html/`. Include `.htaccess` (copied from `static/.htaccess`) so `/admin` and `/projects` routes work.

Never put the service role key in the frontend.
