import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import type { Env } from '../bindings.js';
import { requireAdmin } from '../auth.js';
import { eventCreateSchema, eventUpdateSchema } from '@csdept/shared';

const events = new Hono<{ Bindings: Env }>();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const registerSchema = z.object({
  eventId: z.string().min(1, 'eventId is required').max(200),
  email: z.string().email('Invalid email').transform((s) => s.trim().toLowerCase()),
  title: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  location: z.string().optional(),
  capacity: z.number().int().min(0).optional(),
});

/** In-memory rate limit: IP -> { count, resetAt } (resets on cold start) */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  entry.count += 1;
  return entry.count <= RATE_LIMIT_MAX;
}

function buildConfirmationEmailHtml(params: {
  eventTitle: string;
  date?: string;
  time?: string;
  location?: string;
}) {
  const { eventTitle, date, time, location } = params;
  const maroon = '#61223b';
  const gold = '#caa258';
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration confirmed</title>
</head>
<body style="margin:0;padding:0;font-family:'Raleway','Trebuchet MS',sans-serif;background-color:#FAF8F3;color:#2C2A29;">
  <div style="max-width:600px;margin:0 auto;">
    <div style="background:${maroon};color:#fff;padding:24px 24px 20px;border-radius:12px 12px 0 0;">
      <h1 style="margin:0;font-size:1.5rem;font-weight:700;">Stellenbosch University</h1>
      <p style="margin:8px 0 0;font-size:0.9rem;opacity:0.95;">Computer Science Division</p>
    </div>
    <div style="background:#fff;padding:28px 24px;border-radius:0 0 12px 12px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
      <p style="margin:0 0 16px;font-size:1rem;line-height:1.5;">You have successfully registered for this event.</p>
      <div style="border-left:4px solid ${gold};padding:12px 16px;margin:20px 0;background:#FAF8F3;border-radius:0 8px 8px 0;">
        <p style="margin:0 0 6px;font-size:1.1rem;font-weight:700;color:${maroon};">${escapeHtml(eventTitle)}</p>
        ${date ? `<p style="margin:4px 0;font-size:0.9rem;color:#4d5356;">Date: ${escapeHtml(date)}</p>` : ''}
        ${time ? `<p style="margin:4px 0;font-size:0.9rem;color:#4d5356;">Time: ${escapeHtml(time)}</p>` : ''}
        ${location ? `<p style="margin:4px 0;font-size:0.9rem;color:#4d5356;">Location: ${escapeHtml(location)}</p>` : ''}
      </div>
      <p style="margin:20px 0 0;font-size:0.85rem;color:#4d5356;">We look forward to seeing you there.</p>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function rowToEvent(row: Record<string, unknown>) {
  return {
    id: row.id as number,
    slug: row.slug as string,
    title: row.title as string,
    body_md: row.body_md as string | null,
    location: row.location as string | null,
    start_at: row.start_at as string,
    end_at: row.end_at as string | null,
    cover_image_key: row.cover_image_key as string | null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}

events.get('/', async (c) => {
  const { results } = await c.env.csdept_db.prepare(
    'SELECT * FROM events ORDER BY start_at DESC'
  ).all();
  return c.json({ data: results.map(rowToEvent) });
});

events.get('/registrations/count', async (c) => {
  const eventId = c.req.query('eventId');
  if (!eventId || eventId.length > 200) {
    return c.json({ error: 'eventId query is required' }, 400);
  }
  const row = await c.env.csdept_db.prepare(
    'SELECT COUNT(*) as count FROM event_registrations WHERE event_id = ?'
  ).bind(eventId).first();
  const count = (row?.count as number) ?? 0;
  return c.json({ count });
});

events.post('/register', async (c) => {
  const ip = c.req.header('cf-connecting-ip') ?? c.req.header('x-forwarded-for') ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return c.json({ error: 'Too many requests. Please try again later.' }, 429);
  }

  let body: z.infer<typeof registerSchema>;
  try {
    const raw = await c.req.json();
    body = registerSchema.parse(raw);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const msg = err.errors.map((e) => e.message).join('; ') || 'Invalid request';
      return c.json({ error: msg }, 400);
    }
    return c.json({ error: 'Invalid request body' }, 400);
  }

  const { eventId, email, title, date, time, location, capacity } = body;

  if (!EMAIL_REGEX.test(email)) {
    return c.json({ error: 'Invalid email address' }, 400);
  }

  if (capacity !== undefined && capacity > 0) {
    const countRow = await c.env.csdept_db.prepare(
      'SELECT COUNT(*) as count FROM event_registrations WHERE event_id = ?'
    ).bind(eventId).first();
    const currentCount = (countRow?.count as number) ?? 0;
    if (currentCount >= capacity) {
      return c.json({ error: 'This event is full.' }, 400);
    }
  }

  const existing = await c.env.csdept_db.prepare(
    'SELECT id FROM event_registrations WHERE event_id = ? AND email = ?'
  ).bind(eventId, email).first();

  const alreadyRegistered = !!existing;

  if (!alreadyRegistered) {
    try {
      await c.env.csdept_db.prepare(
        'INSERT INTO event_registrations (event_id, email) VALUES (?, ?)'
      ).bind(eventId, email).run();
    } catch (e) {
      if (String(e).includes('UNIQUE constraint')) {
        // Raced with another request
        return c.json({
          ok: true,
          alreadyRegistered: true,
          emailSent: false,
          count: await getRegistrationCount(c.env.csdept_db, eventId),
        });
      }
      throw e;
    }
  }

  let emailSent = false;
  if (c.env.RESEND_API_KEY && c.env.RESEND_FROM) {
    try {
      const subject = `Registration confirmed: ${title ?? 'Event'}`;
      const html = buildConfirmationEmailHtml({ eventTitle: title ?? 'Event', date, time, location });
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${c.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: c.env.RESEND_FROM,
          to: [email],
          subject,
          html,
        }),
      });
      if (res.ok) {
        emailSent = true;
      } else {
        console.error('[events/register] Resend failed', await res.text());
      }
    } catch (e) {
      console.error('[events/register] Email send error', e);
    }
  }

  const count = await getRegistrationCount(c.env.csdept_db, eventId);
  return c.json({
    ok: true,
    alreadyRegistered,
    emailSent,
    count,
  });
});

async function getRegistrationCount(db: D1Database, eventId: string): Promise<number> {
  const row = await db.prepare(
    'SELECT COUNT(*) as count FROM event_registrations WHERE event_id = ?'
  ).bind(eventId).first();
  return (row?.count as number) ?? 0;
}

events.get('/:slug', async (c) => {
  const slug = c.req.param('slug');
  const row = await c.env.csdept_db.prepare('SELECT * FROM events WHERE slug = ?').bind(slug).first();
  if (!row) return c.json({ error: 'Not found' }, 404);
  return c.json(rowToEvent(row as Record<string, unknown>));
});

events.post('/', requireAdmin, zValidator('json', eventCreateSchema), async (c) => {
  const body = c.req.valid('json');
  const { slug, title, body_md, location, start_at, end_at, cover_image_key } = body;
  await c.env.csdept_db.prepare(
    `INSERT INTO events (slug, title, body_md, location, start_at, end_at, cover_image_key) VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(slug, title, body_md ?? null, location ?? null, start_at, end_at ?? null, cover_image_key ?? null).run();
  const row = await c.env.csdept_db.prepare('SELECT * FROM events WHERE slug = ?').bind(slug).first();
  return c.json(rowToEvent(row as Record<string, unknown>), 201);
});

events.put('/:id', requireAdmin, zValidator('json', eventUpdateSchema), async (c) => {
  const id = c.req.param('id');
  const body = c.req.valid('json');
  const fields = ['slug', 'title', 'body_md', 'location', 'start_at', 'end_at', 'cover_image_key'];
  const updates: string[] = [];
  const values: unknown[] = [];
  for (const f of fields) {
    if ((body as Record<string, unknown>)[f] !== undefined) {
      updates.push(`${f} = ?`);
      values.push((body as Record<string, unknown>)[f]);
    }
  }
  if (updates.length === 0) return c.json({ error: 'No fields to update' }, 400);
  updates.push('updated_at = datetime(\'now\')');
  values.push(id);
  await c.env.csdept_db.prepare(
    `UPDATE events SET ${updates.join(', ')} WHERE id = ?`
  ).bind(...values).run();
  const row = await c.env.csdept_db.prepare('SELECT * FROM events WHERE id = ?').bind(id).first();
  if (!row) return c.json({ error: 'Not found' }, 404);
  return c.json(rowToEvent(row as Record<string, unknown>));
});

events.delete('/:id', requireAdmin, async (c) => {
  const id = c.req.param('id');
  const r = await c.env.csdept_db.prepare('DELETE FROM events WHERE id = ?').bind(id).run();
  if (r.meta.changes === 0) return c.json({ error: 'Not found' }, 404);
  return c.json({ ok: true });
});

export const eventsRoutes = events;
