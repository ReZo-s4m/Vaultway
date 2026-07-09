import Link from 'next/link';

export default function SecuritySlice() {
  return (
    <section className="slice-sec">
      <div className="wrap">
        <div className="slice-grid">
          <div className="slice-text" data-reveal>
            <span className="eyebrow" style={{ textAlign: 'left', margin: '0 0 10px' }}>Active Defense</span>
            <h3>Security that is always on and mathematically guaranteed</h3>
            <p>
              We protect your metadata and files using zero-knowledge client-side encryption. This means only you and the users you explicitly authorize hold the keys to unlock your documents. 
              <br /><br />
              For everyone else—including Vaultway—your files appear as scrambled, undecipherable blocks of ciphertext. We build privacy into the architecture, not just the policy page.
            </p>
            <div>
              <Link href="/security" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span>More about security</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '14px', height: '14px' }}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="slice-media" data-reveal data-d="1">
            {/* Elegant SVG padlock visualization with rotating orbital rings representing keys */}
            <div style={{ position: 'relative', width: '280px', height: '280px', display: 'grid', placeItems: 'center' }}>
              {/* Outer Orbital Ring 1 */}
              <div 
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  border: '1.5px dashed rgba(109, 180, 245, 0.25)',
                  borderRadius: '50%',
                  animation: 'spin-clockwise 25s linear infinite',
                }}
              />
              {/* Outer Orbital Ring 2 */}
              <div 
                style={{
                  position: 'absolute',
                  width: '80%',
                  height: '80%',
                  border: '1.5px dashed rgba(95, 214, 164, 0.2)',
                  borderRadius: '50%',
                  animation: 'spin-counter-clockwise 18s linear infinite',
                }}
              />
              {/* Key orbital node */}
              <div 
                style={{
                  position: 'absolute',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'var(--glow)',
                  boxShadow: '0 0 15px var(--glow)',
                  top: '10%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  animation: 'orbit 25s linear infinite',
                }}
              />
              {/* Cryptographic lock SVG */}
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="url(#glowGradient)" 
                strokeWidth="1.5" 
                style={{ 
                  width: '90px', 
                  height: '90px', 
                  filter: 'drop-shadow(0 0 20px rgba(109, 180, 245, 0.45))',
                }}
              >
                <defs>
                  <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--glow-hi)" />
                    <stop offset="100%" stopColor="var(--glow)" />
                  </linearGradient>
                </defs>
                <rect x="3" y="11" width="18" height="11" rx="4" ry="4" />
                <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
                <circle cx="12" cy="16" r="1.5" fill="var(--glow-hi)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Keyframe animations for orbital lock effect */}
      <style>{`
        @keyframes spin-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-counter-clockwise {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </section>
  );
}
