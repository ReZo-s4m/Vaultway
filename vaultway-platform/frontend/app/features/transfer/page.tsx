import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Check,
  Clock3,
  CloudUpload,
  Download,
  Gauge,
  HardDriveUpload,
  KeyRound,
  Link2,
  MailCheck,
  Send,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Users,
  Zap,
} from "lucide-react";

import styles from "./transfer.module.css";

export const metadata: Metadata = {
  title: "Send a share link | Vaultway",
  description:
    "Send a file with the Cloud Drive share dialog: optional password, expiry, view limit, and revoke.",
};

type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const transferBenefits: Benefit[] = [
  {
    title: "Same share dialog as Cloud Drive",
    description:
      "Upload a file, open Share, copy the link. There is no second transfer product or dropzone on this page that actually sends files.",
    icon: Send,
  },
  {
    title: "Small files stay downloadable here",
    description:
      "Preview and download work for small files kept in the browser workspace. Large files store metadata only in this demo.",
    icon: HardDriveUpload,
  },
  {
    title: "Keep the link controlled",
    description:
      "Optional password, expiry, view limit, and revoke from Shared items.",
    icon: ShieldCheck,
  },
  {
    title: "No delivery tracking",
    description:
      "The dashboard lists the links you created. It does not notify you when someone opens or downloads them.",
    icon: MailCheck,
  },
];

const transferSteps = [
  {
    number: "01",
    title: "Upload in Cloud Drive",
    description:
      "Drop files into the dashboard. That is the real uploader — not the mock panel on the right.",
  },
  {
    number: "02",
    title: "Open Share",
    description:
      "Choose VIEW or DOWNLOAD, then optional password, expiry, and view limit.",
  },
  {
    number: "03",
    title: "Copy the link",
    description:
      "Find it again under Shared items. A public download page is not wired yet.",
  },
];

const controls = [
  {
    title: "Expiry dates",
    description:
      "Automatically close the transfer after a selected number of hours or days.",
    icon: Clock3,
  },
  {
    title: "Password protection",
    description:
      "Require a password before a recipient can access the download.",
    icon: KeyRound,
  },
  {
    title: "Shared items list",
    description:
      "See the links you created and revoke them. Opened/downloaded tracking is not built.",
    icon: Gauge,
  },
  {
    title: "Link revocation",
    description:
      "Disable a transfer immediately from your dashboard whenever needed.",
    icon: Link2,
  },
];

const faqs = [
  {
    question: "What is the difference between this page and Secure Sharing?",
    answer:
      "There is no difference in the product. Both pages describe the same Cloud Drive share dialog.",
  },
  {
    question: "Does the recipient need a Vaultway account?",
    answer:
      "The share dialog creates a public-style link. A dedicated public download page is not wired yet, so you manage the link from Shared items.",
  },
  {
    question: "Can I add an expiry date?",
    answer:
      "Yes. You can choose when the transfer should expire so the download link closes automatically.",
  },
  {
    question: "Can I cancel a transfer after sending it?",
    answer:
      "Yes. Revoke the transfer from your dashboard and the existing link will stop working.",
  },
  {
    question: "Can I protect a transfer with a password?",
    answer:
      "Yes. Password protection can be enabled before the transfer link is shared.",
  },
];

export default function TransferPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.shell}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Share link</p>

              <h1>Send a file with a share link</h1>

              <p className={styles.heroDescription}>
                This page is an explanation of the Cloud Drive Share dialog —
                not a second product. The video and the panel below are
                illustrations.
              </p>

              <div className={styles.heroActions}>
                <Link href="/sign-up" className={styles.primaryButton}>
                  Send files for free
                  <ArrowRight size={18} />
                </Link>

                <Link href="/features/sharing" className={styles.textLink}>
                  Same flow on Sharing
                  <ArrowRight size={17} />
                </Link>
              </div>

              <div className={styles.heroMeta}>
                <span>
                  <Check size={15} />
                  Same dialog as Cloud Drive
                </span>

                <span>
                  <Check size={15} />
                  Expiring links
                </span>

                <span>
                  <Check size={15} />
                  Password protection
                </span>
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
                  src="/transfer-assets/transfer-files.webm"
                  type="video/webm"
                />
                <source
                  src="/transfer-assets/transfer-files.qt"
                  type="video/quicktime"
                />
              </video>

              <span className={styles.videoBrandCover} aria-hidden="true">
                V
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.benefitsSection}>
        <div className={styles.shell}>
          <div className={styles.benefitsLayout}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>What is actually built</p>
              <h2>One share dialog for sending files</h2>

              <p>
                A link is for that file only. The rest of Cloud Drive stays in
                your signed-in session.
              </p>
            </div>

            <div className={styles.benefitsGrid}>
              {transferBenefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <article key={benefit.title} className={styles.benefit}>
                    <span className={styles.benefitIcon}>
                      <Icon size={27} strokeWidth={1.8} />
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

      <section className={styles.demoSection}>
        <div className={styles.shell}>
          <div className={styles.demoGrid}>
            <div className={styles.demoCopy}>
              <p className={styles.eyebrow}>Fast setup</p>
              <h2>The real steps are in the dashboard</h2>

              <p>
                The card on the right is a mock. Buttons on it do not upload or
                create a link.
              </p>

              <div className={styles.stepList}>
                {transferSteps.map((step) => (
                  <div key={step.number} className={styles.step}>
                    <span>{step.number}</span>

                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <TransferPanel />
          </div>
        </div>
      </section>

      <section className={styles.performanceSection}>
        <div className={styles.shell}>
          <div className={styles.performanceGrid}>
            <div className={styles.performanceMedia}>
              <Image
                src="/transfer-assets/img-performance.png"
                alt="Fast file transfer performance illustration"
                fill
                sizes="(max-width: 920px) 100vw, 42vw"
                className={styles.performanceImage}
              />
            </div>

            <div className={styles.performanceCopy}>
              <p className={styles.eyebrow}>Browser workspace</p>
              <h2>No separate high-speed transfer lane</h2>

              <p>
                Files go through Cloud Drive. Small ones can be previewed and
                downloaded here. A recipient download page and live upload
                progress to Supabase are not built yet.
              </p>

              <div className={styles.performancePoints}>
                <span>
                  <Zap size={18} />
                  Upload in Cloud Drive
                </span>

                <span>
                  <Download size={18} />
                  Download if the file was kept locally
                </span>

                <span>
                  <Sparkles size={18} />
                  Same share dialog
                </span>
              </div>

              <Link href="/sign-in" className={styles.primaryButton}>
                Open Cloud Drive
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.controlsSection}>
        <div className={styles.shell}>
          <div className={styles.controlsLayout}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Stay in control</p>
              <h2>Decide how every transfer works</h2>

              <p>
                The sender controls the delivery before and after the link is
                shared.
              </p>
            </div>

            <div className={styles.controlsGrid}>
              {controls.map((control) => {
                const Icon = control.icon;

                return (
                  <article key={control.title} className={styles.control}>
                    <span className={styles.controlIcon}>
                      <Icon size={26} strokeWidth={1.8} />
                    </span>

                    <h3>{control.title}</h3>
                    <p>{control.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.comparisonSection}>
        <div className={styles.shell}>
          <div className={styles.comparisonHeading}>
            <p className={styles.eyebrow}>One tool</p>
            <h2>This is the same share flow</h2>
          </div>

          <div className={styles.comparisonGrid}>
            <article className={styles.comparisonCard}>
              <span className={styles.comparisonIcon}>
                <Send size={28} />
              </span>

              <h3>Use a share link when</h3>

              <ul>
                <li>
                  <Check size={16} />
                  You already uploaded the file to Cloud Drive
                </li>
                <li>
                  <Check size={16} />
                  You want view or download on that file only
                </li>
                <li>
                  <Check size={16} />
                  You want password, expiry, or revoke
                </li>
              </ul>

              <Link href="/sign-in" className={styles.textLink}>
                Open Shared items
                <ArrowRight size={17} />
              </Link>
            </article>

            <article className={styles.comparisonCard}>
              <span className={styles.comparisonIcon}>
                <Users size={28} />
              </span>

              <h3>What this project does not have</h3>

              <ul>
                <li>
                  <Check size={16} />
                  A second transfer uploader
                </li>
                <li>
                  <Check size={16} />
                  Folder collaborator permissions
                </li>
                <li>
                  <Check size={16} />
                  Recipient open/download tracking
                </li>
              </ul>

              <Link href="/features/sharing" className={styles.textLink}>
                Explore Secure Sharing
                <ArrowRight size={17} />
              </Link>
            </article>
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
            <span className={styles.ctaIcon}>
              <UploadCloud size={45} strokeWidth={1.45} />
            </span>

            <div className={styles.ctaCopy}>
              <h2>Send a file from Cloud Drive</h2>
              <p>
                Create the link in the dashboard Share dialog and revoke it from
                Shared items.
              </p>
            </div>

            <div className={styles.ctaActions}>
              <Link href="/sign-up" className={styles.primaryButton}>
                Send files for free
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

function TransferPanel() {
  return (
    <div className={styles.transferPanel}>
      <div className={styles.panelTop}>
        <div>
          <p>Illustration only</p>
          <span>Not a live uploader</span>
        </div>

        <span className={styles.panelStatus}>Mock</span>
      </div>

      <div className={styles.dropzone}>
        <span className={styles.dropzoneIcon}>
          <CloudUpload size={34} strokeWidth={1.55} />
        </span>

        <strong>Drop files here</strong>
        <span>or choose files from your device</span>

        <button type="button" disabled>
          Illustration
        </button>
      </div>

      <div className={styles.fileList}>
        {[
          ["product-demo.mp4", "186 MB", "100%"],
          ["design-assets.zip", "76 MB", "100%"],
          ["project-brief.pdf", "22 MB", "100%"],
        ].map((file) => (
          <div key={file[0]} className={styles.fileRow}>
            <span className={styles.fileIcon}>
              <CloudUpload size={17} />
            </span>

            <div>
              <strong>{file[0]}</strong>
              <span>{file[1]}</span>
            </div>

            <span>{file[2]}</span>
          </div>
        ))}
      </div>

      <div className={styles.panelControls}>
        <div>
          <Clock3 size={17} />
          <span>Expires in 7 days</span>
        </div>

        <div>
          <KeyRound size={17} />
          <span>Password enabled</span>
        </div>
      </div>

      <button type="button" className={styles.createTransferButton} disabled>
        Use Share in Cloud Drive
      </button>
    </div>
  );
}
