const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getCorsOrigin(request: Request, env: any): string | null {
  const origin = request.headers.get('Origin');
  const allowed = env.PUBLIC_SITE_URL as string | undefined;
  if (!origin || !allowed) return null;
  return origin === allowed ? origin : null;
}

function buildCorsHeaders(request: Request, env: any, methods: string): Headers {
  const headers = new Headers();
  const origin = getCorsOrigin(request, env);
  if (origin) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Vary', 'Origin');
  }
  headers.set('Access-Control-Allow-Methods', methods);
  headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Token');
  headers.set('Access-Control-Max-Age', '86400');
  return headers;
}

export const onRequestOptions = async ({ request, env }: any) => {
  const headers = buildCorsHeaders(request, env, 'POST, OPTIONS');
  return new Response(null, { status: 204, headers });
};

export const onRequestPost = async ({ request, env }: any) => {
  const db = (env as any).DB;

  let body: any;
  try {
    body = await request.json();
  } catch {
    const headers = buildCorsHeaders(request, env, 'POST, OPTIONS');
    headers.set('Content-Type', 'application/json');
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON body' }), {
      status: 400,
      headers,
    });
  }

  const emailRaw = typeof body?.email === 'string' ? body.email : '';
  const email = emailRaw.trim().toLowerCase();

  const headers = buildCorsHeaders(request, env, 'POST, OPTIONS');
  headers.set('Content-Type', 'application/json');

  if (!email || !EMAIL_REGEX.test(email)) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid email address' }), {
      status: 400,
      headers,
    });
  }

  try {
    const existing = await db
      .prepare('SELECT id, status FROM subscribers WHERE email = ?')
      .bind(email)
      .first();

    if (existing) {
      if (existing.status === 'active') {
        return new Response(
          JSON.stringify({ ok: true, message: 'Already subscribed' }),
          { status: 200, headers },
        );
      }

      await db
        .prepare(
          "UPDATE subscribers SET status = 'active', unsubscribed_at = NULL WHERE id = ?",
        )
        .bind(existing.id)
        .run();

      return new Response(
        JSON.stringify({ ok: true, message: 'Resubscribed' }),
        { status: 200, headers },
      );
    }

    const token = crypto.randomUUID();

    await db
      .prepare("INSERT INTO subscribers (email, status, token) VALUES (?, 'active', ?)")
      .bind(email, token)
      .run();

    return new Response(JSON.stringify({ ok: true }), {
      status: 201,
      headers,
    });
  } catch (err: any) {
    if (env && env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error in /api/subscribe:', err);
    }
    return new Response(
      JSON.stringify({ ok: false, error: 'Internal error' }),
      { status: 500, headers },
    );
  }
};

