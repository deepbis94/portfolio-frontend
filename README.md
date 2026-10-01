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

## Shared hosting (GitHub Actions → Hostinger FTP)

Pushing to `production` builds the static site and uploads `build/` over FTP/FTPS. `main` does not deploy.

1. In the GitHub repo: **Settings → Secrets and variables → Actions**.
2. Add:

| Secret | Example |
|---|---|
| `FTP_SERVER` | `ftp.yourdomain.com` (from Hostinger hPanel) |
| `FTP_USERNAME` | hosting FTP user |
| `FTP_PASSWORD` | hosting FTP password |
| `FTP_SERVER_DIR` | `/public_html/` (must end with `/`) |
| `FTP_PROTOCOL` | optional, `ftps` (default) or `ftp` |
| `PUBLIC_SUPABASE_URL` | `https://miznzplwxqzhhokplgac.supabase.co` |
| `PUBLIC_SUPABASE_ANON_KEY` | anon key (not the service role) |
| `PUBLIC_SUPABASE_STORAGE_BUCKET` | optional, defaults to `portfolio` |

3. In Hostinger, the domain document root should be `public_html/`.
4. After the first green run, `https://yourdomain.com` should load the site and `/admin/login` should show **Supabase connected**.

Manual run: **Actions → Deploy site → Run workflow**. Enable dry run to list files without uploading.

Never put the service role key in GitHub or the frontend.

## Shared hosting (manual)

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
