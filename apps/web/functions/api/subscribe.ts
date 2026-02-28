const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildWelcomeEmailContent(
  unsubscribeUrl: string,
  siteUrl: string,
  outcome: 'new' | 'resubscribed',
): { subject: string; html: string; text: string } {
  const isResubscribe = outcome === 'resubscribed';
  const subject = isResubscribe
    ? "You're back – Stellenbosch University Computer Science Updates"
    : 'Welcome to Stellenbosch University Computer Science Updates';

  const message = isResubscribe
    ? "You're back on our list. We'll send you updates about events, seminars and news from the Computer Science Division."
    : 'Thank you for subscribing. You’ll receive updates about events, seminars and news from the Computer Science Division.';

  const siteLabel = siteUrl ? siteUrl.replace(/^https?:\/\//, '').replace(/\/+$/, '') : 'our website';

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
      <p style="margin:0 0 16px;line-height:1.6;">${message}</p>
      <p style="margin:0 0 20px;line-height:1.6;">Visit ${siteLabel} for the latest events and news.</p>
      <p style="margin:0 0 20px;"><a href="${siteUrl || 'https://www.sun.ac.za'}" style="display:inline-block;padding:12px 24px;background:#caa258;color:#fff;text-decoration:none;font-weight:600;border-radius:8px;">Visit site</a></p>
      <p style="margin:0;line-height:1.6;font-size:0.9rem;">If you no longer wish to receive these emails, you can <a href="${unsubscribeUrl}" style="color:#61223b;font-weight:600;">unsubscribe here</a>.</p>
    </div>
    <div style="border-top:1px solid #eee;padding:16px 28px;font-size:12px;color:#666;">
      Stellenbosch University · Computer Science Division
    </div>
  </div>
</body>
</html>`;

  const text = `${message}\n\nVisit ${siteUrl || 'https://www.sun.ac.za'} for the latest events and news.\n\nTo unsubscribe: ${unsubscribeUrl}\n\n— Stellenbosch University · Computer Science Division`;

  return { subject, html, text };
}

async function sendWelcomeEmail(
  env: any,
  to: string,
  unsubscribeUrl: string,
  outcome: 'new' | 'resubscribed',
): Promise<void> {
  const apiKey = env.RESEND_API_KEY as string | undefined;
  const from = env.RESEND_FROM as string | undefined;

  if (!apiKey || !from) {
    console.log('subscribe_welcome_skip', { reason: !apiKey ? 'RESEND_API_KEY missing' : 'RESEND_FROM missing' });
    return;
  }

  const publicUrl = (env.PUBLIC_SITE_URL as string | undefined) ?? '';
  const siteUrl = publicUrl.replace(/\/+$/, '') || '';

  console.log('welcome_email_attempt', { email: to, outcome });

  const { subject, html, text } = buildWelcomeEmailContent(unsubscribeUrl, siteUrl, outcome);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: [to], subject, html, text }),
    });

    console.log('welcome_email_result', { status: res.status, ok: res.ok });

    if (!res.ok) {
      const body = await res.text();
      const truncated = body.length > 300 ? body.slice(0, 300) + '…' : body;
      console.log('welcome_email_error_body', { body: truncated });
    }
  } catch (err: any) {
    console.log('welcome_email_exception', { message: err?.message || String(err) });
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
  console.log('subscribe_request', { hasOrigin: !!request.headers.get('Origin') });

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
    const unsubscribeBase = baseUrl ? `${baseUrl}/api/unsubscribe` : '/api/unsubscribe';

    if (existing) {
      if (existing.status === 'active') {
        console.log('subscribe_outcome', { email, outcome: 'already_active' });
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

      const token = (existing as any).token;
      const unsubUrl = `${unsubscribeBase}?token=${encodeURIComponent(token)}`;
      console.log('subscribe_outcome', { email, outcome: 'resubscribed' });
      await sendWelcomeEmail(env, email, unsubUrl, 'resubscribed');

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

    const unsubUrl = `${unsubscribeBase}?token=${encodeURIComponent(token)}`;
    console.log('subscribe_outcome', { email, outcome: 'new' });
    await sendWelcomeEmail(env, email, unsubUrl, 'new');

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

