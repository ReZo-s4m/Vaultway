import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CloudDownload,
  FileKey2,
  FolderInput,
  KeyRound,
  Link2,
  LockKeyhole,
  ShieldCheck,
  SlidersHorizontal,
  UploadCloud,
  Users,
} from "lucide-react";

import styles from "./sharing.module.css";

export const metadata: Metadata = {
  title: "Secure File Sharing | Vaultway",
  description:
    "Share files with controlled links, view or download access, expiry dates, passwords, and revoke from the dashboard.",
};

type FeatureItem = {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

type ShareSection = {
  title: string;
  description?: string;
  items?: FeatureItem[];
  action: string;
  href: string;
  image: string;
  alt: string;
};

const shareSections: ShareSection[] = [
  {
    title: "Share a file from Cloud Drive",
    items: [
      {
        title: "Create a link",
        description:
          "Open a file, choose Share, and copy the token. Shared items lists every link you made so you can revoke it later.",
        icon: Link2,
      },
      {
        title: "The rest of the drive stays private",
        description:
          "A link is for that one file. There is no folder invite, no teammate roles, and no public upload inbox.",
        icon: FileKey2,
      },
      {
        title: "Add extra protection",
        description:
          "Optional password, expiry, view limit, and revoke. A public share page is not wired yet.",
        icon: ShieldCheck,
      },
    ],
    action: "Open the workspace",
    href: "/sign-in",
    image: "/share-assets/share-1.png",
    alt: "Illustration of a share link. The live control is the dashboard Share dialog.",
  },
  {
    title: "View or download — that is the permission set",
    items: [
      {
        title: "Two levels",
        description:
          "The share dialog offers VIEW or DOWNLOAD. There is no upload, edit, or full-access collaborator role in this project.",
        icon: SlidersHorizontal,
      },
      {
        title: "No live folder sharing",
        description:
          "The picture on the right is an illustration. You share files, not a live shared folder with other accounts.",
        icon: Users,
      },
    ],
    action: "See how it works",
    href: "/solutions",
    image: "/share-assets/share-2.5.png",
    alt: "Illustration only. Folder collaborator permissions are not implemented.",
  },
  {
    title: "Manage the links you created",
    items: [
      {
        title: "Shared items",
        description:
          "Every link from this workspace appears under Shared items so you can copy it again or revoke it.",
        icon: BarChart3,
      },
      {
        title: "Cap views and revoke",
        description:
          "Set a view limit when you create the link. There is no recipient analytics dashboard like opened-vs-downloaded charts.",
        icon: CloudDownload,
      },
    ],
    action: "Open Shared items",
    href: "/sign-in",
    image: "/share-assets/link-analytics-feature-1.png",
    alt: "Illustration of link analytics. Vaultway lists links; it does not show a live analytics product.",
  },
];

const sharingHighlights = [
  {
    title: "Password protection",
    description:
      "Add a password when a shared file needs another layer of control.",
    icon: KeyRound,
  },
  {
    title: "Expiry dates",
    description:
      "Automatically close access after a selected date or duration.",
    icon: LockKeyhole,
  },
  {
    title: "View or download",
    description:
      "Those are the two permission choices on the share dialog.",
    icon: SlidersHorizontal,
  },
  {
    title: "Revoke anytime",
    description:
      "Turn a link off from Shared items when you no longer want it used.",
    icon: FolderInput,
  },
];

const faqs = [
  {
    question: "How do I share a file in Vaultway?",
    answer:
      "Open the file menu, choose Share, configure the access settings, and copy the generated link. You can then send that link to the intended recipient.",
  },
  {
    question: "Does the recipient need a Vaultway account?",
    answer:
      "The share dialog creates a public-style link. A dedicated public share page is not wired yet, so links are managed from Shared items in the dashboard.",
  },
  {
    question: "Can I stop someone from using a shared link?",
    answer:
      "Yes. You can revoke a link from your dashboard at any time. Once revoked, the existing URL no longer provides access.",
  },
  {
    question: "Can a sharing link expire automatically?",
    answer:
      "Yes. You can assign an expiry date so access ends automatically without needing to revoke the link manually.",
  },
  {
    question: "Can someone upload files into my drive?",
    answer:
      "Not in this project. Recipients get a link you create. There is no file-request inbox or public upload page.",
  },
];

export default function SharingPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.shell}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Secure sharing</p>

              <h1>Share a file with a controlled link</h1>

              <p className={styles.heroDescription}>
                The live feature is the dashboard Share dialog: view or
                download, optional password, expiry, view limit, and revoke.
                Videos and pictures on this page are illustrations.
              </p>

              <div className={styles.heroActions}>
                <Link href="/sign-up" className={styles.primaryButton}>
                  Start sharing for free
                  <ArrowRight size={18} />
                </Link>

                <Link href="/security" className={styles.textLink}>
                  See how sharing stays secure
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            <div className={styles.heroMedia}>
              <video
                className={styles.heroVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source
                  src="/share-assets/Share-hero-.webm"
                  type="video/webm"
                />
                <source
                  src="/share-assets/Share-hero-.qt"
                  type="video/quicktime"
                />
              </video>

              <span className={styles.videoLogoCover} aria-hidden="true">
                V
              </span>

              <span className={styles.videoUrlCover} aria-hidden="true">
                vaultway.app/share/secure-link
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featureSection}>
        <div className={styles.shell}>
          <div className={styles.featureList}>
            {shareSections.map((section, index) => (
              <article
                key={section.title}
                className={`${styles.featureRow} ${
                  index % 2 === 1 ? styles.featureRowReverse : ""
                }`}
              >
                <div className={styles.featureCopy}>
                  <h2>{section.title}</h2>

                  {section.description && (
                    <p className={styles.sectionDescription}>
                      {section.description}
                    </p>
                  )}

                  {section.items && (
                    <div className={styles.itemList}>
                      {section.items.map((item) => {
                        const Icon = item.icon;

                        return (
                          <div key={item.title} className={styles.item}>
                            <span className={styles.itemIcon}>
                              <Icon size={22} strokeWidth={1.8} />
                            </span>

                            <div>
                              <h3>{item.title}</h3>
                              <p>{item.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <Link href={section.href} className={styles.textLink}>
                    {section.action}
                    <ArrowRight size={17} />
                  </Link>
                </div>

                <div className={styles.featureMedia}>
                  <Image
                    src={section.image}
                    alt={section.alt}
                    fill
                    sizes="(max-width: 960px) 100vw, 50vw"
                    className={styles.featureImage}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.highlightsSection}>
        <div className={styles.shell}>
          <div className={styles.highlightsLayout}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Stay in control</p>
              <h2>Share only what you choose</h2>
              <p>
                Vaultway keeps link creation simple while still giving owners
                practical controls over access.
              </p>
            </div>

            <div className={styles.highlightsGrid}>
              {sharingHighlights.map((highlight) => {
                const Icon = highlight.icon;

                return (
                  <article key={highlight.title} className={styles.highlight}>
                    <span className={styles.highlightIcon}>
                      <Icon size={26} strokeWidth={1.8} />
                    </span>

                    <h3>{highlight.title}</h3>
                    <p>{highlight.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.transferSection}>
        <div className={styles.shell}>
          <div className={styles.transferLayout}>
            <div className={styles.transferImage}>
              <Image
                src="/share-assets/img-performance.png"
                alt="Fast file transfer illustration"
                fill
                sizes="(max-width: 860px) 80vw, 36vw"
                className={styles.transferAsset}
              />
            </div>

            <div className={styles.transferCopy}>
              <p className={styles.eyebrow}>Same share dialog</p>
              <h2>There is no separate transfer product</h2>

              <p>
                Sending a file is the same Cloud Drive share flow. The transfer
                page explains that link again — it does not add another uploader.
              </p>

              <Link href="/features/transfer" className={styles.primaryButton}>
                See the share-link flow
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

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
        <div className={styles.shell}>
          <div className={styles.cta}>
            <div className={styles.ctaIcon}>
              <UploadCloud size={44} strokeWidth={1.5} />
            </div>

            <div className={styles.ctaCopy}>
              <h2>Start sharing securely with Vaultway</h2>
              <p>
                Create a link from Cloud Drive and manage it under Shared items.
              </p>
            </div>

            <div className={styles.ctaActions}>
              <Link href="/sign-up" className={styles.primaryButton}>
                Create a free account
              </Link>

              <Link href="/solutions" className={styles.secondaryButton}>
                Explore solutions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
