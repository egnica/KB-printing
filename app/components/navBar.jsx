"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import { services } from "../lib/services";

export default function Navbar({ companyName }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        {companyName}
      </Link>

      <div className={styles.desktopLinks}>
        <Link href="/">Home</Link>

        <div className={styles.navDropdown}>
          <Link href="/services" className={styles.navDropdownTrigger}>
            Services
          </Link>

          <div className={styles.navDropdownMenu}>
            <div className={styles.navDropdownPanel}>
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={styles.navDropdownLink}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Link href="/about">About</Link>

        <Link href="/contact" className={styles.cta}>
          Contact Now
        </Link>
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
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link href="/services" onClick={() => setOpen(false)}>
            Services
          </Link>

          <div className={styles.mobileServiceLinks}>
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                onClick={() => setOpen(false)}
              >
                {service.title}
              </Link>
            ))}
          </div>

          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>

          <Link
            href="/contact"
            className={styles.mobileCta}
            onClick={() => setOpen(false)}
          >
            Contact Now
          </Link>
        </div>
      )}
    </nav>
  );
}
