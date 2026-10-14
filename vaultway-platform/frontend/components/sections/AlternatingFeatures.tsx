'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

function FeatureVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.muted = true;
      ref.current.play().catch(() => {});
    }
  }, []);
  return (
    <div className="vw-alt-media">
      <video ref={ref} muted loop playsInline preload="auto">
        <source src={src} type="video/webm" />
      </video>
    </div>
  );
}

const FEATURES = [
  {
    title: 'A 5 GB workspace you can see',
    desc: 'Cloud Drive shows used space against a 5 GB quota. Upload files, nest folders, star favourites, and recover mistakes from Trash. There is no 20 TB plan or usage-based Flexi product.',
    video: '/big-files.webm',
    link: { text: 'See the demo plans', href: '/pricing' },
  },
  {
    title: 'Share files with controls you set',
    desc: 'Create a link from any file in the dashboard. Choose view or download, add a password, set expiry, cap views, and revoke the link later.',
    video: '/sharing.webm',
    link: { text: 'More about sharing', href: '/features/sharing' },
  },
  {
    title: 'See what happened in the vault',
    desc: 'Recents and the activity list record uploads, downloads, renames, shares, and folder changes so you can follow what you did in this workspace.',
    video: '/safebox.webm',
    link: { text: 'How storage is designed', href: '/security' },
  },
  {
    title: 'Use it in the browser',
    desc: 'Sign in and work from the web dashboard on desktop or phone. There is no desktop sync app, mobile app, or live folder backup in this project.',
    video: '/devices.webm',
    link: null,
  },
];

export default function AlternatingFeatures() {
  return (
    <section className="vw-alternating">
      <div className="vw-alternating-inner">
        <div className="vw-alternating-header">
          <h2>Why choose Vaultway?</h2>
        </div>
        <div className="vw-alternating-list">
          {FEATURES.map((f, i) => (
            <div className={`vw-alt-block ${i % 2 === 1 ? 'reversed' : ''}`} key={f.title}>
              <div className="vw-alt-text">
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                {f.link && (
                  <Link href={f.link.href} className="vw-slice-link">
                    {f.link.text}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </Link>
                )}
              </div>
              <FeatureVideo src={f.video} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
