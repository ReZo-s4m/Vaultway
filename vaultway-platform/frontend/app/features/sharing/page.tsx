import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
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
    "Share files and folders securely with controlled links, permissions, expiry dates, and file requests.",
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
    title: "Share your files and folders with anyone",
    items: [
      {
        title: "Share with a secure link",
        description:
          "Generate a link for a file or folder and send it to anyone, including people without a Vaultway account.",
        icon: Link2,
      },
      {
        title: "Keep access private",
        description:
          "Shared content remains protected behind controlled access instead of exposing your complete workspace.",
        icon: FileKey2,
      },
      {
        title: "Add extra protection",
        description:
          "Use passwords, expiry dates, and manual revocation for sensitive files and time-limited access.",
        icon: ShieldCheck,
      },
    ],
    action: "Start sharing securely",
    href: "/sign-up",
    image: "/share-assets/share-1.png",
    alt: "Secure file sharing link interface",
  },
  {
    title: "Give collaborators access to selected folders",
    items: [
      {
        title: "Work together",
        description:
          "Invite teammates, classmates, or clients into only the folders needed for a project.",
        icon: Users,
      },
      {
        title: "Set clear permissions",
        description:
          "Choose view-only, upload, edit, or full-access permissions for each collaborator.",
        icon: SlidersHorizontal,
      },
    ],
    action: "Create a shared workspace",
    href: "/sign-up",
    image: "/share-assets/share-2.5.png",
    alt: "Shared folder permissions interface",
  },
  {
    title: "Let people upload files without seeing your workspace",
    description:
      "Create a file request and share a public upload page. Other people can submit assignments, client files, photos, or project material without receiving access to the rest of your Vaultway storage.",
    action: "Create a file request",
    href: "/sign-up",
    image: "/share-assets/share-3.png",
    alt: "Public file request upload interface",
  },
  {
    title: "Understand and manage shared links",
    items: [
      {
        title: "Track link activity",
        description:
          "See whether a shared link was opened or downloaded so you can understand how recipients engage with it.",
        icon: BarChart3,
      },
      {
        title: "Import shared files",
        description:
          "Save files from a shared link directly into your Vaultway workspace without downloading and uploading them again.",
        icon: CloudDownload,
      },
    ],
    action: "Explore sharing tools",
    href: "/solutions",
    image: "/share-assets/link-analytics-feature-1.png",
    alt: "Shared link analytics interface",
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
    title: "Permission levels",
    description:
      "Decide whether recipients can view, upload, edit, or manage content.",
    icon: SlidersHorizontal,
  },
  {
    title: "File requests",
    description:
      "Collect files from people without exposing any other folder or document.",
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
      "Not for normal link sharing. A recipient can open the link and access the allowed file without creating an account.",
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
    question: "Can someone upload files without seeing my storage?",
    answer:
      "Yes. File requests provide a dedicated upload page. The sender can submit files but cannot browse the rest of your Vaultway workspace.",
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

              <h1>Share files with anyone, from anywhere</h1>

              <p className={styles.heroDescription}>
                Send files and folders through controlled links, collaborate
                with selected people, and decide exactly how long access should
                remain available.
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
              <p className={styles.eyebrow}>Quick transfer</p>
              <h2>Send large files without creating a shared folder</h2>

              <p>
                Use Vaultway Quick Transfer for one-off deliveries when the
                recipient only needs to download a file. Keep Secure Sharing for
                content that should remain available and manageable over time.
              </p>

              <Link href="/features/transfer" className={styles.primaryButton}>
                Explore Quick Transfer
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
                Create controlled links, collect files, and manage access from
                one private workspace.
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
