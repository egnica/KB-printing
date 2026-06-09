import Link from "next/link";
import { businessInfo, services } from "../../lib/services";
import styles from "./footer.module.css";

function phoneHref(phone) {
  return `tel:${phone.replace(/\D/g, "")}`;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.logo}>
              {businessInfo.name}
            </Link>

            <p>{businessInfo.description}</p>

            <div className={styles.contactLinks}>
              {businessInfo.phone && (
                <a href={phoneHref(businessInfo.phone)}>{businessInfo.phone}</a>
              )}

              {businessInfo.email && (
                <a href={`mailto:${businessInfo.email}`}>
                  {businessInfo.email}
                </a>
              )}
            </div>
          </div>

          <nav className={styles.linkColumn} aria-label="Main pages">
            <h2>Pages</h2>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <nav className={styles.servicesColumn} aria-label="Services">
            <h2>Services</h2>
            <div className={styles.serviceLinks}>
              {services.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`}>
                  {service.title}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className={styles.footerBottom}>
          <p>
            © {currentYear} {businessInfo.name}. All rights reserved.
          </p>

          <p>
            Based in {businessInfo.baseLocation}. Serving{" "}
            {businessInfo.serviceArea}.
          </p>
        </div>
      </div>
    </footer>
  );
}
