"use client";

import { useState } from "react";
import styles from "../page.module.css";
import Link from "next/link";

export default function Navbar({ companyName }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        {companyName}
      </Link>

      <div className={styles.desktopLinks}>
        <a href="#services">Services</a>
        <a href="#repair">Repair</a>
        <a href="../about">About</a>
        <a href="#contact" className={styles.cta}>
          Contact Now
        </a>
      </div>

      <button
        className={styles.menuButton}
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
      >
        ☰
      </button>

      {open && (
        <div className={styles.mobileMenu}>
          <a href="#services" onClick={() => setOpen(false)}>
            Services
          </a>
          <a href="#repair" onClick={() => setOpen(false)}>
            Repair
          </a>
          <a href="#about" onClick={() => setOpen(false)}>
            About
          </a>
          <a
            href="#contact"
            className={styles.mobileCta}
            onClick={() => setOpen(false)}
          >
            Contact Now
          </a>
        </div>
      )}
    </nav>
  );
}
