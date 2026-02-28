const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BATCH_SIZE = 50;

function buildCorsHeaders(request: Request, env: any, methods: string): Headers {
  const headers = new Headers();
  const origin = request.headers.get('Origin');
  const allowed = env.PUBLIC_SITE_URL as string | undefined;
  if (origin && allowed && origin === allowed) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Vary', 'Origin');
  }
  headers.set('Access-Control-Allow-Methods', methods);
  headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Token');
  headers.set('Access-Control-Max-Age', '86400');
  return headers;
}

async function sendViaResend(
  env: any,
  params: { to: string; subject: string; html: string; text?: string },
): Promise<boolean> {
  const apiKey = env.RESEND_API_KEY as string | undefined;
  const from = env.RESEND_FROM as string | undefined;
  if (!apiKey || !from) return false;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [params.to],
        subject: params.subject,
        html: params.html,
        text: params.text,
      }),
    });

    if (!res.ok) {
      if (env && env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Resend error for', params.to, res.status, await res.text());
      }
      return false;
    }
    return true;
  } catch (err: any) {
    if (env && env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Resend fetch error for', params.to, err);
    }
    return false;
  }
}

export const onRequestOptions = async ({ request, env }: any) => {
  const headers = buildCorsHeaders(request, env, 'POST, OPTIONS');
  return new Response(null, { status: 204, headers });
};

export const onRequestPost = async ({ request, env }: any) => {
  const headers = buildCorsHeaders(request, env, 'POST, OPTIONS');
  headers.set('Content-Type', 'application/json');

  const adminHeader = request.headers.get('X-Admin-Token') ?? request.headers.get('x-admin-token');
  const adminToken = env.ADMIN_SEND_TOKEN as string | undefined;
  if (!adminToken || adminHeader !== adminToken) {
    return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
      status: 401,
      headers,
    });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON body' }), {
      status: 400,
      headers,
    });
  }

  const subject = typeof body?.subject === 'string' ? body.subject.trim() : '';
  let html = typeof body?.html === 'string' ? body.html : '';
  let text = typeof body?.text === 'string' ? body.text : undefined;

  if (!subject || !html) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Both subject and html are required' }),
      { status: 400, headers },
    );
  }

  const publicUrl = (env.PUBLIC_SITE_URL as string | undefined) ?? '';
  const db = (env as any).DB;

  try {
    const result = await db
      .prepare("SELECT email, token FROM subscribers WHERE status = 'active'")
      .all();
    const rows = (result?.results as any[]) ?? [];

    if (!rows.length) {
      return new Response(JSON.stringify({ ok: true, sent: 0, failed: 0 }), {
        status: 200,
        headers,
      });
    }

    let sent = 0;
    let failed = 0;

    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
      const batch = rows.slice(i, i + BATCH_SIZE);

      const promises = batch.map(async (row) => {
        const email = String(row.email);
        if (!EMAIL_REGEX.test(email)) {
          failed += 1;
          return;
        }

        const token = String(row.token);
        const unsubscribeUrl = publicUrl
          ? `${publicUrl.replace(/\/+$/, '')}/api/unsubscribe?token=${encodeURIComponent(
              token,
            )}`
          : `/api/unsubscribe?token=${encodeURIComponent(token)}`;

        let finalHtml = html;
        if (!finalHtml.toLowerCase().includes('unsubscribe')) {
          finalHtml += `<hr style="margin-top:24px;margin-bottom:8px;border:none;border-top:1px solid #e5e5e5;" />
<p style="font-size:12px;color:#666666;">To unsubscribe from these emails, click <a href="${unsubscribeUrl}">here</a>.</p>`;
        } else {
          finalHtml = finalHtml.replace(
            '{{UNSUBSCRIBE_URL}}',
            unsubscribeUrl,
          );
        }

        let finalText = text;
        if (!finalText) {
          finalText = '';
        }
        if (!finalText.toLowerCase().includes('unsubscribe')) {
          finalText = `${finalText}\n\nTo unsubscribe: ${unsubscribeUrl}`.trim();
        } else {
          finalText = finalText.replace('{{UNSUBSCRIBE_URL}}', unsubscribeUrl);
        }

        const ok = await sendViaResend(env, { to: email, subject, html: finalHtml, text: finalText });
        if (ok) sent += 1;
        else failed += 1;
      });

      await Promise.allSettled(promises);
    }

    return new Response(JSON.stringify({ ok: true, sent, failed }), {
      status: 200,
      headers,
    });
  } catch (err: any) {
    if (env && env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error in /api/send-newsletter:', err);
    }
    return new Response(JSON.stringify({ ok: false, error: 'Internal error' }), {
      status: 500,
      headers,
    });
  }
};

