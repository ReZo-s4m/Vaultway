"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * The dashboard has its own chrome (sidebar + topbar), so the marketing
 * header/footer and the `.landing-page` wrapper are only rendered for the
 * public site. This prevents the two navigations from stacking on top of
 * each other inside `/dashboard`.
 */
export function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAppRoute = pathname?.startsWith("/dashboard") ?? false;
  const isHome = pathname === "/";
  useScrollReveal();

  if (isAppRoute) {
    return <>{children}</>;
  }

  return (
    <div className={isHome ? "landing-page landing-light" : "landing-page"}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
