'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';

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

export default function WorkspacePreview() {
  const [fmSearchQuery, setFmSearchQuery] = useState('');

  const filteredFiles = MOCK_FILES.filter((file) =>
    file.name.toLowerCase().includes(fmSearchQuery.toLowerCase())
  );

  return (
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
  );
}
