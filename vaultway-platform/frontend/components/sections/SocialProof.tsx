import { Users, Shield, Globe, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function SocialProof() {
  return (
    <section className="proof-sec">
      <div className="wrap">
        <div className="proof-grid">
          <div className="proof-left" data-reveal>
            <span className="eyebrow" style={{ textAlign: 'left', margin: '0 0 10px' }}>Global Trust</span>
            <h3>Millions of secure shares, audited and trusted globally</h3>
            <p>
              Vaultway is built for teams who cannot compromise on confidentiality. From medical charts to financial records, join thousands of professionals sharing and collaborating securely daily.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href="/sign-up" className="btn btn-primary">
                Sign up free
              </Link>
            </div>
          </div>

          <div className="proof-right" data-reveal data-d="1">
            <div className="proof-stat">
              <div className="proof-stat-icon">
                <Users />
              </div>
              <div className="proof-stat-info">
                <h5>Registered Vaults</h5>
                <div className="num">500K+</div>
              </div>
            </div>

            <div className="proof-divider" />

            <div className="proof-stat">
              <div className="proof-stat-icon" style={{ backgroundColor: 'rgba(109, 180, 245, 0.1)', color: 'var(--glow)' }}>
                <Shield />
              </div>
              <div className="proof-stat-info">
                <h5>Files Protected</h5>
                <div className="num">10M+</div>
              </div>
            </div>

            <div className="proof-divider" />

            <div className="proof-stat">
              <div className="proof-stat-icon" style={{ backgroundColor: 'rgba(231, 194, 106, 0.1)', color: '#e7c26a' }}>
                <Globe />
              </div>
              <div className="proof-stat-info">
                <h5>Countries Served</h5>
                <div className="num">150+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
