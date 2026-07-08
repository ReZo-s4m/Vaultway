'use client';

import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('[data-reveal]');
    const counters = document.querySelectorAll('[data-count-to]');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fmt = (v: number, d: number) => (d > 0 ? v.toFixed(d) : Math.round(v).toString());

    // Scroll Reveal
    if (reduce) {
      revealEls.forEach((e) => e.classList.add('in'));
    } else if ('IntersectionObserver' in window) {
      const ro = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              ro.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
      );
      revealEls.forEach((e) => ro.observe(e));
    } else {
      revealEls.forEach((e) => e.classList.add('in'));
    }

    // Count Up
    const runCount = (el: Element) => {
      const to = parseFloat(el.getAttribute('data-count-to') || '0');
      const dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const suf = el.getAttribute('data-suffix') || '';
      const pre = el.getAttribute('data-prefix') || '';
      if (reduce) {
        el.textContent = pre + fmt(to, dec) + suf;
        return;
      }
      const duration = 1500;
      let start: number | null = null;
      const tick = (now: number) => {
        if (start === null) start = now;
        const progress = Math.min(1, (now - start) / duration);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = pre + fmt(to * ease, dec) + suf;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = pre + fmt(to, dec) + suf;
        }
      };
      requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window && !reduce) {
      const co = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCount(entry.target);
              co.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((e) => co.observe(e));
    } else {
      counters.forEach(runCount);
    }
  }, []);
}
