import Image from "next/image";
import Link from "next/link";
import styles from "./aboutPage.module.css";
import ContactForm from "../components/ContactForm/ContactForm";
import { businessInfo, getFeaturedServices } from "../lib/services";
import Nav from "../components/navBar";

const kennyImage =
  "https://nciholasegner.s3.us-east-2.amazonaws.com/KB-Folding/images/kenny-neg.webp";

export const metadata = {
  title: `About ${businessInfo.name} | Folder Machine Repair & Bindery Support`,
  description: `${businessInfo.name} is led by ${businessInfo.founderName}, who brings more than ${businessInfo.experienceYears} years of hands-on experience with folder machines, bindery equipment, print finishing systems, repair, troubleshooting, training, maintenance, and parts support.`,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About ${businessInfo.name}`,
    description: `${businessInfo.name} provides folder machine repair, troubleshooting, training, maintenance, parts support, and bindery equipment service for print shops, binderies, mail houses, and production teams.`,
    url: `${businessInfo.url}/about`,
    siteName: businessInfo.name,
    type: "website",
    images: [
      {
        url: kennyImage,
        width: 1200,
        height: 1500,
        alt: `${businessInfo.founderName}, founder of ${businessInfo.name}`,
      },
    ],
  },
};

export default function AboutPage() {
  const featuredServices = getFeaturedServices();

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${businessInfo.url}/about#aboutpage`,
        name: `About ${businessInfo.name}`,
        url: `${businessInfo.url}/about`,
        description: metadata.description,
        isPartOf: {
          "@type": "WebSite",
          name: businessInfo.name,
          url: businessInfo.url,
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
        "@type": "BreadcrumbList",
        "@id": `${businessInfo.url}/about#breadcrumb`,
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
            name: "About",
            item: `${businessInfo.url}/about`,
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
          __html: JSON.stringify(aboutJsonLd),
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
      <section className={styles.aboutHero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>About {businessInfo.name}</p>

              <h1>
                Hands-on folder machine support from {businessInfo.founderName}.
              </h1>

              <p className={styles.heroText}>
                {businessInfo.name} helps print shops, binderies, mail houses,
                and production teams keep folder machines and bindery equipment
                running with practical repair, troubleshooting, training,
                maintenance, and parts support.
              </p>

              <div className={styles.heroActions}>
                <Link href="/contact" className={styles.primaryButton}>
                  Contact Kenny
                </Link>
                <Link href="/services" className={styles.secondaryButton}>
                  View Services
                </Link>
              </div>
            </div>

            <div className={styles.kennyCard}>
              <div className={styles.kennyImageWrap}>
                <Image
                  src={kennyImage}
                  alt={`${businessInfo.founderName}, founder of ${businessInfo.name}`}
                  fill
                  sizes="(max-width: 900px) 100vw, 360px"
                  className={styles.kennyImage}
                  priority
                />
              </div>

              <div className={styles.kennyCaption}>
                <strong>{businessInfo.founderName}</strong>
                <span>Founder, {businessInfo.name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.experienceSection}>
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <div>
              <p className={styles.eyebrow}>Kenny’s Background</p>
              <h2>
                Built on more than {businessInfo.experienceYears} years of
                hands-on experience.
              </h2>
            </div>

            <div>
              <p>
                Kenny Behling has spent decades working with folder machines,
                bindery equipment, and print finishing systems. His experience
                goes beyond one narrow role. He has worked across production,
                maintenance, setup, parts, training, troubleshooting, and
                service.
              </p>

              <p>
                That background helps Kenny's Folder Services support shops in a
                practical way. Kenny understands what happens when a folder is
                down, when a job will not dial in, when parts are worn, or when
                operators need better support to keep production moving.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.floorSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Why Experience Matters</p>
            <h2>
              Support from someone who understands the whole production floor.
            </h2>
            <p>
              Folder machine problems are not always just machine problems. They
              can affect schedules, operators, job quality, maintenance
              decisions, and the entire finishing workflow.
            </p>
          </div>

          <div className={styles.experienceList}>
            <p>Machine setup and adjustment</p>
            <p>Folder machine troubleshooting</p>
            <p>Maintenance and repair decisions</p>
            <p>Parts identification and support</p>
            <p>Operator training and folding guidance</p>
            <p>Production-focused problem solving</p>
          </div>
        </div>
      </section>

      <section className={styles.supportSection}>
        <div className={styles.container}>
          <div className={styles.splitLayout}>
            <div>
              <p className={styles.eyebrow}>
                What Kenny's Folder Services Helps With
              </p>
              <h2>
                Practical help for repair, training, maintenance, and support.
              </h2>
            </div>

            <div className={styles.supportGrid}>
              {getFeaturedServices().map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={styles.supportCard}
                >
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <span>View service</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.equipmentSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Equipment and Brands</p>
            <h2>
              Folder machines, bindery equipment, and print finishing systems.
            </h2>
            <p>
              Kenny's Folder Services supports print shops, binderies, mail
              houses, and production teams working with a range of folding and
              finishing equipment.
            </p>
          </div>

          <div className={styles.listGroup}>
            <h3>Brands</h3>
            <div className={styles.inlineList}>
              {businessInfo.brands.map((brand) => (
                <span key={brand}>{brand}</span>
              ))}
            </div>
          </div>

          <div className={styles.listGroup}>
            <h3>Equipment</h3>
            <div className={styles.inlineList}>
              {businessInfo.equipment.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Need Help?</p>
          <h2>
            Talk with Kenny about your folder machine or bindery equipment
            issue.
          </h2>
          <p>
            Whether you are dealing with jams, misfeeds, worn parts,
            inconsistent folds, glue system issues, wet scoring, maintenance, or
            operator training, Kenny's Folder Services can help you figure out
            the next step.
          </p>

          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.primaryButton}>
              Contact Kenny
            </Link>
            <Link href="/services" className={styles.secondaryButton}>
              View Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
