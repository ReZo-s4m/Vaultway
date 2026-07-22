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
    "Upload, organise, play, and securely share photos, videos, and audio files with Vaultway.",
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
      "Add photos, videos, and audio files from your device, or create a file request so friends, classmates, clients, and teammates can send media directly to you.",
    action: "Start uploading media",
    href: "/sign-up",
    image: "/media-assets/image-holder-8.png",
    alt: "Media files being uploaded to an online album",
    icon: CloudUpload,
  },
  {
    title: "Organise everything with albums and gallery views",
    description:
      "Group important moments into albums, browse only images and videos, and use search and filters to find the right file without opening every folder.",
    action: "Create your first album",
    href: "/sign-up",
    image: "/media-assets/image-holder-1-3.png",
    alt: "Creating and searching a photo album",
    icon: Album,
    brandCover: true,
  },
  {
    title: "Enjoy your photos, videos, and audio anywhere",
    description:
      "Open your media from the web on desktop, tablet, or mobile. Preview images, play videos, listen to audio, and keep the same organised library across devices.",
    action: "Open Vaultway",
    href: "/sign-in",
    image: "/media-assets/image-holder-2-3.png",
    alt: "Media library available across phone and computer",
    icon: Play,
  },
];

const mediaHighlights = [
  {
    icon: Images,
    title: "Albums",
    description:
      "Group related photos and videos into organised collections.",
  },
  {
    icon: Search,
    title: "Gallery search",
    description:
      "Find media by folder, name, type, or recent activity.",
  },
  {
    icon: Film,
    title: "Video playback",
    description:
      "Preview stored videos without downloading them first.",
  },
  {
    icon: Headphones,
    title: "Audio access",
    description:
      "Keep recordings and music together with your other files.",
  },
  {
    icon: Share2,
    title: "Album sharing",
    description:
      "Share selected media without exposing the rest of your storage.",
  },
  {
    icon: Smartphone,
    title: "Responsive access",
    description:
      "Browse your media library from desktop, tablet, or mobile.",
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
      "Create a specific link for a file or album and revoke it later.",
  },
  {
    icon: Download,
    title: "Original downloads",
    description:
      "Keep the original file available when you need the full-quality version.",
  },
  {
    icon: SlidersHorizontal,
    title: "Clear organisation",
    description:
      "Use albums, gallery views, and filters instead of a single crowded folder.",
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
      "Yes. Albums let you group related photos and videos without changing the original file locations.",
  },
  {
    question: "Can I share an album with someone who has no account?",
    answer:
      "Yes. You can create a controlled sharing link for selected media or an album without exposing the rest of your workspace.",
  },
  {
    question: "Can I play videos without downloading them?",
    answer:
      "Yes. Supported video and audio files can be previewed from the Vaultway web interface.",
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
                Upload your media, organise it into albums, preview it from any
                device, and share only the files or collections you choose.
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
                  Photos, videos, and audio
                </span>

                <span>
                  <Check size={15} />
                  Albums and gallery views
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
                alt="Photo albums inside a cloud media library"
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
            <h2>Upload, organise, and enjoy your files</h2>
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
              <h2>Everything needed for a cleaner media library</h2>

              <p>
                Keep the feature set focused: useful organisation, playback, and
                sharing without turning Vaultway into a complicated editing
                platform.
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
                alt="Camera uploads and media recovery"
                fill
                sizes="(max-width: 1050px) 100vw, 48vw"
                className={styles.backupImage}
              />
            </div>

            <div className={styles.backupCopy}>
              <p className={styles.eyebrow}>Protect important memories</p>
              <h2>Keep recent photos easier to find and recover</h2>

              <p>
                Organise camera uploads in one place, keep recent media visible,
                and provide a recovery path for files that were removed by
                mistake.
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
              <strong>Original files</strong>
              <span>Keep full-quality downloads</span>
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
