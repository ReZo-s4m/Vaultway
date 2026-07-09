import Link from 'next/link';

export default function BusinessBanner() {
  return (
    <section className="wrap">
      <div className="biz-banner" data-reveal>
        <div style={{ padding: '0 40px' }}>
          <div className="biz-content">
            <h3>Scale secure compliance with Vaultway Business</h3>
            <p>
              Bring your entire organization together in a mathematically protected workspace. Deploy centralized deal rooms, manage multi-user password policies, track compliance history, and secure client communication workflows under a single dedicated administrative portal.
            </p>
            <div>
              <Link href="/pricing" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span>Get Vaultway Business</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '14px', height: '14px' }}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
