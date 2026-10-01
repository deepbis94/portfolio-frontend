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

## Hostinger shared hosting (Git auto-deploy)

Shared hosting **cannot run npm**. Hostinger Git only copies files into `public_html`. So GitHub Actions builds the site, then Hostinger pulls the built files.

1. In GitHub **portfolio-frontend → Settings → Secrets and variables → Actions** add:

| Secret | Value |
|---|---|
| `PUBLIC_SUPABASE_URL` | `https://miznzplwxqzhhokplgac.supabase.co` |
| `PUBLIC_SUPABASE_ANON_KEY` | anon key (not the service role) |
| `PUBLIC_SUPABASE_STORAGE_BUCKET` | optional, `portfolio` |

2. Push `production`. The **Publish Hostinger branch** workflow builds the site and force-updates the `hostinger` branch with the contents of `build/`.

3. In hPanel: **Advanced → Git → Connect with GitHub**.
4. Repository `deepbis94/portfolio-frontend`, **branch `hostinger`**, deploy directory `public_html`.
5. First deploy needs an empty `public_html`. Click **Deploy**. Later pushes to `production` rebuild `hostinger`, and Hostinger auto-pulls it.

Never put the service role key in git or GitHub secrets.
