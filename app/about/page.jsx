import Image from "next/image";
import Link from "next/link";
import styles from "./aboutPage.module.css";
import { businessInfo, getFeaturedServices } from "../lib/services";
import Nav from "../components/navBar";

const kennyImage =
  "https://nciholasegner.s3.us-east-2.amazonaws.com/KB-Folding/images/kenny-neg.webp";

export default function AboutPage() {
  const featuredServices = getFeaturedServices();

  return (
    <main className={styles.main}>
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
                That background helps KB Folding Services support shops in a
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
                What KB Folding Services Helps With
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
              KB Folding Services supports print shops, binderies, mail houses,
              and production teams working with a range of folding and finishing
              equipment.
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
            operator training, KB Folding Services can help you figure out the
            next step.
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
