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

See **D1 setup + migrations** below. For a quick start (remote DB only):

```bash
npm run db:migrate
```

This applies `db/migrations/` to the **remote** D1 database (`csdept_db`), including the `events` and `event_registrations` tables required for event registration.

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
- `CORS_ORIGIN` = your Pages frontend origin (e.g. `https://csdept.pages.dev` or `https://cs.vantondertech.dev`) so event registration and other API calls are not blocked by CORS
- `RESEND_API_KEY`, `RESEND_FROM` (optional but recommended for event confirmation emails; if missing, registration still succeeds but `emailSent` will be false)

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
   - **`VITE_API_BASE_URL`** = your Worker URL. For production use: **`https://csdept-api.csdept.workers.dev`** so event registration and other API calls hit the correct backend.

4. **Deploy**  
   Push to the connected branch or trigger a deploy from the dashboard.

If you use a root-directory build, ensure the build step installs and builds the monorepo (e.g. `npm ci && npm run build:shared && npm run build:web` and set output to `apps/web/dist`).

---

## D1 setup + migrations + production deploy

The Worker uses a D1 binding named **`csdept_db`** (see `apps/api/wrangler.toml`). The **database name** used in Wrangler commands is the same: **`csdept_db`** (`database_name` in the config). Migrations live in **`db/migrations/`** and are applied with the config so paths resolve from the repo root.

### Apply migrations locally (local D1 for dev)

From repo root:

```bash
npx wrangler d1 migrations apply csdept_db --local --config apps/api/wrangler.toml
```

### Apply migrations to production (remote D1)

From repo root:

```bash
npx wrangler d1 migrations apply csdept_db --remote --config apps/api/wrangler.toml
```

Or from `apps/api`:

```bash
cd apps/api
npx wrangler d1 migrations apply csdept_db --remote
```

(When run from `apps/api`, `wrangler.toml` there sets `migrations_dir = "../db/migrations"`, so migrations are still loaded from `db/migrations/`.)

### Redeploy Worker after schema changes

```bash
cd apps/api
npx wrangler deploy
```

Or from root:

```bash
npx wrangler deploy --config apps/api/wrangler.toml
```

### Checklist (fix “no such table” / event registration 500)

1. **Confirm Worker has D1 binding**  
   In Cloudflare Dashboard → Workers & Pages → your API worker → Settings → Bindings, ensure a **D1 database** binding named **`csdept_db`** is attached (database id `bef31762-64a1-4091-b35b-10a884669c86` or your production DB).

2. **Run migrations on the remote DB**  
   `npx wrangler d1 migrations apply csdept_db --remote --config apps/api/wrangler.toml`

3. **Redeploy the Worker**  
   `npx wrangler deploy --config apps/api/wrangler.toml`

4. **Test API**  
   `curl -i -X POST https://csdept-api.csdept.workers.dev/api/events/register -H "Content-Type: application/json" -d '{"eventId":"test-1","email":"you@example.com"}'`  
   Expect 200 and `{"ok":true,...}` (or 400 if validation fails).

5. **Test UI**  
   Set Pages env `VITE_API_BASE_URL=https://csdept-api.csdept.workers.dev`, open Events, click Register and submit an email.

If the schema is missing, the register endpoint returns **500** with body `{"error":"Database schema missing. Run D1 migrations."}` and logs the full D1 error server-side.

---

## Wrangler bindings (already set)

- **D1**: binding **`csdept_db`** → database name `csdept_db`, id `bef31762-64a1-4091-b35b-10a884669c86`
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
| `npm run db:migrate` | Apply D1 migrations to **remote** (`csdept_db`) |
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

**Event registration**
- [ ] Local: Set `VITE_API_BASE_URL=http://localhost:8787`; browser console shows `[event-register] request URL: http://localhost:8787/api/events/register` on submit.
- [ ] Production: Set `VITE_API_BASE_URL` to Worker URL and Worker `CORS_ORIGIN` to Pages URL.
- [ ] Verify API: `curl -X POST https://<WORKER_URL>/api/events/register -H "Content-Type: application/json" -d '{"eventId":"test-1","email":"you@example.com"}'` → 200 and `{ "ok": true, "emailSent": true/false }`.
- [ ] Worker logs: `[events/register] incoming`, `DB insert ok`, `email sent` or `Resend failed`.
- [ ] Resend: Set `RESEND_API_KEY` and `RESEND_FROM` on Worker for confirmation emails.
