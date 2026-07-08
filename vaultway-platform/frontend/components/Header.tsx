'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'open-menu' : ''}`} id="nav">
      <div className="nav-inner">
        <Link href="/" className="brand" aria-label="Vaultway home">
          <svg className="mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <defs>
              <radialGradient id="m1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#eef6ff" />
                <stop offset="60%" stopColor="#a9d6ff" />
                <stop offset="100%" stopColor="#6db4f5" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="16" cy="16" rx="7.5" ry="12" stroke="#6db4f5" strokeWidth="1.6" />
            <ellipse cx="16" cy="16" rx="4" ry="8" fill="url(#m1)" />
            <circle cx="16" cy="16" r="2.4" fill="#eef6ff" />
          </svg>
          Vaultway
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link href="/features" onClick={() => setMobileMenuOpen(false)}>Features</Link>
          <Link href="/security" onClick={() => setMobileMenuOpen(false)}>Security</Link>
          <Link href="/solutions" onClick={() => setMobileMenuOpen(false)}>Solutions</Link>
          <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          <Link href="/resources" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
        </nav>
        <div className="nav-cta">
          <a href="#" className="login">Log in</a>
          <Link href="/pricing" className="btn btn-primary">Get started</Link>
          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
