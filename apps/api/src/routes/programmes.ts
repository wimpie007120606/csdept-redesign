import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import type { Env } from '../bindings.js';
import { requireAdmin } from '../auth.js';
import { programmeCreateSchema, programmeUpdateSchema } from '@csdept/shared';

const programmes = new Hono<{ Bindings: Env }>();

function rowToProgramme(row: Record<string, unknown>) {
  return {
    id: row.id as number,
    slug: row.slug as string,
    name: row.name as string,
    focal_area: row.focal_area as string | null,
    admission_requirements_md: row.admission_requirements_md as string | null,
    continued_study_md: row.continued_study_md as string | null,
    notes_md: row.notes_md as string | null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}

function rowToYear(row: Record<string, unknown>) {
  return {
    id: row.id as number,
    programme_id: row.programme_id as number,
    year_number: row.year_number as number,
    min_credits: row.min_credits as number | null,
    max_credits: row.max_credits as number | null,
    notes_md: row.notes_md as string | null,
  };
}

function rowToModule(row: Record<string, unknown>) {
  return {
    id: row.id as number,
    programme_year_id: row.programme_year_id as number,
    group_name: row.group_name as string | null,
    module_code: row.module_code as string,
    module_name: row.module_name as string,
    credits: row.credits as number,
    is_compulsory: (row.is_compulsory as number) === 1,
    notes_md: row.notes_md as string | null,
    sort_order: row.sort_order as number,
  };
}

programmes.get('/', async (c) => {
  const { results } = await c.env.csdept_db.prepare(
    'SELECT * FROM programmes ORDER BY name'
  ).all();
  return c.json({ data: results.map(rowToProgramme) });
});

programmes.get('/:slug', async (c) => {
  const slug = c.req.param('slug');
  const row = await c.env.csdept_db.prepare('SELECT * FROM programmes WHERE slug = ?').bind(slug).first();
  if (!row) return c.json({ error: 'Not found' }, 404);
  const prog = rowToProgramme(row as Record<string, unknown>);
  const { results: years } = await c.env.csdept_db.prepare(
    'SELECT * FROM programme_years WHERE programme_id = ? ORDER BY year_number'
  ).bind(prog.id).all();
  const yearsWithModules = await Promise.all(
    (years as Record<string, unknown>[]).map(async (y) => {
      const { results: mods } = await c.env.csdept_db.prepare(
        'SELECT * FROM programme_modules WHERE programme_year_id = ? ORDER BY sort_order, id'
      ).bind(y.id).all();
      return { ...rowToYear(y), modules: (mods as Record<string, unknown>[]).map(rowToModule) };
    })
  );
  return c.json({ ...prog, years: yearsWithModules });
});

programmes.get('/:slug/years', async (c) => {
  const slug = c.req.param('slug');
  const row = await c.env.csdept_db.prepare('SELECT * FROM programmes WHERE slug = ?').bind(slug).first();
  if (!row) return c.json({ error: 'Not found' }, 404);
  const prog = row as Record<string, unknown>;
  const { results: years } = await c.env.csdept_db.prepare(
    'SELECT * FROM programme_years WHERE programme_id = ? ORDER BY year_number'
  ).bind(prog.id).all();
  const yearsWithModules = await Promise.all(
    (years as Record<string, unknown>[]).map(async (y) => {
      const { results: mods } = await c.env.csdept_db.prepare(
        'SELECT * FROM programme_modules WHERE programme_year_id = ? ORDER BY sort_order, id'
      ).bind(y.id).all();
      return { ...rowToYear(y), modules: (mods as Record<string, unknown>[]).map(rowToModule) };
    })
  );
  return c.json({ data: yearsWithModules });
});

programmes.post('/', requireAdmin, zValidator('json', programmeCreateSchema), async (c) => {
  const body = c.req.valid('json');
  const { slug, name, focal_area, admission_requirements_md, continued_study_md, notes_md } = body;
  await c.env.csdept_db.prepare(
    `INSERT INTO programmes (slug, name, focal_area, admission_requirements_md, continued_study_md, notes_md) VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(slug, name, focal_area ?? null, admission_requirements_md ?? null, continued_study_md ?? null, notes_md ?? null).run();
  const row = await c.env.csdept_db.prepare('SELECT * FROM programmes WHERE slug = ?').bind(slug).first();
  return c.json(rowToProgramme(row as Record<string, unknown>), 201);
});

programmes.put('/:id', requireAdmin, zValidator('json', programmeUpdateSchema), async (c) => {
  const id = c.req.param('id');
  const body = c.req.valid('json');
  const fields = ['slug', 'name', 'focal_area', 'admission_requirements_md', 'continued_study_md', 'notes_md'];
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
    `UPDATE programmes SET ${updates.join(', ')} WHERE id = ?`
  ).bind(...values).run();
  const row = await c.env.csdept_db.prepare('SELECT * FROM programmes WHERE id = ?').bind(id).first();
  if (!row) return c.json({ error: 'Not found' }, 404);
  return c.json(rowToProgramme(row as Record<string, unknown>));
});

export const programmesRoutes = programmes;
