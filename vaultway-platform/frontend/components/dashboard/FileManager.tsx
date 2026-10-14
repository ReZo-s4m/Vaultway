"use client";

import { useMemo, useRef, useState } from "react";
import {
  ChevronRight,
  Download,
  FolderPlus,
  Grid3X3,
  Heart,
  List,
  MoreVertical,
  Pencil,
  Search,
  Share2,
  Trash2,
  Upload,
} from "lucide-react";

import dash from "./dashboard.module.css";
import fm from "./filemanager.module.css";
import { FileGlyph } from "./FileGlyph";
import { ShareDialog } from "./ShareDialog";
import { FilePreview } from "./FilePreview";
import { TextPromptDialog } from "./Dialog";
import { useVault } from "@/context/VaultContext";
import { useToast } from "@/context/ToastContext";
import type { VaultFile, VaultFolder } from "@/lib/vault-types";
import { downloadDataUrl, formatBytes, relativeTime } from "@/lib/vault-utils";

type SortKey = "modified" | "name" | "size";

type RenameTarget =
  | { kind: "file"; id: string; name: string }
  | { kind: "folder"; id: string; name: string }
  | null;

export function FileManager() {
  const {
    files,
    folders,
    toggleStar,
    moveToTrash,
    createFolder,
    renameItem,
    uploadFiles,
    registerDownload,
    query,
    setQuery,
  } = useVault();
  const { toast } = useToast();

  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortKey, setSortKey] = useState<SortKey>("modified");
  const [selected, setSelected] = useState<string[]>([]);
  const [menuKey, setMenuKey] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [newFolderOpen, setNewFolderOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState<RenameTarget>(null);
  const [shareFile, setShareFile] = useState<VaultFile | null>(null);
  const [previewFile, setPreviewFile] = useState<VaultFile | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchActive = query.trim().length > 0;

  const clearSelection = () => setSelected([]);

  // Breadcrumb chain from the root down to the current folder.
  const breadcrumb = useMemo(() => {
    const chain: VaultFolder[] = [];
    let cursor = currentFolderId;
    while (cursor) {
      const folder = folders.find((item) => item.id === cursor);
      if (!folder) break;
      chain.unshift(folder);
      cursor = folder.parentId;
    }
    return chain;
  }, [currentFolderId, folders]);

  const visibleFolders = useMemo(() => {
    const list = folders.filter((folder) => !folder.trashed);
    if (searchActive) {
      const term = query.trim().toLowerCase();
      return list.filter((folder) => folder.name.toLowerCase().includes(term));
    }
    return list.filter((folder) => folder.parentId === currentFolderId);
  }, [folders, searchActive, query, currentFolderId]);

  const visibleFiles = useMemo(() => {
    const list = files.filter((file) => !file.trashed);
    const scoped = searchActive
      ? list.filter((file) =>
          file.name.toLowerCase().includes(query.trim().toLowerCase()),
        )
      : list.filter((file) => file.folderId === currentFolderId);

    const sorted = [...scoped].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "size") return b.sizeBytes - a.sizeBytes;
      return (
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    });
    return sorted;
  }, [files, searchActive, query, currentFolderId, sortKey]);

  const isEmpty = visibleFolders.length === 0 && visibleFiles.length === 0;

  const openFolder = (folderId: string) => {
    if (searchActive) setQuery("");
    setCurrentFolderId(folderId);
    clearSelection();
  };

  const handleDownload = (file: VaultFile) => {
    if (!file.dataUrl) {
      toast(
        "Original bytes aren't stored for large files in this demo.",
        "info",
      );
      return;
    }
    downloadDataUrl(file.dataUrl, file.name);
    registerDownload(file.id);
    toast(`Downloading “${file.name}”`, "success");
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      void uploadFiles(event.target.files, currentFolderId);
    }
    event.target.value = "";
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files?.length) {
      void uploadFiles(event.dataTransfer.files, currentFolderId);
    }
  };

  const toggleSelect = (key: string) => {
    setSelected((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key],
    );
  };

  const selectionFiles = selected
    .filter((key) => key.startsWith("file:"))
    .map((key) => key.slice(5));

  const bulkTrash = () => {
    selected.forEach((key) => {
      const [kind, id] = key.split(":");
      moveToTrash(kind as "file" | "folder", id);
    });
    clearSelection();
  };

  const bulkStar = () => {
    selected.forEach((key) => {
      const [kind, id] = key.split(":");
      toggleStar(kind as "file" | "folder", id);
    });
    clearSelection();
  };

  const bulkDownload = () => {
    const downloadable = files.filter(
      (file) => selectionFiles.includes(file.id) && file.dataUrl,
    );
    downloadable.forEach((file) => handleDownload(file));
    if (!downloadable.length) {
      toast("Selected files have no stored contents to download.", "info");
    }
    clearSelection();
  };

  return (
    <section className={dash.pageSection}>
      <div className={dash.pageTop}>
        <div>
          <p className={dash.pageEyebrow}>Vaultway workspace</p>
          <h1>Cloud drive</h1>
        </div>
        <div className={dash.pageActions}>
          <button
            type="button"
            className={dash.primaryAction}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={18} />
            Upload
          </button>
          <button
            type="button"
            className={dash.secondaryAction}
            onClick={() => setNewFolderOpen(true)}
          >
            <FolderPlus size={18} />
            New folder
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        hidden
        onChange={handleFileInput}
      />

      {/* Toolbar: breadcrumb / search context + view controls */}
      <div className={fm.toolbar}>
        <div className={fm.toolbarLeft}>
          {searchActive ? (
            <span className={fm.searchHeader}>
              <Search size={16} />
              Results for “{query.trim()}”
            </span>
          ) : (
            <nav className={fm.breadcrumb} aria-label="Folder path">
              <button
                type="button"
                className={fm.crumb}
                onClick={() => {
                  setCurrentFolderId(null);
                  clearSelection();
                }}
              >
                My files
              </button>
              {breadcrumb.map((folder) => (
                <span key={folder.id} className={fm.crumbGroup}>
                  <ChevronRight size={15} className={fm.crumbSep} />
                  <button
                    type="button"
                    className={fm.crumb}
                    onClick={() => openFolder(folder.id)}
                  >
                    {folder.name}
                  </button>
                </span>
              ))}
            </nav>
          )}
        </div>

        <div className={fm.toolbarRight}>
          <label className={fm.srOnly} htmlFor="fm-sort">
            Sort files
          </label>
          <select
            id="fm-sort"
            className={fm.sortSelect}
            value={sortKey}
            onChange={(event) => setSortKey(event.target.value as SortKey)}
          >
            <option value="modified">Last modified</option>
            <option value="name">Name</option>
            <option value="size">Size</option>
          </select>

          <div className={dash.viewControls}>
            <button
              type="button"
              className={viewMode === "grid" ? dash.viewControlActive : ""}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              type="button"
              className={viewMode === "list" ? dash.viewControlActive : ""}
              onClick={() => setViewMode("list")}
              aria-label="List view"
              aria-pressed={viewMode === "list"}
            >
              <List size={19} />
            </button>
          </div>
        </div>
      </div>

      {/* Selection action bar */}
      {selected.length > 0 && (
        <div className={fm.selectionBar}>
          <span className={fm.selectionCount}>{selected.length} selected</span>
          <div className={fm.selectionActions}>
            <button type="button" onClick={bulkDownload}>
              <Download size={16} />
              Download
            </button>
            <button type="button" onClick={bulkStar}>
              <Heart size={16} />
              Favourite
            </button>
            <button type="button" className={fm.selectionDanger} onClick={bulkTrash}>
              <Trash2 size={16} />
              Delete
            </button>
            <button type="button" onClick={clearSelection}>
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Body */}
      <div
        className={`${fm.dropRegion} ${dragging ? fm.dropRegionActive : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          if (!dragging) setDragging(true);
        }}
        onDragLeave={(event) => {
          if (event.currentTarget === event.target) setDragging(false);
        }}
        onDrop={onDrop}
      >
        {dragging && (
          <div className={fm.dragOverlay}>
            <Upload size={30} />
            <span>Drop files to upload</span>
          </div>
        )}

        {isEmpty ? (
          <EmptyDrive
            searchActive={searchActive}
            onUpload={() => fileInputRef.current?.click()}
            onNewFolder={() => setNewFolderOpen(true)}
          />
        ) : viewMode === "grid" ? (
          <div className={fm.grid}>
            {visibleFolders.map((folder) => (
              <FolderCard
                key={folder.id}
                folder={folder}
                selected={selected.includes(`folder:${folder.id}`)}
                menuOpen={menuKey === `folder:${folder.id}`}
                fileCount={
                  files.filter(
                    (file) => file.folderId === folder.id && !file.trashed,
                  ).length
                }
                onOpen={() => openFolder(folder.id)}
                onToggleSelect={() => toggleSelect(`folder:${folder.id}`)}
                onMenu={() =>
                  setMenuKey((key) =>
                    key === `folder:${folder.id}` ? null : `folder:${folder.id}`,
                  )
                }
                onCloseMenu={() => setMenuKey(null)}
                onStar={() => toggleStar("folder", folder.id)}
                onRename={() =>
                  setRenameTarget({
                    kind: "folder",
                    id: folder.id,
                    name: folder.name,
                  })
                }
                onTrash={() => moveToTrash("folder", folder.id)}
              />
            ))}
            {visibleFiles.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                selected={selected.includes(`file:${file.id}`)}
                menuOpen={menuKey === `file:${file.id}`}
                onOpen={() => setPreviewFile(file)}
                onToggleSelect={() => toggleSelect(`file:${file.id}`)}
                onMenu={() =>
                  setMenuKey((key) =>
                    key === `file:${file.id}` ? null : `file:${file.id}`,
                  )
                }
                onCloseMenu={() => setMenuKey(null)}
                onStar={() => toggleStar("file", file.id)}
                onShare={() => setShareFile(file)}
                onRename={() =>
                  setRenameTarget({ kind: "file", id: file.id, name: file.name })
                }
                onDownload={() => handleDownload(file)}
                onTrash={() => moveToTrash("file", file.id)}
              />
            ))}
          </div>
        ) : (
          <div className={fm.list}>
            <div className={`${fm.listRow} ${fm.listHead}`}>
              <span>Name</span>
              <span>Modified</span>
              <span>Size</span>
              <span aria-hidden="true" />
            </div>
            {visibleFolders.map((folder) => (
              <FolderRow
                key={folder.id}
                folder={folder}
                onOpen={() => openFolder(folder.id)}
                onStar={() => toggleStar("folder", folder.id)}
                onRename={() =>
                  setRenameTarget({
                    kind: "folder",
                    id: folder.id,
                    name: folder.name,
                  })
                }
                onTrash={() => moveToTrash("folder", folder.id)}
                menuOpen={menuKey === `folder:${folder.id}`}
                onMenu={() =>
                  setMenuKey((key) =>
                    key === `folder:${folder.id}` ? null : `folder:${folder.id}`,
                  )
                }
                onCloseMenu={() => setMenuKey(null)}
              />
            ))}
            {visibleFiles.map((file) => (
              <FileRow
                key={file.id}
                file={file}
                onOpen={() => setPreviewFile(file)}
                onStar={() => toggleStar("file", file.id)}
                onShare={() => setShareFile(file)}
                onRename={() =>
                  setRenameTarget({ kind: "file", id: file.id, name: file.name })
                }
                onDownload={() => handleDownload(file)}
                onTrash={() => moveToTrash("file", file.id)}
                menuOpen={menuKey === `file:${file.id}`}
                onMenu={() =>
                  setMenuKey((key) =>
                    key === `file:${file.id}` ? null : `file:${file.id}`,
                  )
                }
                onCloseMenu={() => setMenuKey(null)}
              />
            ))}
          </div>
        )}
      </div>

      <TextPromptDialog
        open={newFolderOpen}
        title="New folder"
        label="Folder name"
        confirmLabel="Create"
        placeholder="Untitled folder"
        onCancel={() => setNewFolderOpen(false)}
        onSubmit={(value) => {
          createFolder(value, currentFolderId);
          setNewFolderOpen(false);
        }}
      />

      <TextPromptDialog
        open={renameTarget !== null}
        title="Rename"
        label="New name"
        confirmLabel="Rename"
        initialValue={renameTarget?.name ?? ""}
        onCancel={() => setRenameTarget(null)}
        onSubmit={(value) => {
          if (renameTarget) renameItem(renameTarget.kind, renameTarget.id, value);
          setRenameTarget(null);
        }}
      />

      <ShareDialog
        open={shareFile !== null}
        file={shareFile}
        onClose={() => setShareFile(null)}
      />

      <FilePreview
        open={previewFile !== null}
        file={previewFile}
        onClose={() => setPreviewFile(null)}
        onDownload={handleDownload}
      />
    </section>
  );
}

/* ---------- Empty state ---------- */

function EmptyDrive({
  searchActive,
  onUpload,
  onNewFolder,
}: {
  searchActive: boolean;
  onUpload: () => void;
  onNewFolder: () => void;
}) {
  if (searchActive) {
    return (
      <div className={fm.emptyWrap}>
        <span className={fm.emptyGlyph}>
          <Search size={40} strokeWidth={1.3} />
        </span>
        <h2>No matches</h2>
        <p>No files or folders match your search.</p>
      </div>
    );
  }
  return (
    <div className={fm.emptyWrap}>
      <span className={fm.emptyGlyph}>
        <Upload size={40} strokeWidth={1.3} />
      </span>
      <h2>Drag and drop files here</h2>
      <p>Your private workspace is ready for its first upload.</p>
      <div className={fm.emptyActions}>
        <button type="button" className={dash.primaryAction} onClick={onUpload}>
          <Upload size={18} />
          Upload files
        </button>
        <button
          type="button"
          className={dash.secondaryAction}
          onClick={onNewFolder}
        >
          <FolderPlus size={18} />
          Create folder
        </button>
      </div>
    </div>
  );
}

/* ---------- Context menu ---------- */

function ItemMenu({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <>
      <button
        type="button"
        className={fm.menuScrim}
        aria-label="Close menu"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
      />
      <div className={fm.menu} role="menu">
        {children}
      </div>
    </>
  );
}

/* ---------- Grid cards ---------- */

function FolderCard({
  folder,
  fileCount,
  selected,
  menuOpen,
  onOpen,
  onToggleSelect,
  onMenu,
  onCloseMenu,
  onStar,
  onRename,
  onTrash,
}: {
  folder: VaultFolder;
  fileCount: number;
  selected: boolean;
  menuOpen: boolean;
  onOpen: () => void;
  onToggleSelect: () => void;
  onMenu: () => void;
  onCloseMenu: () => void;
  onStar: () => void;
  onRename: () => void;
  onTrash: () => void;
}) {
  return (
    <div
      className={`${fm.card} ${fm.folderCard} ${selected ? fm.cardSelected : ""}`}
      onDoubleClick={onOpen}
    >
      <div className={fm.cardTopRow}>
        <input
          type="checkbox"
          className={fm.checkbox}
          checked={selected}
          onChange={onToggleSelect}
          aria-label={`Select ${folder.name}`}
        />
        <button type="button" className={fm.moreBtn} onClick={onMenu} aria-label="Folder actions">
          <MoreVertical size={17} />
        </button>
        <ItemMenu open={menuOpen} onClose={onCloseMenu}>
          <button type="button" className={fm.menuItem} onClick={() => { onCloseMenu(); onOpen(); }}>
            Open
          </button>
          <button type="button" className={fm.menuItem} onClick={() => { onCloseMenu(); onStar(); }}>
            <Heart size={15} />
            {folder.starred ? "Remove favourite" : "Add to favourites"}
          </button>
          <button type="button" className={fm.menuItem} onClick={() => { onCloseMenu(); onRename(); }}>
            <Pencil size={15} />
            Rename
          </button>
          <button type="button" className={`${fm.menuItem} ${fm.menuDanger}`} onClick={() => { onCloseMenu(); onTrash(); }}>
            <Trash2 size={15} />
            Move to trash
          </button>
        </ItemMenu>
      </div>

      <button type="button" className={fm.cardOpen} onClick={onOpen}>
        <span className={fm.folderIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        </span>
        <span className={fm.cardName} title={folder.name}>{folder.name}</span>
        <span className={fm.cardMeta}>
          {folder.starred && <Heart size={12} className={fm.starInline} />}
          {fileCount} item{fileCount === 1 ? "" : "s"}
        </span>
      </button>
    </div>
  );
}

function FileCard({
  file,
  selected,
  menuOpen,
  onOpen,
  onToggleSelect,
  onMenu,
  onCloseMenu,
  onStar,
  onShare,
  onRename,
  onDownload,
  onTrash,
}: {
  file: VaultFile;
  selected: boolean;
  menuOpen: boolean;
  onOpen: () => void;
  onToggleSelect: () => void;
  onMenu: () => void;
  onCloseMenu: () => void;
  onStar: () => void;
  onShare: () => void;
  onRename: () => void;
  onDownload: () => void;
  onTrash: () => void;
}) {
  return (
    <div
      className={`${fm.card} ${selected ? fm.cardSelected : ""}`}
      onDoubleClick={onOpen}
    >
      <div className={fm.cardTopRow}>
        <input
          type="checkbox"
          className={fm.checkbox}
          checked={selected}
          onChange={onToggleSelect}
          aria-label={`Select ${file.name}`}
        />
        <button type="button" className={fm.moreBtn} onClick={onMenu} aria-label="File actions">
          <MoreVertical size={17} />
        </button>
        <ItemMenu open={menuOpen} onClose={onCloseMenu}>
          <button type="button" className={fm.menuItem} onClick={() => { onCloseMenu(); onOpen(); }}>
            Preview
          </button>
          <button type="button" className={fm.menuItem} onClick={() => { onCloseMenu(); onShare(); }}>
            <Share2 size={15} />
            Share link
          </button>
          <button type="button" className={fm.menuItem} onClick={() => { onCloseMenu(); onDownload(); }}>
            <Download size={15} />
            Download
          </button>
          <button type="button" className={fm.menuItem} onClick={() => { onCloseMenu(); onStar(); }}>
            <Heart size={15} />
            {file.starred ? "Remove favourite" : "Add to favourites"}
          </button>
          <button type="button" className={fm.menuItem} onClick={() => { onCloseMenu(); onRename(); }}>
            <Pencil size={15} />
            Rename
          </button>
          <button type="button" className={`${fm.menuItem} ${fm.menuDanger}`} onClick={() => { onCloseMenu(); onTrash(); }}>
            <Trash2 size={15} />
            Move to trash
          </button>
        </ItemMenu>
      </div>

      <button type="button" className={fm.cardOpen} onClick={onOpen}>
        <span className={fm.cardThumb}>
          {file.kind === "image" && file.dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={file.dataUrl} alt="" />
          ) : (
            <FileGlyph kind={file.kind} size={34} />
          )}
        </span>
        <span className={fm.cardName} title={file.name}>{file.name}</span>
        <span className={fm.cardMeta}>
          {file.starred && <Heart size={12} className={fm.starInline} />}
          {formatBytes(file.sizeBytes)}
        </span>
      </button>
    </div>
  );
}

/* ---------- List rows ---------- */

function FolderRow({
  folder,
  onOpen,
  onStar,
  onRename,
  onTrash,
  menuOpen,
  onMenu,
  onCloseMenu,
}: {
  folder: VaultFolder;
  onOpen: () => void;
  onStar: () => void;
  onRename: () => void;
  onTrash: () => void;
  menuOpen: boolean;
  onMenu: () => void;
  onCloseMenu: () => void;
}) {
  return (
    <div className={fm.listRow}>
      <button type="button" className={fm.listName} onClick={onOpen}>
        <span className={fm.rowFolderIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        </span>
        <span className={fm.rowName} title={folder.name}>{folder.name}</span>
        {folder.starred && <Heart size={13} className={fm.starInline} />}
      </button>
      <span className={fm.listMuted}>{relativeTime(folder.updatedAt)}</span>
      <span className={fm.listMuted}>—</span>
      <span className={fm.rowActionsCell}>
        <button type="button" className={fm.moreBtn} onClick={onMenu} aria-label="Folder actions">
          <MoreVertical size={17} />
        </button>
        <ItemMenu open={menuOpen} onClose={onCloseMenu}>
          <button type="button" className={fm.menuItem} onClick={() => { onCloseMenu(); onOpen(); }}>Open</button>
          <button type="button" className={fm.menuItem} onClick={() => { onCloseMenu(); onStar(); }}>
            <Heart size={15} />{folder.starred ? "Remove favourite" : "Add to favourites"}
          </button>
          <button type="button" className={fm.menuItem} onClick={() => { onCloseMenu(); onRename(); }}>
            <Pencil size={15} />Rename
          </button>
          <button type="button" className={`${fm.menuItem} ${fm.menuDanger}`} onClick={() => { onCloseMenu(); onTrash(); }}>
            <Trash2 size={15} />Move to trash
          </button>
        </ItemMenu>
      </span>
    </div>
  );
}

function FileRow({
  file,
  onOpen,
  onStar,
  onShare,
  onRename,
  onDownload,
  onTrash,
  menuOpen,
  onMenu,
  onCloseMenu,
}: {
  file: VaultFile;
  onOpen: () => void;
  onStar: () => void;
  onShare: () => void;
  onRename: () => void;
  onDownload: () => void;
  onTrash: () => void;
  menuOpen: boolean;
  onMenu: () => void;
  onCloseMenu: () => void;
}) {
  return (
    <div className={fm.listRow}>
      <button type="button" className={fm.listName} onClick={onOpen}>
        <span className={fm.rowGlyph}>
          <FileGlyph kind={file.kind} size={20} />
        </span>
        <span className={fm.rowName} title={file.name}>{file.name}</span>
        {file.starred && <Heart size={13} className={fm.starInline} />}
      </button>
      <span className={fm.listMuted}>{relativeTime(file.updatedAt)}</span>
      <span className={fm.listMuted}>{formatBytes(file.sizeBytes)}</span>
      <span className={fm.rowActionsCell}>
        <button type="button" className={fm.moreBtn} onClick={onMenu} aria-label="File actions">
          <MoreVertical size={17} />
        </button>
        <ItemMenu open={menuOpen} onClose={onCloseMenu}>
          <button type="button" className={fm.menuItem} onClick={() => { onCloseMenu(); onOpen(); }}>Preview</button>
          <button type="button" className={fm.menuItem} onClick={() => { onCloseMenu(); onShare(); }}>
            <Share2 size={15} />Share link
          </button>
          <button type="button" className={fm.menuItem} onClick={() => { onCloseMenu(); onDownload(); }}>
            <Download size={15} />Download
          </button>
          <button type="button" className={fm.menuItem} onClick={() => { onCloseMenu(); onStar(); }}>
            <Heart size={15} />{file.starred ? "Remove favourite" : "Add to favourites"}
          </button>
          <button type="button" className={fm.menuItem} onClick={() => { onCloseMenu(); onRename(); }}>
            <Pencil size={15} />Rename
          </button>
          <button type="button" className={`${fm.menuItem} ${fm.menuDanger}`} onClick={() => { onCloseMenu(); onTrash(); }}>
            <Trash2 size={15} />Move to trash
          </button>
        </ItemMenu>
      </span>
    </div>
  );
}
