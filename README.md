# Stellenbosch University — Computer Science Department Website

Production-ready monorepo: **Cloudflare Pages** (frontend) + **Cloudflare Workers** (API), with **D1** (SQLite) and **R2** (assets).

## Structure

```
csdept-redesign/
├── apps/
│   ├── web/          # Vite + React frontend (Cloudflare Pages)
│   └── api/          # Hono Worker (API + admin auth)
├── packages/
│   └── shared/       # Zod schemas, shared types
├── db/
│   ├── migrations/   # D1 SQL migrations
│   └── seed/         # Seed SQL + seed script
├── docs/             # Architecture notes
└── scripts/          # Seed runner
```

## Images

Header/hero background, logo, and people/undergraduate images are served from `apps/web/public/`. If you add or replace images (e.g. in repo root), copy them into `apps/web/public/` so the build can serve them at paths like `/background.jpg`, `/newlogo.jpeg`, `/WillemPeople.jpg`, etc.

## Prerequisites

- Node.js ≥ 20 (see `.nvmrc`)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) installed and logged in (`wrangler login`)
- D1 database and R2 bucket already created (see below)

## Local setup

### 1. Install dependencies

From repo root:

```bash
npm install
```

### 2. Configure API env (dev)

```bash
cp apps/api/.dev.vars.example apps/api/.dev.vars
# Edit apps/api/.dev.vars: set JWT_SECRET (min 16 chars), ADMIN_DEFAULT_PASS, CORS_ORIGIN
```

Do not commit `.dev.vars`.

### 3. Run migrations

```bash
npm run db:migrate
```

This applies `db/migrations/` to the **remote** D1 database (`csdept_db`), including the `event_registrations` table used for event sign-ups.

### 4. Seed database

```bash
npm run db:seed
```

Seeds people, news, events, programmes, and creates an admin user (password from `ADMIN_DEFAULT_PASS` or default `admin123`).

### 5. Start dev servers

**Terminal 1 – API:**

```bash
npm run dev:api
```

Worker runs at `http://localhost:8787` (or the port Wrangler prints).

**Terminal 2 – Web:**

```bash
# Set API base URL to the Worker URL
export VITE_API_BASE_URL=http://localhost:8787
npm run dev:web
```

Frontend runs at `http://localhost:5173`. Set `CORS_ORIGIN=http://localhost:5173` in `apps/api/.dev.vars` so the API accepts requests from the frontend.

---

## Build

```bash
npm run build
```

Builds `packages/shared`, then `apps/web`, then `apps/api`.

---

## Deployment

### Deploy API (Worker)

From repo root:

```bash
cd apps/api
npx wrangler deploy
```

Or from root:

```bash
npx wrangler deploy --config apps/api/wrangler.toml
```

Set production secrets in Cloudflare dashboard (Workers & Pages → your worker → Settings → Variables):

- `JWT_SECRET`
- `ADMIN_DEFAULT_USER`, `ADMIN_DEFAULT_PASS` (or rely on DB after seed)
- `CORS_ORIGIN` (your Pages URL, e.g. `https://csdept.pages.dev`)

### Deploy Web (Pages)

1. **Connect repo**  
   Cloudflare Dashboard → Pages → Create project → Connect to Git (this repo).

2. **Build settings**
   - **Framework preset**: Vite
   - **Build command**: `npm run build:web` (or `npm run build` if you build from root; ensure `packages/shared` is built first)
   - **Build output directory**: `apps/web/dist` (if building from root with a root build that outputs there) or set **Root directory** to `apps/web` and **Build output directory** to `dist`.
   - **Root directory**: `apps/web` (recommended). Then:
     - Build command: `npm run build` (runs in `apps/web`)
     - Build output directory: `dist`

3. **Environment variables** (Pages → Settings → Environment variables)
   - `VITE_API_BASE_URL` = your Worker URL (e.g. `https://csdept-api.<your-subdomain>.workers.dev`)

4. **Deploy**  
   Push to the connected branch or trigger a deploy from the dashboard.

If you use a root-directory build, ensure the build step installs and builds the monorepo (e.g. `npm ci && npm run build:shared && npm run build:web` and set output to `apps/web/dist`).

---

## Wrangler bindings (already set)

- **D1**: `csdept_db` → database name `csdept_db`, id `bef31762-64a1-4091-b35b-10a884669c86`
- **R2**: `csdept_assets` → bucket name `csdept-assets`

---

## Scripts reference

| Script        | Description                                      |
|---------------|--------------------------------------------------|
| `npm run dev` | Run dev:web and dev:api (background)             |
| `npm run dev:web` | Start Vite dev server (apps/web)             |
| `npm run dev:api` | Start Wrangler dev (apps/api)                 |
| `npm run build`   | Build shared, web, api                        |
| `npm run build:web` | Build frontend only                         |
| `npm run build:api` | Build Worker only (Wrangler bundles)        |
| `npm run db:migrate` | Apply D1 migrations (remote)               |
| `npm run db:seed`   | Seed D1 + create admin user                  |

---

## Content and admin

- **Public content**: People, news, events, programmes are read from the API; frontend falls back to static content if the API is unavailable.
- **Admin**: Login via `POST /api/admin/login`; session stored in HttpOnly cookie. Use admin routes to create/update/delete people, news, events, programmes and to get R2 upload URLs.

See `docs/architecture.md` for API details and schema.

---

## Manual test checklist (News + Resources)

**Real-time News (`/en/news`)**
- [ ] News page loads and shows hero (maroon theme).
- [ ] Category tabs work: All News, AI, Cybersecurity, Software, Research, Local, International.
- [ ] Cards show: category pill, date, source, title, excerpt, “Read More” (opens in new tab).
- [ ] Loading state and Retry button on error or empty.
- [ ] API (server-side only): `GET /api/news/feed?category=all` or `GET /api/news?category=all` returns `{ data: [...] }`; cache 12h; All up to 40 items, per-category up to 10. Visit in browser to confirm JSON returns items.

**Reader view (`/en/news/read?url=...&title=...&summary=...`)**
- [ ] Page shows title, summary, and “Read on Source” link; no full-article scraping.

**Resources and Links**
- [ ] Top nav: “Resources” dropdown has only **Links** and **FAQs** (no Student Resources, no Forms).
- [ ] `/en/resources` shows minimal page: two cards (Links, FAQs) + FAQ section; no full landing content.
- [ ] `/en/resources/links` shows the Links page content.
- [ ] `/en/links` redirects to `/en/resources/links`.
- [ ] Footer Resources column: only Links and FAQs (no Student Resources).
