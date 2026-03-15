// ============================================================================
// Brevo (formerly Sendinblue) Email & Contacts API — Tapé Paraguay
// All email sends are fire-and-forget: errors are logged, never thrown.
// ============================================================================

const BREVO_API_URL = "https://api.brevo.com/v3";
const ADMIN_EMAIL = "info@tapeparaguay.com";
const ADMIN_NAME = "Tapé Paraguay";

// ---------------------------------------------------------------------------
// Internal: generic Brevo transactional email sender
// ---------------------------------------------------------------------------

interface BrevoEmailParams {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  sender?: { email: string; name: string };
}

async function sendBrevoEmail(params: BrevoEmailParams): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn("[Brevo] BREVO_API_KEY not set — skipping email send.");
    return false;
  }

  try {
    const res = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: params.sender ?? { email: ADMIN_EMAIL, name: ADMIN_NAME },
        to: params.to,
        subject: params.subject,
        htmlContent: params.htmlContent,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[Brevo] Email send failed (${res.status}):`, body);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Brevo] Email send error:", error);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Booking: admin notification
// ---------------------------------------------------------------------------

interface BookingData {
  fullName: string;
  email: string;
  phone?: string;
  preferredDate?: string;
  groupSize?: string;
  message?: string;
  segment?: string;
  tourSlug?: string;
  tourTitle?: string;
}

export async function sendBookingNotification(data: BookingData): Promise<void> {
  await sendBrevoEmail({
    to: [{ email: ADMIN_EMAIL, name: ADMIN_NAME }],
    subject: `Nueva reserva: ${data.tourTitle || "Consulta general"} — ${data.fullName}`,
    htmlContent: `
      <h2>Nueva solicitud de reserva</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Nombre</td><td style="padding:8px;border:1px solid #ddd;">${data.fullName}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${data.email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Teléfono</td><td style="padding:8px;border:1px solid #ddd;">${data.phone || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Tour</td><td style="padding:8px;border:1px solid #ddd;">${data.tourTitle || "—"} (${data.segment || "—"})</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Fecha preferida</td><td style="padding:8px;border:1px solid #ddd;">${data.preferredDate || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Tamaño grupo</td><td style="padding:8px;border:1px solid #ddd;">${data.groupSize || "1"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Mensaje</td><td style="padding:8px;border:1px solid #ddd;">${data.message || "—"}</td></tr>
      </table>
    `,
  });
}

// ---------------------------------------------------------------------------
// Booking: customer confirmation
// ---------------------------------------------------------------------------

export async function sendBookingConfirmation(data: BookingData): Promise<void> {
  await sendBrevoEmail({
    to: [{ email: data.email, name: data.fullName }],
    subject: "Confirmación de reserva — Tapé Paraguay",
    htmlContent: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#1a5632;">¡Gracias por tu reserva, ${data.fullName}!</h2>
        <p>Hemos recibido tu solicitud de reserva${data.tourTitle ? ` para <strong>${data.tourTitle}</strong>` : ""}.</p>
        ${data.preferredDate ? `<p><strong>Fecha preferida:</strong> ${data.preferredDate}</p>` : ""}
        ${data.groupSize ? `<p><strong>Tamaño del grupo:</strong> ${data.groupSize} persona(s)</p>` : ""}
        <p>Nuestro equipo revisará los detalles y te contactará dentro de las próximas <strong>24 horas</strong> para confirmar la disponibilidad y coordinar los siguientes pasos.</p>
        <p>Si tienes alguna consulta urgente, no dudes en escribirnos por WhatsApp.</p>
        <br/>
        <p style="color:#666;">— Equipo Tapé Paraguay</p>
      </div>
    `,
  });
}

// ---------------------------------------------------------------------------
// Contact: admin notification
// ---------------------------------------------------------------------------

interface ContactData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactNotification(data: ContactData): Promise<void> {
  await sendBrevoEmail({
    to: [{ email: ADMIN_EMAIL, name: ADMIN_NAME }],
    subject: `Nuevo contacto: ${data.subject} — ${data.fullName}`,
    htmlContent: `
      <h2>Nuevo mensaje de contacto</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Nombre</td><td style="padding:8px;border:1px solid #ddd;">${data.fullName}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${data.email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Asunto</td><td style="padding:8px;border:1px solid #ddd;">${data.subject}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Mensaje</td><td style="padding:8px;border:1px solid #ddd;">${data.message}</td></tr>
      </table>
      <p style="margin-top:16px;">Responder a: <a href="mailto:${data.email}">${data.email}</a></p>
    `,
  });
}

// ---------------------------------------------------------------------------
// Newsletter: add subscriber to Brevo contacts
// ---------------------------------------------------------------------------

export async function addNewsletterSubscriber(email: string): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn("[Brevo] BREVO_API_KEY not set — skipping contact creation.");
    return;
  }

  try {
    const res = await fetch(`${BREVO_API_URL}/contacts`, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        updateEnabled: true, // Update if contact already exists
        attributes: {
          SIGNUP_SOURCE: "website_newsletter",
          SIGNUP_DATE: new Date().toISOString(),
        },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      // 409 = contact already exists (that's fine with updateEnabled)
      if (res.status !== 409) {
        console.error(`[Brevo] Contact creation failed (${res.status}):`, body);
      }
    }
  } catch (error) {
    console.error("[Brevo] Contact creation error:", error);
  }
}
