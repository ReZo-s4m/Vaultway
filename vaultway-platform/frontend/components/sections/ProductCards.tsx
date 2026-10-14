import Link from 'next/link';

const PRODUCTS = [
  {
    img: '/icon-cloud.png',
    title: 'Cloud Drive',
    desc: 'Upload files, make folders, search, and track the 5 GB quota from the dashboard workspace.',
    href: '/features/storage',
    linkText: 'Explore storage →',
  },
  {
    img: '/icon-zap.png',
    title: 'Share links',
    desc: 'Create a link with view or download access, optional password, expiry, and a view limit. Revoke it any time.',
    href: '/features/sharing',
    linkText: 'Explore sharing →',
  },
  {
    img: '/icon-lock.png',
    title: 'AES-256-GCM design',
    desc: 'The schema is built for AES-256-GCM ciphertext in a private Supabase bucket, with IV and auth tag stored per version.',
    href: '/security',
    linkText: 'Read the security model →',
  },
  {
    img: '/icon-objects.png',
    title: 'Media library',
    desc: 'Images, video, and audio you upload to the drive also appear in the Media view for preview and download.',
    href: '/features/media',
    linkText: 'Explore media →',
  },
  {
    img: '/icon-chat.png',
    title: 'Activity and trash',
    desc: 'Recents shows what changed. Trash holds deleted items until you restore them or delete them forever.',
    href: '/features/storage',
    linkText: 'See the workspace →',
  },
];

export default function ProductCards() {
  return (
    <section className="vw-cards-section">
      <div className="vw-cards-inner">
        <div className="vw-cards-header">
          <span className="eyebrow">One workspace</span>
          <h2>
            Store and share files
            <br />
            from <span className="vw-grad">one dashboard.</span>
          </h2>
          <p>
            A private file workspace in the browser. Everything you keep, preview, and send lives in the same place.
          </p>
          <ul className="vw-cards-pills">
            <li>Drive</li>
            <li>Sharing</li>
            <li>Media</li>
            <li>Recents</li>
            <li>Favourites</li>
            <li>Trash</li>
          </ul>
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
