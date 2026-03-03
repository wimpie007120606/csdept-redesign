import { Hono } from 'hono';
import type { Env } from '../bindings.js';

const contact = new Hono<{ Bindings: Env }>();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ENQUIRY_LABELS: Record<string, string> = {
  general: 'General Enquiry',
  other: 'General Enquiry',
  research: 'General Enquiry',
  undergraduate: 'Undergraduate Admissions',
  postgraduate: 'Postgraduate Admissions',
};

const RECIPIENT_BY_LABEL: Record<string, string> = {
  'General Enquiry': 'cs@sun.ac.za',
  'Undergraduate Admissions': 'undergrad.cs@sun.ac.za',
  'Postgraduate Admissions': 'postgrad.cs@sun.ac.za',
};

const RATE_LIMIT_MS = 60_000;
const ipLastRequest = new Map<string, number>();

function getClientIp(c: any): string {
  const fromCf = c.req.header('cf-connecting-ip');
  if (fromCf) return fromCf;
  const fwd = c.req.header('x-forwarded-for');
  if (fwd) return fwd.split(',')[0]?.trim() || 'unknown';
  try {
    const url = new URL(c.req.url);
    return url.hostname;
  } catch {
    return 'unknown';
  }
}

async function sendViaResend(
  env: Env,
  params: { to: string; subject: string; html: string; text: string },
): Promise<boolean> {
  const apiKey = env.RESEND_API_KEY;
  const from = env.RESEND_FROM;
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
      console.error('Resend contact error status', res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Resend contact fetch error', (err as Error)?.message ?? String(err));
    return false;
  }
}

contact.post('/', async (c) => {
  const now = Date.now();
  const ip = getClientIp(c);
  const last = ipLastRequest.get(ip) ?? 0;

  if (now - last < RATE_LIMIT_MS) {
    return c.json({ ok: false, error: 'Too many requests, please try again shortly.' }, 429);
  }
  ipLastRequest.set(ip, now);

  let body: any;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ ok: false, error: 'Invalid JSON body' }, 400);
  }

  const company = typeof body?.company === 'string' ? body.company.trim() : '';
  if (company) {
    // Honeypot triggered – pretend success but do not send email.
    return c.json({ ok: true });
  }

  const firstName = typeof body?.firstName === 'string' ? body.firstName.trim() : '';
  const lastName = typeof body?.lastName === 'string' ? body.lastName.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const enquiryTypeRaw = typeof body?.enquiryType === 'string' ? body.enquiryType.trim() : '';
  const message = typeof body?.message === 'string' ? body.message.trim() : '';

  if (!firstName || !lastName || !email || !enquiryTypeRaw || !message) {
    return c.json({ ok: false, error: 'All fields are required.' }, 400);
  }
  if (!EMAIL_REGEX.test(email)) {
    return c.json({ ok: false, error: 'Please provide a valid email address.' }, 400);
  }
  if (message.length < 10 || message.length > 4000) {
    return c.json({ ok: false, error: 'Message must be between 10 and 4000 characters.' }, 400);
  }

  const enquiryKey = enquiryTypeRaw.toLowerCase();
  const enquiryLabel = ENQUIRY_LABELS[enquiryKey] ?? 'General Enquiry';
  const to = RECIPIENT_BY_LABEL[enquiryLabel] ?? RECIPIENT_BY_LABEL['General Enquiry'];

  const timestamp = new Date().toISOString();
  const publicUrl = c.env.PUBLIC_SITE_URL;
  const siteUrl = publicUrl || new URL(c.req.url).origin;

  const safeMessageHtml = message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br />');

  const fullName = `${firstName} ${lastName}`.trim();
  const subject = `[CS Dept Website] ${enquiryLabel} — ${fullName}`;

  const html = `
  <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; color: #111827;">
    <p>You have received a new contact form submission from the Computer Science Division website.</p>
    <p><strong>From:</strong> ${safeMessageHtml ? fullName : fullName}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>Enquiry type:</strong> ${enquiryLabel}</p>
    <p><strong>Submitted at:</strong> ${timestamp}</p>
    <p><strong>Site:</strong> <a href="${siteUrl}">${siteUrl}</a></p>
    <hr style="margin: 16px 0;" />
    <p><strong>Message:</strong></p>
    <p>${safeMessageHtml}</p>
  </div>
  `.trim();

  const text = [
    'New contact form submission from the Computer Science Division website.',
    '',
    `From: ${fullName}`,
    `Email: ${email}`,
    `Enquiry type: ${enquiryLabel}`,
    `Submitted at: ${timestamp}`,
    `Site: ${siteUrl}`,
    '',
    'Message:',
    message,
  ].join('\n');

  const ok = await sendViaResend(c.env, { to, subject, html, text });
  if (!ok) {
    console.error('Contact email send failed', { enquiryLabel, to });
    return c.json({ ok: false, error: 'Could not send message. Please try again later.' }, 500);
  }

  return c.json({ ok: true });
});

export const contactRoutes = contact;

