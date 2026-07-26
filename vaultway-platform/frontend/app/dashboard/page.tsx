"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Files,
  HardDrive,
  Loader2,
  LogOut,
  RefreshCw,
  Share2,
  Shield,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

const STORAGE_LIMIT = 5 * 1024 * 1024 * 1024; // 5 GB
const STORAGE_USED = 240 * 1024 * 1024; // 240 MB mock value

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  /*
   * Keep the loading screen visible while authentication is being checked
   * or while the unauthenticated user is being redirected.
   */
  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={32}
            className="animate-spin text-blue-500"
          />

          <p className="text-sm font-light text-zinc-500">
            Loading workspace...
          </p>
        </div>
      </div>
    );
  }

  const storagePercentage =
    (STORAGE_USED / STORAGE_LIMIT) * 100;

  const storageFree = STORAGE_LIMIT - STORAGE_USED;
  const storageFreeInGb =
    storageFree / (1024 * 1024 * 1024);

  const displayName =
    user.name || user.username || "Vaultway user";

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#050507] pb-16 pt-[100px] text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-[-20%] top-[-20%] h-[60%] w-[60%] select-none rounded-full bg-blue-900/10 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-[-20%] right-[-20%] h-[60%] w-[60%] select-none rounded-full bg-indigo-900/10 blur-[120px]" />

      <div className="z-10 mx-auto flex w-full max-w-[1140px] flex-1 flex-col gap-8 px-6">
        {/* Welcome section */}
        <div className="flex flex-col justify-between gap-4 border-b border-white/5 pb-6 md:flex-row md:items-center">
          <div>
            <span className="rounded-full border border-blue-500/10 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-400">
              Workspace active
            </span>

            <h1 className="mt-3 text-3xl font-bold">
              Welcome, {displayName}
            </h1>

            <p className="mt-1 text-sm font-light text-zinc-400">
              Manage and share your encrypted files safely.
              ID:{" "}
              <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs text-zinc-300">
                {user.id}
              </code>
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400 md:self-center"
          >
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
        </div>

        {/* Dashboard statistics */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex min-h-[180px] flex-col justify-between rounded-2xl border border-white/5 bg-[#0b0d12]/40 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-400">
                Secure storage
              </span>

              <HardDrive
                className="text-blue-400"
                size={20}
              />
            </div>

            <div className="mt-4">
              <h2 className="text-2xl font-bold">
                240.0 MB / 5.0 GB
              </h2>

              <div className="mt-3.5 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  style={{
                    width: `${Math.min(
                      storagePercentage,
                      100,
                    )}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                <span>
                  {storagePercentage.toFixed(1)}% used
                </span>

                <span>
                  {storageFreeInGb.toFixed(2)} GB free
                </span>
              </div>
            </div>
          </div>

          <div className="flex min-h-[180px] flex-col justify-between rounded-2xl border border-white/5 bg-[#0b0d12]/40 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-400">
                Total files
              </span>

              <Files
                className="text-indigo-400"
                size={20}
              />
            </div>

            <div className="mt-4">
              <h2 className="text-4xl font-extrabold tracking-tight">
                12
              </h2>

              <p className="mt-2.5 flex items-center gap-1 text-xs text-zinc-500">
                <span className="font-semibold text-emerald-400">
                  100% encrypted
                </span>

                <span>using server-side AES-GCM</span>
              </p>
            </div>
          </div>

          <div className="flex min-h-[180px] flex-col justify-between rounded-2xl border border-white/5 bg-[#0b0d12]/40 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-400">
                Active shares
              </span>

              <Share2
                className="text-purple-400"
                size={20}
              />
            </div>

            <div className="mt-4">
              <h2 className="text-4xl font-extrabold tracking-tight">
                3
              </h2>

              <p className="mt-2.5 text-xs text-zinc-500">
                2 public links and 1 email share
              </p>
            </div>
          </div>
        </div>

        {/* Security banner */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-blue-500/10 bg-gradient-to-r from-blue-900/10 via-indigo-900/5 to-transparent p-6 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
              <Shield size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Your security is our priority
              </h3>

              <p className="mt-1 max-w-[620px] text-sm font-light text-zinc-400">
                Vaultway stores encrypted file data. The keys
                required to decrypt files are negotiated securely
                and are never stored directly with the encrypted
                file content.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="self-start rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5 text-xs font-semibold text-blue-400 transition-all hover:bg-blue-500/20 md:self-center"
          >
            View encryption details
          </button>
        </div>

        {/* File manager placeholder */}
        <div className="flex min-h-[300px] flex-1 flex-col rounded-2xl border border-white/5 bg-[#0b0d12]/40 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-lg font-bold">
              My Vault Files
            </h3>

            <button
              type="button"
              className="flex items-center gap-1 text-xs text-blue-400 transition-colors hover:text-blue-300"
            >
              <RefreshCw size={12} />
              <span>Sync status</span>
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
            <Files
              className="mb-3 text-zinc-700"
              size={48}
              strokeWidth={1}
            />

            <h4 className="font-medium text-zinc-300">
              File manager arriving in Phase 3
            </h4>

            <p className="mt-1 max-w-sm text-sm font-light text-zinc-500">
              Phase 2 authentication is ready. Once Phase 3 begins,
              your files will appear here dynamically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}