'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href="/" className="brand">
              <svg className="mark" viewBox="0 0 32 32" fill="none">
                <ellipse cx="16" cy="16" rx="7.5" ry="12" stroke="#6db4f5" strokeWidth="1.6" />
                <circle cx="16" cy="16" r="2.4" fill="#eef6ff" />
              </svg>
              Vaultway
            </Link>
            <p>Encrypted file sharing where privacy is the architecture, not the policy.</p>
            <div className="foot-badges">
              <span className="fbadge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3l8 4v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V7z" />
                </svg>
                SOC 2 Type II
              </span>
              <span className="fbadge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3l8 4v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V7z" />
                </svg>
                GDPR
              </span>
              <span className="fbadge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3l8 4v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V7z" />
                </svg>
                HIPAA-ready
              </span>
            </div>
          </div>
          <div className="foot-col">
            <h5>Product</h5>
            <Link href="/features">Features</Link>
            <Link href="/security">Security</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/solutions">How it works</Link>
            <Link href="/">Dashboard</Link>
          </div>
          <div className="foot-col">
            <h5>Resources</h5>
            <Link href="/resources">FAQ</Link>
            <a href="#">Blog</a>
            <a href="#">Guides</a>
            <a href="#">Status</a>
            <a href="#">Changelog</a>
          </div>
          <div className="foot-col">
            <h5>Developers</h5>
            <a href="#">API reference</a>
            <a href="#">Documentation</a>
            <a href="#">SDKs</a>
            <a href="#">Webhooks</a>
          </div>
          <div className="foot-col">
            <h5>Company</h5>
            <a href="#">About</a>
            <a href="#">Security whitepaper</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <Link href="/#contact">Contact</Link>
          </div>
        </div>
        <div className="foot-bottom">
          <span className="cp">&copy; {new Date().getFullYear()} Vaultway, Inc. All rights reserved.</span>
          <div className="foot-social">
            <a href="#" aria-label="X">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-7-6.2 7H1.4l8.1-9.3L1 2h7.1l4.9 6.4L18.9 2zm-1.2 18h1.9L7.4 4H5.4l12.3 16z" />
              </svg>
            </a>
            <a href="#" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .3.3.6.9.6 1.8v2.7c0 .3.2.6.7.5A10 10 0 0012 2z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5A2.5 2.5 0 002.5 6a2.5 2.5 0 005 0 2.5 2.5 0 00-2.52-2.5zM3 8.98h4v12H3v-12zM10 8.98h3.8v1.64h.05c.53-1 1.83-2.05 3.76-2.05 4 0 4.75 2.64 4.75 6.07v6.34h-4v-5.62c0-1.34 0-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.97v5.71H10v-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
