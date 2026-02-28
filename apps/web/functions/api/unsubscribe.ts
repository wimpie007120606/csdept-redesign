function htmlPage(title: string, body: string, homeUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title} – Stellenbosch University CS</title>
    <style>
      * { box-sizing: border-box; }
      body { font-family: 'Raleway', 'Trebuchet MS', system-ui, sans-serif; background: #faf8f3; color: #2c2a29; padding: 1.5rem; margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
      .card { max-width: 480px; width: 100%; background: #fff; border-radius: 1rem; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.08); }
      .header { background: #61223b; color: #fff; padding: 1.5rem 1.75rem; }
      .header h1 { margin: 0; font-size: 1.25rem; font-weight: 700; }
      .header p { margin: 0.35rem 0 0; font-size: 0.875rem; opacity: 0.9; }
      .body { padding: 1.75rem; }
      .body h2 { margin: 0 0 0.75rem; font-size: 1.125rem; color: #61223b; font-weight: 600; }
      .body p { margin: 0 0 1rem; line-height: 1.6; font-size: 0.9375rem; }
      .body p:last-of-type { margin-bottom: 0; }
      a.button { display: inline-block; margin-top: 1.25rem; padding: 0.65rem 1.35rem; border-radius: 999px; background: #61223b; color: #fff; text-decoration: none; font-weight: 600; font-size: 0.9375rem; }
      a.button:hover { background: #4a1930; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">
        <h1>Stellenbosch University</h1>
        <p>Computer Science Division</p>
      </div>
      <div class="body">
        ${body}
        <a class="button" href="${homeUrl}">Back to site</a>
      </div>
    </div>
  </body>
</html>`;
}

export const onRequestGet = async ({ request, env }: any) => {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  const publicUrl = (env.PUBLIC_SITE_URL as string | undefined) ?? '/';

  if (!token) {
    const html = htmlPage(
      'Unsubscribe',
      '<h2>Unsubscribe</h2><p>This unsubscribe link is missing or invalid.</p>',
      publicUrl,
    );
    return new Response(html, {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  const db = (env as any).DB;

  try {
    const subscriber = await db
      .prepare('SELECT id, email FROM subscribers WHERE token = ?')
      .bind(token)
      .first();

    if (!subscriber) {
      const html = htmlPage(
        'Unsubscribe',
        '<h2>Unsubscribe</h2><p>This unsubscribe link is invalid or has already been used.</p>',
        publicUrl,
      );
      return new Response(html, {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    await db
      .prepare(
        "UPDATE subscribers SET status = 'unsubscribed', unsubscribed_at = datetime('now') WHERE id = ?",
      )
      .bind(subscriber.id)
      .run();

    const html = htmlPage(
      'Unsubscribed',
      '<h2>You have been unsubscribed</h2><p>You will no longer receive email updates from the Computer Science Division.</p>',
      publicUrl,
    );

    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err: any) {
    if (env && env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error in /api/unsubscribe:', err);
    }
    const html = htmlPage(
      'Error',
      '<h2>Something went wrong</h2><p>We could not process your unsubscribe request. Please try again later.</p>',
      publicUrl,
    );
    return new Response(html, {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
};

