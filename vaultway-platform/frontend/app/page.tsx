'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import Link from 'next/link';

// Modular Sections
import Hero from '@/components/sections/Hero';
import ProductCards from '@/components/sections/ProductCards';
import SecuritySlice from '@/components/sections/SecuritySlice';
import AlternatingFeatures from '@/components/sections/AlternatingFeatures';
import ComparisonMatrix from '@/components/sections/ComparisonMatrix';
import SocialProof from '@/components/sections/SocialProof';
import BusinessBanner from '@/components/sections/BusinessBanner';
import WorkspacePreview from '@/components/sections/WorkspacePreview';

export default function HomePage() {
  useScrollReveal();

  return (
    <>
      <Hero />
      <ProductCards />
      <SecuritySlice />
      <AlternatingFeatures />
      <WorkspacePreview />
      <ComparisonMatrix />
      <SocialProof />
      <BusinessBanner />

      {/* CTA Footer Banner */}
      <section className="cta-sec" id="contact" style={{ borderTop: '1px solid var(--line)' }}>
        <span className="aperture"></span>
        <span className="cta-float f1" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2h9l5 5v15H6z" />
            <path d="M15 2v5h5" />
          </svg>
        </span>
        <span className="cta-float f2" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 018 0v3" />
          </svg>
        </span>
        <span className="cta-float f3" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2h9l5 5v15H6z" />
          </svg>
        </span>
        <span className="cta-float f4" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7" />
            <path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7" />
          </svg>
        </span>
        <div className="wrap">
          <h2>Ready to protect your files?</h2>
          <p>Join half a million people who share without holding their breath. Your first 5 GB is free, forever.</p>
          <div className="cta-actions">
            <Link href="/sign-up" className="btn btn-primary">
              Start free
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
