'use client';

import Link from 'next/link';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './pricing.module.css';

type Tier = {
  name: string;
  blurb: string;
  price: string;
  unit: string;
  storage: string;
  cta: string;
  href: string;
  featured?: boolean;
  features: string[];
};

const tiers: Tier[] = [
  {
    name: 'Personal',
    blurb: 'Everything you need to keep your own files private.',
    price: '$0',
    unit: 'forever',
    storage: '5 GB storage',
    cta: 'Get started',
    href: '/sign-up',
    features: [
      '5 GB Cloud Drive quota',
      'Share links with expiry',
      'Password-protected links',
      'Web dashboard access',
    ],
  },
  {
    name: 'Pro',
    blurb: 'More space and finer control for power users.',
    price: '$8',
    unit: 'per month',
    storage: 'Illustrative extra space',
    cta: 'Open the workspace',
    href: '/sign-up',
    featured: true,
    features: [
      'Everything in Personal',
      'View-limit and download controls',
      'Custom link expiry windows',
      'Activity history in Recents',
      'Same browser workspace',
    ],
  },
  {
    name: 'Team',
    blurb: 'Shows the ADMIN and USER roles planned in the schema.',
    price: 'Demo',
    unit: 'no billing',
    storage: 'Same 5 GB workspace',
    cta: 'See how it works',
    href: '/solutions',
    features: [
      'Everything in Pro',
      'Folders and file permissions in the schema',
      'ADMIN and USER roles',
      'Activity log entries',
      'No separate sales portal',
    ],
  },
];

function Check() {
  return (
    <span className={styles.check}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

export default function PricingPage() {
  useScrollReveal();

  return (
    <section
      className="section"
      id="pricing"
      style={{ minHeight: '80vh', paddingTop: 'clamp(90px, 12vh, 140px)' }}
    >
      <div className="wrap">
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }} data-reveal>
          <span className="eyebrow">Pricing</span>
          <h2 className="h-sec">Demo plans for this project</h2>
          <p className="lead">
            The live workspace uses a 5 GB quota. Paid tiers below are labels only — nothing
            is billed, and there is no 2 TB or 5 TB product behind them.
          </p>
        </div>

        <div className={styles.grid}>
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`${styles.tier} ${tier.featured ? styles.featured : ''}`}
              data-reveal
              data-d={String(index)}
            >
              {tier.featured && <span className={styles.badge}>Most popular</span>}
              <h3 className={styles.tierName}>{tier.name}</h3>
              <p className={styles.tierBlurb}>{tier.blurb}</p>

              <div className={styles.price}>
                <span className={styles.priceAmount}>{tier.price}</span>
                <span className={styles.priceUnit}>{tier.unit}</span>
              </div>
              <p className={styles.storage}>{tier.storage}</p>

              <ul className={styles.features}>
                {tier.features.map((feature) => (
                  <li key={feature} className={styles.feature}>
                    <Check />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`btn ${tier.featured ? 'btn-primary' : 'btn-ghost'} ${styles.tierCta}`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className={styles.note}>
          Prices shown in USD. This is a demo project — no payment is collected.
        </p>
      </div>
    </section>
  );
}
