'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const FACTS = [
  {
    title: 'What you can do now',
    text: 'Sign in, upload to Cloud Drive, make folders, star items, recover from Trash, and create a share link with password, expiry, and view limits.',
  },
  {
    title: 'What the backend is ready for',
    text: 'Prisma models cover users, files, versions, shares, permissions, and activity. The live API route today is health. Auth and file routes are still to be wired.',
  },
  {
    title: 'How files are meant to be stored',
    text: 'AES-256-GCM ciphertext in a private Supabase bucket named vault-files, with IV and auth tag on each file version. Not AWS S3, and not a key in the URL hash.',
  },
];

const FAQS = [
  {
    q: 'How does encryption work in this project?',
    a: 'The schema and backend crypto helpers are built for AES-256-GCM before an object is written to Supabase Storage. The current dashboard keeps a browser copy of small files so preview and download work in the prototype.',
  },
  {
    q: 'Can someone open a link without a Vaultway account?',
    a: 'The share dialog creates a public-style link with optional password, expiry, and view limit. A dedicated public share page is not wired yet — links are created and listed from Shared items.',
  },
  {
    q: 'What happens when a link expires?',
    a: 'Expiry, max views, and revoke are stored on the share. You can turn those on when you create the link and revoke it later from the dashboard.',
  },
  {
    q: 'How much can I store?',
    a: 'The workspace quota is 5 GB, matching the default in the database schema. Pricing page numbers above that are labels only and are not billed.',
  },
  {
    q: 'Who can see activity?',
    a: 'Recents and the activity list show actions in your own workspace: uploads, downloads, renames, shares, and folder changes. There is no exported auditor log or company-wide compliance trail.',
  },
  {
    q: 'Is this zero-knowledge?',
    a: 'No. Vaultway is a secure file-sharing project using AES-256-GCM and a private bucket. It does not keep keys only on your device, and it does not put a key in the URL hash.',
  },
];

export default function ResourcesPage() {
  useScrollReveal();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
      <section className="section" style={{ background: 'linear-gradient(180deg,var(--abyss),var(--void))' }}>
        <div className="wrap">
          <div className="center" data-reveal>
            <span className="eyebrow">Resources</span>
            <h2 className="h-sec">What this project actually includes</h2>
            <p className="lead">
              Vaultway is a CVR College of Engineering major project. These notes match the dashboard and schema — not a commercial customer list.
            </p>
          </div>

          <div
            className="sec-cards"
            style={{ marginTop: 48 }}
            data-reveal
            data-d="1"
          >
            {FACTS.map((fact) => (
              <div className="sec-card" key={fact.title}>
                <h4>{fact.title}</h4>
                <p>{fact.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq" id="faq" style={{ paddingBottom: '80px' }}>
        <div className="center" data-reveal>
          <span className="eyebrow">Common questions</span>
          <h2 className="h-sec">Everything you need to know about Vaultway</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((faq, idx) => (
            <div key={idx} className={`faq-item ${openFaqIndex === idx ? 'open' : ''}`} data-reveal>
              <button
                className="faq-q"
                aria-expanded={openFaqIndex === idx}
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                <span className="fq-ic"></span>
              </button>
              <div
                className="faq-a"
                style={{
                  maxHeight: openFaqIndex === idx ? '500px' : '0px',
                  opacity: openFaqIndex === idx ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.35s ease, opacity 0.3s ease',
                }}
              >
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
