// components/ContactForm/ContactForm.jsx

"use client";

import { useState } from "react";
import styles from "./contactForm.module.css";

export default function ContactForm({
  eyebrow = "Contact KB Folder Services",
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
    <div className={styles.contactBlock}>
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
          <div>
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className={styles.twoColumn}>
          <div>
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" />
          </div>

          <div>
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
            />
          </div>
        </div>

        <div>
          <label htmlFor="machine">Machine / Equipment</label>
          <input
            id="machine"
            name="machine"
            type="text"
            placeholder="MBO, Stahl, Baum, folder machine, glue system..."
          />
        </div>

        <div>
          <label htmlFor="message">What is going on? *</label>
          <textarea
            id="message"
            name="message"
            rows="6"
            placeholder="Tell Kenny what machine you have, what problem you are seeing, and how urgent it is."
            required
          />
        </div>

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
    </div>
  );
}
