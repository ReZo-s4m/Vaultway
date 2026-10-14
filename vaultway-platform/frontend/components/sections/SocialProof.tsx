import { HardDrive, Link2, Shield } from 'lucide-react';
import Link from 'next/link';

export default function SocialProof() {
  return (
    <section className="proof-sec">
      <div className="wrap">
        <div className="proof-grid">
          <div className="proof-left" data-reveal>
            <span className="eyebrow" style={{ textAlign: 'left', margin: '0 0 10px' }}>The project</span>
            <h3>A private workspace for files you actually share</h3>
            <p>
              Vaultway is a college major project for cloud-based secure file sharing. Sign in, upload to Cloud Drive, organise folders, and send a link with password, expiry, and view limits.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href="/sign-up" className="btn btn-primary">
                Open the workspace
              </Link>
            </div>
          </div>

          <div className="proof-right" data-reveal data-d="1">
            <div className="proof-stat">
              <div className="proof-stat-icon">
                <HardDrive />
              </div>
              <div className="proof-stat-info">
                <h5>Workspace quota</h5>
                <div className="num">5 GB</div>
              </div>
            </div>

            <div className="proof-divider" />

            <div className="proof-stat">
              <div className="proof-stat-icon" style={{ backgroundColor: 'rgba(196, 132, 74, 0.1)', color: 'var(--glow)' }}>
                <Shield />
              </div>
              <div className="proof-stat-info">
                <h5>Storage cipher</h5>
                <div className="num">AES-256</div>
              </div>
            </div>

            <div className="proof-divider" />

            <div className="proof-stat">
              <div className="proof-stat-icon" style={{ backgroundColor: 'rgba(231, 194, 106, 0.1)', color: '#e7c26a' }}>
                <Link2 />
              </div>
              <div className="proof-stat-info">
                <h5>Share controls</h5>
                <div className="num">Links</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
