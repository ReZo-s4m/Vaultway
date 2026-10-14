"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/context/ToastContext";
import {
  createId,
  detectFileKind,
  formatBytes,
  readFileAsDataUrl,
} from "@/lib/vault-utils";
import {
  emptyVaultState,
  type SharePermission,
  type VaultActivity,
  type VaultActivityAction,
  type VaultFile,
  type VaultFolder,
  type VaultShare,
  type VaultState,
} from "@/lib/vault-types";

export const STORAGE_QUOTA_BYTES = 5 * 1024 * 1024 * 1024; // 5 GB

const PER_FILE_DATAURL_CAP = 700 * 1024; // keep bytes for files <= 700 KB
const TOTAL_DATAURL_CAP = 3.5 * 1024 * 1024; // total base64 payload kept in localStorage
const ACTIVITY_LIMIT = 60;

type ItemKind = "file" | "folder";

interface CreateShareInput {
  fileId: string;
  permission: SharePermission;
  password: string | null;
  expiresAt: string | null;
  maxViews: number | null;
}

interface VaultContextValue {
  ready: boolean;
  files: VaultFile[];
  folders: VaultFolder[];
  shares: VaultShare[];
  activity: VaultActivity[];
  usedBytes: number;
  quotaBytes: number;
  query: string;
  setQuery: (value: string) => void;
  uploadFiles: (input: FileList | File[], folderId: string | null) => Promise<void>;
  createFolder: (name: string, parentId: string | null) => VaultFolder | null;
  renameItem: (kind: ItemKind, id: string, name: string) => void;
  toggleStar: (kind: ItemKind, id: string) => void;
  moveToTrash: (kind: ItemKind, id: string) => void;
  restoreFromTrash: (kind: ItemKind, id: string) => void;
  deleteForever: (kind: ItemKind, id: string) => void;
  emptyTrash: () => void;
  registerDownload: (fileId: string) => void;
  createShare: (input: CreateShareInput) => VaultShare | null;
  revokeShare: (shareId: string) => void;
  resetVault: () => void;
}

const VaultContext = createContext<VaultContextValue | undefined>(undefined);

function storageKey(userId: string | undefined) {
  return `vw_vault_${userId ?? "guest"}`;
}

/** Collect a folder id plus every nested descendant folder id. */
function descendantFolderIds(folders: VaultFolder[], rootId: string): string[] {
  const result = [rootId];
  const queue = [rootId];
  while (queue.length) {
    const current = queue.shift() as string;
    for (const folder of folders) {
      if (folder.parentId === current && !result.includes(folder.id)) {
        result.push(folder.id);
        queue.push(folder.id);
      }
    }
  }
  return result;
}

function makeActivity(
  action: VaultActivityAction,
  targetName: string,
  targetId: string | null,
): VaultActivity {
  return {
    id: createId("act"),
    action,
    targetName,
    targetId,
    createdAt: new Date().toISOString(),
  };
}

function withActivity(
  state: VaultState,
  entries: VaultActivity[],
): VaultActivity[] {
  return [...entries, ...state.activity].slice(0, ACTIVITY_LIMIT);
}

export function VaultProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { toast } = useToast();

  const [state, setState] = useState<VaultState>(emptyVaultState);
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");

  const stateRef = useRef(state);
  const quotaWarned = useRef(false);
  const key = storageKey(user?.id);

  // Keep a synchronous mirror so async handlers can read current data.
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Hydrate from localStorage whenever the active user changes.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<VaultState>;
        setState({
          files: parsed.files ?? [],
          folders: parsed.folders ?? [],
          shares: parsed.shares ?? [],
          activity: parsed.activity ?? [],
        });
      } else {
        setState(emptyVaultState());
      }
    } catch {
      setState(emptyVaultState());
    } finally {
      setReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Persist on every change once hydrated. Degrades gracefully if the quota
  // is exceeded by dropping the (optional) inline file bytes and retrying.
  useEffect(() => {
    if (!ready || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      try {
        const lightweight: VaultState = {
          ...state,
          files: state.files.map((file) => ({ ...file, dataUrl: null })),
        };
        window.localStorage.setItem(key, JSON.stringify(lightweight));
        if (!quotaWarned.current) {
          quotaWarned.current = true;
          toast(
            "Storage preview limit reached — file previews for this session may be unavailable.",
            "info",
          );
        }
      } catch {
        /* give up quietly; in-memory state still works for the session */
      }
    }
  }, [state, ready, key, toast]);

  const usedBytes = useMemo(
    () =>
      state.files
        .filter((file) => !file.trashed)
        .reduce((total, file) => total + file.sizeBytes, 0),
    [state.files],
  );

  const uploadFiles = useCallback(
    async (input: FileList | File[], folderId: string | null) => {
      const incoming = Array.from(input);
      if (!incoming.length) return;

      const snapshot = stateRef.current;
      let runningUsed = snapshot.files
        .filter((file) => !file.trashed)
        .reduce((total, file) => total + file.sizeBytes, 0);
      let runningDataUrl = snapshot.files.reduce(
        (total, file) => total + (file.dataUrl ? file.dataUrl.length : 0),
        0,
      );

      const accepted: VaultFile[] = [];
      const rejected: string[] = [];

      for (const file of incoming) {
        if (runningUsed + file.size > STORAGE_QUOTA_BYTES) {
          rejected.push(file.name);
          continue;
        }

        let dataUrl: string | null = null;
        if (
          file.size <= PER_FILE_DATAURL_CAP &&
          runningDataUrl + file.size * 1.4 < TOTAL_DATAURL_CAP
        ) {
          try {
            dataUrl = await readFileAsDataUrl(file);
            runningDataUrl += dataUrl.length;
          } catch {
            dataUrl = null;
          }
        }

        const now = new Date().toISOString();
        accepted.push({
          id: createId("file"),
          name: file.name || "Untitled",
          mimeType: file.type || "application/octet-stream",
          sizeBytes: file.size,
          folderId,
          starred: false,
          trashed: false,
          createdAt: now,
          updatedAt: now,
          trashedAt: null,
          downloadCount: 0,
          kind: detectFileKind(file.name, file.type || ""),
          dataUrl,
        });
        runningUsed += file.size;
      }

      if (accepted.length) {
        setState((prev) => ({
          ...prev,
          files: [...accepted, ...prev.files],
          activity: withActivity(
            prev,
            accepted.map((file) => makeActivity("UPLOAD", file.name, file.id)),
          ),
        }));
        toast(
          accepted.length === 1
            ? `Uploaded “${accepted[0].name}”`
            : `Uploaded ${accepted.length} files`,
          "success",
        );
      }

      if (rejected.length) {
        toast(
          `Not enough space for ${rejected.length} file${
            rejected.length === 1 ? "" : "s"
          } (${formatBytes(STORAGE_QUOTA_BYTES)} limit).`,
          "error",
        );
      }
    },
    [toast],
  );

  const createFolder = useCallback(
    (name: string, parentId: string | null) => {
      const trimmed = name.trim();
      if (!trimmed) return null;
      const now = new Date().toISOString();
      const folder: VaultFolder = {
        id: createId("folder"),
        name: trimmed,
        parentId,
        starred: false,
        trashed: false,
        createdAt: now,
        updatedAt: now,
        trashedAt: null,
      };
      setState((prev) => ({
        ...prev,
        folders: [folder, ...prev.folders],
        activity: withActivity(prev, [
          makeActivity("FOLDER_CREATED", trimmed, folder.id),
        ]),
      }));
      toast(`Folder “${trimmed}” created`, "success");
      return folder;
    },
    [toast],
  );

  const renameItem = useCallback(
    (kind: ItemKind, id: string, name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      const now = new Date().toISOString();
      setState((prev) => {
        if (kind === "file") {
          return {
            ...prev,
            files: prev.files.map((file) =>
              file.id === id ? { ...file, name: trimmed, updatedAt: now } : file,
            ),
            activity: withActivity(prev, [makeActivity("RENAME", trimmed, id)]),
          };
        }
        return {
          ...prev,
          folders: prev.folders.map((folder) =>
            folder.id === id
              ? { ...folder, name: trimmed, updatedAt: now }
              : folder,
          ),
          activity: withActivity(prev, [makeActivity("RENAME", trimmed, id)]),
        };
      });
      toast("Renamed", "success");
    },
    [toast],
  );

  const toggleStar = useCallback((kind: ItemKind, id: string) => {
    setState((prev) => {
      if (kind === "file") {
        const target = prev.files.find((file) => file.id === id);
        const nextStarred = !target?.starred;
        return {
          ...prev,
          files: prev.files.map((file) =>
            file.id === id ? { ...file, starred: nextStarred } : file,
          ),
          activity: withActivity(prev, [
            makeActivity(
              nextStarred ? "STAR" : "UNSTAR",
              target?.name ?? "File",
              id,
            ),
          ]),
        };
      }
      const target = prev.folders.find((folder) => folder.id === id);
      const nextStarred = !target?.starred;
      return {
        ...prev,
        folders: prev.folders.map((folder) =>
          folder.id === id ? { ...folder, starred: nextStarred } : folder,
        ),
        activity: withActivity(prev, [
          makeActivity(
            nextStarred ? "STAR" : "UNSTAR",
            target?.name ?? "Folder",
            id,
          ),
        ]),
      };
    });
  }, []);

  const moveToTrash = useCallback(
    (kind: ItemKind, id: string) => {
      const now = new Date().toISOString();
      setState((prev) => {
        if (kind === "file") {
          const target = prev.files.find((file) => file.id === id);
          return {
            ...prev,
            files: prev.files.map((file) =>
              file.id === id
                ? { ...file, trashed: true, trashedAt: now }
                : file,
            ),
            activity: withActivity(prev, [
              makeActivity("DELETE", target?.name ?? "File", id),
            ]),
          };
        }
        const target = prev.folders.find((folder) => folder.id === id);
        const ids = descendantFolderIds(prev.folders, id);
        return {
          ...prev,
          folders: prev.folders.map((folder) =>
            ids.includes(folder.id)
              ? { ...folder, trashed: true, trashedAt: now }
              : folder,
          ),
          files: prev.files.map((file) =>
            file.folderId && ids.includes(file.folderId)
              ? { ...file, trashed: true, trashedAt: now }
              : file,
          ),
          activity: withActivity(prev, [
            makeActivity("DELETE", target?.name ?? "Folder", id),
          ]),
        };
      });
      toast("Moved to trash", "info");
    },
    [toast],
  );

  const restoreFromTrash = useCallback(
    (kind: ItemKind, id: string) => {
      setState((prev) => {
        if (kind === "file") {
          const target = prev.files.find((file) => file.id === id);
          return {
            ...prev,
            files: prev.files.map((file) =>
              file.id === id
                ? { ...file, trashed: false, trashedAt: null }
                : file,
            ),
            activity: withActivity(prev, [
              makeActivity("RESTORE", target?.name ?? "File", id),
            ]),
          };
        }
        const target = prev.folders.find((folder) => folder.id === id);
        const ids = descendantFolderIds(prev.folders, id);
        return {
          ...prev,
          folders: prev.folders.map((folder) =>
            ids.includes(folder.id)
              ? { ...folder, trashed: false, trashedAt: null }
              : folder,
          ),
          files: prev.files.map((file) =>
            file.folderId && ids.includes(file.folderId)
              ? { ...file, trashed: false, trashedAt: null }
              : file,
          ),
          activity: withActivity(prev, [
            makeActivity("RESTORE", target?.name ?? "Folder", id),
          ]),
        };
      });
      toast("Restored", "success");
    },
    [toast],
  );

  const deleteForever = useCallback(
    (kind: ItemKind, id: string) => {
      setState((prev) => {
        if (kind === "file") {
          return {
            ...prev,
            files: prev.files.filter((file) => file.id !== id),
            shares: prev.shares.filter((share) => share.fileId !== id),
          };
        }
        const ids = descendantFolderIds(prev.folders, id);
        const removedFileIds = prev.files
          .filter((file) => file.folderId && ids.includes(file.folderId))
          .map((file) => file.id);
        return {
          ...prev,
          folders: prev.folders.filter((folder) => !ids.includes(folder.id)),
          files: prev.files.filter(
            (file) => !(file.folderId && ids.includes(file.folderId)),
          ),
          shares: prev.shares.filter(
            (share) => !removedFileIds.includes(share.fileId),
          ),
        };
      });
      toast("Deleted permanently", "info");
    },
    [toast],
  );

  const emptyTrash = useCallback(() => {
    setState((prev) => {
      const keptFileIds = prev.files
        .filter((file) => !file.trashed)
        .map((file) => file.id);
      return {
        ...prev,
        files: prev.files.filter((file) => !file.trashed),
        folders: prev.folders.filter((folder) => !folder.trashed),
        shares: prev.shares.filter((share) => keptFileIds.includes(share.fileId)),
      };
    });
    toast("Trash emptied", "success");
  }, [toast]);

  const registerDownload = useCallback((fileId: string) => {
    setState((prev) => {
      const target = prev.files.find((file) => file.id === fileId);
      if (!target) return prev;
      return {
        ...prev,
        files: prev.files.map((file) =>
          file.id === fileId
            ? { ...file, downloadCount: file.downloadCount + 1 }
            : file,
        ),
        activity: withActivity(prev, [
          makeActivity("DOWNLOAD", target.name, fileId),
        ]),
      };
    });
  }, []);

  const createShare = useCallback(
    (input: CreateShareInput) => {
      const file = stateRef.current.files.find((f) => f.id === input.fileId);
      if (!file) return null;
      const share: VaultShare = {
        id: createId("share"),
        fileId: file.id,
        fileName: file.name,
        token: createId("lnk").replace(/^lnk_/, ""),
        permission: input.permission,
        password: input.password,
        allowDownload: input.permission === "DOWNLOAD",
        expiresAt: input.expiresAt,
        maxViews: input.maxViews,
        viewCount: 0,
        downloadCount: 0,
        revoked: false,
        createdAt: new Date().toISOString(),
        lastAccessedAt: null,
      };
      setState((prev) => ({
        ...prev,
        shares: [share, ...prev.shares],
        activity: withActivity(prev, [
          makeActivity("SHARE", file.name, file.id),
        ]),
      }));
      toast("Secure link created", "success");
      return share;
    },
    [toast],
  );

  const revokeShare = useCallback(
    (shareId: string) => {
      setState((prev) => {
        const target = prev.shares.find((share) => share.id === shareId);
        return {
          ...prev,
          shares: prev.shares.map((share) =>
            share.id === shareId ? { ...share, revoked: true } : share,
          ),
          activity: withActivity(prev, [
            makeActivity("SHARE_REVOKED", target?.fileName ?? "File", null),
          ]),
        };
      });
      toast("Access revoked", "info");
    },
    [toast],
  );

  const resetVault = useCallback(() => {
    setState(emptyVaultState());
    toast("Vault cleared", "info");
  }, [toast]);

  const value = useMemo<VaultContextValue>(
    () => ({
      ready,
      files: state.files,
      folders: state.folders,
      shares: state.shares,
      activity: state.activity,
      usedBytes,
      quotaBytes: STORAGE_QUOTA_BYTES,
      query,
      setQuery,
      uploadFiles,
      createFolder,
      renameItem,
      toggleStar,
      moveToTrash,
      restoreFromTrash,
      deleteForever,
      emptyTrash,
      registerDownload,
      createShare,
      revokeShare,
      resetVault,
    }),
    [
      ready,
      state.files,
      state.folders,
      state.shares,
      state.activity,
      usedBytes,
      query,
      uploadFiles,
      createFolder,
      renameItem,
      toggleStar,
      moveToTrash,
      restoreFromTrash,
      deleteForever,
      emptyTrash,
      registerDownload,
      createShare,
      revokeShare,
      resetVault,
    ],
  );

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}

export function useVault(): VaultContextValue {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error("useVault must be used within a VaultProvider");
  }
  return context;
}
