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
  const animationFrameRef = useRef<number | null>(null);

  const [loadedFrames, setLoadedFrames] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  /*
   * Preload all animation frames.
   */
  useEffect(() => {
    let cancelled = false;
    let completedFrames = 0;

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const handleComplete = () => {
      completedFrames += 1;

      if (!cancelled) {
        setLoadedFrames(completedFrames);

        if (completedFrames === TOTAL_FRAMES) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      }
    };

    for (let index = 0; index < TOTAL_FRAMES; index += 1) {
      const image = new Image();

      images[index] = image;

      image.onload = handleComplete;
      image.onerror = () => {
        console.error(
          `Failed to load hero frame: ${index
            .toString()
            .padStart(2, '0')}.png`,
        );

        handleComplete();
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
   * Resize the internal canvas resolution without resizing it
   * every time a new frame is drawn.
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

    context.setTransform(
      pixelRatio,
      0,
      0,
      pixelRatio,
      0,
      0,
    );

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

    /*
     * Bottom-align the image so the lower part of the animation
     * remains visible.
     */
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
   * Get animation progress based only on the hero section.
   */
  const getHeroProgress = useCallback(() => {
    const section = sectionRef.current;

    if (!section) return 0;

    const headerOffset = 72;

    const sectionTop =
      section.getBoundingClientRect().top + window.scrollY;

    const visibleHeroHeight =
      window.innerHeight - headerOffset;

    const scrollableDistance =
      section.offsetHeight - visibleHeroHeight;

    if (scrollableDistance <= 0) return 0;

    const scrollInsideHero =
      window.scrollY - sectionTop;

    return Math.min(
      Math.max(scrollInsideHero / scrollableDistance, 0),
      1,
    );
  }, []);

  /*
   * Draw the correct frame and animate the text.
   */
  const updateHero = useCallback(() => {
    animationFrameRef.current = null;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      drawFrame(0);

      if (canvas) {
        canvas.style.opacity = '1';
      }

      if (video) {
        video.pause();
        video.style.opacity = '0';
      }

      const text = textRef.current;

      if (text) {
        text.style.opacity = '1';
        text.style.transform = 'none';
        text.style.filter = 'none';
        text.style.pointerEvents = 'auto';
      }

      return;
    }

    const progress = getHeroProgress();

    /*
     * Phase 1: play image frames from 00.png to 60.png.
     */
    const imageProgress = Math.min(
      Math.max(progress / IMAGE_END, 0),
      1,
    );

    const nextFrame = Math.min(
      LAST_FRAME_INDEX,
      Math.round(imageProgress * LAST_FRAME_INDEX),
    );

    if (nextFrame !== currentFrameRef.current) {
      currentFrameRef.current = nextFrame;
      drawFrame(nextFrame);
    }

    /*
     * Phase 2:
     * Start the video immediately after frame 60 and crossfade
     * from the canvas into the playing video.
     */
    const videoFadeProgress = Math.min(
      Math.max(
        (progress - IMAGE_END) /
          (VIDEO_FADE_END - IMAGE_END),
        0,
      ),
      1,
    );

    if (
      progress >= VIDEO_START &&
      video &&
      videoReady
    ) {
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
        canvas.style.opacity = String(
          1 - videoFadeProgress,
        );
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

    /*
     * Existing hero text animation.
     */
    const text = textRef.current;

    if (text) {
      const fadeStart = 0.08;
      const fadeEnd = 0.34;

      const fadeProgress = Math.min(
        Math.max(
          (progress - fadeStart) /
            (fadeEnd - fadeStart),
          0,
        ),
        1,
      );

      const opacity = 1 - fadeProgress;
      const translateY = fadeProgress * -30;
      const blur = fadeProgress * 6;

      text.style.opacity = opacity.toString();
      text.style.transform =
        `translate3d(0, ${translateY}px, 0)`;
      text.style.filter = `blur(${blur}px)`;
      text.style.pointerEvents =
        opacity < 0.15 ? 'none' : 'auto';
    }
  }, [drawFrame, getHeroProgress, videoReady]);

  /*
   * Limit scroll updates to one per animation frame.
   */
  const requestHeroUpdate = useCallback(() => {
    if (animationFrameRef.current !== null) return;

    animationFrameRef.current =
      window.requestAnimationFrame(updateHero);
  }, [updateHero]);

  /*
   * Start the animation after every image has loaded.
   */
  useEffect(() => {
    if (!imagesLoaded) return;

    const container = canvasContainerRef.current;

    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      drawFrame(currentFrameRef.current);
    });

    resizeObserver.observe(container);

    resizeCanvas();
    drawFrame(0);
    updateHero();

    window.addEventListener('scroll', requestHeroUpdate, {
      passive: true,
    });

    const handleResize = () => {
      resizeCanvas();
      drawFrame(currentFrameRef.current);
      requestHeroUpdate();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();

      window.removeEventListener(
        'scroll',
        requestHeroUpdate,
      );

      window.removeEventListener(
        'resize',
        handleResize,
      );

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(
          animationFrameRef.current,
        );
      }

      const video = videoRef.current;

      if (video) {
        video.pause();
        video.currentTime = 0;
      }

      videoStartedRef.current = false;
    };
  }, [
    imagesLoaded,
    drawFrame,
    resizeCanvas,
    requestHeroUpdate,
    updateHero,
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

            /*
             * Keep the final sealed frame visible.
             */
            if (
              Number.isFinite(video.duration) &&
              video.duration > 0.05
            ) {
              video.currentTime = video.duration - 0.04;
            }
          }}
        />

        {!imagesLoaded && (
          <div className="vw-hero-loader">
            <div className="vw-hero-loader-bar">
              <span
                style={{
                  width: `${(loadedFrames / TOTAL_FRAMES) * 100
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
