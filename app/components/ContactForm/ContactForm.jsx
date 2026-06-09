// components/ContactForm/ContactForm.jsx

"use client";

import { useState } from "react";
import styles from "./contactForm.module.css";

export default function ContactForm({
  eyebrow = "Contact KB Folding Services",
  heading = "Need help with a folder machine?",
  intro = "Send a message with the issue, machine, location, and urgency. Kenny can follow up with the best next step.",
}) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [startedAt] = useState(Date.now());

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      machine: formData.get("machine"),
      message: formData.get("message"),
      website: formData.get("website"),
      startedAt,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <section className={styles.contactBlock}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2>{heading}</h2>
        <p>{intro}</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.hiddenField}>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex="-1"
            autoComplete="off"
          />
        </div>

        <div className={styles.twoColumn}>
          <label>
            Name
            <input name="name" type="text" autoComplete="name" required />
          </label>

          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
        </div>

        <div className={styles.twoColumn}>
          <label>
            Phone
            <input name="phone" type="tel" autoComplete="tel" />
          </label>

          <label>
            Company
            <input name="company" type="text" autoComplete="organization" />
          </label>
        </div>

        <label>
          Machine / Equipment
          <input
            name="machine"
            type="text"
            placeholder="MBO, Stahl, Baum, folder machine, glue system..."
          />
        </label>

        <label>
          What is going on?
          <textarea
            name="message"
            rows="6"
            placeholder="Tell Kenny what machine you have, what problem you are seeing, and how urgent it is."
            required
          />
        </label>

        {error && <p className={styles.error}>{error}</p>}

        {status === "success" && (
          <p className={styles.success}>Thanks. Your message has been sent.</p>
        )}

        <button
          className={styles.submitButton}
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}