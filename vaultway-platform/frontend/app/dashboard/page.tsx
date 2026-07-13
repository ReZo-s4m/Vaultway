"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Shield, HardDrive, Files, Share2, LogOut, Loader2, RefreshCw } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
      router.refresh();
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-blue-500" size={32} />
          <p className="text-zinc-500 text-sm font-light">Loading workspace...</p>
        </div>
      </div>
    );
  }

  // Storage calculation helper
  const storageLimit = 5 * 1024 * 1024 * 1024; // 5 GB
  const storageUsed = 240 * 1024 * 1024; // 240 MB mock
  const storagePercentage = (storageUsed / storageLimit) * 100;

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col pt-[100px] pb-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none select-none" />

      <div className="max-w-[1140px] w-full mx-auto px-6 z-10 flex-1 flex flex-col gap-8">
        {/* Upper welcome bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/10">
              Workspace Active
            </span>
            <h1 className="text-3xl font-bold mt-3">Welcome, {user.name || user.username}</h1>
            <p className="text-zinc-400 text-sm font-light mt-1">
              Manage and share your encrypted files safely. ID: <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-zinc-300 font-mono">{user.id}</code>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 border border-white/10 hover:border-red-500/30 hover:text-red-400 bg-white/[0.02] hover:bg-red-500/5 px-4.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 self-start md:self-center"
          >
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Storage overview */}
          <div className="bg-[#0b0d12]/40 border border-white/5 p-6 rounded-2xl backdrop-blur-md flex flex-col justify-between min-h-[180px]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-400">Secure Storage</span>
              <HardDrive className="text-blue-400" size={20} />
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold">240.0 MB / 5.0 GB</h2>
              {/* Progress bar */}
              <div className="w-full bg-white/10 h-2.5 rounded-full mt-3.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
                  style={{ width: `${storagePercentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-xs text-zinc-500 mt-2">
                <span>{storagePercentage.toFixed(1)}% Used</span>
                <span>4.76 GB Free</span>
              </div>
            </div>
          </div>

          {/* Quick stats 1 */}
          <div className="bg-[#0b0d12]/40 border border-white/5 p-6 rounded-2xl backdrop-blur-md flex flex-col justify-between min-h-[180px]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-400">Total Files</span>
              <Files className="text-indigo-400" size={20} />
            </div>
            <div className="mt-4">
              <h2 className="text-4xl font-extrabold tracking-tight">12</h2>
              <p className="text-zinc-500 text-xs mt-2.5 flex items-center gap-1">
                <span className="text-emerald-400 font-semibold">100% Encrypted</span>
                <span>using server-side AES-GCM</span>
              </p>
            </div>
          </div>

          {/* Quick stats 2 */}
          <div className="bg-[#0b0d12]/40 border border-white/5 p-6 rounded-2xl backdrop-blur-md flex flex-col justify-between min-h-[180px]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-400">Active Shares</span>
              <Share2 className="text-purple-400" size={20} />
            </div>
            <div className="mt-4">
              <h2 className="text-4xl font-extrabold tracking-tight">3</h2>
              <p className="text-zinc-500 text-xs mt-2.5">
                2 Public links, 1 shared with email
              </p>
            </div>
          </div>
        </div>

        {/* Security / Action Alert Banner */}
        <div className="bg-gradient-to-r from-blue-900/10 via-indigo-900/5 to-transparent border border-blue-500/10 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-white">Your security is our priority</h3>
              <p className="text-zinc-400 text-sm font-light mt-1 max-w-[620px]">
                Vaultway only ever hosts your encrypted file data (ciphertext). The keys required to decrypt files are safely negotiated on the fly and never stored in the database.
              </p>
            </div>
          </div>
          <button className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-2.5 rounded-xl hover:bg-blue-500/20 transition-all self-start md:self-center">
            View encryption details
          </button>
        </div>

        {/* Placeholder file list */}
        <div className="bg-[#0b0d12]/40 border border-white/5 rounded-2xl flex-1 p-6 backdrop-blur-md min-h-[300px] flex flex-col">
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <h3 className="font-bold text-lg">My Vault Files</h3>
            <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
              <RefreshCw size={12} />
              <span>Sync Status</span>
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center py-10 text-center">
            <Files className="text-zinc-700 mb-3" size={48} strokeWidth={1} />
            <h4 className="font-medium text-zinc-300">File manager arriving in Phase 3</h4>
            <p className="text-zinc-500 text-sm font-light mt-1 max-w-sm">
              We&apos;ve successfully set up Phase 2 auth. Once Phase 3 begins, your decrypted files will appear here dynamically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
