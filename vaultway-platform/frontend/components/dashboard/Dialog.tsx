"use client";

import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import overlay from "./overlay.module.css";

interface DialogProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function Dialog({
  open,
  title,
  description,
  onClose,
  children,
  footer,
  size = "md",
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={overlay.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className={`${overlay.panel} ${overlay[size]}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
      >
        <div className={overlay.header}>
          <div>
            <h2 className={overlay.title}>{title}</h2>
            {description && <p className={overlay.description}>{description}</p>}
          </div>
          <button
            type="button"
            className={overlay.iconClose}
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={19} />
          </button>
        </div>

        <div className={overlay.body}>{children}</div>

        {footer && <div className={overlay.footer}>{footer}</div>}
      </div>
    </div>
  );
}

interface TextPromptDialogProps {
  open: boolean;
  title: string;
  label: string;
  confirmLabel: string;
  initialValue?: string;
  placeholder?: string;
  onCancel: () => void;
  onSubmit: (value: string) => void;
}

export function TextPromptDialog({
  open,
  title,
  label,
  confirmLabel,
  initialValue = "",
  placeholder,
  onCancel,
  onSubmit,
}: TextPromptDialogProps) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setValue(initialValue);
      // Focus and select after the dialog mounts.
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [open, initialValue]);

  const submit = () => {
    if (!value.trim()) return;
    onSubmit(value.trim());
  };

  return (
    <Dialog
      open={open}
      title={title}
      onClose={onCancel}
      size="sm"
      footer={
        <>
          <button
            type="button"
            className={overlay.ghostButton}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className={overlay.primaryButton}
            onClick={submit}
            disabled={!value.trim()}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <label className={overlay.fieldLabel} htmlFor="text-prompt-input">
        {label}
      </label>
      <input
        id="text-prompt-input"
        ref={inputRef}
        className={overlay.textInput}
        value={value}
        placeholder={placeholder}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            submit();
          }
        }}
      />
    </Dialog>
  );
}

export { overlay as dialogStyles };
