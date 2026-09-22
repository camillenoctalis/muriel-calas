import { NextResponse } from "next/server";

/**
 * Réception du formulaire de contact.
 * Envoi par e-mail via l’API Resend si les variables d’environnement sont définies :
 *   RESEND_API_KEY, CONTACT_TO_EMAIL (destinataire), CONTACT_FROM_EMAIL (expéditeur vérifié)
 * Sans configuration : en développement, le message est simplement journalisé.
 */

const clean = (v: FormDataEntryValue | null, max = 2000) => String(v ?? "").trim().slice(0, max);
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return NextResponse.json({ message: "Requête invalide." }, { status: 400 });
  }

  // Piège à robots : on répond « OK » sans rien envoyer
  if (clean(data.get("website"))) return NextResponse.json({ ok: true });

  const payload = {
    firstName: clean(data.get("firstName"), 80),
    lastName: clean(data.get("lastName"), 80),
    email: clean(data.get("email"), 160),
    phone: clean(data.get("phone"), 40),
    profile: clean(data.get("profile"), 60),
    subject: clean(data.get("subject"), 120),
    message: clean(data.get("message"), 4000),
    consent: clean(data.get("consent"), 10),
  };

  if (!payload.firstName || !payload.lastName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || payload.message.length < 10 || !payload.consent) {
    return NextResponse.json({ message: "Certains champs obligatoires sont manquants ou invalides." }, { status: 422 });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Message reçu (mode démo, aucun e-mail envoyé) :", payload);
      return NextResponse.json({ ok: true, demo: true });
    }
    return NextResponse.json(
      { message: "Le formulaire est momentanément indisponible." },
      { status: 503 },
    );
  }

  const html = `
    <h2>Nouvelle demande depuis muriel-calas.fr</h2>
    <p><strong>${escape(payload.firstName)} ${escape(payload.lastName)}</strong> — ${escape(payload.profile)}</p>
    <p>E-mail : ${escape(payload.email)}<br/>Téléphone : ${escape(payload.phone || "—")}</p>
    <p>Sujet : ${escape(payload.subject)}</p>
    <p style="white-space:pre-line">${escape(payload.message)}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: payload.email,
      subject: `[Site] ${payload.subject} — ${payload.firstName} ${payload.lastName}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Échec d’envoi", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ message: "L’envoi a échoué." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
