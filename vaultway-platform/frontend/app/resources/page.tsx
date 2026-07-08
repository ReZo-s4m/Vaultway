'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const TESTIMONIALS = [
  {
    text: 'We moved every client contract off email the week we signed up. The audit log alone justified the switch — for the first time, I can prove who saw what.',
    name: 'Priya Nair',
    role: 'Operations Lead · Meridian Legal',
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=Priya%20Nair',
  },
  {
    text: 'Setup took ten minutes. Our security review took longer to schedule than it took to pass. Zero-knowledge encryption was the box our CISO never expected to tick.',
    name: 'Daniel Reyes',
    role: 'CTO · Northwind Labs',
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=Daniel%20Reyes',
  },
  {
    text: 'I send unreleased designs to clients every day. With Vaultway I can set a link to expire after one view — no lawyer, no NDA dance, no anxiety.',
    name: 'Aisha Khan',
    role: 'Founder · Studio Verre',
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=Aisha%20Khan',
  },
  {
    text: 'In healthcare, a leaked file is a lawsuit. Vaultway gives us encryption we can actually explain to auditors, and links our patients can open without an account.',
    name: 'Dr. Sofia Marx',
    role: 'IT Director · Halcyon Health',
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=Sofia%20Marx',
  },
  {
    text: 'Our financial audits used to be a nightmare of tracking spreadsheets. Now we just point auditors to the Vaultway immutable logs. Clean, painless, and secure.',
    name: 'Marcus Vance',
    role: 'Partner · Kestrel Finance',
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=Marcus%20Vance',
  },
  {
    text: 'Vaultway solved our agency onboarding flow. We share brand guidelines and raw assets securely, while tracking downloads. The zero-trust guarantee is real.',
    name: 'Elena Rostova',
    role: 'Creative Director · Aperture Studio',
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=Elena%20Rostova',
  },
  {
    text: 'When we are doing high-profile acquisitions, email is a vector we avoid. Vaultway is the only platform that ensures our deal rooms are mathematically secure.',
    name: 'James Cardon',
    role: 'Venture Capitalist · Apex Equity',
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=James%20Cardon',
  },
  {
    text: 'No accounts, no plugins, no headaches. Clients download encrypted documents directly in their browser. It is the gold standard for secure customer operations.',
    name: 'Siddharth Mehta',
    role: 'Customer Success · Veloce Scale',
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=Siddharth%20Mehta',
  },
  {
    text: 'We handle secure code distributions. With Vaultway, we know that if the servers are ever compromised, the binaries remain cryptographically locked.',
    name: 'Takahiro Sato',
    role: 'Lead DevSecOps · NeoTokyo Tech',
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=Takahiro%20Sato',
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

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof TESTIMONIALS;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: '-50%',
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-10 rounded-3xl border border-[#1b3050]/50 bg-[#0d1728]/80 backdrop-blur-md shadow-lg shadow-blue-500/5 max-w-xs w-full"
                  key={i}
                >
                  <div className="text-[15px] text-slate-300 leading-relaxed">{text}</div>
                  <div className="flex items-center gap-3 mt-6">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover border border-slate-700/50"
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold text-slate-200 tracking-tight leading-5">{name}</div>
                      <div className="text-xs leading-5 opacity-60 tracking-tight text-slate-400">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

export default function ResourcesPage() {
  useScrollReveal();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const firstColumn = TESTIMONIALS.slice(0, 3);
  const secondColumn = TESTIMONIALS.slice(3, 6);
  const thirdColumn = TESTIMONIALS.slice(6, 9);

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
      {/* Testimonials */}
      <section className="section" style={{ background: 'linear-gradient(180deg,var(--abyss),var(--void))', overflow: 'hidden' }}>
        <div className="wrap">
          <div className="center" data-reveal>
            <span className="eyebrow">Testimonials</span>
            <h2 className="h-sec">The people who trust us most have the most to lose</h2>
          </div>

          <div
            className="flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[640px] overflow-hidden"
            data-reveal
            data-d="1"
          >
            <TestimonialsColumn testimonials={firstColumn} duration={25} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={30} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq" style={{ paddingBottom: '80px' }}>
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
