import Link from 'next/link';

const PRODUCTS = [
  {
    img: '/icon-cloud.png',
    title: 'Cloud Vault',
    desc: 'Vaultway offers 5 GB of free encrypted storage. Store files of any size, back up folders, sync across devices, and share with full control and zero-knowledge privacy.',
    href: '/features',
    linkText: 'Explore Vaults →',
  },
  {
    img: '/icon-zap.png',
    title: 'Secure Transfer',
    desc: 'Send large files at full speed with client-side encryption. Built-in link expiry and password protection ensure your transfers stay private from sender to receiver.',
    href: '/features',
    linkText: 'Discover Transfers →',
  },
  {
    img: '/icon-lock.png',
    title: 'Password Manager',
    desc: 'Securely manage credentials across all devices with Vaultway Pass. Generate complex passwords and autofill logins stored safely with zero-knowledge encryption.',
    href: '/solutions',
    linkText: 'Get Vaultway Pass →',
  },
  {
    img: '/icon-objects.png',
    title: 'Object Storage',
    desc: 'Manage unlimited data with Vaultway S4, a scalable and affordable S3-compatible storage solution ideal for businesses, developers, and media professionals.',
    href: '/solutions',
    linkText: 'Discover Vaultway S4 →',
  },
  {
    img: '/icon-chat.png',
    title: 'Secure Rooms',
    desc: 'Message your team, make one-on-one calls, or connect over video — all with end-to-end encryption. Also available to non-Vaultway users.',
    href: '/solutions',
    linkText: 'Discover Rooms →',
  },
];

export default function ProductCards() {
  return (
    <section className="vw-cards-section">
      <div className="vw-cards-inner">
        <div className="vw-cards-header">
          <h2>Store and share files, collaborate, and protect. All in one place.</h2>
          <p>Vaultway combines zero-knowledge encrypted cloud storage with powerful tools to upload, download, and store your files with confidence. Share folders privately, collaborate in real time, chat securely, and manage passwords — all in one platform.</p>
        </div>
        <div className="vw-cards-grid">
          {PRODUCTS.map((p) => (
            <div className="vw-card" key={p.title}>
              <div className="vw-card-icon">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt="" width={64} height={64} />
              </div>
              <h5>{p.title}</h5>
              <p>{p.desc}</p>
              <Link href={p.href} className="vw-card-link">{p.linkText}</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
