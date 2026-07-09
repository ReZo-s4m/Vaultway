import { Check, X, Shield, Lock, EyeOff, FileCode, CheckCircle2 } from 'lucide-react';

const COMPETITORS = [
  {
    name: 'Vaultway',
    price: '$0',
    priceLabel: 'per user / month (Free)',
    highlight: true,
    badge: 'Our Choice',
    features: [
      { text: '5 GB Free Encrypted Storage', yes: true },
      { text: 'Zero-Knowledge Crypto Architecture', yes: true },
      { text: 'End-to-End client encryption', yes: true },
      { text: 'Browser Decryption Sandbox', yes: true },
      { text: 'Password-Protected Link Shares', yes: true },
      { text: 'Immutable Cryptographic Audit Trail', yes: true },
    ],
    disclaimer: '*Zero-knowledge active defense',
  },
  {
    name: 'Dropbox',
    price: '$9.99',
    priceLabel: 'per user / month (Basic)',
    highlight: false,
    features: [
      { text: '2 GB Free Storage', yes: false },
      { text: 'Zero-Knowledge Crypto Architecture', yes: false },
      { text: 'End-to-End client encryption', yes: false },
      { text: 'Browser Decryption Sandbox', yes: false },
      { text: 'Password-Protected Link Shares (Paid)', yes: true },
      { text: 'Immutable Cryptographic Audit Trail', yes: false },
    ],
    disclaimer: '*Standard cloud model',
  },
  {
    name: 'Google Drive',
    price: '$1.99',
    priceLabel: 'per user / month (Basic)',
    highlight: false,
    features: [
      { text: '15 GB Free Storage', yes: true },
      { text: 'Zero-Knowledge Crypto Architecture', yes: false },
      { text: 'End-to-End client encryption', yes: false },
      { text: 'Browser Decryption Sandbox', yes: false },
      { text: 'Password-Protected Link Shares', yes: false },
      { text: 'Immutable Cryptographic Audit Trail', yes: false },
    ],
    disclaimer: '*Ad-indexed storage standard',
  },
];

export default function ComparisonMatrix() {
  return (
    <section className="matrix-sec">
      <div className="wrap">
        <div className="dash-head center" data-reveal>
          <span className="eyebrow">Comparison Matrix</span>
          <h2 className="h-sec">How does Vaultway compare?</h2>
          <p className="lead" style={{ maxWidth: '640px', margin: '18px auto 0' }}>
            Traditional clouds encrypt at rest, but keep the keys. Vaultway gives you true mathematical zero-trust privacy.
          </p>
        </div>

        <div className="matrix-grid">
          {COMPETITORS.map((comp, idx) => (
            <div key={idx} className={`matrix-card ${comp.highlight ? 'highlight' : ''}`} data-reveal data-d={idx}>
              {comp.highlight && comp.badge && (
                <div className="matrix-badge">
                  {comp.badge}
                </div>
              )}
              <div className="matrix-header">
                <h4>{comp.name}</h4>
                <div className="matrix-price">
                  {comp.price} <span>{comp.priceLabel}</span>
                </div>
              </div>
              <div className="matrix-features">
                {comp.features.map((feat, fidx) => (
                  <div key={fidx} className={`matrix-feat ${feat.yes ? 'yes' : 'no'}`}>
                    {feat.yes ? (
                      <CheckCircle2 size={16} className="text-good" />
                    ) : (
                      <X size={16} className="text-slate-500" />
                    )}
                    <span>{feat.text}</span>
                  </div>
                ))}
              </div>
              <div className="matrix-disclaimer">
                {comp.disclaimer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
