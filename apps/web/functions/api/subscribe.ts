const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendWelcomeEmail(
  env: any,
  to: string,
  unsubscribeUrl: string,
  isResubscribe: boolean,
): Promise<void> {
  const apiKey = env.RESEND_API_KEY as string | undefined;
  const from = env.RESEND_FROM as string | undefined;
  if (!apiKey || !from) return;

  const subject = isResubscribe
    ? "You're back – Stellenbosch University Computer Science Updates"
    : 'Welcome to Stellenbosch University Computer Science Updates';

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;font-family:'Segoe UI',system-ui,sans-serif;background:#faf8f3;color:#2c2a29;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    <div style="background:#61223b;color:#fff;padding:24px 28px;">
      <h1 style="margin:0;font-size:1.5rem;font-weight:700;">Stellenbosch University</h1>
      <p style="margin:8px 0 0;font-size:0.95rem;opacity:0.95;">Computer Science Division</p>
    </div>
    <div style="padding:28px;">
      <p style="margin:0 0 16px;line-height:1.6;">${isResubscribe ? "You're back on our list. We'll send you updates about events, seminars and news from the Computer Science Division." : 'Thank you for subscribing. You’ll receive updates about events, seminars and news from the Computer Science Division.'}</p>
      <p style="margin:0;line-height:1.6;">If you no longer wish to receive these emails, you can <a href="${unsubscribeUrl}" style="color:#61223b;font-weight:600;">unsubscribe here</a>.</p>
    </div>
    <div style="border-top:1px solid #eee;padding:16px 28px;font-size:12px;color:#666;">
      Stellenbosch University · Computer Science Division
    </div>
  </div>
</body>
</html>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: [to], subject, html }),
    });
    if (!res.ok && env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Welcome email failed', res.status, await res.text());
    }
  } catch (err: any) {
    if (env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Welcome email error', err);
    }
  }
}

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
      .prepare('SELECT id, status, token FROM subscribers WHERE email = ?')
      .bind(email)
      .first();

    const publicUrl = (env.PUBLIC_SITE_URL as string | undefined) ?? '';
    const baseUrl = publicUrl.replace(/\/+$/, '');

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

      const unsubUrl = `${baseUrl}/api/unsubscribe?token=${encodeURIComponent((existing as any).token)}`;
      void sendWelcomeEmail(env, email, unsubUrl, true);

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

    const unsubUrl = `${baseUrl}/api/unsubscribe?token=${encodeURIComponent(token)}`;
    void sendWelcomeEmail(env, email, unsubUrl, false);

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

