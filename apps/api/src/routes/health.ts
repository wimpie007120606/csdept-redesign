import { Hono } from 'hono';
import type { Env } from '../bindings.js';

const health = new Hono<{ Bindings: Env }>();

health.get('/', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export const healthRoutes = health;
