
  # University Computer Science Website

  This is a code bundle for University Computer Science Website. The original project is available at https://www.figma.com/design/A8npctvp5uKPKNKcYtdGEG/University-Computer-Science-Website.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## D1 database and migrations

  The newsletter uses a D1 table `subscribers`. Apply the migration once per environment.

  **Remote (production):**
  ```bash
  npx wrangler d1 execute csdept_db --remote --file=apps/web/migrations/001_init.sql
  ```

  **Local (if wrangler config exists):**
  ```bash
  npx wrangler d1 execute csdept_db --local --file=apps/web/migrations/001_init.sql
  ```

  Verify the table exists:
  ```bash
  npx wrangler d1 execute csdept_db --remote --command="PRAGMA table_info(subscribers);"
  ```

  ## Cloudflare Pages Functions and newsletter API

  Functions live under `apps/web/functions`. Deployed routes:

  - `GET /api/health` – health check
  - `POST /api/subscribe` – subscribe (JSON `{ "email": "..." }`); sends welcome email
  - `GET /api/unsubscribe?token=...` – unsubscribe (HTML page)
  - `POST /api/send-newsletter` – admin-only; requires `X-Admin-Token` header

  **Required env vars (Cloudflare Pages):**  
  `PUBLIC_SITE_URL`, `RESEND_API_KEY`, `RESEND_FROM`, `ADMIN_SEND_TOKEN`  
  **Bindings:** D1 database `DB` → `csdept_db`

  ## Newsletter modal (Events page)

  The “Subscribe to Updates” modal on the Events page:

  - Shows only on the Events page.
  - Auto-opens at most once every 7 days (or after ~40% scroll / 10s), and only if the user is not already marked as subscribed in `localStorage` (`newsletter_subscribed`).
  - After a successful subscribe, the modal shows a success state and the subscribed flag is stored so the auto-popup won’t show again.

  ## Sending a newsletter (admin)

  Use the script with your production URL and admin token (never commit the token):

  ```bash
  PUBLIC_SITE_URL=https://your-site.pages.dev ADMIN_SEND_TOKEN=your-secret node apps/web/scripts/sendNewsletter.mjs --subject "Newsletter title" --html "<p>Hello …</p>"
  ```

  Or pipe JSON:

  ```bash
  echo '{"subject":"Title","html":"<p>Body</p>"}' | PUBLIC_SITE_URL=... ADMIN_SEND_TOKEN=... node apps/web/scripts/sendNewsletter.mjs
  ```

  The script calls `POST /api/send-newsletter` with the given subject and HTML. The API adds an unsubscribe footer if not present.
  