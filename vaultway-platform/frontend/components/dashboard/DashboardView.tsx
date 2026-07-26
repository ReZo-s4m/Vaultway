"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Album,
  ArrowUp,
  Bell,
  Check,
  ChevronDown,
  ChevronUp,
  Clock3,
  Cloud,
  CloudUpload,
  ContactRound,
  FileClock,
  FileHeart,
  FileInput,
  FileOutput,
  FileText,
  Folder,
  FolderInput,
  FolderPlus,
  Grid3X3,
  Heart,
  Image as ImageIcon,
  Info,
  KeyRound,
  Link2,
  List,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  Upload,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";

import styles from "./dashboard.module.css";

export type DashboardViewName =
  | "drive"
  | "media"
  | "shared"
  | "recents"
  | "favourites"
  | "trash"
  | "account"
  | "settings"
  | "device-centre"
  | "object-storage";

type DashboardViewProps = {
  view: DashboardViewName;
};

const sharedTabs = [
  {
    id: "incoming",
    label: "Incoming shares",
    icon: FileInput,
  },
  {
    id: "outgoing",
    label: "Outgoing shares",
    icon: FileOutput,
  },
  {
    id: "links",
    label: "Links",
    icon: Link2,
  },
  {
    id: "requests",
    label: "File requests",
    icon: FolderInput,
  },
] as const;

export default function DashboardView({
  view,
}: DashboardViewProps) {
  if (view === "drive") return <DriveView />;
  if (view === "media") return <MediaView />;
  if (view === "shared") return <SharedView />;
  if (view === "recents") return <RecentsView />;
  if (view === "favourites") return <FavouritesView />;
  if (view === "trash") return <TrashView />;
  if (view === "account") return <AccountOverview />;
  if (view === "settings") return <SettingsView />;
  if (view === "device-centre") return <DeviceCentreView />;

  return <ObjectStorageView />;
}

function PageTop({
  title,
  actions,
}: {
  title: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className={styles.pageTop}>
      <div>
        <p className={styles.pageEyebrow}>Vaultway workspace</p>
        <h1>{title}</h1>
      </div>
      {actions && <div className={styles.pageActions}>{actions}</div>}
    </div>
  );
}

function DriveView() {
  const [uploadMenuOpen, setUploadMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <section className={styles.pageSection}>
      <PageTop
        title="Cloud drive"
        actions={
          <>
            <div className={styles.uploadAction}>
              <button
                type="button"
                className={styles.primaryAction}
                onClick={() => setUploadMenuOpen((current) => !current)}
              >
                <ArrowUp size={18} />
                Upload
                <ChevronDown size={16} />
              </button>

              {uploadMenuOpen && (
                <div className={styles.uploadMenu}>
                  <button type="button">
                    <Upload size={18} />
                    Upload files
                  </button>

                  <button type="button">
                    <FolderPlus size={18} />
                    Upload folder
                  </button>
                </div>
              )}
            </div>

            <button type="button" className={styles.secondaryAction}>
              <FolderPlus size={18} />
              New folder
            </button>
          </>
        }
      />

      <div className={styles.contentToolbar}>
        <span>My files</span>

        <div className={styles.viewControls}>
          <button
            type="button"
            className={
              viewMode === "grid" ? styles.viewControlActive : ""
            }
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <Grid3X3 size={18} />
          </button>

          <button
            type="button"
            className={
              viewMode === "list" ? styles.viewControlActive : ""
            }
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <List size={19} />
          </button>

          <button type="button" aria-label="Information">
            <Info size={19} />
          </button>
        </div>
      </div>

      <div className={styles.driveDropzone}>
        <EmptyArtwork type="drive" />

        <h2>Drag and drop files here</h2>
        <p>Your private workspace is ready for its first upload.</p>

        <div className={styles.emptyActions}>
          <button
            type="button"
            className={styles.primaryAction}
            onClick={() => setUploadMenuOpen((current) => !current)}
          >
            <Upload size={18} />
            Upload files
          </button>

          <button type="button" className={styles.secondaryAction}>
            <FolderPlus size={18} />
            Create folder
          </button>
        </div>
      </div>
    </section>
  );
}

function MediaView() {
  const [tab, setTab] = useState<"timeline" | "albums">("timeline");

  return (
    <section className={styles.pageSection}>
      <PageTop
        title="Media"
        actions={
          <button type="button" className={styles.primaryAction}>
            <Upload size={18} />
            Upload media
          </button>
        }
      />

      <div className={styles.pageTabs}>
        <button
          type="button"
          className={tab === "timeline" ? styles.pageTabActive : ""}
          onClick={() => setTab("timeline")}
        >
          Timeline
        </button>

        <button
          type="button"
          className={tab === "albums" ? styles.pageTabActive : ""}
          onClick={() => setTab("albums")}
        >
          Albums
        </button>
      </div>

      <div className={styles.mediaEmpty}>
        <EmptyArtwork type={tab === "timeline" ? "media" : "album"} />

        <h2>
          {tab === "timeline"
            ? "Keep your memories organised"
            : "Create your first album"}
        </h2>

        <p>
          {tab === "timeline"
            ? "Photos and videos you upload will appear here in a clean timeline."
            : "Group related photos and videos into a collection you can share."}
        </p>

        <button type="button" className={styles.primaryAction}>
          {tab === "timeline" ? (
            <Upload size={18} />
          ) : (
            <Album size={18} />
          )}
          {tab === "timeline" ? "Upload media" : "Create album"}
        </button>
      </div>
    </section>
  );
}

function SharedView() {
  const [tab, setTab] =
    useState<(typeof sharedTabs)[number]["id"]>("incoming");

  const currentTab = sharedTabs.find((item) => item.id === tab)!;
  const CurrentTabIcon = currentTab.icon;

  return (
    <section className={styles.pageSection}>
      <PageTop
        title="Shared items"
        actions={
          <button type="button" className={styles.primaryAction}>
            <Share2 size={18} />
            Create share
          </button>
        }
      />

      <div className={styles.pageTabs}>
        {sharedTabs.map((item) => (
          <button
            key={item.id}
            type="button"
            className={tab === item.id ? styles.pageTabActive : ""}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.centeredEmpty}>
        <span className={styles.largeEmptyIcon}>
          <CurrentTabIcon size={64} strokeWidth={1.25} />
        </span>

        <h2>No {currentTab.label.toLowerCase()} yet</h2>

        <p>
          {tab === "incoming" &&
            "Files and folders shared with you will appear here."}
          {tab === "outgoing" &&
            "Items you share with other people will appear here."}
          {tab === "links" &&
            "Secure links created for your files and folders will appear here."}
          {tab === "requests" &&
            "Create a request when you need other people to upload files."}
        </p>

        {tab === "requests" && (
          <button type="button" className={styles.primaryAction}>
            <FolderInput size={18} />
            Create file request
          </button>
        )}
      </div>
    </section>
  );
}

function RecentsView() {
  return (
    <section className={styles.pageSection}>
      <PageTop title="Recents" />

      <div className={styles.centeredEmpty}>
        <EmptyArtwork type="recent" />

        <h2>No recent activity</h2>
        <p>Your latest file and folder activity will appear here.</p>

        <button type="button" className={styles.primaryAction}>
          <Upload size={18} />
          Upload files
        </button>
      </div>
    </section>
  );
}

function FavouritesView() {
  return (
    <section className={styles.pageSection}>
      <PageTop title="Favourites" />

      <div className={styles.contentToolbar}>
        <span>Starred files and folders</span>

        <div className={styles.viewControls}>
          <button type="button" className={styles.viewControlActive}>
            <List size={19} />
          </button>
        </div>
      </div>

      <div className={styles.centeredEmpty}>
        <EmptyArtwork type="favourite" />

        <h2>No favourites yet</h2>
        <p>
          Add frequently used files and folders to favourites for faster
          access.
        </p>
      </div>
    </section>
  );
}

function TrashView() {
  return (
    <section className={styles.pageSection}>
      <PageTop
        title="Trash"
        actions={
          <button type="button" className={styles.secondaryAction}>
            Empty trash
          </button>
        }
      />

      <div className={styles.contentToolbar}>
        <span>Deleted items</span>

        <div className={styles.viewControls}>
          <button type="button" className={styles.viewControlActive}>
            <List size={19} />
          </button>
          <button type="button">
            <Info size={19} />
          </button>
        </div>
      </div>

      <div className={styles.centeredEmpty}>
        <EmptyArtwork type="trash" />

        <h2>Trash is empty</h2>
        <p>Deleted files will stay here until you restore or remove them.</p>
      </div>
    </section>
  );
}

function AccountOverview() {
  return (
    <section className={styles.accountPage}>
      <aside className={styles.accountSidebar}>
        <span className={styles.accountPageAvatar}>S</span>
        <h2>Samridh</h2>
        <p>samridh@example.com</p>

        <span className={styles.planBadge}>
          <ShieldCheck size={15} />
          Free plan
        </span>

        <div className={styles.accountMemberSince}>
          <span>Member since</span>
          <strong>July 2026</strong>
        </div>

        <button type="button">
          <KeyRound size={18} />
          Export recovery key
        </button>
      </aside>

      <div className={styles.accountMain}>
        <PageTop
          title="Account overview"
          actions={
            <Link href="/pricing" className={styles.primaryAction}>
              Upgrade account
            </Link>
          }
        />

        <div className={styles.accountSummaryCard}>
          <div className={styles.usageRing}>
            <span>0%</span>
          </div>

          <div>
            <span>Storage</span>
            <strong>0 B / 5 GB</strong>
          </div>

          <div className={styles.usageRing}>
            <span>—</span>
          </div>

          <div>
            <span>Transfer</span>
            <strong>0 B used</strong>
          </div>
        </div>

        <div className={styles.accountStatsCard}>
          <h2>Storage overview</h2>

          <div className={styles.accountStats}>
            <Stat value="0%" label="Cloud drive" accent="#5ea7ff" />
            <Stat value="0%" label="Versions" accent="#ffb44d" />
            <Stat value="0%" label="Trash" accent="#ff6b6b" />
            <Stat value="100%" label="Available" accent="#a8b0ba" />
          </div>
        </div>

        <div className={styles.accountStatsCard}>
          <h2>Your data</h2>

          <div className={styles.dataRows}>
            {[
              ["All files", "0 files"],
              ["All folders", "0 folders"],
              ["Trash", "0 files"],
              ["Incoming shares", "0 folders"],
              ["Outgoing shares", "0 folders"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SettingsView() {
  const groups = [
    {
      title: "Account",
      description: "Profile, email, and account recovery",
      icon: UserCircleIcon,
    },
    {
      title: "Security",
      description: "Password, two-factor authentication, and sessions",
      icon: ShieldCheck,
    },
    {
      title: "Sharing defaults",
      description: "Default link expiry and permission settings",
      icon: SlidersHorizontal,
    },
    {
      title: "Notifications",
      description: "Choose which updates Vaultway sends you",
      icon: Bell,
    },
  ];

  return (
    <section className={styles.pageSection}>
      <PageTop title="Settings" />

      <div className={styles.settingsGrid}>
        {groups.map((group) => {
          const Icon = group.icon;

          return (
            <button key={group.title} type="button" className={styles.settingCard}>
              <span>
                <Icon size={23} />
              </span>
              <div>
                <strong>{group.title}</strong>
                <p>{group.description}</p>
              </div>
              <ChevronDown size={18} />
            </button>
          );
        })}
      </div>
    </section>
  );
}

function DeviceCentreView() {
  return (
    <section className={styles.pageSection}>
      <PageTop title="Device centre" />

      <div className={styles.centeredEmpty}>
        <span className={styles.largeEmptyIcon}>
          <Cloud size={62} strokeWidth={1.25} />
        </span>
        <h2>No connected devices</h2>
        <p>
          Install the Vaultway desktop app to sync selected folders and manage
          backups.
        </p>
        <button type="button" className={styles.primaryAction}>
          Download desktop app
        </button>
      </div>
    </section>
  );
}

function ObjectStorageView() {
  return (
    <section className={styles.pageSection}>
      <PageTop
        title="Object storage"
        actions={
          <button type="button" className={styles.primaryAction}>
            <Plus size={18} />
            Create bucket
          </button>
        }
      />

      <div className={styles.centeredEmpty}>
        <span className={styles.largeEmptyIcon}>
          <Cloud size={62} strokeWidth={1.25} />
        </span>
        <h2>No buckets yet</h2>
        <p>
          Object storage is optional. Create a bucket when your project needs
          S3-compatible storage.
        </p>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent: string;
}) {
  return (
    <div className={styles.stat}>
      <strong>{value}</strong>
      <span>
        <i style={{ background: accent }} />
        {label}
      </span>
    </div>
  );
}

function EmptyArtwork({
  type,
}: {
  type: "drive" | "media" | "album" | "recent" | "favourite" | "trash";
}) {
  if (type === "drive") {
    return (
      <div className={`${styles.artwork} ${styles.driveArtwork}`}>
        <span className={styles.artworkBack}>
          <FileText size={37} />
        </span>
        <span className={styles.artworkFront}>
          <CloudUpload size={46} />
        </span>
        <span className={styles.artworkSide}>
          <ImageIcon size={32} />
        </span>
      </div>
    );
  }

  if (type === "media") {
    return (
      <div className={`${styles.artwork} ${styles.mediaArtwork}`}>
        <span className={styles.phoneShape} />
        <ImageIcon size={44} />
        <FilmIcon />
      </div>
    );
  }

  if (type === "album") {
    return (
      <div className={`${styles.artwork} ${styles.albumArtwork}`}>
        <Album size={76} strokeWidth={1.35} />
      </div>
    );
  }

  if (type === "recent") {
    return (
      <div className={`${styles.artwork} ${styles.recentArtwork}`}>
        <Clock3 size={88} strokeWidth={1.1} />
        <span className={styles.recentDotOne} />
        <span className={styles.recentDotTwo} />
        <span className={styles.recentDotThree} />
      </div>
    );
  }

  if (type === "favourite") {
    return (
      <div className={`${styles.artwork} ${styles.favouriteArtwork}`}>
        <Heart size={92} strokeWidth={1.2} />
        <span />
      </div>
    );
  }

  return (
    <div className={`${styles.artwork} ${styles.trashArtwork}`}>
      <Trash2 size={92} strokeWidth={1.1} />
    </div>
  );
}

function FilmIcon() {
  return (
    <span className={styles.filmMini}>
      <ImageIcon size={24} />
    </span>
  );
}

function UserCircleIcon({ size = 23 }: { size?: number }) {
  return <ContactRound size={size} />;
}
