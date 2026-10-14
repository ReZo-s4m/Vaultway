import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Album,
  ArrowRight,
  Check,
  CloudUpload,
  Download,
  Film,
  FolderHeart,
  Headphones,
  ImageIcon,
  Images,
  Play,
  Search,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Upload,
  Video,
  type LucideIcon,
} from "lucide-react";

import styles from "./media.module.css";

export const metadata: Metadata = {
  title: "Media Files | Vaultway",
  description:
    "Images you upload to Cloud Drive appear in the Media view. Preview and download work for small files kept in the browser.",
};

type MediaFeature = {
  title: string;
  description: string;
  action: string;
  href: string;
  image: string;
  alt: string;
  icon: LucideIcon;
  brandCover?: boolean;
};

const mediaFeatures: MediaFeature[] = [
  {
    title: "Upload and collect media files with ease",
    description:
      "Add photos, videos, and audio from your device in Cloud Drive. Only images appear in the Media view.",
    action: "Start uploading media",
    href: "/sign-up",
    image: "/media-assets/image-holder-8.png",
    alt: "Illustration of media files. Upload happens in Cloud Drive.",
    icon: CloudUpload,
  },
  {
    title: "Browse media from the same drive",
    description:
      "Open the Media page to see images you already uploaded. Search Cloud Drive by name when you need a specific file.",
    action: "Open the Media view",
    href: "/sign-up",
    image: "/media-assets/image-holder-1-3.png",
    alt: "Illustration of an album UI. Vaultway has no album product.",
    icon: Album,
    brandCover: true,
  },
  {
    title: "Preview small images in the browser",
    description:
      "The Media view lists images from Cloud Drive. Small images and PDFs can preview if their bytes were kept locally. Video and audio playback are not built.",
    action: "Open Vaultway",
    href: "/sign-in",
    image: "/media-assets/image-holder-2-3.png",
    alt: "Illustration of devices. Vaultway is a browser dashboard, not a mobile media app.",
    icon: Play,
  },
];

const mediaHighlights = [
  {
    icon: Images,
    title: "Media view",
    description:
      "See images from Cloud Drive in one place.",
  },
  {
    icon: Search,
    title: "Drive search",
    description:
      "Search Cloud Drive by file name. There is no separate gallery search.",
  },
  {
    icon: Film,
    title: "Video files",
    description:
      "Videos can sit in Cloud Drive as files. In-browser playback is not built.",
  },
  {
    icon: Headphones,
    title: "Audio files",
    description:
      "Audio can be stored as files. There is no music player in this project.",
  },
  {
    icon: Share2,
    title: "File sharing",
    description:
      "Share a media file with the same password, expiry, and revoke controls as any other file.",
  },
  {
    icon: Smartphone,
    title: "Browser access",
    description:
      "Open Media in a desktop or phone browser. There is no camera-roll app.",
  },
];

const secureMediaPoints = [
  {
    icon: ShieldCheck,
    title: "Private by default",
    description:
      "Your media remains inside your account until you choose to share it.",
  },
  {
    icon: Share2,
    title: "Controlled sharing",
    description:
      "Share one image with the same password, expiry, and revoke controls as any other file.",
  },
  {
    icon: Download,
    title: "Downloads when bytes were kept",
    description:
      "Small files stored in the browser workspace can download. Larger ones are metadata only in this demo.",
  },
  {
    icon: SlidersHorizontal,
    title: "Clear organisation",
    description:
      "Use Cloud Drive folders and the Media view. There are no albums or gallery filters.",
  },
];

const faqs = [
  {
    question: "Which media files can I store?",
    answer:
      "Vaultway can support common image, video, and audio formats allowed by your upload rules, including JPG, PNG, MP4, MOV, MP3, and WAV.",
  },
  {
    question: "Can I create photo and video albums?",
    answer:
      "Not as a separate album product. Use folders in Cloud Drive, then open Media to browse images.",
  },
  {
    question: "Can I share media with someone who has no account?",
    answer:
      "You can create a share link from the file. A public share page is not wired yet, so links are managed from Shared items.",
  },
  {
    question: "Can I play videos without downloading them?",
    answer:
      "Not in this project. Preview works for small images and PDFs that were kept locally. Video and audio are stored as files only.",
  },
  {
    question: "Are my media files public after upload?",
    answer:
      "No. Uploaded media stays private by default and only becomes accessible to others when you intentionally share it.",
  },
];

export default function MediaPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.shell}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Media files</p>

              <h1>Keep every photo, video, and audio file in one place</h1>

              <p className={styles.heroDescription}>
                Upload photos, video, and audio to Cloud Drive. The Media view
                shows images. Share any file with the same link controls as the
                rest of the workspace.
              </p>

              <div className={styles.heroActions}>
                <Link href="/sign-up" className={styles.primaryButton}>
                  Start storing media
                  <ArrowRight size={18} />
                </Link>

                <Link href="/features/storage" className={styles.textLink}>
                  Explore Cloud Storage
                  <ArrowRight size={17} />
                </Link>
              </div>

              <div className={styles.heroMeta}>
                <span>
                  <Check size={15} />
                  Images in the Media view
                </span>

                <span>
                  <Check size={15} />
                  Media view in the dashboard
                </span>

                <span>
                  <Check size={15} />
                  Controlled sharing
                </span>
              </div>
            </div>

            <div className={styles.heroMedia}>
              <Image
                src="/media-assets/Media_Album-1.png"
                alt="Illustration of albums. The live feature is the dashboard Media view for images."
                fill
                priority
                sizes="(max-width: 1050px) 100vw, 58vw"
                className={styles.heroImage}
              />

              <span className={styles.heroBrandCover} aria-hidden="true">
                V
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.shell}>
          <div className={styles.featureHeading}>
            <p className={styles.eyebrow}>Your media, your way</p>
            <h2>Upload, preview, and share media</h2>
          </div>

          <div className={styles.featureList}>
            {mediaFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className={`${styles.featureRow} ${
                    index % 2 === 1 ? styles.featureRowReverse : ""
                  }`}
                >
                  <div className={styles.featureCopy}>
                    <span className={styles.featureIcon}>
                      <Icon size={23} strokeWidth={1.8} />
                    </span>

                    <h2>{feature.title}</h2>
                    <p>{feature.description}</p>

                    <Link href={feature.href} className={styles.textLink}>
                      {feature.action}
                      <ArrowRight size={17} />
                    </Link>
                  </div>

                  <div className={styles.featureMedia}>
                    <Image
                      src={feature.image}
                      alt={feature.alt}
                      fill
                      sizes="(max-width: 1050px) 100vw, 50vw"
                      className={styles.featureImage}
                    />

                    {feature.brandCover && (
                      <span
                        className={styles.featureBrandCover}
                        aria-hidden="true"
                      >
                        <strong>V</strong>
                        <span>Vaultway</span>
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.highlightsSection}>
        <div className={styles.shell}>
          <div className={styles.highlightsLayout}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>There is more</p>
              <h2>The same drive, filtered to media</h2>

              <p>
                Media is a view over files you already uploaded — not a separate
                album product, camera roll, or editor.
              </p>
            </div>

            <div className={styles.highlightsGrid}>
              {mediaHighlights.map((highlight) => {
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

      <section className={styles.backupSection}>
        <div className={styles.shell}>
          <div className={styles.backupGrid}>
            <div className={styles.backupMedia}>
              <Image
                src="/media-assets/backup-photos.png"
                alt="Illustration of camera backup. Automatic phone uploads are not implemented."
                fill
                sizes="(max-width: 1050px) 100vw, 48vw"
                className={styles.backupImage}
              />
            </div>

            <div className={styles.backupCopy}>
              <p className={styles.eyebrow}>Same controls as the drive</p>
              <h2>Favourites, recents, and trash still apply</h2>

              <p>
                Star a clip, find it in Recents, or recover it from Trash. Camera
                backup and automatic phone uploads are not part of this project.
              </p>

              <div className={styles.secureMediaList}>
                {secureMediaPoints.map((point) => {
                  const Icon = point.icon;

                  return (
                    <div key={point.title} className={styles.secureMediaItem}>
                      <span>
                        <Icon size={21} strokeWidth={1.8} />
                      </span>

                      <div>
                        <h3>{point.title}</h3>
                        <p>{point.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link href="/sign-up" className={styles.primaryButton}>
                Create your media library
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.formatSection}>
        <div className={styles.shell}>
          <div className={styles.formatHeading}>
            <p className={styles.eyebrow}>Flexible storage</p>
            <h2>Keep different media formats together</h2>
          </div>

          <div className={styles.formatGrid}>
            <div className={styles.formatItem}>
              <ImageIcon size={30} />
              <strong>Images</strong>
              <span>JPG, PNG, WEBP, GIF</span>
            </div>

            <div className={styles.formatItem}>
              <Video size={30} />
              <strong>Videos</strong>
              <span>MP4, MOV, WEBM</span>
            </div>

            <div className={styles.formatItem}>
              <Headphones size={30} />
              <strong>Audio</strong>
              <span>MP3, WAV, M4A</span>
            </div>

            <div className={styles.formatItem}>
              <Upload size={30} />
              <strong>Other files</strong>
              <span>Stay in Cloud Drive as files</span>
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
            <span className={styles.ctaIcon}>
              <FolderHeart size={44} strokeWidth={1.5} />
            </span>

            <div className={styles.ctaCopy}>
              <h2>Start organising your media with Vaultway</h2>
              <p>
                Keep important photos, videos, and audio files together in one
                private workspace.
              </p>
            </div>

            <div className={styles.ctaActions}>
              <Link href="/sign-up" className={styles.primaryButton}>
                Create a free account
              </Link>

              <Link href="/features/sharing" className={styles.secondaryButton}>
                Explore sharing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
