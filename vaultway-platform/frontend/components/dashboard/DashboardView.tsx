"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Album,
  ArrowUpRight,
  Bell,
  ContactRound,
  Download,
  FileInput,
  FileOutput,
  FolderInput,
  Heart,
  Image as ImageIcon,
  Link2,
  Lock,
  RotateCcw,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  Upload,
  UploadCloud,
  type LucideIcon,
} from "lucide-react";

import styles from "./dashboard.module.css";
import views from "./views.module.css";
import { FileManager } from "./FileManager";
import { FileGlyph } from "./FileGlyph";
import { useVault } from "@/context/VaultContext";
import { useAuth } from "@/hooks/useAuth";
import {
  downloadDataUrl,
  formatBytes,
  formatDateTime,
  initialsFrom,
  relativeTime,
} from "@/lib/vault-utils";
import type { VaultActivityAction } from "@/lib/vault-types";

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
  { id: "links", label: "Links", icon: Link2 },
  { id: "outgoing", label: "Outgoing shares", icon: FileOutput },
  { id: "incoming", label: "Incoming shares", icon: FileInput },
  { id: "requests", label: "File requests", icon: FolderInput },
] as const;

export default function DashboardView({ view }: DashboardViewProps) {
  if (view === "drive") return <FileManager />;
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

function CenteredEmpty({
  icon: Icon,
  title,
  message,
  action,
}: {
  icon: LucideIcon;
  title: string;
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={styles.centeredEmpty}>
      <span className={styles.largeEmptyIcon}>
        <Icon size={60} strokeWidth={1.25} />
      </span>
      <h2>{title}</h2>
      <p>{message}</p>
      {action}
    </div>
  );
}

/* ---------------- Media ---------------- */

function MediaView() {
  const { files } = useVault();
  const images = useMemo(
    () => files.filter((file) => file.kind === "image" && !file.trashed),
    [files],
  );

  return (
    <section className={styles.pageSection}>
      <PageTop
        title="Media"
        actions={
          <Link href="/dashboard" className={styles.primaryAction}>
            <Upload size={18} />
            Add media
          </Link>
        }
      />

      {images.length === 0 ? (
        <CenteredEmpty
          icon={ImageIcon}
          title="No images yet"
          message="Images you upload to Cloud Drive appear here. Video and audio stay in the drive as files."
          action={
            <Link href="/dashboard" className={styles.primaryAction}>
              <Upload size={18} />
              Go to drive
            </Link>
          }
        />
      ) : (
        <div className={views.mediaGrid}>
          {images.map((file) => (
            <figure key={file.id} className={views.mediaTile} title={file.name}>
              {file.dataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={file.dataUrl} alt={file.name} />
              ) : (
                <span className={views.mediaFallback}>
                  <FileGlyph kind="image" size={30} />
                </span>
              )}
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------------- Shared ---------------- */

function SharedView() {
  const { shares, revokeShare } = useVault();
  const [tab, setTab] = useState<(typeof sharedTabs)[number]["id"]>("links");

  const now = Date.now();

  return (
    <section className={styles.pageSection}>
      <PageTop
        title="Shared items"
        actions={
          <Link href="/dashboard" className={styles.primaryAction}>
            <Share2 size={18} />
            Create share
          </Link>
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

      {tab === "links" ? (
        shares.length === 0 ? (
          <CenteredEmpty
            icon={Link2}
            title="No secure links yet"
            message="Create a link from any file in your drive to share it with controlled access."
          />
        ) : (
          <div className={views.shareList}>
            {shares.map((share) => {
              const expired =
                share.expiresAt !== null &&
                new Date(share.expiresAt).getTime() < now;
              const status = share.revoked
                ? "revoked"
                : expired
                  ? "expired"
                  : "active";
              return (
                <div key={share.id} className={views.shareRow}>
                  <div className={views.shareInfo}>
                    <div className={views.shareNameRow}>
                      <span className={views.shareName} title={share.fileName}>
                        {share.fileName}
                      </span>
                      <span className={`${views.status} ${views[status]}`}>
                        {status}
                      </span>
                    </div>
                    <div className={views.shareBadges}>
                      <span className={views.badge}>
                        {share.permission === "DOWNLOAD"
                          ? "View & download"
                          : "View only"}
                      </span>
                      {share.password && (
                        <span className={views.badge}>
                          <Lock size={11} /> Password
                        </span>
                      )}
                      <span className={views.badgeMuted}>
                        {share.expiresAt
                          ? `Expires ${relativeTime(share.expiresAt)}`
                          : "No expiry"}
                      </span>
                      <span className={views.badgeMuted}>
                        {share.viewCount} view{share.viewCount === 1 ? "" : "s"}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={views.revokeBtn}
                    onClick={() => revokeShare(share.id)}
                    disabled={share.revoked}
                  >
                    {share.revoked ? "Revoked" : "Revoke"}
                  </button>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <CenteredEmpty
          icon={sharedTabs.find((item) => item.id === tab)!.icon}
          title={`No ${sharedTabs
            .find((item) => item.id === tab)!
            .label.toLowerCase()} yet`}
          message={
            tab === "incoming"
              ? "Files and folders shared with you will appear here."
              : tab === "outgoing"
                ? "People you share items with directly will appear here."
                : "Create a request when you need other people to upload files to you."
          }
        />
      )}
    </section>
  );
}

/* ---------------- Recents (activity) ---------------- */

const ACTIVITY_META: Record<
  VaultActivityAction,
  { icon: LucideIcon; verb: string; color: string }
> = {
  UPLOAD: { icon: UploadCloud, verb: "Uploaded", color: "#5ea7ff" },
  DOWNLOAD: { icon: Download, verb: "Downloaded", color: "#4ad991" },
  RENAME: { icon: SlidersHorizontal, verb: "Renamed", color: "#a8b0ba" },
  DELETE: { icon: Trash2, verb: "Moved to trash", color: "#ff6b6b" },
  RESTORE: { icon: RotateCcw, verb: "Restored", color: "#4ad991" },
  FOLDER_CREATED: { icon: FolderInput, verb: "Created folder", color: "#ffb44d" },
  SHARE: { icon: Share2, verb: "Shared", color: "#c48cff" },
  SHARE_REVOKED: { icon: Link2, verb: "Revoked link for", color: "#ff8585" },
  STAR: { icon: Heart, verb: "Favourited", color: "#ffb44d" },
  UNSTAR: { icon: Heart, verb: "Unfavourited", color: "#a8b0ba" },
};

function RecentsView() {
  const { activity } = useVault();

  return (
    <section className={styles.pageSection}>
      <PageTop title="Recents" />

      {activity.length === 0 ? (
        <CenteredEmpty
          icon={UploadCloud}
          title="No recent activity"
          message="Your latest file and folder activity will appear here."
          action={
            <Link href="/dashboard" className={styles.primaryAction}>
              <Upload size={18} />
              Upload files
            </Link>
          }
        />
      ) : (
        <div className={views.activityList}>
          {activity.map((entry) => {
            const meta = ACTIVITY_META[entry.action];
            const Icon = meta.icon;
            return (
              <div key={entry.id} className={views.activityRow}>
                <span
                  className={views.activityIcon}
                  style={{ color: meta.color }}
                >
                  <Icon size={17} />
                </span>
                <div className={views.activityBody}>
                  <p className={views.activityText}>
                    {meta.verb} <strong>{entry.targetName}</strong>
                  </p>
                  <span className={views.activityTime}>
                    {relativeTime(entry.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

/* ---------------- Favourites ---------------- */

function FavouritesView() {
  const { files, folders, toggleStar, registerDownload } = useVault();
  const starredFolders = folders.filter((f) => f.starred && !f.trashed);
  const starredFiles = files.filter((f) => f.starred && !f.trashed);
  const isEmpty = starredFolders.length === 0 && starredFiles.length === 0;

  return (
    <section className={styles.pageSection}>
      <PageTop title="Favourites" />

      {isEmpty ? (
        <CenteredEmpty
          icon={Heart}
          title="No favourites yet"
          message="Star files and folders to keep them one click away."
        />
      ) : (
        <div className={views.itemList}>
          {starredFolders.map((folder) => (
            <div key={folder.id} className={views.itemRow}>
              <span className={views.itemFolderIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              </span>
              <div className={views.itemMain}>
                <span className={views.itemName}>{folder.name}</span>
                <span className={views.itemSub}>Folder</span>
              </div>
              <div className={views.itemActions}>
                <button
                  type="button"
                  className={views.iconBtn}
                  onClick={() => toggleStar("folder", folder.id)}
                  aria-label="Remove from favourites"
                  title="Remove from favourites"
                >
                  <Heart size={16} className={views.starOn} />
                </button>
              </div>
            </div>
          ))}
          {starredFiles.map((file) => (
            <div key={file.id} className={views.itemRow}>
              <span className={views.itemGlyph}>
                <FileGlyph kind={file.kind} size={20} />
              </span>
              <div className={views.itemMain}>
                <span className={views.itemName}>{file.name}</span>
                <span className={views.itemSub}>{formatBytes(file.sizeBytes)}</span>
              </div>
              <div className={views.itemActions}>
                <button
                  type="button"
                  className={views.iconBtn}
                  onClick={() => {
                    if (file.dataUrl) {
                      downloadDataUrl(file.dataUrl, file.name);
                      registerDownload(file.id);
                    }
                  }}
                  disabled={!file.dataUrl}
                  aria-label="Download"
                  title="Download"
                >
                  <Download size={16} />
                </button>
                <button
                  type="button"
                  className={views.iconBtn}
                  onClick={() => toggleStar("file", file.id)}
                  aria-label="Remove from favourites"
                  title="Remove from favourites"
                >
                  <Heart size={16} className={views.starOn} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------------- Trash ---------------- */

function TrashView() {
  const { files, folders, restoreFromTrash, deleteForever, emptyTrash } =
    useVault();
  const trashedFolders = folders.filter((f) => f.trashed);
  const trashedFiles = files.filter((f) => f.trashed);
  const isEmpty = trashedFolders.length === 0 && trashedFiles.length === 0;

  return (
    <section className={styles.pageSection}>
      <PageTop
        title="Trash"
        actions={
          <button
            type="button"
            className={styles.secondaryAction}
            onClick={emptyTrash}
            disabled={isEmpty}
          >
            <Trash2 size={17} />
            Empty trash
          </button>
        }
      />

      {isEmpty ? (
        <CenteredEmpty
          icon={Trash2}
          title="Trash is empty"
          message="Deleted files stay here until you restore or permanently remove them."
        />
      ) : (
        <div className={views.itemList}>
          {trashedFolders.map((folder) => (
            <div key={folder.id} className={views.itemRow}>
              <span className={views.itemFolderIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              </span>
              <div className={views.itemMain}>
                <span className={views.itemName}>{folder.name}</span>
                <span className={views.itemSub}>
                  Folder · deleted{" "}
                  {folder.trashedAt ? relativeTime(folder.trashedAt) : ""}
                </span>
              </div>
              <div className={views.itemActions}>
                <button
                  type="button"
                  className={views.iconBtn}
                  onClick={() => restoreFromTrash("folder", folder.id)}
                  title="Restore"
                  aria-label="Restore"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  type="button"
                  className={`${views.iconBtn} ${views.iconBtnDanger}`}
                  onClick={() => deleteForever("folder", folder.id)}
                  title="Delete forever"
                  aria-label="Delete forever"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {trashedFiles.map((file) => (
            <div key={file.id} className={views.itemRow}>
              <span className={views.itemGlyph}>
                <FileGlyph kind={file.kind} size={20} />
              </span>
              <div className={views.itemMain}>
                <span className={views.itemName}>{file.name}</span>
                <span className={views.itemSub}>
                  {formatBytes(file.sizeBytes)} · deleted{" "}
                  {file.trashedAt ? relativeTime(file.trashedAt) : ""}
                </span>
              </div>
              <div className={views.itemActions}>
                <button
                  type="button"
                  className={views.iconBtn}
                  onClick={() => restoreFromTrash("file", file.id)}
                  title="Restore"
                  aria-label="Restore"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  type="button"
                  className={`${views.iconBtn} ${views.iconBtnDanger}`}
                  onClick={() => deleteForever("file", file.id)}
                  title="Delete forever"
                  aria-label="Delete forever"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------------- Account ---------------- */

function AccountOverview() {
  const { user } = useAuth();
  const { files, folders, shares, usedBytes, quotaBytes } = useVault();

  const activeFiles = files.filter((f) => !f.trashed);
  const trashedFiles = files.filter((f) => f.trashed);
  const activeFolders = folders.filter((f) => !f.trashed);
  const percent = Math.min(
    100,
    Math.round((usedBytes / quotaBytes) * 100 * 10) / 10,
  );

  const name = user?.name || user?.username || "Vaultway user";
  const email = user?.email ?? "";

  return (
    <section className={styles.accountPage}>
      <aside className={styles.accountSidebar}>
        <span className={styles.accountPageAvatar}>{initialsFrom(name)}</span>
        <h2>{name}</h2>
        <p>{email}</p>

        <span className={styles.planBadge}>
          <ShieldCheck size={15} />
          Free plan
        </span>

        <div className={styles.accountMemberSince}>
          <span>Storage used</span>
          <strong>{formatBytes(usedBytes)}</strong>
        </div>

        <p className={styles.accountMemberSince}>
          <span>Recovery keys and paid upgrades are not part of this project.</span>
        </p>
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
            <span>{percent}%</span>
          </div>
          <div>
            <span>Storage</span>
            <strong>
              {formatBytes(usedBytes)} / {formatBytes(quotaBytes)}
            </strong>
          </div>
          <div className={styles.usageRing}>
            <span>{activeFiles.length}</span>
          </div>
          <div>
            <span>Files</span>
            <strong>{activeFiles.length} stored</strong>
          </div>
        </div>

        <div className={styles.accountStatsCard}>
          <h2>Your data</h2>
          <div className={styles.dataRows}>
            {[
              ["All files", `${activeFiles.length} files`],
              ["All folders", `${activeFolders.length} folders`],
              ["Trash", `${trashedFiles.length} files`],
              ["Active links", `${shares.filter((s) => !s.revoked).length} links`],
              ["Total shares", `${shares.length} links`],
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

/* ---------------- Settings / Device / Object storage ---------------- */

function SettingsView() {
  const groups = [
    { title: "Account", description: "Profile, email, and account recovery", icon: ContactRound },
    { title: "Security", description: "Sign-in password for this browser workspace", icon: ShieldCheck },
    { title: "Sharing defaults", description: "Default link expiry and permission settings", icon: SlidersHorizontal },
    { title: "Notifications", description: "Choose which updates Vaultway sends you", icon: Bell },
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
              <ArrowUpRight size={18} />
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
      <CenteredEmpty
        icon={ShieldCheck}
        title="This browser session"
        message="Vaultway runs in the web dashboard for this project. There is no desktop or mobile app to install."
      />
    </section>
  );
}

function ObjectStorageView() {
  return (
    <section className={styles.pageSection}>
      <PageTop title="Object storage" />
      <CenteredEmpty
        icon={Album}
        title="Files live in Cloud Drive"
        message="This project is designed to store objects in a private Supabase bucket. Use Cloud Drive to upload and organise files in the current workspace."
      />
    </section>
  );
}
