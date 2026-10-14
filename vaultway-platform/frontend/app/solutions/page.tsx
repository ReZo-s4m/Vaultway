'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function SolutionsPage() {
  useScrollReveal();
  const [activeTechTab, setActiveTechTab] = useState('frontend');

  return (
    <div style={{ minHeight: '80vh' }}>
      {/* How It Works Section */}
      <section className="section" id="how">
        <div className="dash-head center" data-reveal>
          <span className="eyebrow">How it works</span>
          <h2 className="h-sec">Four steps to share a file</h2>
        </div>
        <div className="wrap">
          <div className="steps">
            <div className="step" data-reveal>
              <div className="sgate">
                <div className="ell"></div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2h9l5 5v15H6z" />
                  <path d="M15 2v5h5" />
                </svg>
              </div>
              <div className="snum">Step 1</div>
              <h4>Select files</h4>
              <p>Drop or choose files in Cloud Drive. They sit in your folder tree with the rest of the workspace.</p>
            </div>
            <div className="step" data-reveal data-d="1">
              <div className="sgate">
                <div className="ell"></div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <div className="snum">Step 2</div>
              <h4>Encrypt for storage</h4>
              <p>Each version is designed to be sealed with AES-256-GCM. The IV and auth tag are stored with that version in PostgreSQL.</p>
            </div>
            <div className="step" data-reveal data-d="2">
              <div className="sgate">
                <div className="ell"></div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                </svg>
              </div>
              <div className="snum">Step 3</div>
              <h4>Store in Supabase</h4>
              <p>Ciphertext is planned for a private Supabase Storage bucket (`vault-files`), not AWS S3 or Cloudinary.</p>
            </div>
            <div className="step" data-reveal data-d="3">
              <div className="sgate">
                <div className="ell"></div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7" />
                  <path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7" />
                </svg>
              </div>
              <div className="snum">Step 4</div>
              <h4>Share the link</h4>
              <p>Create a dashboard link with view or download access. Add a password, expiry, or view limit, then revoke it when you are done.</p>
            </div>
          </div>

          <div className="arch" data-reveal>
            <div className="arch-title">High-level architecture flow</div>
            <div className="arch-flow">
              <div className="arch-node">
                <span className="an-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                </span>
                <span className="an-lab">Dashboard (file)</span>
              </div>
              <span className="arch-sep">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
              <div className="arch-node enc">
                <span className="an-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </span>
                <span className="an-lab">AES-256-GCM</span>
              </div>
              <span className="arch-sep">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
              <div className="arch-node">
                <span className="an-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                  </svg>
                </span>
                <span className="an-lab">Supabase Storage</span>
              </div>
              <span className="arch-sep">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
              <div className="arch-node">
                <span className="an-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </span>
                <span className="an-lab">Share link</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Specs Section */}
      <section className="section" id="how-tech" style={{ borderTop: '1px solid var(--line)', background: 'linear-gradient(180deg,var(--void),var(--abyss))' }}>
        <div className="dash-head center" data-reveal>
          <span className="eyebrow">Specifications</span>
          <h2 className="h-sec">Tech Stack & Architecture</h2>
          <p className="lead">The stack this project actually uses: Next.js for the workspace, Express and Prisma for the API scaffold, and Supabase for PostgreSQL plus private file storage.</p>
        </div>
        <div className="wrap">
          <div className="tech-tabs" role="tablist" data-reveal data-d="1">
            {['frontend', 'backend', 'db', 'storage', 'auth', 'sec'].map((tab) => (
              <button
                key={tab}
                className={`tech-tab ${activeTechTab === tab ? 'active' : ''}`}
                role="tab"
                aria-selected={activeTechTab === tab}
                onClick={() => setActiveTechTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="tech-panels">
            <div className={`tech-panel ${activeTechTab === 'frontend' ? 'active' : ''}`} id="t-frontend">
              <div className="tech-item"><span className="td"></span>Next.js</div>
              <div className="tech-item"><span className="td"></span>React</div>
              <div className="tech-item"><span className="td"></span>Tailwind</div>
            </div>
            <div className={`tech-panel ${activeTechTab === 'backend' ? 'active' : ''}`} id="t-backend">
              <div className="tech-item"><span className="td"></span>Node.js</div>
              <div className="tech-item"><span className="td"></span>Express</div>
            </div>
            <div className={`tech-panel ${activeTechTab === 'db' ? 'active' : ''}`} id="t-db">
              <div className="tech-item"><span className="td"></span>PostgreSQL</div>
              <div className="tech-item"><span className="td"></span>Prisma</div>
            </div>
            <div className={`tech-panel ${activeTechTab === 'storage' ? 'active' : ''}`} id="t-storage">
              <div className="tech-item"><span className="td"></span>Supabase Storage</div>
              <div className="tech-item"><span className="td"></span>Private vault-files bucket</div>
            </div>
            <div className={`tech-panel ${activeTechTab === 'auth' ? 'active' : ''}`} id="t-auth">
              <div className="tech-item"><span className="td"></span>JWT (API plan)</div>
              <div className="tech-item"><span className="td"></span>Web session in the app</div>
            </div>
            <div className={`tech-panel ${activeTechTab === 'sec' ? 'active' : ''}`} id="t-sec">
              <div className="tech-item"><span className="td"></span>AES-256-GCM</div>
              <div className="tech-item"><span className="td"></span>HTTPS / TLS</div>
              <div className="tech-item"><span className="td"></span>Helmet + rate limits</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
