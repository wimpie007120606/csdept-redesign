# Architecture

## Stack

- **Frontend**: Vite + React + TypeScript (Cloudflare Pages)
- **Backend**: Cloudflare Workers + Hono (TypeScript)
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (assets)
- **Shared**: `packages/shared` (zod schemas, types)

## Repo layout

- `apps/web` – Pages app (Figma-exported UI, API-backed content)
- `apps/api` – Worker (REST API, admin auth, R2 proxy)
- `packages/shared` – Zod schemas and TS types
- `db/migrations` – D1 SQL migrations
- `db/seed` – Seed SQL and seed script

## API

Base URL: set via `VITE_API_BASE_URL` (frontend) and `CORS_ORIGIN` (Worker).

### Public

- `GET /api/health`
- `GET /api/people`, `GET /api/people/:slug`
- `GET /api/news`, `GET /api/news/:slug`
- `GET /api/events`, `GET /api/events/:slug`
- `GET /api/programmes`, `GET /api/programmes/:slug`, `GET /api/programmes/:slug/years`
- `GET /api/assets/:key` – R2 object (public read)

### Admin (cookie auth)

- `POST /api/admin/login` – body `{ username, password }`, sets HttpOnly cookie
- `POST /api/admin/logout`
- `GET /api/admin/me`
- `POST /api/admin/people`, `PUT /api/admin/people/:id`, `DELETE /api/admin/people/:id`
- Same for `/api/admin/news`, `/api/admin/events`, `/api/admin/programmes`
- `POST /api/admin/r2/upload-url` – body `{ filename, contentType? }` → `{ key, uploadUrl, contentType }`
- `PUT /api/admin/r2/upload?key=...` – body = file bytes

## Auth

- Admin login: password checked against D1 `admin_users.password_hash` (PBKDF2) or env `ADMIN_DEFAULT_PASS` when no row exists.
- Session: JWT in HttpOnly cookie `admin_session`, 7-day expiry.
- Seed creates one admin user with hashed password (see `scripts/seed.js`).

## D1 schema

- `admin_users` – username, password_hash
- `people` – slug, full_name, title, role, division, emails, phone, office, bio, research_interests_json, qualifications, links_json, image_key
- `publications` – person_id, year, citation, venue, tags_json, url
- `news` – slug, title, excerpt, body_md, cover_image_key, published_at
- `events` – slug, title, body_md, location, start_at, end_at, cover_image_key
- `programmes`, `programme_years`, `programme_modules`

## Frontend routing

- `/` – Home
- `/study`, `/study/undergraduate`, `/study/postgraduate`
- `/people`, `/people/:slug`
- `/research`, `/news`, `/events`, `/courses`, `/resources`, `/contact`

People, news, events, and programme content are loaded from the API with fallback to static content when the API is unavailable.
