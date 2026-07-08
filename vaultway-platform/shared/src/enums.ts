/**
 * String enums mirrored from the Prisma schema so the frontend and backend
 * agree on the exact same values. Keep in sync with backend/prisma/schema.prisma.
 */

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum PermissionLevel {
  VIEW = 'VIEW',
  DOWNLOAD = 'DOWNLOAD',
  EDIT = 'EDIT',
  OWNER = 'OWNER',
}

export enum ShareType {
  EMAIL = 'EMAIL',
  USERNAME = 'USERNAME',
  PUBLIC_LINK = 'PUBLIC_LINK',
}

export enum ActivityAction {
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  UPLOAD = 'UPLOAD',
  DOWNLOAD = 'DOWNLOAD',
  DELETE = 'DELETE',
  RESTORE = 'RESTORE',
  RENAME = 'RENAME',
  MOVE = 'MOVE',
  COPY = 'COPY',
  SHARE = 'SHARE',
  PERMISSION_CHANGED = 'PERMISSION_CHANGED',
  FOLDER_CREATED = 'FOLDER_CREATED',
  FOLDER_DELETED = 'FOLDER_DELETED',
}

export enum NotificationType {
  FILE_UPLOADED = 'FILE_UPLOADED',
  FILE_SHARED = 'FILE_SHARED',
  PERMISSION_UPDATED = 'PERMISSION_UPDATED',
  DOWNLOAD_COMPLETED = 'DOWNLOAD_COMPLETED',
  STORAGE_ALMOST_FULL = 'STORAGE_ALMOST_FULL',
}
