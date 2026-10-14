'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function SecuritySlice() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="vw-slice">
      <div className="vw-slice-inner">
        <div className="vw-slice-text">
          <h2>Security that&rsquo;s always on</h2>
          <p>
            Vaultway is designed to store files as AES-256-GCM ciphertext in a private Supabase bucket, with the IV and auth tag kept alongside each version in PostgreSQL.
          </p>
          <p>
            Sharing stays on controlled links: optional password, expiry, view limits, and revoke from the dashboard. This is not a zero-knowledge product and does not hide keys in a URL hash.
          </p>
          <Link href="/security" className="vw-slice-link">
            More about security
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
        <div className="vw-slice-media">
          <video ref={videoRef} muted loop playsInline preload="auto">
            <source src="/padlock.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
}
