"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Link2 } from "lucide-react";

import { Dialog, dialogStyles as overlay } from "./Dialog";
import { useVault } from "@/context/VaultContext";
import { useToast } from "@/context/ToastContext";
import type { SharePermission, VaultFile } from "@/lib/vault-types";

interface ShareDialogProps {
  open: boolean;
  file: VaultFile | null;
  onClose: () => void;
}

const EXPIRY_OPTIONS = [
  { label: "Never expires", hours: 0 },
  { label: "1 hour", hours: 1 },
  { label: "24 hours", hours: 24 },
  { label: "7 days", hours: 24 * 7 },
  { label: "30 days", hours: 24 * 30 },
];

function expiryIso(hours: number): string | null {
  if (!hours) return null;
  return new Date(Date.now() + hours * 3600 * 1000).toISOString();
}

export function ShareDialog({ open, file, onClose }: ShareDialogProps) {
  const { createShare } = useVault();
  const { toast } = useToast();

  const [permission, setPermission] = useState<SharePermission>("VIEW");
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const [expiryHours, setExpiryHours] = useState(0);
  const [limitViews, setLimitViews] = useState(false);
  const [maxViews, setMaxViews] = useState(25);
  const [createdLink, setCreatedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setPermission("VIEW");
      setPasswordEnabled(false);
      setPassword("");
      setExpiryHours(0);
      setLimitViews(false);
      setMaxViews(25);
      setCreatedLink(null);
      setCopied(false);
    }
  }, [open, file?.id]);

  if (!file) return null;

  const handleCreate = () => {
    const share = createShare({
      fileId: file.id,
      permission,
      password: passwordEnabled && password.trim() ? password.trim() : null,
      expiresAt: expiryIso(expiryHours),
      maxViews: limitViews ? Math.max(1, maxViews) : null,
    });
    if (!share) return;
    const origin =
      typeof window !== "undefined" ? window.location.origin : "https://vaultway.app";
    setCreatedLink(`${origin}/s/${share.token}`);
  };

  const handleCopy = async () => {
    if (!createdLink) return;
    try {
      await navigator.clipboard.writeText(createdLink);
      setCopied(true);
      toast("Link copied to clipboard", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast("Couldn't access the clipboard", "error");
    }
  };

  return (
    <Dialog
      open={open}
      title={createdLink ? "Secure link ready" : "Create secure link"}
      description={
        createdLink
          ? undefined
          : `Share “${file.name}” with a controlled, revocable link.`
      }
      onClose={onClose}
      footer={
        createdLink ? (
          <button
            type="button"
            className={overlay.primaryButton}
            onClick={onClose}
          >
            Done
          </button>
        ) : (
          <>
            <button
              type="button"
              className={overlay.ghostButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className={overlay.primaryButton}
              onClick={handleCreate}
            >
              <Link2 size={16} />
              Create link
            </button>
          </>
        )
      }
    >
      {createdLink ? (
        <>
          <div className={overlay.linkResult}>
            <code>{createdLink}</code>
            <button
              type="button"
              className={overlay.copyButton}
              onClick={handleCopy}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className={overlay.hint}>
            Anyone with this link can{" "}
            {permission === "DOWNLOAD" ? "view and download" : "view"} the file
            {passwordEnabled && password.trim() ? ", after entering the password" : ""}
            {expiryHours ? ", until it expires" : ""}. You can revoke access any
            time from <strong>Shared items → Links</strong>.
          </p>
        </>
      ) : (
        <>
          <div className={overlay.field}>
            <label className={overlay.fieldLabel} htmlFor="share-permission">
              Permission
            </label>
            <select
              id="share-permission"
              className={overlay.selectInput}
              value={permission}
              onChange={(event) =>
                setPermission(event.target.value as SharePermission)
              }
            >
              <option value="VIEW">View only</option>
              <option value="DOWNLOAD">View &amp; download</option>
            </select>
          </div>

          <div className={overlay.field}>
            <label className={overlay.fieldLabel} htmlFor="share-expiry">
              Link expiry
            </label>
            <select
              id="share-expiry"
              className={overlay.selectInput}
              value={expiryHours}
              onChange={(event) => setExpiryHours(Number(event.target.value))}
            >
              {EXPIRY_OPTIONS.map((option) => (
                <option key={option.label} value={option.hours}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: 8 }}>
            <div className={overlay.toggleRow}>
              <div className={overlay.toggleText}>
                <strong>Password protection</strong>
                <span>Require a password to open the link</span>
              </div>
              <button
                type="button"
                className={overlay.switch}
                data-on={passwordEnabled}
                onClick={() => setPasswordEnabled((value) => !value)}
                aria-pressed={passwordEnabled}
                aria-label="Toggle password protection"
              />
            </div>
            {passwordEnabled && (
              <input
                className={overlay.textInput}
                type="text"
                placeholder="Set a password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                style={{ marginTop: 4 }}
              />
            )}

            <div className={overlay.toggleRow}>
              <div className={overlay.toggleText}>
                <strong>Limit total views</strong>
                <span>Link stops working after a number of opens</span>
              </div>
              <button
                type="button"
                className={overlay.switch}
                data-on={limitViews}
                onClick={() => setLimitViews((value) => !value)}
                aria-pressed={limitViews}
                aria-label="Toggle view limit"
              />
            </div>
            {limitViews && (
              <input
                className={overlay.textInput}
                type="number"
                min={1}
                value={maxViews}
                onChange={(event) => setMaxViews(Number(event.target.value))}
                style={{ marginTop: 4 }}
              />
            )}
          </div>
        </>
      )}
    </Dialog>
  );
}
