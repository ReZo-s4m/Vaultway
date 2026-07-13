"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  Cloud,
  ImageIcon,
  Menu,
  Send,
  Share2,
  X,
} from "lucide-react";

const featureItems = [
  {
    title: "Cloud storage",
    description: "Store and manage your files securely",
    href: "/features/storage",
    icon: Cloud,
  },
  {
    title: "Secure sharing",
    description: "Share files using controlled links",
    href: "/features/sharing",
    icon: Share2,
  },
  {
    title: "Quick transfer",
    description: "Send large files quickly and safely",
    href: "/features/transfer",
    icon: Send,
  },
  {
    title: "Media files",
    description: "Organise images, videos, and documents",
    href: "/features/media",
    icon: ImageIcon,
  },
];

export function Header() {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#171b20]/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
              V
            </div>

            <span className="text-xl font-semibold tracking-tight">
              Vaultway
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <button
              type="button"
              onClick={() => setFeaturesOpen((current) => !current)}
              className="group flex h-[72px] items-center gap-2 border-b-2 border-transparent text-sm font-medium text-zinc-200 transition hover:border-blue-500 hover:text-white"
              aria-expanded={featuresOpen}
            >
              Features

              <ChevronDown
                size={17}
                className={`transition-transform duration-200 ${
                  featuresOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <Link
              href="/security"
              className="text-sm font-medium text-zinc-200 transition hover:text-white"
            >
              Security
            </Link>

            <Link
              href="/solutions"
              className="flex items-center gap-2 text-sm font-medium text-zinc-200 transition hover:text-white"
            >
              Solutions
              <ChevronDown size={17} />
            </Link>

            <Link
              href="/pricing"
              className="text-sm font-medium text-zinc-200 transition hover:text-white"
            >
              Pricing
            </Link>

            <Link
              href="/resources"
              className="flex items-center gap-2 text-sm font-medium text-zinc-200 transition hover:text-white"
            >
              Resources
              <ChevronDown size={17} />
            </Link>
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/sign-in"
            className="rounded-lg border border-zinc-500 px-5 py-2.5 text-sm font-medium transition hover:border-white"
          >
            Log in
          </Link>

          <Link
            href="/sign-up"
            className="rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-white"
          >
            Sign up
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden"
          onClick={() => setMobileOpen((current) => !current)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {featuresOpen && (
        <div className="absolute left-0 right-0 top-full hidden border-b border-white/10 bg-[#1d2228] shadow-2xl lg:block">
          <div className="mx-auto max-w-[1280px] px-8 py-12">
            <p className="mb-7 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Features
            </p>

            <div className="grid grid-cols-4 gap-x-10 gap-y-8">
              {featureItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setFeaturesOpen(false)}
                    className="group flex gap-4 rounded-xl p-3 transition hover:bg-white/[0.04]"
                  >
                    <div className="mt-0.5 text-zinc-400 transition group-hover:text-blue-400">
                      <Icon size={23} strokeWidth={1.7} />
                    </div>

                    <div>
                      <p className="font-medium text-white">{item.title}</p>

                      <p className="mt-1.5 max-w-[220px] text-sm leading-6 text-zinc-400">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#1d2228] px-5 py-6 lg:hidden">
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setFeaturesOpen((current) => !current)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left"
            >
              <span>Features</span>

              <ChevronDown
                size={18}
                className={`transition-transform ${
                  featuresOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {featuresOpen && (
              <div className="space-y-1 border-l border-white/10 pl-4">
                {featureItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block rounded-lg px-3 py-3 text-sm text-zinc-300"
                    onClick={() => {
                      setMobileOpen(false);
                      setFeaturesOpen(false);
                    }}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/security" className="block rounded-lg px-3 py-3" onClick={() => setMobileOpen(false)}>
              Security
            </Link>

            <Link href="/solutions" className="block rounded-lg px-3 py-3" onClick={() => setMobileOpen(false)}>
              Solutions
            </Link>

            <Link href="/pricing" className="block rounded-lg px-3 py-3" onClick={() => setMobileOpen(false)}>
              Pricing
            </Link>

            <Link href="/resources" className="block rounded-lg px-3 py-3" onClick={() => setMobileOpen(false)}>
              Resources
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
