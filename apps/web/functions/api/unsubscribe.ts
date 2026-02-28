function htmlPage(title: string, body: string, homeUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background:#faf8f3; color:#2c2a29; padding:2rem; }
      .card { max-width:480px; margin:3rem auto; background:white; border-radius:1rem; padding:2rem; box-shadow:0 10px 30px rgba(0,0,0,0.08); }
      h1 { font-size:1.5rem; margin-bottom:1rem; color:#61223b; }
      p { line-height:1.6; margin-bottom:1rem; }
      a.button { display:inline-block; margin-top:1rem; padding:0.6rem 1.2rem; border-radius:999px; background:#61223b; color:white; text-decoration:none; font-weight:600; }
    </style>
  </head>
  <body>
    <div class="card">
      ${body}
      <a class="button" href="${homeUrl}">Back to site</a>
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
      '<h1>Unsubscribe</h1><p>This unsubscribe link is missing or invalid.</p>',
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
        '<h1>Unsubscribe</h1><p>This unsubscribe link is invalid or has already been used.</p>',
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
      '<h1>You have been unsubscribed</h1><p>You will no longer receive email updates from the Computer Science Department.</p>',
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
      '<h1>Something went wrong</h1><p>We could not process your unsubscribe request. Please try again later.</p>',
      publicUrl,
    );
    return new Response(html, {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
};

