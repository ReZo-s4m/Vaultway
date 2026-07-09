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
    title: 'Never run out of storage space',
    desc: 'Need lots of storage? Get 5 GB free encrypted cloud storage. If you need more, upgrade to one of our competitive plans with up to 20 TB of storage, or choose our Pro Flexi plan and pay only for the storage you use.',
    video: '/big-files.webm',
    link: { text: 'See our plans', href: '/pricing' },
  },
  {
    title: 'Share files and folders with anyone',
    desc: "Easily share your Vaultway files and folders with friends and colleagues, even people without Vaultway accounts. And when sharing, you're still in control. Set passwords, create expiring links, and give read-only or full access.",
    video: '/sharing.webm',
    link: { text: 'More about sharing', href: '/features' },
  },
  {
    title: 'Be in control of your data',
    desc: "Whether it's giving people limited or full access to files you share, or preventing new team members from reading old messages, your data is in your hands. That's our number one promise to you.",
    video: '/safebox.webm',
    link: { text: 'Learn more', href: '/security' },
  },
  {
    title: 'Work seamlessly across all devices',
    desc: 'Access your encrypted cloud files through our desktop app, mobile apps, or the web. If you sync or back up your computer to Vaultway, changes replicate in real time, so you always see the latest files wherever you are.',
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
