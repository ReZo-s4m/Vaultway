'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useSpotlight } from '@/hooks/useSpotlight';

const FAQS = [
  {
    q: 'How does the encryption actually work?',
    a: 'Your file is encrypted with AES-256 on your own device before a single byte reaches our servers. We store only the ciphertext. The key that unlocks it is derived from your credentials and never leaves your control — so even we can\'t read your files.',
  },
  {
    q: 'Can the recipient open a link without a Vaultway account?',
    a: 'Yes. Anyone with the secure link — and the password, if you set one — can open the file in their browser. No sign-up, no app install. You stay in control of when the link expires and how many times it can be opened.',
  },
  {
    q: 'What happens when a link expires?',
    a: 'The moment a link hits its expiry — a set time, or after a chosen number of opens — it stops working entirely. The file stays safe in your vault; only the shared access disappears. You can re-share it any time with fresh settings.',
  },
  {
    q: 'How much can I store, and how large can a file be?',
    a: 'Free accounts include 5 GB. Pro raises that to 1 TB, and Enterprise is sized to your needs. Individual files can be up to 5 GB each on paid plans, shared through a single link.',
  },
  {
    q: 'Who can see my activity and audit logs?',
    a: 'Only you and the people you explicitly grant access to. Audit logs record every view, share, and download in an immutable trail — useful for compliance, and invisible to anyone outside your team.',
  },
  {
    q: 'Is my data really private from Vaultway?',
    a: 'Yes — that\'s the whole design. Because encryption happens on your device and we never hold your key, we operate on data we can\'t read. We can\'t sell it, mine it, or hand over anything legible if compelled. Privacy isn\'t a policy here; it\'s the architecture.',
  },
];

export default function FeaturesPage() {
  useScrollReveal();
  useSpotlight();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="wrap" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
      {/* Split Video Hero Section */}
      <div className="split-hero">
        <div className="split-left">
          <h2>What is Vaultway?</h2>
          <p>Vaultway is a place where all your team&apos;s content comes together. Where you can use the tools you love. Where we help you cut through the clutter and surface what matters most.</p>
        </div>
        <div className="split-right">
          <video src="/ProductOverview_Hero@2x.mp4" autoPlay loop muted playsInline />
        </div>
      </div>

      {/* Bento Grid Features Section */}
      <section className="section" id="features" style={{ padding: '40px 0' }}>
        <div className="dash-head center" data-reveal>
          <span className="eyebrow">Zero-knowledge sharing</span>
          <h2 className="h-sec">Features built around cryptography</h2>
          <p className="lead">Traditional sharing platforms encrypt data at rest, but keep the keys. Vaultway has no keys. Everything is locked on your machine, using web-native crypto APIs.</p>
        </div>
        <div className="bento">
          <div className="card feature-lg" data-reveal>
            <div>
              <span className="fic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </span>
              <h3>End-to-End Encryption</h3>
              <p>Files are encrypted in your browser using AES-256-GCM. Decryption keys are appended to the URL hash, which is never sent to our servers.</p>
            </div>
            <div className="mini-illus">
              <div className="mfile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>file.pdf <span className="ck">&#10003; encrypted</span></div>
              <div className="mfile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>image.png <span className="ck">&#10003; encrypted</span></div>
            </div>
          </div>
          <div className="card wide spot" data-reveal data-d="1">
            <span className="fic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>
            <h3>Secure Recipient Keys</h3>
            <p>Keys are negotiated client-side. The recipient decrypts the file in their own sandbox, and you can revoke access by changing the password or expunging the file from your dashboard instantly.</p>
          </div>
          <div className="card spot" data-reveal data-d="2">
            <span className="fic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
            <h3>Expiry Control</h3>
            <p>Limit sharing to single downloads or short expiration times. Once a link expires, access is strictly blocked.</p>
          </div>
          <div className="card spot" data-reveal data-d="1">
            <span className="fic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" />
                <path d="M19 10v1a7 7 0 01-14 0v-1" />
                <line x1="12" y1="19" x2="12" y2="22" />
              </svg>
            </span>
            <h3>Audit Logs</h3>
            <p>Track downloads and views with detailed audit logs. Verify recipient credentials with automatic digital signoffs.</p>
          </div>
          <div className="card spot" data-reveal data-d="2">
            <span className="fic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 17V7l7 5z" />
              </svg>
            </span>
            <h3>Preview Support</h3>
            <p>Decrypt and preview common formats, including PDFs and Figma projects, in-browser without fully downloading them.</p>
          </div>
          <div className="card wide spot" data-reveal data-d="3">
            <span className="fic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
            </span>
            <h3>Integrations</h3>
            <p>Build custom logic into Slack, Discord, and internal web portals via standard webhooks and API tokens, while securing client metadata.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq" id="faq" style={{ padding: '80px 0 40px', borderTop: '1px solid var(--line)' }}>
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
                  transition: 'max-height 0.35s ease, opacity 0.3s ease'
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
