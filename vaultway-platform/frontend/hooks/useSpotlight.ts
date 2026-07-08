'use client';

import { useEffect } from 'react';

export function useSpotlight() {
  useEffect(() => {
    const cards = document.querySelectorAll('.spot');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const handlePointerMove = (e: PointerEvent, card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    };

    const listeners: { card: HTMLElement; fn: (e: PointerEvent) => void }[] = [];
    cards.forEach((el) => {
      const card = el as HTMLElement;
      const fn = (e: PointerEvent) => handlePointerMove(e, card);
      card.addEventListener('pointermove', fn);
      listeners.push({ card, fn });
    });

    return () => {
      listeners.forEach(({ card, fn }) => {
        card.removeEventListener('pointermove', fn);
      });
    };
  }, []);
}
