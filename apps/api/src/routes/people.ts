import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import type { Env, Variables } from '../bindings.js';
import { requireAdmin } from '../auth.js';
import { personCreateSchema, personUpdateSchema } from '@csdept/shared';

const people = new Hono<{ Bindings: Env; Variables: Variables }>();

function rowToPerson(row: Record<string, unknown>) {
  return {
    id: row.id as number,
    slug: row.slug as string,
    full_name: row.full_name as string,
    title: row.title as string | null,
    role: row.role as string | null,
    division: row.division as string | null,
    email_primary: row.email_primary as string | null,
    email_secondary: row.email_secondary as string | null,
    phone: row.phone as string | null,
    office: row.office as string | null,
    bio: row.bio as string | null,
    research_interests_json: row.research_interests_json as string | null,
    qualifications: row.qualifications as string | null,
    links_json: row.links_json as string | null,
    image_key: row.image_key as string | null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}

people.get('/', async (c) => {
  const { results } = await c.env.csdept_db.prepare(
    'SELECT * FROM people ORDER BY full_name'
  ).all();
  return c.json({ data: results.map(rowToPerson) });
});

people.get('/:slug', async (c) => {
  const slug = c.req.param('slug');
  const person = await c.env.csdept_db.prepare(
    'SELECT * FROM people WHERE slug = ?'
  ).bind(slug).first();
  if (!person) return c.json({ error: 'Not found' }, 404);

  const { results: pubs } = await c.env.csdept_db.prepare(
    'SELECT * FROM publications WHERE person_id = ? ORDER BY year DESC'
  ).bind((person as Record<string, unknown>).id).all();

  const byYear: Record<number, typeof pubs> = {};
  for (const p of pubs as Record<string, unknown>[]) {
    const y = p.year as number;
    if (!byYear[y]) byYear[y] = [];
    byYear[y].push(p);
  }
  const publications_by_year = Object.entries(byYear)
    .map(([year, publications]) => ({ year: Number(year), publications }))
    .sort((a, b) => b.year - a.year);

  return c.json({
    ...rowToPerson(person as Record<string, unknown>),
    publications: pubs,
    publications_by_year,
  });
});

people.post('/', requireAdmin, zValidator('json', personCreateSchema), async (c) => {
  const body = c.req.valid('json');
  const { slug, full_name, title, role, division, email_primary, email_secondary, phone, office, bio, research_interests_json, qualifications, links_json, image_key } = body;
  await c.env.csdept_db.prepare(
    `INSERT INTO people (slug, full_name, title, role, division, email_primary, email_secondary, phone, office, bio, research_interests_json, qualifications, links_json, image_key)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(slug, full_name ?? null, title ?? null, role ?? null, division ?? null, email_primary ?? null, email_secondary ?? null, phone ?? null, office ?? null, bio ?? null, research_interests_json ?? null, qualifications ?? null, links_json ?? null, image_key ?? null).run();
  const row = await c.env.csdept_db.prepare('SELECT * FROM people WHERE slug = ?').bind(slug).first();
  return c.json(rowToPerson(row as Record<string, unknown>), 201);
});

people.put('/:id', requireAdmin, zValidator('json', personUpdateSchema), async (c) => {
  const id = c.req.param('id');
  const body = c.req.valid('json');
  const fields = ['slug', 'full_name', 'title', 'role', 'division', 'email_primary', 'email_secondary', 'phone', 'office', 'bio', 'research_interests_json', 'qualifications', 'links_json', 'image_key'];
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
    `UPDATE people SET ${updates.join(', ')} WHERE id = ?`
  ).bind(...values).run();
  const row = await c.env.csdept_db.prepare('SELECT * FROM people WHERE id = ?').bind(id).first();
  if (!row) return c.json({ error: 'Not found' }, 404);
  return c.json(rowToPerson(row as Record<string, unknown>));
});

people.delete('/:id', requireAdmin, async (c) => {
  const id = c.req.param('id');
  const r = await c.env.csdept_db.prepare('DELETE FROM people WHERE id = ?').bind(id).run();
  if (r.meta.changes === 0) return c.json({ error: 'Not found' }, 404);
  return c.json({ ok: true });
});

export const peopleRoutes = people;
