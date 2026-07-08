'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function PricingPage() {
  useScrollReveal();
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="section" id="pricing" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(180deg,var(--abyss),var(--void))' }}>
      <div className="wrap">
        <div className="center" data-reveal>
          <span className="eyebrow">Billing plans</span>
          <h2 className="h-sec">Fair plans for every workload scale</h2>
          <p className="lead">Free tiers include standard client-side encryption. Pay only for higher storage capacity and custom expiry links.</p>
        </div>
        <div className="bill-toggle" data-reveal data-d="1">
          <span>Monthly</span>
          <label className="switch">
            <input
              type="checkbox"
              id="billToggle"
              aria-label="Toggle annual billing"
              checked={isAnnual}
              onChange={(e) => setIsAnnual(e.target.checked)}
            />
            <span className="sl"></span>
          </label>
          <span>Annual <span className="save">Save 25%</span></span>
        </div>
        <div className="price-grid">
          <div className="plan" data-reveal>
            <h3>Free</h3>
            <p className="pdesc">For personal files and the occasional secure share.</p>
            <div className="price"><span className="amt">$0</span><span className="per">/forever</span></div>
            <div className="pnote">No card required</div>
            <a href="#pricing" className="btn btn-ghost">Get started</a>
            <ul>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>5 GB encrypted storage</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>AES-256 on every file</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>Password-protected links</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>7-day link expiry</li>
            </ul>
          </div>
          <div className="plan pro" data-reveal data-d="1">
            <span className="plan-badge">Most popular</span>
            <h3>Pro</h3>
            <p className="pdesc">For professionals who share sensitive work every day.</p>
            <div className="price">
              <span className="amt">{isAnnual ? '$9' : '$12'}</span>
              <span className="per">/month</span>
            </div>
            <div className="pnote">
              {isAnnual ? 'Billed annually \u2014 $108/yr' : 'Billed monthly'}
            </div>
            <a href="#pricing" className="btn btn-primary">Start Pro</a>
            <ul>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>1 TB encrypted storage</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>Unlimited secure links</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>Custom expiry &amp; view-once links</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>Download tracking &amp; version history</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>Priority support</li>
            </ul>
          </div>
          <div className="plan" data-reveal data-d="2">
            <h3>Enterprise</h3>
            <p className="pdesc">For teams with compliance, scale, and auditors.</p>
            <div className="price"><span className="amt">Custom</span></div>
            <div className="pnote">Volume &amp; annual pricing</div>
            <a href="#pricing" className="btn btn-ghost">Contact sales</a>
            <ul>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>Everything in Pro, plus:</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>SSO / SAML &amp; SCIM</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>Role-based access &amp; audit logs</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>Malware scanning &amp; zero-trust</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>Dedicated support &amp; SLA</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
