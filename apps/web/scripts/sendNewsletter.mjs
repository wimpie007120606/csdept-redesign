#!/usr/bin/env node
/**
 * Send a newsletter via the production /api/send-newsletter endpoint.
 *
 * Required env vars:
 *   ADMIN_SEND_TOKEN  - must match X-Admin-Token header (secret)
 *   PUBLIC_SITE_URL   - e.g. https://cs.vantondertech.dev
 *
 * Usage:
 *   PUBLIC_SITE_URL=https://... ADMIN_SEND_TOKEN=xxx node scripts/sendNewsletter.mjs --subject "News" --html "<p>Hello</p>"
 *   echo '{"subject":"News","html":"<p>Hello</p>"}' | PUBLIC_SITE_URL=... ADMIN_SEND_TOKEN=xxx node scripts/sendNewsletter.mjs
 */
const token = process.env.ADMIN_SEND_TOKEN;
const baseUrl = (process.env.PUBLIC_SITE_URL || '').replace(/\/+$/, '');

if (!token) {
  console.error('Error: ADMIN_SEND_TOKEN environment variable is required.');
  process.exit(1);
}
if (!baseUrl) {
  console.error('Error: PUBLIC_SITE_URL environment variable is required (e.g. https://cs.vantondertech.dev).');
  process.exit(1);
}

async function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => resolve(data));
  });
}

async function main() {
  let subject, html, text;

  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--subject' && args[i + 1]) {
      subject = args[++i];
    } else if (args[i] === '--html' && args[i + 1]) {
      html = args[++i];
    } else if (args[i] === '--text' && args[i + 1]) {
      text = args[++i];
    }
  }

  if (!subject || !html) {
    const stdin = await readStdin();
    if (stdin.trim()) {
      try {
        const body = JSON.parse(stdin);
        subject = subject || body.subject;
        html = html || body.html;
        text = text || body.text;
      } catch (e) {
        console.error('Stdin is not valid JSON.');
        process.exit(1);
      }
    }
  }

  if (!subject || !html) {
    console.error('Usage: ADMIN_SEND_TOKEN=xxx PUBLIC_SITE_URL=xxx node scripts/sendNewsletter.mjs --subject "Subject" --html "<p>Body</p>"');
    console.error('   or: echo \'{"subject":"...","html":"..."}\' | ADMIN_SEND_TOKEN=xxx PUBLIC_SITE_URL=xxx node scripts/sendNewsletter.mjs');
    process.exit(1);
  }

  const url = `${baseUrl}/api/send-newsletter`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Token': token,
    },
    body: JSON.stringify({ subject, html, text }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error('Request failed:', res.status, data.error || res.statusText);
    process.exit(1);
  }
  console.log('OK:', data.sent, 'sent,', data.failed, 'failed');
}

main();
