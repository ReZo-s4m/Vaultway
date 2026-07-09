'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import Link from 'next/link';

const FRAME_COUNT = 60; // 0..60 = 61 frames

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all 61 hero frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/hero-frames/${i.toString().padStart(2, '0')}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT + 1) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // Draw a specific frame to the canvas (cover-fit)
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[index];
    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;

    canvas.width = canvas.parentElement!.clientWidth;
    canvas.height = canvas.parentElement!.clientHeight;

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const cx = (canvas.width - img.width * ratio) / 2;
    const cy = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
  }, []);

  // Scroll-driven animation
  useEffect(() => {
    if (!imagesLoaded) return;

    // Draw first frame immediately
    drawFrame(0);

    const handleScroll = () => {
      const section = sectionRef.current;
      const textPane = textRef.current;
      if (!section) return;

      const totalHeight = section.scrollHeight;
      const visibleHeight = window.innerHeight;
      const pixelsPerFrame = (totalHeight - visibleHeight) / (FRAME_COUNT + 1);
      const frameIndex = Math.floor(window.scrollY / pixelsPerFrame);
      const clampedIndex = Math.min(Math.max(frameIndex, 0), FRAME_COUNT);

      drawFrame(clampedIndex);

      // Text fade/blur effect on scroll
      if (textPane) {
        const textBottom = textPane.offsetTop + textPane.clientHeight;
        let progress = Math.min(Math.max(window.scrollY / textBottom, 0), 1);
        progress = Math.max(progress - 0.15, 0);
        const opacity = Math.max(1 - progress * 3, 0);
        const blur = Math.min(progress * 8, 6);
        textPane.style.opacity = String(opacity);
        textPane.style.filter = `blur(${blur}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => drawFrame(0));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', () => drawFrame(0));
    };
  }, [imagesLoaded, drawFrame]);

  return (
    <section className="vw-hero" ref={sectionRef}>
      {/* Sticky media container with canvas */}
      <div className="vw-hero-media">
        <canvas ref={canvasRef} />
      </div>

      {/* Text pane overlaid on the sticky canvas */}
      <div className="vw-hero-text" ref={textRef}>
        <span className="eyebrow">End-to-end encrypted · Zero-knowledge</span>
        <h1>Secure file sharing, built for the <span className="grad">modern world</span></h1>
        <p className="vw-hero-sub">
          Vaultway locks every file on your device before it ever leaves. Share a link only the right people &mdash; and no one at Vaultway &mdash; can open.
        </p>
        <div className="vw-hero-buttons">
          <Link href="/pricing" className="btn btn-primary">
            Get started free
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
          <a href="#features" className="btn btn-ghost">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            Watch demo
          </a>
        </div>
        <div className="vw-hero-meta">
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
            No credit card
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
            5 GB free forever
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
            SOC 2 Type II
          </span>
        </div>
      </div>
    </section>
  );
}
