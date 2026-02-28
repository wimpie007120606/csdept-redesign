import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import type { Env } from '../bindings.js';
import { requireAdmin } from '../auth.js';
import { eventCreateSchema, eventUpdateSchema } from '@csdept/shared';

const events = new Hono<{ Bindings: Env }>();

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
