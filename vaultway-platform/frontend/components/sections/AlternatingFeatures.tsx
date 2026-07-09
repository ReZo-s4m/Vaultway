'use client';

import React, { useState, useRef } from 'react';
import { Upload, Trash2, Copy, Check, ShieldAlert, KeyRound, MonitorSmartphone, Share2 } from 'lucide-react';

interface UploadingFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'Queued' | 'Encrypting' | 'Uploading' | 'Secured';
  link: string;
  copied: boolean;
}

export default function AlternatingFeatures() {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      }, 120);
    }, 600);
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
        .slice(0, 4)
        .forEach((file) => {
          addFile(file.name, file.size);
        });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      Array.from(e.target.files)
        .slice(0, 4)
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

  const formatSize = (b: number) => {
    if (b < 1024) return b + ' B';
    if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
    if (b < 1073741824) return (b / 1048576).toFixed(1) + ' MB';
    return (b / 1073741824).toFixed(2) + ' GB';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* Slice 1: Interactive Sandbox */}
      <section className="slice-sec" id="try">
        <div className="wrap">
          <div className="slice-grid">
            <div className="slice-text" data-reveal>
              <span className="eyebrow" style={{ textAlign: 'left', margin: '0 0 10px' }}>Live Playground</span>
              <h3>Verify local zero-knowledge cryptography instantly</h3>
              <p>
                Test our browser sandbox below. Drag or drop any document to watch the client-side AES-256 encryption execute in real-time. 
                <br /><br />
                The derived decryption keys are stored in the URL hash component, which is processed locally by your browser and is never transmitted across our networks.
              </p>
            </div>
            
            <div className="slice-media" data-reveal data-d="1" style={{ display: 'block', padding: '24px' }}>
              <div className="upload-grid" style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                <div
                  className={`dropzone ${dragActive ? 'drag' : ''}`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{ width: '100%', minHeight: '140px', padding: '24px', cursor: 'pointer' }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="fileInput"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                  />
                  <div className="dz-ic" style={{ marginBottom: '10px' }}>
                    <Upload size={28} />
                  </div>
                  <div className="dz-title" style={{ fontSize: '1.05rem', fontWeight: 600 }}>Drag & drop files here</div>
                  <div className="dz-sub" style={{ fontSize: '0.86rem', opacity: 0.6 }}>or click to browse your storage</div>
                  <div className="dz-note" style={{ marginTop: '12px', fontSize: '0.78rem', color: 'var(--good)' }}>
                    <Check size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    Client-side encrypted
                  </div>
                </div>

                {uploadingFiles.length > 0 && (
                  <div className="upload-list" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {uploadingFiles.map((file) => (
                      <div key={file.id} className={`up-row ${file.status === 'Secured' ? 'secured' : ''}`} style={{ background: 'rgba(12,20,34,0.6)', padding: '16px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                        <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', width: '100%', gap: '10px' }}>
                          <div style={{ flexGrow: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.86rem' }}>
                              <span className="up-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 600 }}>{file.name}</span>
                              <span className="up-size" style={{ opacity: 0.6, flexShrink: 0 }}>{formatSize(file.size)}</span>
                            </div>
                            <div className="up-bar" style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden', marginBottom: '8px' }}>
                              <div
                                className={`up-fill ${file.status === 'Secured' ? 'done' : ''}`}
                                style={{ width: `${file.progress}%`, height: '100%', background: file.status === 'Secured' ? 'var(--good)' : 'var(--glow)', transition: 'width 0.15s ease' }}
                              ></div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: file.status === 'Secured' ? 'var(--good)' : 'var(--glow)', display: 'inline-block' }}></span>
                                {file.status === 'Encrypting' ? 'Encrypting \u00b7 AES-256' : file.status}
                              </span>
                              {file.status === 'Secured' && (
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                  <button
                                    onClick={() => copyLink(file.id, file.link)}
                                    style={{ background: 'none', border: 'none', color: 'var(--glow-hi)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: 0 }}
                                  >
                                    {file.copied ? <Check size={12} /> : <Copy size={12} />}
                                    {file.copied ? 'Copied' : 'Copy'}
                                  </button>
                                  <button
                                    onClick={() => removeFile(file.id)}
                                    style={{ background: 'none', border: 'none', color: 'var(--bad)', cursor: 'pointer', padding: 0 }}
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slice 2: Granular Access Controls */}
      <section className="slice-sec" style={{ background: 'rgba(10, 17, 32, 0.2)' }}>
        <div className="wrap">
          <div className="slice-grid reverse">
            <div className="slice-media" data-reveal>
              {/* Graphic displaying access dials and checkboxes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', width: '320px', background: 'rgba(12,20,34,0.6)', borderRadius: '16px', border: '1px solid var(--line-2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: 'var(--ink)' }}>
                  <Share2 size={18} style={{ color: 'var(--glow-hi)' }} />
                  <span style={{ fontWeight: 600 }}>Share Security Controls</span>
                </div>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--ink-dim)' }}>Password Lock</span>
                    <span style={{ fontSize: '0.74rem', background: 'rgba(95, 214, 164, 0.1)', color: 'var(--good)', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>ENABLED</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--ink-dim)' }}>Link Expiry Limit</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>24 Hours</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--ink-dim)' }}>Maximum Views</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>1 Download</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--ink-dim)' }}>Recipients Signature</span>
                    <span style={{ fontSize: '0.74rem', background: 'rgba(109, 180, 245, 0.1)', color: 'var(--glow-hi)', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>REQUIRED</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="slice-text" data-reveal data-d="1">
              <span className="eyebrow" style={{ textAlign: 'left', margin: '0 0 10px' }}>Granular Authority</span>
              <h3>Absolute control over your shared data footprints</h3>
              <p>
                Prevent shared links from leaking permanently. Configure custom link decay limits, require multi-factor signatures, enforce complex passwords, or set absolute download caps. 
                <br /><br />
                Once shared material is deleted or a set limit expires, the client-side key map deletes itself from active node buffers, blocking any future access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slice 3: Multi-Platform Sync */}
      <section className="slice-sec">
        <div className="wrap">
          <div className="slice-grid">
            <div className="slice-text" data-reveal>
              <span className="eyebrow" style={{ textAlign: 'left', margin: '0 0 10px' }}>Global Sync</span>
              <h3>Collaborate seamlessly across all workstation terminals</h3>
              <p>
                Keep workspace assets updated in real-time. Whether syncing via our native desktop application, command-line clients (CLI), mobile interfaces, or browser dashboards, your files replicate instantly.
                <br /><br />
                Any modifications made to files are encrypted locally, uploaded, and decrypted on corresponding devices in real-time.
              </p>
            </div>
            
            <div className="slice-media" data-reveal data-d="1">
              <div style={{ position: 'relative', width: '280px', height: '240px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                <MonitorSmartphone size={80} style={{ color: 'var(--glow-hi)', filter: 'drop-shadow(0 0 15px rgba(109, 180, 245, 0.35))' }} />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '0.78rem', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--line)', padding: '4px 10px', borderRadius: '12px' }}>macOS</span>
                  <span style={{ fontSize: '0.78rem', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--line)', padding: '4px 10px', borderRadius: '12px' }}>Windows</span>
                  <span style={{ fontSize: '0.78rem', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--line)', padding: '4px 10px', borderRadius: '12px' }}>Linux</span>
                  <span style={{ fontSize: '0.78rem', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--line)', padding: '4px 10px', borderRadius: '12px' }}>Mobile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
