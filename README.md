# portfolio-frontend
Public site + admin UI (`/admin`). SvelteKit + Tailwind. Static adapter for shared hosting.

## Local (Docker)

From the parent `portfolio/` folder:

```bash
docker compose up --build
```

- Site: http://localhost:5173
- Admin: http://localhost:5173/admin
- API: http://localhost:8080

## Local (without Docker)

```bash
cp .env.example .env
npm install
npm run dev
```

Operations use the `production` branch. Keep `main` for development.

## Shared hosting

```bash
npm run build
```

Upload the contents of `build/` into `public_html/`. Include `.htaccess` (copied from `static/.htaccess`) so `/admin` routes work.

Set `PUBLIC_API_URL=https://api.yourdomain.com` in `.env` **before** `npm run build`.
