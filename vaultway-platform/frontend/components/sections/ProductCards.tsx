import Link from 'next/link';
import { Cloud, Lock, Shield, MessageSquare, Activity } from 'lucide-react';

const PRODUCTS = [
  {
    icon: Cloud,
    title: 'Cloud Vault',
    desc: 'Keep your team\'s files in a mathematically locked vault. Sync folders in real-time with automatic zero-knowledge privacy.',
    href: '/features',
    linkText: 'Explore Vaults',
  },
  {
    icon: Lock,
    title: 'Password Manager',
    desc: 'Securely manage credentials and API tokens across team workspaces. Zero-knowledge autofill handles the rest.',
    href: '/solutions',
    linkText: 'Get Vaultway Pass',
  },
  {
    icon: Shield,
    title: 'Digital Expiries',
    desc: 'Take complete control over shared links. Configure limits on views, set expiry durations, and revoke access instantly.',
    href: '/features',
    linkText: 'Learn about sharing',
  },
  {
    icon: MessageSquare,
    title: 'Secure Rooms',
    desc: 'Chat, plan, and collaborate in end-to-end encrypted team rooms. Prevent third-party snooping by default.',
    href: '/solutions',
    linkText: 'Discover Rooms',
  },
  {
    icon: Activity,
    title: 'Immutable Audit Logs',
    desc: 'Track workspace access and viewing trails with cryptographically signed, tamper-proof activity audit histories.',
    href: '/security',
    linkText: 'Review compliance',
  },
];

export default function ProductCards() {
  return (
    <section className="ft-cards-sec">
      <div className="wrap">
        <div className="dash-head center" data-reveal>
          <span className="eyebrow">All-In-One Protection</span>
          <h2 className="h-sec" style={{ maxWidth: '640px', margin: '0 auto' }}>
            Store, share, collaborate, and protect. All in a single workspace.
          </h2>
          <p className="lead" style={{ maxWidth: '720px', margin: '18px auto 0' }}>
            Vaultway merges zero-knowledge cryptographic foundations with team productivity tools. Save files securely, lock passwords, chat privately, and audit operations seamlessly.
          </p>
        </div>

        <div className="ft-cards-grid">
          {PRODUCTS.map((prod, idx) => {
            const Icon = prod.icon;
            return (
              <div key={idx} className="ft-card" data-reveal data-d={idx}>
                <div className="ft-card-icon">
                  <Icon size={24} />
                </div>
                <h4>{prod.title}</h4>
                <p>{prod.desc}</p>
                <Link href={prod.href} className="ft-card-link">
                  <span>{prod.linkText}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '12px', height: '12px' }}>
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
