// app/api/contact/route.js

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clean(value = "", maxLength = 2000) {
  return String(value).trim().slice(0, maxLength);
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request) {
  try {
    const body = await request.json();

    const name = clean(body.name, 120);
    const email = clean(body.email, 180);
    const phone = clean(body.phone, 80);
    const company = clean(body.company, 160);
    const machine = clean(body.machine, 180);
    const message = clean(body.message, 3000);
    const website = clean(body.website, 120);
    const startedAt = Number(body.startedAt);

    // Honeypot. Real users should never fill this in.
    if (website) {
      return Response.json({ ok: true });
    }

    // Bot timing check.
    const secondsToSubmit = (Date.now() - startedAt) / 1000;

    if (!startedAt || secondsToSubmit < 3) {
      return Response.json(
        { ok: false, error: "Please try submitting the form again." },
        { status: 400 },
      );
    }

    if (!name || name.length < 2) {
      return Response.json(
        { ok: false, error: "Please enter your name." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (!message || message.length < 10) {
      return Response.json(
        { ok: false, error: "Please include a short message." },
        { status: 400 },
      );
    }

    const subject = `New KB Folding Services inquiry from ${name}`;

    const text = `
New contact form submission from KB Folding Services.

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Company: ${company || "Not provided"}
Machine / Equipment: ${machine || "Not provided"}

Message:
${message}
`.trim();

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #191714;">
        <h2>New KB Folding Services inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Company:</strong> ${escapeHtml(company || "Not provided")}</p>
        <p><strong>Machine / Equipment:</strong> ${escapeHtml(machine || "Not provided")}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        { ok: false, error: "The message could not be sent right now." },
        { status: 500 },
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact route error:", error);

    return Response.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
