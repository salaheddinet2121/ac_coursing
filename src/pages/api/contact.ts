import type { APIRoute } from 'astro';
import { sendBusinessEmail } from '../../lib/mailer';
import { asCleanString, escapeHtml } from '../../lib/form-utils';
import { checkRateLimit } from '../../lib/rate-limit';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request, redirect, clientAddress }) => {
  // Rate limit: 5 submissions per IP per hour
  if (!checkRateLimit(clientAddress, 'contact', 5)) {
    return redirect('/contact?error=ratelimit', 303);
  }

  try {
    const formData = await request.formData();

    if (asCleanString(formData.get('bot-field'))) {
      return redirect('/contact/success', 303);
    }

    const payload = {
      name: asCleanString(formData.get('name')),
      phone: asCleanString(formData.get('phone')),
      email: asCleanString(formData.get('email')),
      departure: asCleanString(formData.get('departure')),
      destination: asCleanString(formData.get('destination')),
      moveDate: asCleanString(formData.get('move_date')),
      volume: asCleanString(formData.get('volume')),
      message: asCleanString(formData.get('message')),
    };

    if (!payload.name || !payload.phone) {
      return redirect('/contact?error=validation', 303);
    }

    if (payload.email && !EMAIL_RE.test(payload.email)) {
      return redirect('/contact?error=validation', 303);
    }

    const text = [
      'Nouvelle demande de contact',
      '',
      `Nom: ${payload.name}`,
      `Téléphone: ${payload.phone}`,
      `Email: ${payload.email || 'Non renseigné'}`,
      `Départ: ${payload.departure || 'Non renseigné'}`,
      `Arrivée: ${payload.destination || 'Non renseigné'}`,
      `Date souhaitée: ${payload.moveDate || 'Non renseignée'}`,
      `Volume estimé: ${payload.volume || 'Non renseigné'}`,
      '',
      `Précisions: ${payload.message || 'Aucune'}`,
    ].join('\n');

    const html = `
      <h1>Nouvelle demande de contact</h1>
      <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;border-color:#d7d7d7;">
        <tbody>
          <tr><th align="left" style="background:#f5f5f5;">Nom</th><td>${escapeHtml(payload.name)}</td></tr>
          <tr><th align="left" style="background:#f5f5f5;">Téléphone</th><td>${escapeHtml(payload.phone)}</td></tr>
          <tr><th align="left" style="background:#f5f5f5;">Email</th><td>${escapeHtml(payload.email || 'Non renseigné')}</td></tr>
          <tr><th align="left" style="background:#f5f5f5;">Départ</th><td>${escapeHtml(payload.departure || 'Non renseigné')}</td></tr>
          <tr><th align="left" style="background:#f5f5f5;">Arrivée</th><td>${escapeHtml(payload.destination || 'Non renseigné')}</td></tr>
          <tr><th align="left" style="background:#f5f5f5;">Date souhaitée</th><td>${escapeHtml(payload.moveDate || 'Non renseignée')}</td></tr>
          <tr><th align="left" style="background:#f5f5f5;">Volume estimé</th><td>${escapeHtml(payload.volume || 'Non renseigné')}</td></tr>
          <tr><th align="left" style="background:#f5f5f5;">Précisions</th><td>${escapeHtml(payload.message || 'Aucune')}</td></tr>
        </tbody>
      </table>
    `;

    await sendBusinessEmail({
      subject: `Contact site web - ${payload.name}`,
      text,
      html,
      replyTo: payload.email || undefined,
    });

    return redirect('/contact/success', 303);
  } catch (error) {
    console.error('Contact form submission failed', error);
    return redirect('/contact?error=smtp', 303);
  }
};
