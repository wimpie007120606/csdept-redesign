import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import type { Env } from '../bindings.js';
import { requireAdmin } from '../auth.js';
import { newsCreateSchema, newsUpdateSchema } from '@csdept/shared';

const news = new Hono<{ Bindings: Env }>();

function rowToNews(row: Record<string, unknown>) {
  return {
    id: row.id as number,
    slug: row.slug as string,
    title: row.title as string,
    excerpt: row.excerpt as string | null,
    body_md: row.body_md as string | null,
    cover_image_key: row.cover_image_key as string | null,
    published_at: row.published_at as string | null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}

news.get('/', async (c) => {
  const { results } = await c.env.csdept_db.prepare(
    'SELECT * FROM news ORDER BY published_at DESC'
  ).all();
  return c.json({ data: results.map(rowToNews) });
});

news.get('/:slug', async (c) => {
  const slug = c.req.param('slug');
  const row = await c.env.csdept_db.prepare('SELECT * FROM news WHERE slug = ?').bind(slug).first();
  if (!row) return c.json({ error: 'Not found' }, 404);
  return c.json(rowToNews(row as Record<string, unknown>));
});

news.post('/', requireAdmin, zValidator('json', newsCreateSchema), async (c) => {
  const body = c.req.valid('json');
  const { slug, title, excerpt, body_md, cover_image_key, published_at } = body;
  await c.env.csdept_db.prepare(
    `INSERT INTO news (slug, title, excerpt, body_md, cover_image_key, published_at) VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(slug, title, excerpt ?? null, body_md ?? null, cover_image_key ?? null, published_at ?? null).run();
  const row = await c.env.csdept_db.prepare('SELECT * FROM news WHERE slug = ?').bind(slug).first();
  return c.json(rowToNews(row as Record<string, unknown>), 201);
});

news.put('/:id', requireAdmin, zValidator('json', newsUpdateSchema), async (c) => {
  const id = c.req.param('id');
  const body = c.req.valid('json');
  const fields = ['slug', 'title', 'excerpt', 'body_md', 'cover_image_key', 'published_at'];
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
    `UPDATE news SET ${updates.join(', ')} WHERE id = ?`
  ).bind(...values).run();
  const row = await c.env.csdept_db.prepare('SELECT * FROM news WHERE id = ?').bind(id).first();
  if (!row) return c.json({ error: 'Not found' }, 404);
  return c.json(rowToNews(row as Record<string, unknown>));
});

news.delete('/:id', requireAdmin, async (c) => {
  const id = c.req.param('id');
  const r = await c.env.csdept_db.prepare('DELETE FROM news WHERE id = ?').bind(id).run();
  if (r.meta.changes === 0) return c.json({ error: 'Not found' }, 404);
  return c.json({ ok: true });
});

export const newsRoutes = news;
