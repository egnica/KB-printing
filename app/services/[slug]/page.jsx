// app/services/[slug]/page.js

import { notFound } from "next/navigation";
import Link from "next/link";
import {
  businessInfo,
  getServiceBySlug,
  getServiceSlugs,
} from "../../lib/services";
import styles from "./serviceDetail.module.css";
import Nav from "../../components/navBar";
import ContactForm from "@/app/components/ContactForm/ContactForm";

const siteUrl = businessInfo.url;

function removeEmptyValues(obj) {
  if (Array.isArray(obj)) {
    return obj
      .map(removeEmptyValues)
      .filter((value) => value !== null && value !== undefined);
  }

  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj)
        .map(([key, value]) => [key, removeEmptyValues(value)])
        .filter(([, value]) => {
          if (value === null || value === undefined || value === "")
            return false;
          if (Array.isArray(value) && value.length === 0) return false;
          if (
            typeof value === "object" &&
            !Array.isArray(value) &&
            Object.keys(value).length === 0
          ) {
            return false;
          }
          return true;
        }),
    );
  }

  return obj;
}

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | KB Folding Services",
    };
  }

  const pageUrl = `${siteUrl}/services/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: pageUrl,
      siteName: businessInfo.name,
      type: "website",
      images: [
        {
          url: `${businessInfo.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "KB Folding Services - Folder Machine Repair and Bindery Equipment Support",
        },
      ],
    },
  };
}

function buildServicePageJsonLd(service) {
  const pageUrl = `${siteUrl}/services/${service.slug}`;

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
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@id": `${pageUrl}#service`,
      },
    },
  });

  const serviceSchema = removeEmptyValues({
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: service.title,
    serviceType: service.serviceType,
    url: pageUrl,
    description: service.summary,
    keywords: service.keywords?.join(", "),
    provider: {
      "@id": `${siteUrl}/#business`,
    },
    areaServed: {
      "@type": "Country",
      name: businessInfo.serviceArea,
    },
    brand: service.brands?.map((brand) => ({
      "@type": "Brand",
      name: brand,
    })),
    audience: service.goodFitFor?.map((audience) => ({
      "@type": "Audience",
      audienceType: audience,
    })),
  });

  const graph = [
    professionalService,
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: service.metaTitle,
      description: service.metaDescription,
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
        "@id": `${pageUrl}#service`,
      },
    },
    serviceSchema,
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
          item: `${siteUrl}/services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.title,
          item: pageUrl,
        },
      ],
    },
  ];

  if (service.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: service.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph.map(removeEmptyValues),
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const jsonLd = buildServicePageJsonLd(service);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <main className={styles.page}>
        <div
          style={{
            position: "relative",
            background: "#362f24",
            height: "100px",
          }}
        >
          <Nav />
        </div>
        <section className={styles.hero}>
          <div className={styles.container}>
            <Link href="/services" className={styles.backLink}>
              Back to services
            </Link>

            <p className={styles.eyebrow}>{service.serviceType}</p>
            <h1>{service.h1}</h1>
            <p className={styles.summary}>{service.summary}</p>
          </div>
        </section>

        <section className={styles.introSection}>
          <div className={styles.container}>
            <p>{service.intro}</p>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.container}>
            <div className={styles.contentGrid}>
              <div className={styles.mainContent}>
                <section>
                  <h2>What this service includes</h2>
                  <ul>
                    {service.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2>Common problems this helps solve</h2>
                  <ul>
                    {service.problems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2>Good fit for</h2>
                  <ul>
                    {service.goodFitFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </div>

              <aside className={styles.sidebar}>
                {service.brands?.length > 0 && (
                  <div className={styles.sidebarBlock}>
                    <h2>Brands</h2>
                    <ul>
                      {service.brands.map((brand) => (
                        <li key={brand}>{brand}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.equipment?.length > 0 && (
                  <div className={styles.sidebarBlock}>
                    <h2>Equipment</h2>
                    <ul>
                      {service.equipment.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>

        {service.faq?.length > 0 && (
          <section className={styles.faqSection}>
            <div className={styles.container}>
              <h2>Questions about {service.title}</h2>

              <div className={styles.faqList}>
                {service.faq.map((item) => (
                  <article key={item.question} className={styles.faqItem}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <h2>Need help with {service.title.toLowerCase()}?</h2>
            <p>
              Reach out to KB Folding Services for practical support with folder
              machines, bindery equipment, troubleshooting, training, parts, and
              production issues.
            </p>
            <Link href="/contact" className={styles.ctaButton}>
              Contact KB Folding Services
            </Link>
          </div>
        </section>
        <section style={{ padding: "20px 40px" }}>
          <ContactForm
            eyebrow="Request Service"
            heading={`Need help with ${service.title.toLowerCase()}?`}
            intro="Send the machine brand, model, issue, location, and urgency. Kenny can follow up with the best next step."
          />
        </section>
      </main>
    </>
  );
}
