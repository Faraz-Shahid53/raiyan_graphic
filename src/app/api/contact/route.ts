import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  service?: string;
  budget?: string;
  message?: string;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const service = String(body.service ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (
    name.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !service ||
    message.length < 20
  ) {
    return NextResponse.json(
      { ok: false, error: "Validation failed." },
      { status: 400 }
    );
  }

  const sent = await sendEmail({
    name,
    email,
    service,
    budget: String(body.budget ?? "").trim(),
    message,
  });

  if (!sent) {
    return NextResponse.json(
      { ok: false, error: "Mail provider not configured." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

/**
 * Sends via Resend when RESEND_API_KEY + RESEND_FROM are set in .env.local.
 * Without keys it logs the enquiry, so local development never fails.
 * Swap this function for Formspree (or any provider) if you prefer.
 */
async function sendEmail(payload: {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.CONTACT_TO ?? "raiyanfaisal.fr@gmail.com";

  if (!apiKey || !from) {
    console.info("[contact] no RESEND_API_KEY — enquiry logged only:", payload);
    return true;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email,
      subject: `New enquiry — ${payload.service} (${payload.name})`,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\nService: ${payload.service}\nBudget: ${payload.budget}\n\n${payload.message}`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error:", await res.text());
    return false;
  }
  return true;
}
