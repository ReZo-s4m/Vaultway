'use client';

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';

const LAST_FRAME_INDEX = 60;
const TOTAL_FRAMES = LAST_FRAME_INDEX + 1;
const IMAGE_END = 0.62;
const VIDEO_FADE_END = 0.68;
const VIDEO_START = IMAGE_END;
const VIDEO_SRC = '/hero-video/xl.webm';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoStartedRef = useRef(false);
  const textRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const isComponentMountedRef = useRef(true);
  const hasDrawnAnyFrameRef = useRef(false);

  const [loadedFrames, setLoadedFrames] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  /*
   * Resize internal canvas resolution matching viewport ratio.
   */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;

    if (!canvas || !container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const requiredWidth = Math.round(width * pixelRatio);
    const requiredHeight = Math.round(height * pixelRatio);

    if (
      canvas.width !== requiredWidth ||
      canvas.height !== requiredHeight
    ) {
      canvas.width = requiredWidth;
      canvas.height = requiredHeight;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }
  }, []);

  /*
   * Draw one image using a cover-style fit.
   */
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    const image = imagesRef.current[frameIndex];

    if (
      !canvas ||
      !container ||
      !image ||
      !image.complete ||
      image.naturalWidth === 0
    ) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) return;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const canvasWidth = container.clientWidth;
    const canvasHeight = container.clientHeight;

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    const imageRatio = image.naturalWidth / image.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth: number;
    let drawHeight: number;

    if (canvasRatio > imageRatio) {
      drawWidth = canvasWidth;
      drawHeight = drawWidth / imageRatio;
    } else {
      drawHeight = canvasHeight;
      drawWidth = drawHeight * imageRatio;
    }

    const drawX = (canvasWidth - drawWidth) / 2;
    const drawY = canvasHeight - drawHeight;

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    context.drawImage(
      image,
      drawX,
      drawY,
      drawWidth,
      drawHeight,
    );
  }, []);

  /*
   * Preload frame 0 immediately for instant display, then preload 1..60.
   */
  useEffect(() => {
    let cancelled = false;
    let completedFrames = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    // 1. Load Frame 0 first so floating elements show immediately
    const frame0 = new Image();
    images[0] = frame0;

    frame0.onload = () => {
      completedFrames += 1;
      if (!cancelled) {
        imagesRef.current = images;
        setLoadedFrames(1);
        setFirstFrameReady(true);
      }
    };
    frame0.onerror = () => {
      completedFrames += 1;
    };
    frame0.src = '/hero-frames/00.png';

    // 2. Preload remaining frames 1..60 in parallel
    for (let index = 1; index < TOTAL_FRAMES; index += 1) {
      const image = new Image();
      images[index] = image;

      image.onload = () => {
        completedFrames += 1;
        if (!cancelled) {
          setLoadedFrames(completedFrames);
          if (completedFrames === TOTAL_FRAMES) {
            imagesRef.current = images;
            setImagesLoaded(true);
          }
        }
      };

      image.onerror = () => {
        completedFrames += 1;
        if (!cancelled) {
          setLoadedFrames(completedFrames);
        }
      };

      image.src = `/hero-frames/${index
        .toString()
        .padStart(2, '0')}.png`;
    }

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * Calculate hero progress based on scroll position.
   */
  const getHeroProgress = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return 0;

    const headerOffset = 72;
    const sectionTop =
      section.getBoundingClientRect().top + window.scrollY;
    const visibleHeroHeight = window.innerHeight - headerOffset;
    const scrollableDistance =
      section.offsetHeight - visibleHeroHeight;

    if (scrollableDistance <= 0) return 0;

    const scrollInsideHero = window.scrollY - sectionTop;
    return Math.min(
      Math.max(scrollInsideHero / scrollableDistance, 0),
      1,
    );
  }, []);

  /*
   * Update target scroll progress ref.
   */
  const updateTargetProgress = useCallback(() => {
    targetProgressRef.current = getHeroProgress();
  }, [getHeroProgress]);

  /*
   * Main continuous animation tick loop.
   * Handles:
   * - Ultra-smooth Lerp dampening for scroll frame scrubbing (removes lag/stutter)
   * - Ambient floating physics (3D elements float & bob gently before loading & while idle)
   * - Video crossfade & hero text scroll transitions
   */
  const tick = useCallback(
    (timestamp: number) => {
      if (!isComponentMountedRef.current) return;

      const canvas = canvasRef.current;
      const video = videoRef.current;
      const text = textRef.current;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        drawFrame(0);
        if (canvas) canvas.style.opacity = '1';
        if (video) {
          video.pause();
          video.style.opacity = '0';
        }
        if (text) {
          text.style.opacity = '1';
          text.style.transform = 'none';
          text.style.filter = 'none';
          text.style.pointerEvents = 'auto';
        }
        return;
      }

      // 1. Smooth Lerp calculation: slide currentProgress towards targetProgress
      const target = targetProgressRef.current;
      const diff = target - currentProgressRef.current;

      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.12; // 0.12 ease factor for liquid-smooth motion
      } else {
        currentProgressRef.current = target;
      }

      const progress = currentProgressRef.current;

      // 2. Ambient Floating physics (makes elements float & bob gently before loading and while idle)
      const floatIntensity = Math.max(0, 1 - progress * 2.5);
      const floatY =
        Math.sin(timestamp * 0.0016) * 10 * floatIntensity;
      const floatX =
        Math.cos(timestamp * 0.0012) * 5 * floatIntensity;
      const floatRot =
        Math.sin(timestamp * 0.001) * 0.7 * floatIntensity;
      const floatScale =
        1 + Math.sin(timestamp * 0.0014) * 0.005 * floatIntensity;

      if (canvas) {
        canvas.style.transform = `translate3d(${floatX}px, ${floatY}px, 0) rotate(${floatRot}deg) scale(${floatScale})`;
      }

      // 3. Draw correct frame based on smoothed progress
      const imageProgress = Math.min(
        Math.max(progress / IMAGE_END, 0),
        1,
      );

      const nextFrame = Math.min(
        LAST_FRAME_INDEX,
        Math.round(imageProgress * LAST_FRAME_INDEX),
      );

      if (
        nextFrame !== currentFrameRef.current ||
        !hasDrawnAnyFrameRef.current
      ) {
        currentFrameRef.current = nextFrame;
        drawFrame(nextFrame);
        hasDrawnAnyFrameRef.current = true;
      }

      // 4. Video crossfade phase
      const videoFadeProgress = Math.min(
        Math.max(
          (progress - IMAGE_END) /
            (VIDEO_FADE_END - IMAGE_END),
          0,
        ),
        1,
      );

      if (progress >= VIDEO_START && video && videoReady) {
        if (!videoStartedRef.current) {
          videoStartedRef.current = true;
          video.currentTime = 0;

          void video.play().catch((error) => {
            console.error(
              'Unable to start hero sealing video:',
              error,
            );
            videoStartedRef.current = false;
          });
        }

        if (canvas) {
          canvas.style.opacity = String(1 - videoFadeProgress);
        }

        video.style.opacity = String(videoFadeProgress);
      } else {
        if (canvas) {
          canvas.style.opacity = '1';
        }

        if (video) {
          video.style.opacity = '0';
          video.pause();

          if (video.currentTime !== 0) {
            video.currentTime = 0;
          }
        }

        videoStartedRef.current = false;
      }

      // 5. Hero text animation
      if (text) {
        const fadeStart = 0.08;
        const fadeEnd = 0.34;

        const fadeProgress = Math.min(
          Math.max(
            (progress - fadeStart) / (fadeEnd - fadeStart),
            0,
          ),
          1,
        );

        const opacity = 1 - fadeProgress;
        const translateY = fadeProgress * -30;
        const blur = fadeProgress * 6;

        text.style.opacity = opacity.toString();
        text.style.transform = `translate3d(0, ${translateY}px, 0)`;
        text.style.filter = `blur(${blur}px)`;
        text.style.pointerEvents =
          opacity < 0.15 ? 'none' : 'auto';
      }

      // Request next RAF frame to maintain continuous smooth animation
      animationFrameIdRef.current = requestAnimationFrame(tick);
    },
    [drawFrame, getHeroProgress, videoReady],
  );

  /*
   * Initialize canvas sizing, initial render, and start RAF loop.
   */
  useEffect(() => {
    isComponentMountedRef.current = true;

    const container = canvasContainerRef.current;
    if (!container) return;

    resizeCanvas();
    updateTargetProgress();

    // If frame 0 is ready, render immediately
    if (firstFrameReady) {
      drawFrame(0);
    }

    // Start continuous RAF animation loop
    animationFrameIdRef.current = requestAnimationFrame(tick);

    // Passive scroll listener updates target scroll position
    const handleScroll = () => {
      updateTargetProgress();
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    const handleResize = () => {
      resizeCanvas();
      drawFrame(currentFrameRef.current);
      updateTargetProgress();
    };

    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      drawFrame(currentFrameRef.current);
    });
    resizeObserver.observe(container);

    return () => {
      isComponentMountedRef.current = false;
      resizeObserver.disconnect();

      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }

      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      videoStartedRef.current = false;
    };
  }, [
    firstFrameReady,
    drawFrame,
    resizeCanvas,
    updateTargetProgress,
    tick,
  ]);

  return (
    <section className="vw-hero" ref={sectionRef}>
      <div
        className="vw-hero-media"
        ref={canvasContainerRef}
        aria-hidden="true"
      >
        <canvas ref={canvasRef} />

        <video
          ref={videoRef}
          className="vw-hero-video"
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          onError={() => {
            console.error(
              `Failed to load hero video: ${VIDEO_SRC}`,
            );
          }}
          onEnded={(event) => {
            const video = event.currentTarget;
            video.pause();

            if (
              Number.isFinite(video.duration) &&
              video.duration > 0.05
            ) {
              video.currentTime = video.duration - 0.04;
            }
          }}
        />

        {!imagesLoaded && (
          <div
            className={`vw-hero-loader ${
              firstFrameReady ? 'vw-hero-loader--minimal' : ''
            }`}
            aria-live="polite"
          >
            <div className="vw-hero-loader-bar">
              <span
                style={{
                  width: `${
                    (loadedFrames / TOTAL_FRAMES) * 100
                  }%`,
                }}
              />
            </div>

            <span>
              Loading experience{' '}
              {Math.round(
                (loadedFrames / TOTAL_FRAMES) * 100,
              )}
              %
            </span>
          </div>
        )}

        <div className="vw-hero-overlay" />
      </div>

      <div className="vw-hero-text" ref={textRef}>
        <span className="eyebrow">
          End-to-end encrypted · Zero-knowledge
        </span>

        <h1>
          Secure file sharing, built for the{' '}
          <span className="grad">modern world</span>
        </h1>

        <p className="vw-hero-sub">
          Vaultway locks every file on your device before it
          ever leaves. Share a link only the right people —
          and no one at Vaultway — can open.
        </p>

        <div className="vw-hero-buttons">
          <Link
            href="/pricing"
            className="btn btn-primary"
          >
            Get started free

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>

          <a href="#features" className="btn btn-ghost">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>

            Watch demo
          </a>
        </div>

        <div className="vw-hero-meta">
          <span>
            <CheckIcon />
            No credit card
          </span>

          <span>
            <CheckIcon />
            5 GB free forever
          </span>

          <span>
            <CheckIcon />
            SOC 2 Type II
          </span>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

