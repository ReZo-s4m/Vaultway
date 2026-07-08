'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function SecurityPage() {
  useScrollReveal();

  return (
    <section className="section sec-sec" id="security" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="wrap">
        <div className="sec-top">
          <div data-reveal>
            <span className="eyebrow">Zero-Trust Model</span>
            <h2 className="h-sec">Privacy isn&apos;t a policy, it&apos;s the architecture</h2>
            <p className="lead">Even if our backend databases are fully compromised, attackers only find ciphertext. Because Vaultway never has the keys, we cannot decipher your data.</p>
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
              Client key: AES-GCM (256-bit) negotiation
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
            <h4>Web Crypto API</h4>
            <p>Standard cryptographic libraries run locally in your browser sandbox, eliminating external server dependencies.</p>
          </div>
          <div className="sec-card" data-reveal data-d="1">
            <span className="sic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </span>
            <h4>Zero Server Storage of Keys</h4>
            <p>The encryption keys do not exist in the database, keeping files secure against backend security breaches.</p>
          </div>
          <div className="sec-card" data-reveal data-d="2">
            <span className="sic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>
            <h4>Client-Side Access Only</h4>
            <p>Only recipients who hold the full URL link with hash credentials can download and decrypt shared documents.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
