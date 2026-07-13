import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CloudDownload,
  Database,
  FileText,
  FolderUp,
} from "lucide-react";

import StorageShowcase from "./StorageShowcase";
import styles from "./storage.module.css";

export const metadata: Metadata = {
  title: "Secure Cloud Storage | Vaultway",
  description:
    "Store, organise, download, and securely share your files with Vaultway.",
};

const featureSections = [
  {
    title: "Get the right amount of storage",
    description:
      "Keep documents, images, videos, and project files together in one organised Vaultway workspace. View storage usage clearly and upgrade only when you need more room.",
    action: "Create your workspace",
    href: "/sign-up",
    image: "/storage-assets/Feature-1.png",
    alt: "Storage usage interface",
  },
  {
    title: "Fast downloads and uploads",
    description:
      "Upload multiple files, follow progress in real time, and download your data through a simple transfer experience designed to avoid unnecessary steps.",
    action: "Start uploading",
    href: "/sign-up",
    image: "/storage-assets/Fast-downloads-and-uploads.png",
    alt: "File transfer manager",
  },
  {
    title: "Store securely and privately",
    description:
      "Files remain private by default and are accessed through authenticated requests. Add another layer of control using protected links, expiration times, and account security.",
    action: "Explore security",
    href: "/security",
    image: "/storage-assets/Feature-3.png",
    alt: "Password and verification interface",
  },
  {
    title: "Access your files on the go",
    description:
      "Open Vaultway from a desktop, tablet, or mobile browser to find recent files, browse folders, and download what you need from anywhere.",
    action: "Open Vaultway",
    href: "/sign-in",
    image: "/storage-assets/MEGA-Cloud-Access-files-on-the-go.png",
    alt: "Person accessing cloud files on a mobile device",
  },
];

const benefits = [
  {
    icon: FolderUp,
    title: "Upload project files",
    description:
      "Store documents, archives, media, and source files inside one workspace.",
  },
  {
    icon: CloudDownload,
    title: "Download when needed",
    description:
      "Retrieve stored files through a clear and reliable download flow.",
  },
  {
    icon: FileText,
    title: "Store different file types",
    description:
      "Keep documents, images, videos, compressed files, and folders together.",
  },
  {
    icon: Database,
    title: "Understand your storage",
    description:
      "See file sizes and used capacity so available space is always clear.",
  },
];



const faqs = [
  {
    question: "What is Vaultway cloud storage?",
    answer:
      "Vaultway cloud storage is an online workspace where you can upload, organise, access, download, and securely share files.",
  },
  {
    question: "Are my uploaded files public?",
    answer:
      "No. Files are private by default and only become accessible to another person when you intentionally create a controlled sharing link.",
  },
  {
    question: "Which file types can I store?",
    answer:
      "Vaultway can support documents, images, videos, archives, source files, and other formats allowed by your upload rules.",
  },
  {
    question: "Can shared links expire?",
    answer:
      "Yes. Vaultway can generate links with expiry times and allow the owner to revoke access earlier.",
  },
  {
    question: "Can I use Vaultway on my phone?",
    answer:
      "Yes. The responsive web dashboard is designed to work on desktop, tablet, and mobile browsers.",
  },
];

export default function StoragePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Cloud storage</p>

            <h1>Securely store, manage, and share your data online</h1>

            <p className={styles.heroText}>
              Vaultway gives you one private place for files and folders, with
              authenticated access and controlled sharing links.
            </p>

            <div className={styles.heroActions}>
              <Link href="/sign-up" className={styles.primaryButton}>
                Start with free storage
                <ArrowRight size={18} />
              </Link>

              <Link href="/security" className={styles.textButton}>
                See how security works
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div className={styles.heroMedia}>
            <div className={styles.heroVideoFrame}>
              <video
                className={styles.heroVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source
                  src="/storage-assets/Cloud-drive-hero-.webm"
                  type="video/webm"
                />
                <source
                  src="/storage-assets/Cloud-drive-hero.qt"
                  type="video/quicktime"
                />
              </video>

              <div className={styles.videoBrandCover} aria-hidden="true">
                V
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.shell}>
          {featureSections.map((feature, index) => (
            <article
              key={feature.title}
              className={`${styles.featureRow} ${
                index % 2 === 1 ? styles.featureRowReverse : ""
              }`}
            >
              <div className={styles.featureCopy}>
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>

                <Link href={feature.href} className={styles.textButton}>
                  {feature.action}
                  <ArrowRight size={17} />
                </Link>
              </div>

              <div className={styles.featureMedia}>
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.featureImage}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.benefitsSection}>
        <div className={styles.shell}>
          <div className={styles.benefitsLayout}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Made for everyday work</p>
              <h2>What users will appreciate</h2>
            </div>

            <div className={styles.benefitsGrid}>
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <article key={benefit.title} className={styles.benefitCard}>
                    <span className={styles.benefitIcon}>
                      <Icon size={27} />
                    </span>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>



      <StorageShowcase />

      <section className={styles.faqSection}>
        <div className={styles.shell}>
          <div className={styles.faqLayout}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>FAQ</p>
              <h2>Frequently asked questions</h2>
            </div>

            <div className={styles.faqList}>
              {faqs.map((faq) => (
                <details key={faq.question} className={styles.faqItem}>
                  <summary>
                    <span>{faq.question}</span>
                    <span className={styles.plus}>+</span>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaArt}>
            <div className={styles.ctaCloud}>V</div>
            <span className={styles.ctaOrbOne} />
            <span className={styles.ctaOrbTwo} />
            <span className={styles.ctaOrbThree} />
          </div>

          <div className={styles.ctaContent}>
            <h2>Build your private file workspace with Vaultway</h2>
            <p>
              Upload files, organise folders, and share only what you choose.
            </p>

            <div className={styles.ctaActions}>
              <Link href="/sign-up" className={styles.primaryButton}>
                Create an account
              </Link>

              <Link href="/pricing" className={styles.darkOutlineButton}>
                Compare plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
