const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Absolute URL for SU/CS logo in emails (must be publicly accessible). */
function getWelcomeEmailLogoUrl(siteUrl: string): string {
  const base = (siteUrl || '').replace(/\/+$/, '');
  return base ? `${base}/brand/stellenbosch/su-logo-primary.jpeg` : '';
}

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

  const visitUrl = siteUrl || 'https://www.sun.ac.za';
  const logoUrl = getWelcomeEmailLogoUrl(siteUrl);

  // Email-safe: table layout, inline CSS only. Mac-style window bar + centered card.
  const logoBlock = logoUrl
    ? `<tr><td style="padding:24px 24px 8px 24px;text-align:center;"><img src="${logoUrl}" alt="Stellenbosch University Computer Science" width="140" height="140" style="display:block;margin:0 auto;max-width:140px;height:auto;" /></td></tr>`
    : '';

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;font-family:'Segoe UI',Tahoma,system-ui,sans-serif;background:#f5f5f5;color:#2c2a29;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;">
<tr><td align="center" style="padding:24px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.08);overflow:hidden;">
<tr><td style="background:#2d3748;padding:10px 16px;border-radius:12px 12px 0 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td width="28"><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#e74c3c;"></span></td>
<td width="28"><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#f1c40f;"></span></td>
<td width="28"><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#2ecc71;"></span></td>
<td></td>
</tr></table>
</td></tr>
${logoBlock}
<tr><td style="padding:8px 24px 16px 24px;text-align:center;"><h1 style="margin:0;font-size:1.5rem;font-weight:700;color:#61223b;">Welcome to the Computer Science Division</h1></td></tr>
<tr><td style="padding:0 24px 16px 24px;line-height:1.6;color:#2c2a29;">${message}</td></tr>
<tr><td style="padding:0 24px 8px 24px;line-height:1.6;color:#2c2a29;">Stay updated on events, seminars and news from Stellenbosch University's Computer Science Division.</td></tr>
<tr><td style="padding:16px 24px 24px 24px;text-align:center;"><a href="${visitUrl}" style="display:inline-block;padding:12px 28px;background:#c8a951;color:#ffffff;text-decoration:none;font-weight:600;border-radius:8px;">Visit the Website</a></td></tr>
<tr><td style="border-top:1px solid #eeeeee;padding:16px 24px;font-size:12px;color:#666666;line-height:1.5;">Computer Science Division<br/>Stellenbosch University<br/><a href="${unsubscribeUrl}" style="color:#61223b;font-weight:600;">Unsubscribe</a></td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  const text = `Welcome to the Computer Science Division\n\n${message}\n\nStay updated on events, seminars and news from Stellenbosch University's Computer Science Division.\n\nVisit the website: ${visitUrl}\n\nTo unsubscribe: ${unsubscribeUrl}\n\n— Computer Science Division\nStellenbosch University`;

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

