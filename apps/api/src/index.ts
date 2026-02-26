import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { logger } from 'hono/logger';
import { healthRoutes } from './routes/health.js';
import { peopleRoutes } from './routes/people.js';
import { newsRoutes } from './routes/news.js';
import { eventsRoutes } from './routes/events.js';
import { programmesRoutes } from './routes/programmes.js';
import { adminRoutes } from './routes/admin.js';
import { assetsRoutes } from './routes/assets.js';
import type { Env, Variables } from './bindings.js';

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

app.use('*', logger());
app.use('*', secureHeaders());
app.use('*', cors({
  origin: (origin, c) => {
    const allowed = (c.env.CORS_ORIGIN ?? '*').split(',').map((s: string) => s.trim()).filter(Boolean);
    if (allowed.length === 0 || allowed.includes('*')) return origin || '*';
    if (!origin) return allowed[0];
    if (allowed.includes(origin)) return origin;
    return allowed[0];
  },
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.route('/api/health', healthRoutes);
app.route('/api/people', peopleRoutes);
app.route('/api/news', newsRoutes);
app.route('/api/events', eventsRoutes);
app.route('/api/programmes', programmesRoutes);
app.route('/api/admin', adminRoutes);
app.route('/api/assets', assetsRoutes);

app.notFound((c) => c.json({ error: 'Not Found' }, 404));
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

export default app;
