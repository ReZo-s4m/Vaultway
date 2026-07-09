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
            We protect your data with zero-knowledge encryption, the highest level of online security and privacy. This means that only the data owner and authorised users have the keys needed to access data stored or shared on Vaultway.
          </p>
          <p>
            For anyone else, including Vaultway, the data appears as encrypted noise and is impossible to read or understand.
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
