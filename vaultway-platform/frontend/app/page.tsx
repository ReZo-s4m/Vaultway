'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Link from 'next/link';

interface UploadingFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'Queued' | 'Encrypting' | 'Uploading' | 'Secured';
  link: string;
  copied: boolean;
}

const MOCK_FILES = [
  { name: 'Q3 Financial Report.pdf', type: 'pdf', typeLabel: 'PDF', meta: 'Shared · 2 people', size: '4.2 MB' },
  { name: 'Product mockups final.fig', type: 'fig', typeLabel: 'FIG', meta: 'Link · expires in 5 days', size: '28.7 MB' },
  { name: 'Client contract — signed.docx', type: 'doc', typeLabel: 'DOC', meta: 'Password protected', size: '1.1 MB' },
  { name: 'Brand assets 2025.zip', type: 'zip', typeLabel: 'ZIP', meta: 'Shared · 8 people', size: '312 MB' },
  { name: 'Onboarding walkthrough.mp4', type: 'img', typeLabel: 'MP4', meta: 'Private', size: '86.4 MB' },
  { name: 'Board deck v4.pdf', type: 'pdf', typeLabel: 'PDF', meta: 'Link · view-only', size: '9.8 MB' },
];

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}

const ContainerScroll = ({ titleComponent, children }: ContainerScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
      style={{ background: 'transparent' }}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: '1000px',
        }}
      >
        <ContainerScrollHeader translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

interface ContainerScrollHeaderProps {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}

const ContainerScrollHeader = ({ translate, titleComponent }: ContainerScrollHeaderProps) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

interface CardProps {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}

const Card = ({ rotate, scale, children }: CardProps) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
        borderColor: 'var(--line-2)',
        background: 'var(--abyss)',
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 p-2 md:p-6 rounded-[30px] shadow-2xl"
    >
      <div
        style={{ background: 'var(--deep)' }}
        className="h-full w-full overflow-hidden rounded-2xl md:rounded-2xl md:p-4"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default function HomePage() {
  useScrollReveal();

  const [fmSearchQuery, setFmSearchQuery] = useState('');
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (videoRef.current) {
      if (reduceMotion) {
        videoRef.current.pause();
      } else {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
      }
    }
  }, []);

  const rand = (n: number) => {
    const s = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let o = '';
    for (let k = 0; k < n; k++) {
      o += s[Math.floor(Math.random() * s.length)];
    }
    return o;
  };

  const addFile = (name: string, size: number) => {
    const id = rand(8);
    const newFile: UploadingFile = {
      id,
      name,
      size,
      progress: 0,
      status: 'Encrypting',
      link: '',
      copied: false,
    };
    setUploadingFiles((prev) => [...prev, newFile]);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setUploadingFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                progress: 100,
                status: 'Secured',
                link: `https://vaultway.io/s/${rand(10)}`,
              }
            : f
        )
      );
      return;
    }

    setTimeout(() => {
      setUploadingFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: 'Uploading' } : f))
      );

      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 16 + 6;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setUploadingFiles((prev) =>
            prev.map((f) =>
              f.id === id
                ? {
                    ...f,
                    progress: 100,
                    status: 'Secured',
                    link: `https://vaultway.io/s/${rand(10)}`,
                  }
                : f
            )
          );
        } else {
          setUploadingFiles((prev) =>
            prev.map((f) =>
              f.id === id ? { ...f, progress: Math.min(99, Math.round(currentProgress)) } : f
            )
          );
        }
      }, 140);
    }, 850);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      Array.from(e.dataTransfer.files)
        .slice(0, 6)
        .forEach((file) => {
          addFile(file.name, file.size);
        });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      Array.from(e.target.files)
        .slice(0, 6)
        .forEach((file) => {
          addFile(file.name, file.size);
        });
    }
  };

  const removeFile = (id: string) => {
    setUploadingFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const copyLink = (id: string, link: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link).then(() => {
        setUploadingFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, copied: true } : f))
        );
        setTimeout(() => {
          setUploadingFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, copied: false } : f))
          );
        }, 1500);
      });
    }
  };

  const filteredFiles = MOCK_FILES.filter((file) =>
    file.name.toLowerCase().includes(fmSearchQuery.toLowerCase())
  );

  const formatSize = (b: number) => {
    if (b < 1024) return b + ' B';
    if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
    if (b < 1073741824) return (b / 1048576).toFixed(1) + ' MB';
    return (b / 1073741824).toFixed(2) + ' GB';
  };

  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster="/hero-poster.jpg">
            <source src="/hero-video.webm" type="video/webm" />
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-scrim top"></div>
        <div className="hero-scrim left"></div>
        <div className="hero-scrim bottom"></div>
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">End-to-end encrypted · Zero-knowledge</span>
              <h1>Secure file sharing, built for the <span className="grad">modern world</span></h1>
              <p className="hero-sub">Vaultway locks every file on your device before it ever leaves. Share a link only the right people &mdash; and no one at Vaultway &mdash; can open.</p>
              <div className="hero-actions">
                <Link href="/pricing" className="btn btn-primary">
                  Get started free
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
                <a href="#try" className="btn btn-ghost">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Try Sandbox
                </a>
              </div>
              <div className="hero-meta">
                <span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  No credit card
                </span>
                <span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  5 GB free forever
                </span>
                <span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  SOC 2 Type II
                </span>
              </div>
            </div>
            <div className="hero-float" aria-hidden="true">
              <div className="chip c1">
                <span className="ci">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="10" width="16" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 018 0v3" />
                  </svg>
                </span>
                <div><small>Encryption</small>AES-256 encrypted</div>
              </div>
              <div className="chip c2">
                <span className="ci ok">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <div><small>Sharing</small>Secure link generated</div>
              </div>
              <div className="chip c3">
                <span className="ci ok">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <div><small>Storage</small>File uploaded</div>
              </div>
              <div className="chip c4">
                <span className="ci">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="11" width="14" height="9" rx="2" />
                    <path d="M12 15v2" />
                    <path d="M8 11V8a4 4 0 018 0v3" />
                  </svg>
                </span>
                <div><small>Access</small>Password protected</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="try" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="dash-head center" data-reveal>
          <span className="eyebrow">Uploader Sandbox</span>
          <h2 className="h-sec">Try local encryption now</h2>
          <p className="lead">Select a file below. Watch it encrypt in real-time. Copy the link to inspect the secure URL structure.</p>
        </div>
        <div className="wrap">
          <div className="upload-grid">
            <div
              className={`dropzone ${dragActive ? 'drag' : ''}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              data-reveal
            >
              <input
                ref={fileInputRef}
                type="file"
                id="fileInput"
                multiple
                style={{ display: 'none' }}
                onChange={handleFileSelect}
              />
              <div className="dz-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div className="dz-title">Drag & drop files here</div>
              <div className="dz-sub">or click to browse your storage</div>
              <div className="dz-note">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Client-side encrypted
              </div>
            </div>
            <div className="upload-right" data-reveal data-d="1">
              <div className="upload-list" id="uploadList">
                {uploadingFiles.map((file) => (
                  <div key={file.id} className={`up-row ${file.status === 'Secured' ? 'secured' : ''}`}>
                    <div className="up-ic">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M6 2h9l5 5v15H6z" />
                        <path d="M15 2v5h5" />
                      </svg>
                    </div>
                    <div className="up-main">
                      <div className="up-top">
                        <span className="up-name">{file.name}</span>
                        <span className="up-size">{formatSize(file.size)}</span>
                      </div>
                      <div className="up-bar">
                        <div
                          className={`up-fill ${file.status === 'Secured' ? 'done' : ''}`}
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                      <div className="up-status">
                        <span
                          className={`up-dot ${file.status === 'Encrypting' ? 'enc' : file.status === 'Uploading' ? 'up' : file.status === 'Secured' ? 'done' : ''}`}
                        ></span>
                        <span className="up-stat-text">
                          {file.status === 'Encrypting' ? 'Encrypting \u00b7 AES-256' : file.status}
                        </span>
                      </div>
                      {file.status === 'Secured' && (
                        <div className="up-link">
                          <span className="lock-mini">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="4" y="10" width="16" height="10" rx="2" />
                              <path d="M8 10V7a4 4 0 018 0v3" />
                            </svg>
                          </span>
                          <input className="up-link-input" readOnly value={file.link} />
                          <button
                            className={`up-copy ${file.copied ? 'ok' : ''}`}
                            type="button"
                            onClick={() => copyLink(file.id, file.link)}
                          >
                            {file.copied ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      )}
                      {file.status === 'Secured' && (
                        <div className="up-tags">
                          <span className="up-tag">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="4" y="10" width="16" height="10" rx="2" />
                              <path d="M8 10V7a4 4 0 018 0v3" />
                            </svg>
                            Password protected
                          </span>
                          <span className="up-tag">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="9" />
                              <path d="M12 7v5l3 2" />
                            </svg>
                            Expires in 7 days
                          </span>
                          <span className="up-tag">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 3v12M8 11l4 4 4-4" />
                              <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                            </svg>
                            0 downloads
                          </span>
                        </div>
                      )}
                    </div>
                    <button
                      className="up-remove"
                      type="button"
                      aria-label={`Remove ${file.name}`}
                      onClick={() => removeFile(file.id)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                {uploadingFiles.length === 0 && (
                  <p className="up-hint" id="uploadHint">No files queued yet. Select your files to start.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContainerScroll
        titleComponent={
          <div className="dash-head center" style={{ transform: 'translateY(-20px)' }}>
            <span className="eyebrow">The workspace</span>
            <h2 className="h-sec">Your files, organized and armored</h2>
            <p className="lead" style={{ margin: '18px auto 0', maxWidth: '56ch' }}>
              A calm home for everything you share. Search instantly, watch your storage, and see exactly who touched what &mdash; every item encrypted at rest.
            </p>
          </div>
        }
      >
        <div className="h-full flex flex-col">
          <div className="win-bar">
            <span className="win-dot r"></span>
            <span className="win-dot y"></span>
            <span className="win-dot g"></span>
            <span className="win-url">app.vaultway.io/files</span>
          </div>
          <div className="dash flex-1 min-h-0" style={{ height: 'calc(100% - 45px)' }}>
            <aside className="dash-side">
              <div className="side-brand">
                <svg className="mark" viewBox="0 0 32 32" fill="none">
                  <ellipse cx="16" cy="16" rx="7.5" ry="12" stroke="#6db4f5" strokeWidth="1.6" />
                  <circle cx="16" cy="16" r="2.4" fill="#eef6ff" />
                </svg>
                Vaultway
              </div>
              <div className="side-link active">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Recent files
              </div>
              <div className="side-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 7a2 2 0 012-2h5l2 2h9a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Folders
              </div>
              <div className="side-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.7 21a2 2 0 01-3.4 0" />
                </svg>
                Shared with me
              </div>
              <div className="side-group">Insights</div>
              <div className="side-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="M7 14l4-4 3 3 5-6" />
                </svg>
                Storage analytics
              </div>
              <div className="side-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8v4l3 2" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
                Activity feed
              </div>
            </aside>
            <div className="dash-main">
              <label className="dash-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4-4" />
                </svg>
                <input
                  id="fmSearch"
                  type="text"
                  placeholder="Search files…"
                  aria-label="Search files"
                  value={fmSearchQuery}
                  onChange={(e) => setFmSearchQuery(e.target.value)}
                />
                <kbd>&#8984;K</kbd>
              </label>
              <div className="fm-list" id="fmList">
                {filteredFiles.map((file, idx) => (
                  <div key={idx} className="fm-row" data-name={file.name}>
                    <div className="fm-file">
                      <span className={`fm-ic ${file.type}`}>{file.typeLabel}</span>
                      <div>
                        <div className="fm-name">{file.name}</div>
                        <div className="fm-meta">{file.meta}</div>
                      </div>
                    </div>
                    <span className="fm-size">{file.size}</span>
                    <svg className="fm-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="4" y="10" width="16" height="10" rx="2" />
                      <path d="M8 10V7a4 4 0 018 0v3" />
                    </svg>
                  </div>
                ))}
                {filteredFiles.length === 0 && (
                  <div className="fm-empty" id="fmEmpty">No files match that search.</div>
                )}
              </div>
            </div>
            <aside className="dash-right">
              <div className="ring-wrap">
                <svg className="ring" viewBox="0 0 120 120">
                  <circle className="bg" cx="60" cy="60" r="50" />
                  <circle className="fg" cx="60" cy="60" r="50" />
                </svg>
                <div className="ring-label">
                  <b>1.2 GB</b> of 5 GB used
                </div>
              </div>
              <h4 className="right-title">Activity log</h4>
              <div className="act g">
                <span className="ad"></span>
                <div>
                  <div className="at">Client contract signed.docx shared with <b>law@meridian.com</b></div>
                  <div className="aw">2 mins ago · US East</div>
                </div>
              </div>
              <div className="act a">
                <span className="ad"></span>
                <div>
                  <div className="at">Password access added to <b>Q3 Financial Report.pdf</b></div>
                  <div className="aw">44 mins ago · US West</div>
                </div>
              </div>
              <div className="act">
                <span className="ad"></span>
                <div>
                  <div className="at">Brand assets 2025.zip downloaded by <b>design@verre.co</b></div>
                  <div className="aw">2 hours ago · Frankfurt</div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </ContainerScroll>



      <section className="cta-sec" id="contact">
        <span className="aperture"></span>
        <span className="cta-float f1" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5"/></svg></span>
        <span className="cta-float f2" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg></span>
        <span className="cta-float f3" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2h9l5 5v15H6z"/></svg></span>
        <span className="cta-float f4" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7"/><path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7"/></svg></span>
        <div className="wrap">
          <h2>Ready to protect your files?</h2>
          <p>Join half a million people who share without holding their breath. Your first 5 GB is free, forever.</p>
          <div className="cta-actions">
            <Link href="/pricing" className="btn btn-primary">
              Start free
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
