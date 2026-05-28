import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import NavBar from "./components/navBar";
export default function Home() {
  let company_name = "KB Folding Services";

  const todayYear = new Date().getFullYear();
  const startYear = 1980;
  const yearsOnJob = todayYear - startYear;

  return (
    <main className={styles.main}>
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
              <a href="/contact" className={styles.primaryButton}>
                Request Service
              </a>

              <a href="/services" className={styles.secondaryButton}>
                Services Section
              </a>
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
            <img
              src="https://nciholasegner.s3.us-east-2.amazonaws.com/KB-Folding/images/IMG_1705.webp"
              alt="Kenny Behling working with folder machine equipment"
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
            <Link href="https://main.dtgywjueb646q.amplifyapp.com/services/folder-machine-repair">
              <article className={styles.card}>
                <h3>Folder Machine Repair</h3>
                <p>
                  Troubleshooting and repair for folder machines, older
                  equipment, machine issues, and down production lines.
                </p>
              </article>
            </Link>
            <Link href="https://main.dtgywjueb646q.amplifyapp.com/services/preventive-maintenance">
              <article className={styles.card}>
                <h3>Preventive Maintenance</h3>
                <p>
                  Ongoing machine care to help reduce downtime, catch issues
                  earlier, and keep equipment running properly.
                </p>
              </article>
            </Link>
            <Link href="https://main.dtgywjueb646q.amplifyapp.com/services/folder-machine-training">
              <article className={styles.card}>
                <h3>Operator Training</h3>
                <p>
                  Practical training and guidance for operators who need to
                  better understand setup, use, and common machine problems.
                </p>
              </article>
            </Link>
            <Link href="https://main.dtgywjueb646q.amplifyapp.com/services/parts-support">
              <article className={styles.card}>
                <h3>Parts Support</h3>
                <p>
                  Help identifying, sourcing, recommending, and selling parts
                  for folding and bindery equipment.
                </p>
              </article>
            </Link>
          </div>

          <a href="/services" className={styles.textLink}>
            See all services
          </a>
        </div>
      </section>

      <section className={styles.whySection}>
        <p className={styles.eyebrow}>Why Call Kenny?</p>
        <h2>When the machine is down, experience matters.</h2>
        <br />
        <div className={styles.container}>
          <div className={styles.splitLayout}>
            <div className={styles.splitLayer}>
              <img
                className={styles.introImageWrap}
                src="https://nciholasegner.s3.us-east-2.amazonaws.com/KB-Folding/images/IMG_1709.webp"
                alt="Folder machine maintance"
              />
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
          <img
            className={styles.introImageWrap}
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/KB-Folding/images/IMG_3555+4C.webp"
            alt="Folder machine 1"
          />
          <img
            className={styles.introImageWrap}
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/KB-Folding/images/PRE-Belt%232+0225.webp"
            alt="Folder machine 2"
          />
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
            {company_name}is based in Minnesota and can travel countrywide when
            the customer is willing to cover travel.
          </p>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.container}>
          <h2>Need help with a folder machine or bindery equipment issue?</h2>

          <p>
            Send the machine brand, model, issue description, location, and
            urgency so Kenny can understand the problem and follow up.
          </p>

          <a href="/contact" className={styles.primaryButton}>
            Request Service
          </a>
        </div>
      </section>
    </main>
  );
}
