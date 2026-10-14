"use client";

import {
  FileArchive,
  FileAudio,
  FileCode2,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
  File as FileIcon,
  type LucideIcon,
} from "lucide-react";

import type { VaultFileKind } from "@/lib/vault-types";

const KIND_META: Record<VaultFileKind, { icon: LucideIcon; color: string }> = {
  image: { icon: FileImage, color: "#5ea7ff" },
  video: { icon: FileVideo, color: "#c48cff" },
  audio: { icon: FileAudio, color: "#4ad991" },
  pdf: { icon: FileText, color: "#ff6b6b" },
  doc: { icon: FileText, color: "#5b8bff" },
  sheet: { icon: FileSpreadsheet, color: "#2fbf87" },
  archive: { icon: FileArchive, color: "#ffb44d" },
  code: { icon: FileCode2, color: "#8fd0ff" },
  other: { icon: FileIcon, color: "#9aa2ad" },
};

export function FileGlyph({
  kind,
  size = 24,
}: {
  kind: VaultFileKind;
  size?: number;
}) {
  const meta = KIND_META[kind] ?? KIND_META.other;
  const Icon = meta.icon;
  return <Icon size={size} strokeWidth={1.7} style={{ color: meta.color }} />;
}

export function fileKindColor(kind: VaultFileKind): string {
  return (KIND_META[kind] ?? KIND_META.other).color;
}
