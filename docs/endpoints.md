# API Endpoints

Base URL: set via `VITE_API_BASE_URL` (frontend) or the Worker URL.

## Public

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/health | Health check |
| GET | /api/people | List all people |
| GET | /api/people/:slug | Person by slug (includes publications_by_year) |
| GET | /api/news | List all news |
| GET | /api/news/:slug | News post by slug |
| GET | /api/events | List all events |
| GET | /api/events/:slug | Event by slug |
| GET | /api/programmes | List all programmes |
| GET | /api/programmes/:slug | Programme by slug (with years and modules) |
| GET | /api/programmes/:slug/years | Programme years with modules |
| GET | /api/assets/:key | R2 object (e.g. /api/assets/uploads/xxx.png) |

## Admin (cookie auth required)

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/admin/login | Body: `{ username, password }`. Sets HttpOnly cookie. |
| POST | /api/admin/logout | Clears session cookie |
| GET | /api/admin/me | Current admin user |
| POST | /api/admin/people | Create person (body: person fields) |
| PUT | /api/admin/people/:id | Update person |
| DELETE | /api/admin/people/:id | Delete person |
| POST | /api/admin/news | Create news |
| PUT | /api/admin/news/:id | Update news |
| DELETE | /api/admin/news/:id | Delete news |
| POST | /api/admin/events | Create event |
| PUT | /api/admin/events/:id | Update event |
| DELETE | /api/admin/events/:id | Delete event |
| POST | /api/admin/programmes | Create programme |
| PUT | /api/admin/programmes/:id | Update programme |
| POST | /api/admin/r2/upload-url | Body: `{ filename, contentType? }`. Returns `{ key, uploadUrl, contentType }`. |
| PUT | /api/admin/r2/upload?key=... | Upload file body to R2 |

All admin mutations expect JSON where applicable. Validation uses Zod schemas from `@csdept/shared`.
