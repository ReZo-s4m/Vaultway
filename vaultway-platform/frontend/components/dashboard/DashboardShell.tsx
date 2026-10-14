"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AppWindow,
  Bell,
  ChevronDown,
  ChevronRight,
  Clock3,
  Cloud,
  ContactRound,
  Database,
  Grid3X3,
  Heart,
  Image as ImageIcon,
  Loader2,
  LogOut,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  Trash2,
  X,
  type LucideIcon,
} from "lucide-react";

import styles from "./dashboard.module.css";
import { useAuth } from "@/hooks/useAuth";
import { useVault } from "@/context/VaultContext";
import { formatBytes, initialsFrom } from "@/lib/vault-utils";
import type { AuthUser } from "@vaultway/shared";

type DashboardShellProps = {
  children: ReactNode;
};

type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
};

const navigation: NavigationItem[] = [
  { label: "Cloud drive", href: "/dashboard", icon: Cloud, exact: true },
  { label: "Media", href: "/dashboard/media", icon: ImageIcon },
  { label: "Shared items", href: "/dashboard/shared", icon: Share2 },
  { label: "Device centre", href: "/dashboard/device-centre", icon: MonitorSmartphone },
  { label: "Object storage", href: "/dashboard/object-storage", icon: Database },
  { label: "Recents", href: "/dashboard/recents", icon: Clock3 },
  { label: "Favourites", href: "/dashboard/favourites", icon: Heart },
  { label: "Trash", href: "/dashboard/trash", icon: Trash2 },
];

export default function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { usedBytes, quotaBytes, query, setQuery } = useVault();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<
    "apps" | "chat" | "notifications" | "account" | null
  >(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Redirect unauthenticated visitors away from every dashboard route.
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [isLoading, isAuthenticated, router]);

  // ⌘K / Ctrl+K focuses the workspace search.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (isLoading || !isAuthenticated) {
    return (
      <div className={styles.fullscreenLoader}>
        <Loader2 size={30} className={styles.loaderSpin} />
        <p>Loading workspace…</p>
      </div>
    );
  }

  const storagePercent = Math.min(100, (usedBytes / quotaBytes) * 100);
  const storageWidth = `${Math.max(storagePercent, 1.5)}%`;
  const usageLabel = `${formatBytes(usedBytes)} of ${formatBytes(quotaBytes)} used`;
  const initials = initialsFrom(user?.name || user?.username || user?.email);

  const closePanels = () => setActivePanel(null);

  const handleLogout = async () => {
    closePanels();
    try {
      await logout();
    } finally {
      router.replace("/");
      router.refresh();
    }
  };

  const isActive = (item: NavigationItem) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div
      className={`${styles.dashboard} ${
        sidebarCollapsed ? styles.sidebarIsCollapsed : ""
      }`}
    >
      <aside
        className={`${styles.sidebar} ${
          sidebarCollapsed ? styles.sidebarCollapsed : ""
        } ${mobileSidebarOpen ? styles.sidebarMobileOpen : ""}`}
      >
        <div className={styles.sidebarHeader}>
          <Link href="/dashboard" className={styles.brand}>
            <span className={styles.brandMark}>V</span>
            {!sidebarCollapsed && <span className={styles.brandText}>Vaultway</span>}
          </Link>

          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setSidebarCollapsed((current) => !current)}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>

          <button
            type="button"
            className={styles.mobileClose}
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <X size={22} />
          </button>
        </div>

        <nav className={styles.navigation}>
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
                title={sidebarCollapsed ? item.label : undefined}
                onClick={() => setMobileSidebarOpen(false)}
              >
                <Icon size={21} strokeWidth={1.8} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarStorage}>
          {!sidebarCollapsed ? (
            <>
              <div className={styles.storageLabels}>
                <span>Free plan</span>
                <span>{usageLabel}</span>
              </div>
              <div className={styles.storageTrack}>
                <span style={{ width: storageWidth }} />
              </div>
              <Link href="/pricing" className={styles.storageUpgrade}>
                Upgrade storage
              </Link>
            </>
          ) : (
            <span className={styles.compactStorage}>
              {Math.round(storagePercent)}%
            </span>
          )}
        </div>
      </aside>

      {mobileSidebarOpen && (
        <button
          type="button"
          className={styles.sidebarBackdrop}
          onClick={() => setMobileSidebarOpen(false)}
          aria-label="Close navigation"
        />
      )}

      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <button
            type="button"
            className={styles.mobileMenu}
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          <label className={styles.globalSearch}>
            <Search size={20} />
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search files, folders, and shared items"
            />
            <kbd>⌘ K</kbd>
          </label>

          <div className={styles.topbarActions}>
            <HeaderAction
              label="Apps"
              active={activePanel === "apps"}
              onClick={() =>
                setActivePanel((current) => (current === "apps" ? null : "apps"))
              }
            >
              <Grid3X3 size={21} />
            </HeaderAction>

            <HeaderAction
              label="Messages"
              active={activePanel === "chat"}
              onClick={() =>
                setActivePanel((current) => (current === "chat" ? null : "chat"))
              }
            >
              <MessageCircle size={21} />
            </HeaderAction>

            <HeaderAction label="Contacts" onClick={closePanels}>
              <ContactRound size={21} />
            </HeaderAction>

            <HeaderAction
              label="Notifications"
              active={activePanel === "notifications"}
              onClick={() =>
                setActivePanel((current) =>
                  current === "notifications" ? null : "notifications",
                )
              }
            >
              <Bell size={21} />
            </HeaderAction>

            <button
              type="button"
              className={`${styles.avatarButton} ${
                activePanel === "account" ? styles.headerActionActive : ""
              }`}
              onClick={() =>
                setActivePanel((current) =>
                  current === "account" ? null : "account",
                )
              }
              aria-label="Open account menu"
            >
              {initials}
            </button>
          </div>
        </header>

        {activePanel === "apps" && <AppsPanel onClose={closePanels} />}
        {activePanel === "chat" && <ChatPanel onClose={closePanels} />}
        {activePanel === "notifications" && (
          <NotificationsPanel onClose={closePanels} />
        )}
        {activePanel === "account" && (
          <AccountPanel
            user={user}
            usageLabel={usageLabel}
            storageWidth={storageWidth}
            onClose={closePanels}
            onLogout={handleLogout}
          />
        )}

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}

function HeaderAction({
  label,
  active = false,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`${styles.headerAction} ${active ? styles.headerActionActive : ""}`}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

function PanelHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className={styles.panelHeader}>
      <h2>{title}</h2>
      <button
        type="button"
        className={styles.iconButton}
        onClick={onClose}
        aria-label={`Close ${title}`}
      >
        <X size={20} />
      </button>
    </div>
  );
}

function AppsPanel({ onClose }: { onClose: () => void }) {
  const apps = [
    { label: "Drive", icon: Cloud, href: "/dashboard" },
    { label: "Sharing", icon: Share2, href: "/dashboard/shared" },
    { label: "Media", icon: ImageIcon, href: "/dashboard/media" },
    { label: "Security", icon: ShieldCheck, href: "/dashboard/settings" },
  ];

  return (
    <div className={`${styles.popover} ${styles.appsPopover}`}>
      <PanelHeader title="Vaultway apps" onClose={onClose} />
      <div className={styles.appsGrid}>
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <Link
              key={app.label}
              href={app.href}
              className={styles.appCard}
              onClick={onClose}
            >
              <Icon size={24} />
              <span>{app.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ChatPanel({ onClose }: { onClose: () => void }) {
  return (
    <aside className={styles.sidePanel}>
      <PanelHeader title="Messages" onClose={onClose} />
      <div className={styles.panelTabs}>
        <button type="button" className={styles.panelTabActive}>
          Chats
        </button>
        <button type="button">Meetings</button>
      </div>
      <div className={styles.panelEmpty}>
        <span className={styles.panelEmptyIcon}>
          <MessageCircle size={40} />
        </span>
        <h3>No chat in this project</h3>
        <p>
          Use Cloud Drive and share links to send files. Messaging and meetings
          are not built.
        </p>
      </div>
    </aside>
  );
}

function NotificationsPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className={`${styles.popover} ${styles.notificationsPopover}`}>
      <PanelHeader title="Notifications" onClose={onClose} />
      <div className={styles.notificationsFilter}>
        <span>All notifications</span>
        <ChevronDown size={17} />
      </div>
      <div className={styles.panelEmpty}>
        <span className={styles.panelEmptyIcon}>
          <Bell size={40} />
        </span>
        <h3>All caught up</h3>
        <p>You do not have any new notifications right now.</p>
      </div>
    </div>
  );
}

function AccountPanel({
  user,
  usageLabel,
  storageWidth,
  onClose,
  onLogout,
}: {
  user: AuthUser | null;
  usageLabel: string;
  storageWidth: string;
  onClose: () => void;
  onLogout: () => void;
}) {
  const name = user?.name || user?.username || "Vaultway user";
  const email = user?.email ?? "";
  const initials = initialsFrom(name);

  return (
    <div className={`${styles.popover} ${styles.accountPopover}`}>
      <div className={styles.accountIdentity}>
        <span className={styles.accountAvatar}>{initials}</span>
        <div>
          <strong>{name}</strong>
          <span>{email}</span>
          <Link href="/dashboard/account" onClick={onClose}>
            Account overview
          </Link>
        </div>
      </div>

      <div className={styles.accountStorage}>
        <div>
          <span>Free plan</span>
          <span>{usageLabel}</span>
        </div>
        <div className={styles.storageTrack}>
          <span style={{ width: storageWidth }} />
        </div>
        <Link href="/pricing" onClick={onClose}>
          Upgrade
        </Link>
      </div>

      <div className={styles.accountMenu}>
        <Link href="/dashboard/settings" onClick={onClose}>
          <Settings size={18} />
          Settings
        </Link>
        <Link href="/dashboard/device-centre" onClick={onClose}>
          <AppWindow size={18} />
          This browser session
        </Link>
      </div>

      <button type="button" className={styles.logoutButton} onClick={onLogout}>
        <LogOut size={18} />
        Log out
      </button>

      <div className={styles.accountLinks}>
        <button type="button">
          Support
          <ChevronRight size={17} />
        </button>
        <button type="button">
          Legal
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}
