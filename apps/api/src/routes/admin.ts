import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { setCookie, deleteCookie } from 'hono/cookie';
import type { Env, Variables } from '../bindings.js';
import { requireAdmin, signToken, verifyPassword, COOKIE_NAME } from '../auth.js';
import { loginSchema, r2UploadUrlSchema } from '@csdept/shared';

const admin = new Hono<{ Bindings: Env; Variables: Variables }>();

admin.post('/login', zValidator('json', loginSchema), async (c) => {
  const { username, password } = c.req.valid('json');
  const env = c.env;

  let storedHash: string | null = null;
  const row = await env.csdept_db.prepare(
    'SELECT password_hash FROM admin_users WHERE username = ?'
  ).bind(username).first();
  if (row) storedHash = (row as Record<string, unknown>).password_hash as string;

  const defaultUser = env.ADMIN_DEFAULT_USER ?? 'admin';
  const defaultPass = env.ADMIN_DEFAULT_PASS;

  let valid = false;
  if (storedHash) {
    valid = await verifyPassword(password, env.JWT_SECRET, storedHash);
  } else if (defaultPass && username === defaultUser) {
    valid = password === defaultPass;
  }

  if (!valid) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  const token = await signToken(env, username);
  setCookie(c, COOKIE_NAME, token, {
    httpOnly: true,
    secure: c.req.url.startsWith('https'),
    sameSite: 'Lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });
  return c.json({ ok: true, user: username });
});

admin.post('/logout', (c) => {
  deleteCookie(c, COOKIE_NAME, { path: '/' });
  return c.json({ ok: true });
});

admin.get('/me', requireAdmin, (c) => {
  const user = c.get('adminUser');
  return c.json({ user });
});

admin.post('/r2/upload-url', requireAdmin, zValidator('json', r2UploadUrlSchema), async (c) => {
  const { filename, contentType } = c.req.valid('json');
  const key = `uploads/${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const origin = new URL(c.req.url).origin;
  return c.json({
    key,
    uploadUrl: `${origin}/api/admin/r2/upload?key=${encodeURIComponent(key)}`,
    contentType: contentType || 'application/octet-stream',
  });
});

admin.put('/r2/upload', requireAdmin, async (c) => {
  const key = c.req.query('key');
  if (!key) return c.json({ error: 'Missing key' }, 400);
  const body = await c.req.arrayBuffer();
  const contentType = c.req.header('Content-Type') || 'application/octet-stream';
  await c.env.csdept_assets.put(key, body, {
    httpMetadata: { contentType },
  });
  return c.json({ key });
});

export const adminRoutes = admin;
