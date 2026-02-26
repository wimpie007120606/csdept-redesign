import { Hono } from 'hono';
import type { Env } from '../bindings.js';

const assets = new Hono<{ Bindings: Env }>();

assets.get('/:key{.+}', async (c) => {
  const key = decodeURIComponent(c.req.param('key'));
  const object = await c.env.csdept_assets.get(key);
  if (!object) return c.json({ error: 'Not found' }, 404);
  const headers = new Headers();
  if (object.httpMetadata?.contentType) {
    headers.set('Content-Type', object.httpMetadata.contentType);
  }
  return new Response(object.body, { headers });
});

export const assetsRoutes = assets;
