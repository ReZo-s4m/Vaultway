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
  title: "Quick File Transfer | Vaultway",
  description:
    "Send large files quickly with secure download links, expiry controls, and simple delivery tracking.",
};

type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const transferBenefits: Benefit[] = [
  {
    title: "Send without creating a folder",
    description:
      "Choose files, create a transfer, and share one download link without changing your main Vaultway workspace.",
    icon: Send,
  },
  {
    title: "Handle larger files",
    description:
      "Move project archives, recordings, design files, and other large deliveries through one focused transfer flow.",
    icon: HardDriveUpload,
  },
  {
    title: "Keep delivery controlled",
    description:
      "Add expiry dates and passwords so a transfer does not remain available longer than intended.",
    icon: ShieldCheck,
  },
  {
    title: "Know when it arrives",
    description:
      "Track the transfer status and see when recipients open or download the delivery.",
    icon: MailCheck,
  },
];

const transferSteps = [
  {
    number: "01",
    title: "Add your files",
    description:
      "Drag files into the transfer panel or select them from your device.",
  },
  {
    number: "02",
    title: "Choose protection",
    description:
      "Set an expiry time, add a password, and name the transfer.",
  },
  {
    number: "03",
    title: "Share the link",
    description:
      "Copy the generated link or send it directly to the recipient.",
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
    title: "Download tracking",
    description:
      "See whether a delivery is still waiting, opened, or downloaded.",
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
    question: "What is the difference between Quick Transfer and Secure Sharing?",
    answer:
      "Quick Transfer is designed for one-off delivery. Secure Sharing is better when a file or folder should remain available and manageable over time.",
  },
  {
    question: "Does the recipient need a Vaultway account?",
    answer:
      "No. The recipient can open the transfer link and download the files without creating a Vaultway account.",
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
              <p className={styles.eyebrow}>Quick transfer</p>

              <h1>Send large files quickly and securely</h1>

              <p className={styles.heroDescription}>
                Create a focused delivery, protect it with simple controls, and
                share one clean download link with anyone.
              </p>

              <div className={styles.heroActions}>
                <Link href="/sign-up" className={styles.primaryButton}>
                  Send files for free
                  <ArrowRight size={18} />
                </Link>

                <Link href="/features/sharing" className={styles.textLink}>
                  Compare with Secure Sharing
                  <ArrowRight size={17} />
                </Link>
              </div>

              <div className={styles.heroMeta}>
                <span>
                  <Check size={15} />
                  No recipient account required
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
              <p className={styles.eyebrow}>Built for delivery</p>
              <h2>One simple flow for sending files</h2>

              <p>
                Use Quick Transfer when the recipient only needs the files—not
                access to your complete folder or workspace.
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
              <h2>Prepare a transfer in a few steps</h2>

              <p>
                Add your files, choose the access settings, and Vaultway creates
                a delivery link that is ready to send.
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
              <p className={styles.eyebrow}>Built for speed</p>
              <h2>Move big deliveries without a complicated workflow</h2>

              <p>
                Vaultway keeps transfer creation focused: select the files,
                choose protection, and send the link. The recipient gets a clean
                download experience without navigating your storage.
              </p>

              <div className={styles.performancePoints}>
                <span>
                  <Zap size={18} />
                  Clear upload progress
                </span>

                <span>
                  <Download size={18} />
                  Simple recipient downloads
                </span>

                <span>
                  <Sparkles size={18} />
                  Designed for one-off deliveries
                </span>
              </div>

              <Link href="/sign-up" className={styles.primaryButton}>
                Create a transfer
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
            <p className={styles.eyebrow}>Choose the right tool</p>
            <h2>Quick Transfer or Secure Sharing?</h2>
          </div>

          <div className={styles.comparisonGrid}>
            <article className={styles.comparisonCard}>
              <span className={styles.comparisonIcon}>
                <Send size={28} />
              </span>

              <h3>Use Quick Transfer when</h3>

              <ul>
                <li>
                  <Check size={16} />
                  Files are being delivered once
                </li>
                <li>
                  <Check size={16} />
                  The recipient only needs to download
                </li>
                <li>
                  <Check size={16} />
                  Access should expire automatically
                </li>
              </ul>

              <Link href="/sign-up" className={styles.textLink}>
                Start a transfer
                <ArrowRight size={17} />
              </Link>
            </article>

            <article className={styles.comparisonCard}>
              <span className={styles.comparisonIcon}>
                <Users size={28} />
              </span>

              <h3>Use Secure Sharing when</h3>

              <ul>
                <li>
                  <Check size={16} />
                  Access should remain available
                </li>
                <li>
                  <Check size={16} />
                  People need folder permissions
                </li>
                <li>
                  <Check size={16} />
                  The content will be updated over time
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
              <h2>Send your next delivery with Vaultway</h2>
              <p>
                Create a secure transfer link and keep control after it has been
                sent.
              </p>
            </div>

            <div className={styles.ctaActions}>
              <Link href="/sign-up" className={styles.primaryButton}>
                Send files for free
              </Link>

              <Link href="/pricing" className={styles.secondaryButton}>
                Compare plans
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
          <p>New transfer</p>
          <span>3 files · 284 MB</span>
        </div>

        <span className={styles.panelStatus}>Ready</span>
      </div>

      <div className={styles.dropzone}>
        <span className={styles.dropzoneIcon}>
          <CloudUpload size={34} strokeWidth={1.55} />
        </span>

        <strong>Drop files here</strong>
        <span>or choose files from your device</span>

        <button type="button">Choose files</button>
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

      <button type="button" className={styles.createTransferButton}>
        Create transfer link
      </button>
    </div>
  );
}
