import type {
  ActivityAction,
  NotificationType,
  PermissionLevel,
  ShareType,
  UserRole,
} from './enums';

/** Standard API envelope returned by every backend endpoint. */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code?: string;
    details?: unknown;
  };
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  name: string | null;
  role: UserRole;
  avatarUrl: string | null;
}

export interface AuthTokens {
  accessToken: string;
  /** Normally delivered as an httpOnly cookie; included for non-browser clients. */
  refreshToken?: string;
}

/** Claims embedded in the signed JWT. */
export interface JwtPayload {
  sub: string; // user id
  role: UserRole;
  type: 'access' | 'refresh';
}

export interface FileDTO {
  id: string;
  name: string;
  originalName: string;
  mimeType: string;
  sizeBytes: string; // BigInt serialized as string
  folderId: string | null;
  isFavorite: boolean;
  isDeleted: boolean;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface FolderDTO {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ShareLinkDTO {
  id: string;
  fileId: string;
  shareType: ShareType;
  permission: PermissionLevel;
  linkToken: string | null;
  allowDownload: boolean;
  hasPassword: boolean;
  expiresAt: string | null;
  maxViews: number | null;
  viewCount: number;
  isRevoked: boolean;
  createdAt: string;
}

export interface ActivityLogDTO {
  id: string;
  action: ActivityAction;
  fileId: string | null;
  ipAddress: string | null;
  device: string | null;
  browser: string | null;
  createdAt: string;
}

export interface NotificationDTO {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface StorageUsageDTO {
  usedBytes: string;
  quotaBytes: string;
  totalFiles: number;
  totalFolders: number;
}
