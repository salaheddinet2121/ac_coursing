import { Resend } from 'resend';
import { client } from '../data/client';

type MailPayload = {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

let resend: Resend | undefined;

function getResend(): Resend {
  if (!resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('Missing RESEND_API_KEY environment variable');
    resend = new Resend(key);
  }
  return resend;
}

export async function sendBusinessEmail(payload: MailPayload) {
  const from = process.env.SMTP_FROM ?? 'AC Coursing <onboarding@resend.dev>';
  const to = process.env.CONTACT_RECIPIENT_EMAIL ?? client.email;

  const { data, error } = await getResend().emails.send({
    from,
    to,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
    replyTo: payload.replyTo,
  });

  if (error) throw new Error(error.message);
  return data;
}
