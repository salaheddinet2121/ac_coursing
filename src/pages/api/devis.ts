import type { APIRoute } from 'astro';
import { buildQuoteEmail, type QuoteRequest } from '../../lib/quote-mail';
import { sendBusinessEmail } from '../../lib/mailer';
import { checkRateLimit } from '../../lib/rate-limit';

export const prerender = false;

const MAX_BODY_BYTES = 32_768; // 32 KB
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(message: string) {
  return new Response(JSON.stringify({ ok: false, message }), {
    status: 400,
    headers: { 'content-type': 'application/json' },
  });
}

function tooMany() {
  return new Response(
    JSON.stringify({ ok: false, message: 'Trop de demandes. Merci de réessayer dans une heure.' }),
    { status: 429, headers: { 'content-type': 'application/json' } },
  );
}

function parsePayload(body: unknown): QuoteRequest | null {
  if (!body || typeof body !== 'object') {
    return null;
  }

  const candidate = body as Record<string, unknown>;
  const inventory = Array.isArray(candidate.inventory)
    ? candidate.inventory
        .map((item) => {
          if (!item || typeof item !== 'object') {
            return null;
          }

          const record = item as Record<string, unknown>;
          const id = typeof record.id === 'string' ? record.id.trim() : '';
          const qty = typeof record.qty === 'number' ? record.qty : Number(record.qty ?? 0);

          return id && Number.isFinite(qty) ? { id, qty } : null;
        })
        .filter((item): item is { id: string; qty: number } => Boolean(item))
    : [];

  return {
    moveType: candidate.moveType === 'professionnel' ? 'professionnel' : 'particulier',
    fromCity: typeof candidate.fromCity === 'string' ? candidate.fromCity.trim() : '',
    toCity: typeof candidate.toCity === 'string' ? candidate.toCity.trim() : '',
    moveDate: typeof candidate.moveDate === 'string' ? candidate.moveDate : undefined,
    accessType:
      candidate.accessType === 'escaliers' || candidate.accessType === 'rdc' ? candidate.accessType : 'ascenseur',
    inventory,
    otherItems: typeof candidate.otherItems === 'string' ? candidate.otherItems.trim() : '',
    specialItems: Array.isArray(candidate.specialItems)
      ? candidate.specialItems.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
      : [],
    name: typeof candidate.name === 'string' ? candidate.name.trim() : '',
    phone: typeof candidate.phone === 'string' ? candidate.phone.trim() : '',
    email: typeof candidate.email === 'string' ? candidate.email.trim() : '',
  };
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Payload size guard
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return badRequest('Payload trop volumineux.');
  }

  // Rate limit: 5 submissions per IP per hour
  if (!checkRateLimit(clientAddress, 'devis', 5)) {
    return tooMany();
  }

  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return badRequest('Payload trop volumineux.');
    }

    const body = JSON.parse(raw);
    const payload = parsePayload(body);

    if (!payload) {
      return badRequest('Payload invalide.');
    }

    if (!payload.fromCity || !payload.toCity || !payload.name || !payload.phone || !payload.email) {
      return badRequest('Merci de renseigner les champs obligatoires.');
    }

    if (!EMAIL_RE.test(payload.email)) {
      return badRequest('Adresse email invalide.');
    }

    const email = buildQuoteEmail(payload);
    const params = new URLSearchParams({
      from: payload.fromCity,
      to: payload.toCity,
      name: payload.name,
    });

    if (payload.moveDate) {
      params.set('date', payload.moveDate);
    }

    await sendBusinessEmail({
      subject: `Demande de devis - ${payload.name} - ${payload.fromCity} -> ${payload.toCity}`,
      html: email.html,
      text: email.text,
      replyTo: payload.email,
    });

    return new Response(
      JSON.stringify({
        ok: true,
        redirectTo: `/devis/merci?${params.toString()}`,
      }),
      {
        status: 200,
        headers: { 'content-type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Quote request submission failed', error);

    return new Response(
      JSON.stringify({
        ok: false,
        message: "L'envoi du devis a échoué. Merci de réessayer dans un instant.",
      }),
      {
        status: 500,
        headers: { 'content-type': 'application/json' },
      },
    );
  }
};
