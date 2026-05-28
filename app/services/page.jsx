import Link from "next/link";
import styles from "./page.module.css";
import { businessInfo, services } from "../lib/services";
import Nav from "../components/navBar";

const siteUrl = businessInfo.url;
const pageUrl = `${siteUrl}/services`;

export const metadata = {
  title:
    "Folder Machine Repair, Maintenance, Training, and Bindery Equipment Service | KB Folding Services",
  description:
    "KB Folding Services provides folder machine repair, troubleshooting, preventive maintenance, operator training, parts support, glue system support, wet scoring, and bindery equipment service.",
  alternates: {
    canonical: "/services",
  },
};

const commonProblems = [
  "Folder machine keeps jamming",
  "Paper is not feeding correctly",
  "Folds are inconsistent or drifting",
  "Rollers, belts, or parts may be worn",
  "Operators need setup or troubleshooting help",
  "Older equipment needs support",
  "Production is slowing down because a machine is unreliable",
  "Manufacturer service is expensive, unavailable, or slow to schedule",
];

const whyCallKenny = [
  `${businessInfo.experienceYears} years of hands-on experience with folder machines and bindery equipment`,
  "Practical troubleshooting from someone who has worked as a supervisor, maintenance tech, parts and sales support, setup specialist, trainer, and service technician",
  "Support for older machines and situations where manufacturer help may be limited",
  "Repair, maintenance, training, parts guidance, and service support from one experienced contact",
];

function removeEmptyValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== null && value !== "";
    }),
  );
}

function buildServicesPageJsonLd() {
  const professionalService = removeEmptyValues({
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#business`,
    name: businessInfo.name,
    legalName: businessInfo.legalName,
    url: siteUrl,
    description: businessInfo.description,
    telephone: businessInfo.phone,
    email: businessInfo.email,
    founder: {
      "@type": "Person",
      name: businessInfo.founderName,
    },
    areaServed: {
      "@type": "Country",
      name: businessInfo.serviceArea,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Greater Minneapolis-St. Paul Area",
      addressRegion: "MN",
      addressCountry: "US",
    },
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        serviceType: service.serviceType,
        description: service.summary,
        url: `${siteUrl}/services/${service.slug}`,
        areaServed: {
          "@type": "Country",
          name: businessInfo.serviceArea,
        },
      },
    })),
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      professionalService,
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: metadata.title,
        description: metadata.description,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          name: businessInfo.name,
          url: siteUrl,
        },
        about: {
          "@id": `${siteUrl}/#business`,
        },
        mainEntity: {
          "@id": `${pageUrl}#services-list`,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#services-list`,
        name: "KB Folding Services Services",
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.title,
          url: `${siteUrl}/services/${service.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export default function ServicesPage() {
  const jsonLd = buildServicesPageJsonLd();

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <div
        style={{
          position: "relative",
          background: "#362f24",
          height: "100px",
        }}
      >
        <Nav />
      </div>
      <section className={styles.servicesHero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Folder Machine Service</p>

          <h1>
            Folder machine repair, maintenance, training, and bindery equipment
            service.
          </h1>

          <p className={styles.heroText}>
            KB Folding Services\ helps print shops, binderies, mail houses, and
            production teams repair, troubleshoot, maintain, and get more out of
            their folder machines and bindery equipment.
          </p>

          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.primaryButton}>
              Request Service
            </Link>

            <a href="#services-list" className={styles.secondaryButton}>
              View Services
            </a>
          </div>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <div>
              <p className={styles.eyebrow}>
                {businessInfo.experienceYears} Years of Experience
              </p>

              <h2>Practical help from someone who knows the machines.</h2>
            </div>

            <div className={styles.secondSection}>
              <p>
                Kenny Behling has worked with folder machines, bindery
                equipment, and print finishing systems from nearly every angle,
                including supervision, maintenance, parts and sales, machine
                setup, customer training, and field service.
              </p>

              <p>
                Whether a machine is down, running inconsistently, difficult to
                set up, or no longer supported by the manufacturer, KB Folding
                Solutions gives shops a practical place to start.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services-list" className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Services</p>
            <h2>Repair, troubleshooting, training, parts, and support.</h2>
            <p>
              Each service page is built around a real problem print shops and
              finishing departments deal with every day.
            </p>
          </div>
          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={styles.serviceFlipCard}
              >
                <div className={styles.serviceFlipInner}>
                  <div className={styles.serviceFace}>
                    <p className={styles.cardLabel}>Service</p>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                    <span>View service</span>
                  </div>

                  <div className={styles.serviceBack}>
                    <p className={styles.cardLabel}>Common Issues</p>
                    <h3>{service.title}</h3>

                    {service.problems?.length > 0 && (
                      <ul>
                        {service.problems.slice(0, 4).map((problem) => (
                          <li key={problem}>{problem}</li>
                        ))}
                      </ul>
                    )}

                    <span>Go to page</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.problemSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Start With the Problem</p>
            <h2>Not sure what service you need?</h2>
            <p>
              You do not need to diagnose the issue before reaching out. Start
              with what the machine is doing, what changed, and how urgent the
              problem is.
            </p>
          </div>

          <div className={styles.problemGrid}>
            {commonProblems.map((problem) => (
              <div key={problem} className={styles.problemItem}>
                {problem}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.equipmentSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Brands and Equipment</p>
            <h2>Support for folder machines and print finishing equipment.</h2>
            <p>
              Kenny works with folder machines and related bindery equipment
              used in commercial print and production environments.
            </p>
          </div>

          <div className={styles.logoList} aria-label="Machine brands">
            {businessInfo.brands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>

          <div className={styles.equipmentList} aria-label="Equipment types">
            {businessInfo.equipment.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.whySection}>
        <div className={styles.container}>
          <div className={styles.splitLayout}>
            <div>
              <p className={styles.eyebrow}>Why Call Kenny</p>
              <h2>More than general repair support.</h2>
              <p>
                KB Folding Services is built around practical experience,
                availability, and machine knowledge that comes from decades in
                the print finishing industry.
              </p>
            </div>

            <div className={styles.bulletList}>
              {whyCallKenny.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Request Service</p>
          <h2>Need help with a folder machine or bindery equipment?</h2>
          <p>
            Send the machine brand, model, issue description, location, urgency,
            and any photos or videos that show what is happening. Kenny can help
            determine the next practical step.
          </p>

          <Link href="/contact" className={styles.primaryButton}>
            Contact KB Folding Services
          </Link>
        </div>
      </section>
    </main>
  );
}
