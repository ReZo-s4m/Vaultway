/**
 * Client-side vault model. These shapes deliberately mirror the shared
 * `FileDTO`, `FolderDTO`, `ShareLinkDTO`, and `ActivityLogDTO` contracts in
 * `@vaultway/shared`, so the localStorage-backed store used for the demo can be
 * swapped for real API calls (Phase 3+) with minimal changes to the UI.
 */

export type VaultFileKind =
  | "image"
  | "video"
  | "audio"
  | "pdf"
  | "doc"
  | "sheet"
  | "archive"
  | "code"
  | "other";

export interface VaultFile {
  id: string;
  name: string;
  mimeType: string;
  sizeBytes: number;
  folderId: string | null;
  starred: boolean;
  trashed: boolean;
  createdAt: string;
  updatedAt: string;
  trashedAt: string | null;
  downloadCount: number;
  kind: VaultFileKind;
  /**
   * Small files are kept as a base64 data URL so preview and download work
   * entirely in the browser for the demo. Larger files store metadata only
   * (`dataUrl === null`) to stay within the localStorage quota.
   */
  dataUrl: string | null;
}

export interface VaultFolder {
  id: string;
  name: string;
  parentId: string | null;
  starred: boolean;
  trashed: boolean;
  createdAt: string;
  updatedAt: string;
  trashedAt: string | null;
}

export type SharePermission = "VIEW" | "DOWNLOAD";

export interface VaultShare {
  id: string;
  fileId: string;
  fileName: string;
  token: string;
  permission: SharePermission;
  password: string | null;
  allowDownload: boolean;
  expiresAt: string | null;
  maxViews: number | null;
  viewCount: number;
  downloadCount: number;
  revoked: boolean;
  createdAt: string;
  lastAccessedAt: string | null;
}

export type VaultActivityAction =
  | "UPLOAD"
  | "DOWNLOAD"
  | "RENAME"
  | "DELETE"
  | "RESTORE"
  | "FOLDER_CREATED"
  | "SHARE"
  | "SHARE_REVOKED"
  | "STAR"
  | "UNSTAR";

export interface VaultActivity {
  id: string;
  action: VaultActivityAction;
  targetName: string;
  targetId: string | null;
  createdAt: string;
}

export interface VaultState {
  files: VaultFile[];
  folders: VaultFolder[];
  shares: VaultShare[];
  activity: VaultActivity[];
}

export const emptyVaultState = (): VaultState => ({
  files: [],
  folders: [],
  shares: [],
  activity: [],
});
