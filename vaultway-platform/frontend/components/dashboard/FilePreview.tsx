"use client";

import { Download, FileWarning } from "lucide-react";

import { Dialog, dialogStyles as overlay } from "./Dialog";
import { FileGlyph } from "./FileGlyph";
import type { VaultFile } from "@/lib/vault-types";
import { formatBytes, formatDateTime } from "@/lib/vault-utils";

interface FilePreviewProps {
  open: boolean;
  file: VaultFile | null;
  onClose: () => void;
  onDownload: (file: VaultFile) => void;
}

export function FilePreview({ open, file, onClose, onDownload }: FilePreviewProps) {
  if (!file) return null;

  const canPreviewImage = file.kind === "image" && Boolean(file.dataUrl);
  const canPreviewPdf = file.kind === "pdf" && Boolean(file.dataUrl);
  const canDownload = Boolean(file.dataUrl);

  return (
    <Dialog
      open={open}
      title={file.name}
      onClose={onClose}
      size="lg"
      footer={
        <>
          <button type="button" className={overlay.ghostButton} onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className={overlay.primaryButton}
            onClick={() => onDownload(file)}
            disabled={!canDownload}
            title={
              canDownload
                ? undefined
                : "Original bytes aren't stored for large files in this demo"
            }
          >
            <Download size={16} />
            Download
          </button>
        </>
      }
    >
      <div className={overlay.previewMedia}>
        {canPreviewImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={file.dataUrl as string} alt={file.name} />
        ) : canPreviewPdf ? (
          <iframe
            src={file.dataUrl as string}
            title={file.name}
            style={{ width: "100%", height: "52vh", border: 0 }}
          />
        ) : (
          <div className={overlay.previewFallback}>
            {canDownload ? (
              <FileGlyph kind={file.kind} size={52} />
            ) : (
              <FileWarning size={44} strokeWidth={1.4} />
            )}
            <p>
              {canDownload
                ? "Preview isn't available for this file type."
                : "This file's contents aren't stored in the demo — metadata only."}
            </p>
          </div>
        )}
      </div>

      <div className={overlay.previewMeta}>
        <div>
          <span>Type</span>
          <strong>{file.mimeType || "Unknown"}</strong>
        </div>
        <div>
          <span>Size</span>
          <strong>{formatBytes(file.sizeBytes)}</strong>
        </div>
        <div>
          <span>Added</span>
          <strong>{formatDateTime(file.createdAt)}</strong>
        </div>
        <div>
          <span>Downloads</span>
          <strong>{file.downloadCount}</strong>
        </div>
      </div>
    </Dialog>
  );
}
