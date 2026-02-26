import { createMiddleware } from 'hono/factory';
import { SignJWT, jwtVerify } from 'jose';
import type { Env, Variables } from './bindings.js';

const JWT_ALG = 'HS256';
const COOKIE_NAME = 'admin_session';

export async function hashPassword(password: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  const salt = enc.encode(secret.slice(0, 16));
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    key,
    256
  );
  return Array.from(new Uint8Array(bits))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function verifyPassword(password: string, secret: string, storedHash: string): Promise<boolean> {
  const computed = await hashPassword(password, secret);
  return computed === storedHash;
}

export async function signToken(env: Env, username: string): Promise<string> {
  return new SignJWT({ sub: username })
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(env.JWT_SECRET));
}

export async function verifyToken(env: Env, token: string): Promise<{ sub: string } | null> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(env.JWT_SECRET));
    return payload.sub ? { sub: payload.sub as string } : null;
  } catch {
    return null;
  }
}

export function getTokenFromCookie(c: { req: { header: (name: string) => string | undefined } }): string | undefined {
  const cookie = c.req.header('Cookie');
  if (!cookie) return undefined;
  const match = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return match ? match[1].trim() : undefined;
}

export const requireAdmin = createMiddleware<{ Bindings: Env; Variables: Variables }>(async (c, next) => {
  const token = getTokenFromCookie(c);
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  const payload = await verifyToken(c.env, token);
  if (!payload) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  c.set('adminUser', payload.sub);
  await next();
});

export { COOKIE_NAME };
