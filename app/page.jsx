import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import NavBar from "./components/navBar";
import { businessInfo, getFeaturedServices } from "./lib/services";
import ContactForm from "./components/ContactForm/ContactForm";

const kennyImage =
  "https://nciholasegner.s3.us-east-2.amazonaws.com/KB-Folding/images/kenny-neg.webp";

export const metadata = {
  title: `${businessInfo.name} | Folder Machine Repair & Bindery Equipment Service`,
  description:
    "Kenny's Folder Services provides folder machine repair, troubleshooting, training, preventive maintenance, parts support, and bindery equipment service for print shops, binderies, mail houses, and production teams.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${businessInfo.name} | Folder Machine Repair & Support`,
    description:
      "Folder machine repair, troubleshooting, training, preventive maintenance, parts support, and bindery equipment service from Kenny Behling.",
    url: businessInfo.url,
    siteName: businessInfo.name,
    type: "website",
    images: [
      {
        url: `${businessInfo.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Kenny's Folder Services - Folder Machine Repair and Bindery Equipment Support",
      },
    ],
  },
};

export default function Home() {
  let company_name = "Kenny's Folder Services";

  const todayYear = new Date().getFullYear();
  const startYear = 1980;
  const yearsOnJob = todayYear - startYear;

  const kennyImage =
    "https://nciholasegner.s3.us-east-2.amazonaws.com/KB-Folding/images/kenny-neg.webp";

  const featuredServices = getFeaturedServices();

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${businessInfo.url}#website`,
        name: businessInfo.name,
        url: businessInfo.url,
        description: businessInfo.description,
        publisher: {
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
        image: kennyImage,
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
        knowsAbout: [
          "Folder machine repair",
          "Folder machine troubleshooting",
          "Folder machine training",
          "Preventive maintenance",
          "Folder machine rebuilds",
          "Bindery equipment service",
          "Print finishing equipment",
          "Folder machine parts",
          "Baumer hhs glue systems",
          "Wet scoring",
        ],
        brand: businessInfo.brands.map((brand) => ({
          "@type": "Brand",
          name: brand,
        })),
        makesOffer: featuredServices.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            serviceType: service.serviceType,
            description: service.summary,
            url: `${businessInfo.url}/services/${service.slug}`,
          },
        })),
      },
      {
        "@type": "WebPage",
        "@id": `${businessInfo.url}#webpage`,
        name: metadata.title,
        url: businessInfo.url,
        description: metadata.description,
        isPartOf: {
          "@id": `${businessInfo.url}#website`,
        },
        about: {
          "@id": `${businessInfo.url}#business`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${businessInfo.url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: businessInfo.url,
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
          __html: JSON.stringify(homeJsonLd),
        }}
      />
      <NavBar companyName={company_name} />

      <section className={styles.hero}>
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/KB-Folding/videos/printing1_4.mp4"
            type="video/mp4"
          />
        </video>

        <div className={styles.heroOverlay}></div>

        <div className={styles.heroInner}>
          <Link href="./about" className={styles.kennyCard}>
            <div className={styles.kennyImageWrap}>
              <Image
                src="https://nciholasegner.s3.us-east-2.amazonaws.com/KB-Folding/images/kenny-neg.webp"
                alt="Image of Kenneth Behling"
                fill
                priority
                className={styles.kennyImage}
              />
            </div>

            <div className={styles.kennyCaption}>
              <strong>Kenny Behling</strong>
              <span>{yearsOnJob} Years of Folder & Bindery Experience</span>
            </div>
          </Link>

          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>
              Folder Machine Repair • Bindery Equipment • Training
            </p>

            <h1>Folder Machine Repair & Bindery Equipment Support</h1>

            <p className={styles.heroText}>
              {company_name} helps print shops repair, maintain, troubleshoot,
              and get more from their folder machines and bindery equipment.
            </p>

            <div className={styles.heroActions}>
              <Link href="/contact" className={styles.primaryButton}>
                Request Service
              </Link>

              <Link href="/services" className={styles.secondaryButton}>
                Services Section
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={`${styles.container} ${styles.introGrid}`}>
          <div className={styles.introContent}>
            <p className={styles.eyebrow}>
              {yearsOnJob} Years of Hands-On Experience
            </p>

            <h2>Practical help from someone who knows the machines.</h2>

            <p>
              Kenny Behling has spent {yearsOnJob} years working with folder
              machines, bindery equipment, and print finishing systems from
              nearly every angle, including supervision, maintenance, parts,
              sales, machine setup, customer training, and field service.
            </p>
          </div>

          <div className={styles.introImageWrap}>
            <Image
              src="https://nciholasegner.s3.us-east-2.amazonaws.com/KB-Folding/images/IMG_1705.webp"
              alt="Kenny Behling working with folder machine equipment"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.introImage}
            />
          </div>
        </div>
      </section>

      <section className={styles.servicesPreview}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>What We Do</p>
            <h2>
              Repair, maintenance, troubleshooting, training, and support.
            </h2>
          </div>

          <div className={styles.cardGrid}>
            <Link
              href="./services/folder-machine-repair"
              className={styles.mainLink}
            >
              <article className={styles.card}>
                <h3>Folder Machine Repair</h3>
                <p>
                  Troubleshooting and repair for folder machines, older
                  equipment, machine issues, and down production lines.
                </p>
              </article>
            </Link>

            <Link
              href="./services/preventive-maintenance"
              className={styles.mainLink}
            >
              <article className={styles.card}>
                <h3>Preventive Maintenance</h3>
                <p>
                  Ongoing machine care to help reduce downtime, catch issues
                  earlier, and keep equipment running properly.
                </p>
              </article>
            </Link>

            <Link
              href="./services/folder-machine-training"
              className={styles.mainLink}
            >
              <article className={styles.card}>
                <h3>Operator Training</h3>
                <p>
                  Practical training and guidance for operators who need to
                  better understand setup, use, and common machine problems.
                </p>
              </article>
            </Link>

            <Link href="./services/parts-support" className={styles.mainLink}>
              <article className={styles.card}>
                <h3>Parts Support</h3>
                <p>
                  Help identifying, sourcing, recommending, and selling parts
                  for folding and bindery equipment.
                </p>
              </article>
            </Link>
          </div>

          <Link href="/services" className={styles.textLink}>
            See all services
          </Link>
        </div>
      </section>

      <section className={styles.whySection}>
        <p className={styles.eyebrow}>Why Call Kenny?</p>
        <h2>When the machine is down, experience matters.</h2>
        <br />
        <div className={styles.container}>
          <div className={styles.splitLayout}>
            <div className={styles.splitLayer}>
              <div className={styles.introImageWrap}>
                <Image
                  src="https://nciholasegner.s3.us-east-2.amazonaws.com/KB-Folding/images/IMG_1709.webp"
                  alt="Folder machine maintenance"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.introImage}
                />
              </div>
            </div>

            <div className={styles.bulletList}>
              <p>
                Available support when manufacturer service is slow or hard to
                schedule.
              </p>
              <p>
                Deep experience with older machines and unsupported equipment.
              </p>
              <p>Practical troubleshooting before a full repair is needed.</p>
              <p>Help deciding whether a machine is worth repairing.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.equipmentSection}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Machines and Equipment</p>

          <h2>Support for folder machines and print finishing equipment.</h2>

          <p>
            {company_name} works with equipment including MBO, Stahl, Baum,
            H&amp;H, Moll, Formax, Vijuk, Palamides delivery systems, Baumer hhs
            glue systems, paper cutters, stitchers, glue systems, and
            deliveries.
          </p>
        </div>
        <br />
        <div className={styles.splitPics}>
          <div className={styles.introImageWrap}>
            <Image
              src="https://nciholasegner.s3.us-east-2.amazonaws.com/KB-Folding/images/IMG_3555+4C.webp"
              alt="Folder machine 1"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.introImage}
            />
          </div>

          <div className={styles.introImageWrap}>
            <Image
              src="https://nciholasegner.s3.us-east-2.amazonaws.com/KB-Folding/images/PRE-Belt%232+0225.webp"
              alt="Folder machine 2"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.introImage}
            />
          </div>
        </div>
      </section>

      <section className={styles.serviceArea}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Service Area</p>

          <h2>
            Based in the Greater Minneapolis-St. Paul area. Available
            nationwide.
          </h2>

          <p>
            {company_name} is based in Minnesota and can travel countrywide when
            the customer is willing to cover travel.
          </p>
        </div>
        <br />
        <br />
      </section>

      <section style={{ padding: "40px 40px", backgroundColor: "#e5d2ad" }}>
        <ContactForm
          eyebrow="Request Service"
          heading={`Need help with Service`}
          intro="Send the machine brand, model, issue, location, and urgency. Kenny can follow up with the best next step."
        />
      </section>
    </main>
  );
}
