'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function SecurityPage() {
  useScrollReveal();

  return (
    <section className="section sec-sec" id="security" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="wrap">
        <div className="sec-top">
          <div data-reveal>
            <span className="eyebrow">Storage model</span>
            <h2 className="h-sec">AES-256-GCM into a private bucket</h2>
            <p className="lead">Vaultway is designed to store ciphertext, not a public drive. Each file version keeps an AES-256-GCM IV and auth tag in PostgreSQL, and the object itself is meant for a private Supabase bucket.</p>
          </div>
          <div className="flow" data-reveal data-d="1">
            <div className="flow-row">
              <span className="flow-lab">Plaintext</span>
              <div className="flow-bytes">
                <span className="byte plain">c</span>
                <span className="byte plain">o</span>
                <span className="byte plain">n</span>
                <span className="byte plain">f</span>
                <span className="byte plain">i</span>
                <span className="byte plain">d</span>
              </div>
            </div>
            <div className="flow-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </div>
            <div className="flow-row">
              <span className="flow-lab">Ciphertext</span>
              <div className="flow-bytes">
                <span className="byte cipher">8</span>
                <span className="byte cipher">f</span>
                <span className="byte cipher">a</span>
                <span className="byte cipher">d</span>
                <span className="byte cipher">2</span>
                <span className="byte cipher">e</span>
              </div>
            </div>
            <div className="flow-key">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              AES-256-GCM per file version
            </div>
          </div>
        </div>
        <div className="sec-cards">
          <div className="sec-card" data-reveal>
            <span className="sic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </span>
            <h4>AES-256-GCM</h4>
            <p>The planned pipeline uses AES-256-GCM on the API, with IV and auth tag stored on each file version in Prisma.</p>
          </div>
          <div className="sec-card" data-reveal data-d="1">
            <span className="sic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </span>
            <h4>Private Supabase bucket</h4>
            <p>File objects are designed for the private <code>vault-files</code> bucket. This project does not use AWS S3 or Cloudinary.</p>
          </div>
          <div className="sec-card" data-reveal data-d="2">
            <span className="sic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>
            <h4>Controlled share links</h4>
            <p>Links created in the dashboard can take a password, an expiry, a view limit, and can be revoked. Keys are not placed in the URL hash.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
