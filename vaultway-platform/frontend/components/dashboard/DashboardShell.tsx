"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  KeyRound,
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
  UserCircle,
  UserPlus,
  X,
  type LucideIcon,
} from "lucide-react";

import styles from "./dashboard.module.css";

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
  {
    label: "Cloud drive",
    href: "/dashboard",
    icon: Cloud,
    exact: true,
  },
  {
    label: "Media",
    href: "/dashboard/media",
    icon: ImageIcon,
  },
  {
    label: "Shared items",
    href: "/dashboard/shared",
    icon: Share2,
  },
  {
    label: "Device centre",
    href: "/dashboard/device-centre",
    icon: MonitorSmartphone,
  },
  {
    label: "Object storage",
    href: "/dashboard/object-storage",
    icon: Database,
  },
  {
    label: "Recents",
    href: "/dashboard/recents",
    icon: Clock3,
  },
  {
    label: "Favourites",
    href: "/dashboard/favourites",
    icon: Heart,
  },
  {
    label: "Trash",
    href: "/dashboard/trash",
    icon: Trash2,
  },
];

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<
    "apps" | "chat" | "notifications" | "account" | null
  >(null);

  const isActive = (item: NavigationItem) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  const closePanels = () => setActivePanel(null);

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
            {!sidebarCollapsed && (
              <span className={styles.brandText}>Vaultway</span>
            )}
          </Link>

          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setSidebarCollapsed((current) => !current)}
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
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
                className={`${styles.navItem} ${
                  active ? styles.navItemActive : ""
                }`}
                title={sidebarCollapsed ? item.label : undefined}
                onClick={() => setMobileSidebarOpen(false)}
              >
                <Icon size={21} strokeWidth={1.8} />
                {!sidebarCollapsed && <span>{item.label}</span>}

                {item.label === "Object storage" && !sidebarCollapsed && (
                  <span className={styles.navNotification} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarStorage}>
          {!sidebarCollapsed ? (
            <>
              <div className={styles.storageLabels}>
                <span>Free plan</span>
                <span>0 B of 5 GB used</span>
              </div>
              <div className={styles.storageTrack}>
                <span style={{ width: "2%" }} />
              </div>
              <Link href="/pricing" className={styles.storageUpgrade}>
                Upgrade storage
              </Link>
            </>
          ) : (
            <span className={styles.compactStorage}>2%</span>
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
              type="search"
              placeholder="Search files, folders, and shared items"
            />
            <kbd>⌘ K</kbd>
          </label>

          <div className={styles.topbarActions}>
            <HeaderAction
              label="Apps"
              active={activePanel === "apps"}
              onClick={() =>
                setActivePanel((current) =>
                  current === "apps" ? null : "apps",
                )
              }
            >
              <Grid3X3 size={21} />
            </HeaderAction>

            <HeaderAction
              label="Messages"
              active={activePanel === "chat"}
              onClick={() =>
                setActivePanel((current) =>
                  current === "chat" ? null : "chat",
                )
              }
            >
              <MessageCircle size={21} />
            </HeaderAction>

            <HeaderAction
              label="Contacts"
              onClick={closePanels}
            >
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
              S
            </button>
          </div>
        </header>

        {activePanel === "apps" && (
          <AppsPanel onClose={closePanels} />
        )}

        {activePanel === "chat" && (
          <ChatPanel onClose={closePanels} />
        )}

        {activePanel === "notifications" && (
          <NotificationsPanel onClose={closePanels} />
        )}

        {activePanel === "account" && (
          <AccountPanel onClose={closePanels} />
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
      className={`${styles.headerAction} ${
        active ? styles.headerActionActive : ""
      }`}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

function PanelHeader({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
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
    {
      label: "Drive",
      icon: Cloud,
      href: "/dashboard",
    },
    {
      label: "Sharing",
      icon: Share2,
      href: "/dashboard/shared",
    },
    {
      label: "Media",
      icon: ImageIcon,
      href: "/dashboard/media",
    },
    {
      label: "Security",
      icon: ShieldCheck,
      href: "/dashboard/settings",
    },
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
    <aside className={`${styles.sidePanel} ${styles.chatPanel}`}>
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
        <h3>Keep conversations private</h3>
        <p>
          Share project updates and files with your team from one
          encrypted workspace.
        </p>

        <button type="button" className={styles.panelPrimaryButton}>
          <UserPlus size={18} />
          Invite a teammate
        </button>
      </div>

      <button type="button" className={styles.panelBottomButton}>
        <MessageCircle size={18} />
        New message
      </button>
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

function AccountPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className={`${styles.popover} ${styles.accountPopover}`}>
      <div className={styles.accountIdentity}>
        <span className={styles.accountAvatar}>S</span>
        <div>
          <strong>Samridh</strong>
          <span>samridh@example.com</span>
          <Link href="/dashboard/account" onClick={onClose}>
            Account overview
          </Link>
        </div>
      </div>

      <div className={styles.accountStorage}>
        <div>
          <span>Free plan</span>
          <span>0 B of 5 GB used</span>
        </div>

        <div className={styles.storageTrack}>
          <span style={{ width: "2%" }} />
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

        <button type="button">
          <KeyRound size={18} />
          Download recovery key
        </button>

        <button type="button">
          <AppWindow size={18} />
          Install desktop app
        </button>
      </div>

      <button type="button" className={styles.logoutButton}>
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
