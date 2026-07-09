'use client';

import React, { useState, useRef } from 'react';
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
  { name: 'Q3 Financial Report.pdf', typeLabel: 'PDF', meta: 'Shared · 2 people', size: '4.2 MB' },
  { name: 'Product mockups final.fig', typeLabel: 'FIG', meta: 'Link · expires in 5 days', size: '28.7 MB' },
  { name: 'Client contract — signed.docx', typeLabel: 'DOC', meta: 'Password protected', size: '1.1 MB' },
  { name: 'Brand assets 2025.zip', typeLabel: 'ZIP', meta: 'Shared · 8 people', size: '312 MB' },
  { name: 'Onboarding walkthrough.mp4', typeLabel: 'MP4', meta: 'Private', size: '86.4 MB' },
  { name: 'Board deck v4.pdf', typeLabel: 'PDF', meta: 'Link · view-only', size: '9.8 MB' },
];

export default function HomePage() {
  const [fmSearchQuery, setFmSearchQuery] = useState('');
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
    return (b / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="retro-page">
      {/* SubTitle Table */}
      <table className="retro-container" cellSpacing="0" cellPadding="3" border={0}>
        <tbody>
          <tr>
            <td id="retro-subTitle">Vaultway - Open Source Offline Web Mirror &amp; Vault</td>
          </tr>
        </tbody>
      </table>

      {/* Main Content Table */}
      <table className="retro-container" cellSpacing="0" cellPadding="0" border={0}>
        <tbody>
          <tr className="blak" style={{ background: '#000' }}>
            <td>
              <table width="100%" cellSpacing="1" cellPadding="0" border={0}>
                <tbody>
                  <tr>
                    <td id="retro-pageContent">
                      <h1 className="retro-title">Index of locally available vaults:</h1>

                      {/* Search Filter input */}
                      <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong>Search vaults:</strong>
                        <input
                          type="text"
                          className="retro-input"
                          placeholder="Filter files..."
                          value={fmSearchQuery}
                          onChange={(e) => setFmSearchQuery(e.target.value)}
                        />
                      </div>

                      {/* Vault Index Table */}
                      <table className="retro-table">
                        <tbody>
                          {filteredFiles.map((file, idx) => (
                            <tr key={idx}>
                              <td>
                                &middot;&nbsp;
                                <a href="#" onClick={(e) => { e.preventDefault(); alert(`Decrypting local file metadata: ${file.name}`); }}>
                                  {file.name}
                                </a>
                                <span style={{ float: 'right', fontSize: '0.9em', color: '#555' }}>
                                  ({file.typeLabel} &middot; {file.size} &middot; {file.meta})
                                </span>
                              </td>
                            </tr>
                          ))}
                          {filteredFiles.length === 0 && (
                            <tr>
                              <td style={{ textAlign: 'center', color: '#666' }}>
                                No local vaults found matching search query.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>

                      {/* Interactive Sandbox Section */}
                      <fieldset className="retro-fieldset">
                        <legend className="retro-legend">Try local encryption now</legend>
                        <p style={{ marginTop: 0, marginBottom: '12px' }}>
                          Select a file below. Watch it encrypt in real-time. Copy the link to inspect the secure URL structure.
                        </p>

                        {/* Dropzone */}
                        <div
                          onDragEnter={handleDrag}
                          onDragOver={handleDrag}
                          onDragLeave={handleDrag}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          style={{
                            border: dragActive ? '2px dashed #00f' : '2px dashed #99c',
                            background: dragActive ? 'rgba(100,100,255,0.1)' : 'rgba(255,255,255,0.4)',
                            padding: '30px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            marginBottom: '15px',
                          }}
                        >
                          <strong>Drag &amp; drop files here</strong>
                          <br />
                          <span style={{ fontSize: '0.85em', textDecoration: 'underline', color: '#00f' }}>
                            or click to browse your storage
                          </span>
                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            style={{ display: 'none' }}
                            onChange={handleFileSelect}
                          />
                        </div>

                        {/* Uploading/Staged files */}
                        {uploadingFiles.length > 0 && (
                          <div style={{ marginTop: '15px' }}>
                            <strong style={{ fontSize: '0.95em', display: 'block', marginBottom: '8px' }}>
                              Encrypting Sandbox Queues:
                            </strong>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                              <tbody>
                                {uploadingFiles.map((file) => (
                                  <tr key={file.id} style={{ borderBottom: '1px solid #99c' }}>
                                    <td style={{ padding: '8px 0', fontSize: '0.9em' }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <strong>{file.name} ({formatSize(file.size)})</strong>
                                        <span style={{ color: file.status === 'Secured' ? '#008000' : '#0000ff', fontWeight: 'bold' }}>
                                          {file.status}
                                        </span>
                                      </div>
                                      
                                      {/* Progress Bar */}
                                      {file.status !== 'Secured' && (
                                        <div className="retro-progress-bar">
                                          <div className="retro-progress-fill" style={{ width: `${file.progress}%` }} />
                                        </div>
                                      )}

                                      {/* Link and Action buttons */}
                                      {file.status === 'Secured' && (
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px' }}>
                                          <input
                                            type="text"
                                            readOnly
                                            className="retro-input"
                                            value={file.link}
                                            style={{ flexGrow: 1, fontSize: '11px', background: '#eef' }}
                                            onClick={(e) => (e.target as HTMLInputElement).select()}
                                          />
                                          <button
                                            type="button"
                                            className="retro-btn"
                                            onClick={() => copyLink(file.id, file.link)}
                                          >
                                            {file.copied ? 'Copied!' : 'Copy'}
                                          </button>
                                          <button
                                            type="button"
                                            className="retro-btn"
                                            style={{ color: '#c00' }}
                                            onClick={() => removeFile(file.id)}
                                          >
                                            Dismiss
                                          </button>
                                        </div>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </fieldset>

                      <hr className="retro-hr" />

                      {/* Navigation links styled retro */}
                      <div style={{ fontSize: '0.95em', fontWeight: 'bold', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                        <Link href="/features" style={{ textDecoration: 'underline', color: '#00f' }}>Features</Link>
                        <span>|</span>
                        <Link href="/security" style={{ textDecoration: 'underline', color: '#00f' }}>Security</Link>
                        <span>|</span>
                        <Link href="/solutions" style={{ textDecoration: 'underline', color: '#00f' }}>Solutions</Link>
                        <span>|</span>
                        <Link href="/pricing" style={{ textDecoration: 'underline', color: '#00f' }}>Pricing</Link>
                        <span>|</span>
                        <Link href="/resources" style={{ textDecoration: 'underline', color: '#00f' }}>Resources</Link>
                      </div>

                      <h6 style={{ textAlign: 'right', margin: '20px 0 0 0', fontWeight: 'normal', fontStyle: 'italic' }}>
                        Mirror and index made by Vaultway Website Copier [XR&amp;CO&apos;2014]
                      </h6>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Footer Table */}
      <table className="retro-footer" cellSpacing="0" cellPadding="0" border={0}>
        <tbody>
          <tr>
            <td>
              <small>
                &copy; 2026 Vaultway contributors - Inspired by HTTrack Website Copier [Xavier Roche &amp; Leto Kauler].
              </small>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
