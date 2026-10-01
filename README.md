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

## Hostinger auto-deploy (GitHub)

Use **Node.js web app → Import Git repository**, not the generic Git file-copy tool. Generic Git only dumps source into a folder and will not run `npm run build`.

1. hPanel → **Websites → Add Website → Node.js web app → Import Git repository**.
2. Connect GitHub and select `deepbis94/portfolio-frontend`.
3. Set:

| Field | Value |
|---|---|
| Branch | `production` (do not leave this on `main`) |
| Node.js version | `22` |
| Build command | `npm run build` |
| Output directory | `build` |
| Entry file | empty (this app is static `adapter-static`) |
| Root directory | `/` |

4. **Environment variables** (injected at build time):

| Name | Value |
|---|---|
| `PUBLIC_SUPABASE_URL` | `https://miznzplwxqzhhokplgac.supabase.co` |
| `PUBLIC_SUPABASE_ANON_KEY` | anon key (not the service role) |
| `PUBLIC_SUPABASE_STORAGE_BUCKET` | `portfolio` |

5. Deploy. After that, every push to `production` rebuilds and publishes.

Logs: website dashboard → **Deployments**.

Never put the service role key in Hostinger env or git.
