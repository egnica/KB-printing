import ContactForm from "../components/ContactForm/ContactForm";
import { businessInfo } from "../lib/services";
import styles from "./contactPage.module.css";
import Nav from "../components/navBar";

export const metadata = {
  title: `Contact ${businessInfo.name} | Folder Machine Repair & Support`,
  description:
    "Contact KB Folder Services for folder machine repair, troubleshooting, training, maintenance, parts support, and bindery equipment service.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact ${businessInfo.name}`,
    description:
      "Get in touch with KB Folder Services for folder machine repair, troubleshooting, training, maintenance, and bindery equipment support.",
    url: `${businessInfo.url}/contact`,
    siteName: businessInfo.name,
    type: "website",
    images: [
      {
        url: `${businessInfo.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "KB Folder Services - Folder Machine Repair and Bindery Equipment Support",
      },
    ],
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${businessInfo.url}/contact#contactpage`,
        name: `Contact ${businessInfo.name}`,
        url: `${businessInfo.url}/contact`,
        description: metadata.description,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${businessInfo.url}#website`,
          name: businessInfo.name,
          url: businessInfo.url,
        },
        about: {
          "@id": `${businessInfo.url}#business`,
        },
        mainEntity: {
          "@id": `${businessInfo.url}#business`,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${businessInfo.url}#business`,
        name: businessInfo.name,
        legalName: businessInfo.legalName,
        url: businessInfo.url,
        description: businessInfo.description,
        telephone: businessInfo.phone,
        email: businessInfo.email,
        founder: {
          "@type": "Person",
          name: businessInfo.founderName,
          jobTitle: "Founder",
        },
        areaServed: {
          "@type": "Country",
          name: businessInfo.serviceArea,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: businessInfo.baseLocation,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${businessInfo.url}/contact#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: businessInfo.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Contact",
            item: `${businessInfo.url}/contact`,
          },
        ],
      },
    ],
  };

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactJsonLd),
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
      <section className={styles.contactHero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Contact {businessInfo.name}</p>

          <h1>Talk with Kenny about your folder machine or bindery issue.</h1>

          <p className={styles.heroText}>
            Send a message with the machine, issue, location, and urgency. Kenny
            can follow up with practical next steps for repair, troubleshooting,
            training, maintenance, or parts support.
          </p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <section className={styles.container}>
          <ContactForm
            eyebrow="Send a Message"
            heading="Need help keeping production moving?"
            intro="Use the form to describe what is going on with your folder machine or bindery equipment. Include the machine brand, model if you know it, what the problem looks like, and how urgent it is."
          />
        </section>
      </section>

      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            <div>
              <p className={styles.eyebrow}>Helpful Details</p>
              <h2>What to include in your message.</h2>
            </div>

            <div className={styles.detailList}>
              <p>Machine brand and model, if available</p>
              <p>What the machine is doing or not doing</p>
              <p>Photos or video can be helpful once Kenny follows up</p>
              <p>How urgent the issue is for production</p>
              <p>Your shop location and best contact information</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
