'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const TESTIMONIALS = [
  {
    quote: 'We moved every client contract off email the week we signed up. The audit log alone justified the switch — for the first time, I can prove who saw what.',
    av: 'PN',
    name: 'Priya Nair',
    role: 'Operations Lead · Meridian Legal',
    grad: 'linear-gradient(135deg,#a9d6ff,#6db4f5)',
  },
  {
    quote: 'Setup took ten minutes. Our security review took longer to schedule than it took to pass. Zero-knowledge encryption was the box our CISO never expected to tick.',
    av: 'DR',
    name: 'Daniel Reyes',
    role: 'CTO · Northwind Labs',
    grad: 'linear-gradient(135deg,#8ee9c2,#5fd6a4)',
  },
  {
    quote: 'I send unreleased designs to clients every day. With Vaultway I can set a link to expire after one view — no lawyer, no NDA dance, no anxiety.',
    av: 'AK',
    name: 'Aisha Khan',
    role: 'Founder · Studio Verre',
    grad: 'linear-gradient(135deg,#e7c26a,#d9a94a)',
  },
  {
    quote: 'In healthcare, a leaked file is a lawsuit. Vaultway gives us encryption we can actually explain to auditors, and links our patients can open without an account.',
    av: 'SM',
    name: 'Dr. Sofia Marx',
    role: 'IT Director · Halcyon Health',
    grad: 'linear-gradient(135deg,#a9d6ff,#6db4f5)',
  },
];

const FAQS = [
  {
    q: 'How does the encryption actually work?',
    a: 'Your file is encrypted with AES-256 on your own device before a single byte reaches our servers. We store only the ciphertext. The key that unlocks it is derived from your credentials and never leaves your control — so even we can\'t read your files.',
  },
  {
    q: 'Can the recipient open a link without a Vaultway account?',
    a: 'Yes. Anyone with the secure link — and the password, if you set one — can open the file in their browser. No sign-up, no app install. You stay in control of when the link expires and how many times it can be opened.',
  },
  {
    q: 'What happens when a link expires?',
    a: 'The moment a link hits its expiry — a set time, or after a chosen number of opens — it stops working entirely. The file stays safe in your vault; only the shared access disappears. You can re-share it any time with fresh settings.',
  },
  {
    q: 'How much can I store, and how large can a file be?',
    a: 'Free accounts include 5 GB. Pro raises that to 1 TB, and Enterprise is sized to your needs. Individual files can be up to 5 GB each on paid plans, shared through a single link.',
  },
  {
    q: 'Who can see my activity and audit logs?',
    a: 'Only you and the people you explicitly grant access to. Audit logs record every view, share, and download in an immutable trail — useful for compliance, and invisible to anyone outside your team.',
  },
  {
    q: 'Is my data really private from Vaultway?',
    a: 'Yes — that\'s the whole design. Because encryption happens on your device and we never hold your key, we operate on data we can\'t read. We can\'t sell it, mine it, or hand over anything legible if compelled. Privacy isn\'t a policy here; it\'s the architecture.',
  },
];

export default function ResourcesPage() {
  useScrollReveal();

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const testimonialAutoplayRef = useRef<NodeJS.Timeout | null>(null);

  const stopAutoplay = useCallback(() => {
    if (testimonialAutoplayRef.current) {
      clearInterval(testimonialAutoplayRef.current);
      testimonialAutoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    stopAutoplay();
    testimonialAutoplayRef.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 4);
    }, 6000);
  }, [stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
      {/* Testimonials */}
      <section className="section" style={{ background: 'linear-gradient(180deg,var(--abyss),var(--void))' }}>
        <div className="wrap">
          <div className="center" data-reveal>
            <span className="eyebrow">Testimonials</span>
            <h2 className="h-sec">The people who trust us most have the most to lose</h2>
          </div>
          <div
            className="t-wrap"
            id="tWrap"
            data-reveal
            data-d="1"
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
          >
            <div className="t-viewport">
              <div
                className="t-track"
                id="tTrack"
                style={{
                  transform: `translateX(-${activeTestimonial * 100}%)`,
                  transition: 'transform 0.55s cubic-bezier(0.2, 0.7, 0.2, 1)',
                }}
              >
                {TESTIMONIALS.map((testimonial, idx) => (
                  <div key={idx} className="t-slide">
                    <p className="t-quote">{testimonial.quote}</p>
                    <div className="t-person">
                      <span className="t-av" style={{ background: testimonial.grad }}>
                        {testimonial.av}
                      </span>
                      <div>
                        <div className="t-name">{testimonial.name}</div>
                        <div className="t-role">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="t-nav">
              <button
                className="t-btn"
                id="tPrev"
                aria-label="Previous testimonial"
                onClick={() => {
                  setActiveTestimonial((prev) => (prev - 1 + 4) % 4);
                  startAutoplay();
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
              <div className="t-dots" id="tDots">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    className={`t-dot ${activeTestimonial === idx ? 'active' : ''}`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    onClick={() => {
                      setActiveTestimonial(idx);
                      startAutoplay();
                    }}
                  ></button>
                ))}
              </div>
              <button
                className="t-btn"
                id="tNext"
                aria-label="Next testimonial"
                onClick={() => {
                  setActiveTestimonial((prev) => (prev + 1) % 4);
                  startAutoplay();
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="center" data-reveal>
          <span className="eyebrow">Common questions</span>
          <h2 className="h-sec">Everything you need to know about Vaultway</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((faq, idx) => (
            <div key={idx} className={`faq-item ${openFaqIndex === idx ? 'open' : ''}`} data-reveal>
              <button
                className="faq-q"
                aria-expanded={openFaqIndex === idx}
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                <span className="fq-ic"></span>
              </button>
              <div className="faq-a">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
