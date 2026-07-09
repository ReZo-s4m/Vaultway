'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (videoRef.current) {
      if (reduceMotion) {
        videoRef.current.pause();
      } else {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
      }
    }
  }, []);

  return (
    <section className="hero">
      <div className="hero-media">
        <video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster="/hero-poster.jpg">
          <source src="/hero-video.webm" type="video/webm" />
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-scrim top"></div>
      <div className="hero-scrim left"></div>
      <div className="hero-scrim bottom"></div>
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">End-to-end encrypted · Zero-knowledge</span>
            <h1>Secure file sharing, built for the <span className="grad">modern world</span></h1>
            <p className="hero-sub">Vaultway locks every file on your device before it ever leaves. Share a link only the right people &mdash; and no one at Vaultway &mdash; can open.</p>
            <div className="hero-actions">
              <Link href="/pricing" className="btn btn-primary">
                Get started free
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <a href="#try" className="btn btn-ghost">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Try Sandbox
              </a>
            </div>
            <div className="hero-meta">
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                No credit card
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                5 GB free forever
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                SOC 2 Type II
              </span>
            </div>
          </div>
          <div className="hero-float" aria-hidden="true">
            <div className="chip c1">
              <span className="ci">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="10" width="16" height="10" rx="2" />
                  <path d="M8 10V7a4 4 0 018 0v3" />
                </svg>
              </span>
              <div><small>Encryption</small>AES-256 encrypted</div>
            </div>
            <div className="chip c2">
              <span className="ci ok">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <div><small>Sharing</small>Secure link generated</div>
            </div>
            <div className="chip c3">
              <span className="ci ok">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <div><small>Storage</small>File uploaded</div>
            </div>
            <div className="chip c4">
              <span className="ci">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="11" width="14" height="9" rx="2" />
                  <path d="M12 15v2" />
                  <path d="M8 11V8a4 4 0 018 0v3" />
                </svg>
              </span>
              <div><small>Access</small>Password protected</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
