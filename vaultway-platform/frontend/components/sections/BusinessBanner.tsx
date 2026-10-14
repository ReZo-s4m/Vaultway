import Link from 'next/link';

const STEPS = [
  {
    n: '01',
    title: 'Open the dashboard',
    body: 'Sign in and work in the browser. Upload files, nest folders, search, and watch the 5 GB quota.',
  },
  {
    n: '02',
    title: 'Send a controlled link',
    body: 'Choose view or download, then add a password, expiry, or view limit. Revoke the link any time.',
  },
  {
    n: '03',
    title: 'Keep the bucket private',
    body: 'The design stores AES-256-GCM ciphertext in a private Supabase bucket, with the IV and auth tag kept per version.',
  },
];

export default function BusinessBanner() {
  return (
    <section className="wrap">
      <div className="biz-banner" data-reveal>
        <div className="biz-layout">
          <div className="biz-content">
            <span className="eyebrow">How it works</span>
            <h3>
              See how Vaultway is meant to{' '}
              <span className="vw-grad">store and share&nbsp;files</span>
            </h3>
            <p>
              A browser dashboard, share links with password and expiry, and a private bucket designed for AES-256-GCM.
            </p>
            <Link href="/solutions" className="btn btn-primary">
              <span>How it works</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          <ol className="biz-steps">
            {STEPS.map((step) => (
              <li key={step.n}>
                <span>{step.n}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <p className="biz-note">
          This project has no business portal, deal room, or compliance suite.
        </p>
      </div>
    </section>
  );
}
