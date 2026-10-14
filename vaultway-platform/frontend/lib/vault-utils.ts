import type { VaultFileKind } from "@/lib/vault-types";

/** Crypto-strong id with a safe fallback for older runtimes. */
export function createId(prefix = "id"): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return `${prefix}_${crypto.randomUUID()}`;
    }
  } catch {
    /* fall through */
  }
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

/** Human-readable byte size, e.g. 1536 -> "1.5 KB". */
export function formatBytes(bytes: number, fractionDigits = 1): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** exponent;
  const digits = exponent === 0 ? 0 : fractionDigits;
  return `${value.toFixed(digits)} ${units[exponent]}`;
}

/** Compact relative time, e.g. "just now", "3 min ago", "2 days ago". */
export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const seconds = Math.round((Date.now() - then) / 1000);
  if (seconds < 45) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Absolute date/time for tooltips and detail panels. */
export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const EXTENSION_KIND: Record<string, VaultFileKind> = {
  png: "image",
  jpg: "image",
  jpeg: "image",
  gif: "image",
  webp: "image",
  svg: "image",
  avif: "image",
  heic: "image",
  bmp: "image",
  mp4: "video",
  mov: "video",
  webm: "video",
  mkv: "video",
  avi: "video",
  mp3: "audio",
  wav: "audio",
  flac: "audio",
  ogg: "audio",
  m4a: "audio",
  pdf: "pdf",
  doc: "doc",
  docx: "doc",
  txt: "doc",
  rtf: "doc",
  md: "doc",
  pages: "doc",
  xls: "sheet",
  xlsx: "sheet",
  csv: "sheet",
  numbers: "sheet",
  zip: "archive",
  rar: "archive",
  "7z": "archive",
  tar: "archive",
  gz: "archive",
  js: "code",
  ts: "code",
  tsx: "code",
  jsx: "code",
  json: "code",
  html: "code",
  css: "code",
  py: "code",
  java: "code",
  go: "code",
  rs: "code",
  cpp: "code",
  c: "code",
  sh: "code",
};

/** Best-effort file category from mime type, falling back to extension. */
export function detectFileKind(name: string, mimeType: string): VaultFileKind {
  const mime = mimeType.toLowerCase();
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("audio/")) return "audio";
  if (mime === "application/pdf") return "pdf";
  if (
    mime.includes("spreadsheet") ||
    mime.includes("excel") ||
    mime === "text/csv"
  ) {
    return "sheet";
  }
  if (mime.includes("word") || mime === "text/plain" || mime.includes("document")) {
    return "doc";
  }
  if (
    mime.includes("zip") ||
    mime.includes("compressed") ||
    mime.includes("tar") ||
    mime.includes("x-7z")
  ) {
    return "archive";
  }

  const extension = name.split(".").pop()?.toLowerCase() ?? "";
  return EXTENSION_KIND[extension] ?? "other";
}

/** Two-letter initials for avatars, e.g. "Ada Lovelace" -> "AL". */
export function initialsFrom(nameOrEmail: string | null | undefined): string {
  if (!nameOrEmail) return "V";
  const cleaned = nameOrEmail.trim();
  if (!cleaned) return "V";
  const parts = cleaned.split(/[\s._-]+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return cleaned.slice(0, 2).toUpperCase();
}

/** Read a File as a base64 data URL (used for in-browser preview/download). */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error("Read failed"));
    reader.readAsDataURL(file);
  });
}

/** Trigger a browser download from a data URL. */
export function downloadDataUrl(dataUrl: string, filename: string): void {
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
