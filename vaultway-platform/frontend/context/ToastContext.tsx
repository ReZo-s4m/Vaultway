"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";

import { createId } from "@/lib/vault-utils";
import styles from "./toast.module.css";

type ToastVariant = "success" | "error" | "info";

interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const ICONS: Record<ToastVariant, typeof Info> = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
    const timer = timers.current[id];
    if (timer) {
      clearTimeout(timer);
      delete timers.current[id];
    }
  }, []);

  const toast = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      const id = createId("toast");
      setItems((current) => [...current.slice(-3), { id, message, variant }]);
      timers.current[id] = setTimeout(() => dismiss(id), 4200);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.viewport} role="status" aria-live="polite">
        {items.map((item) => {
          const Icon = ICONS[item.variant];
          return (
            <div
              key={item.id}
              className={`${styles.toast} ${styles[item.variant]}`}
            >
              <Icon size={18} className={styles.icon} />
              <span className={styles.message}>{item.message}</span>
              <button
                type="button"
                className={styles.close}
                onClick={() => dismiss(item.id)}
                aria-label="Dismiss notification"
              >
                <X size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    // A no-op fallback keeps components resilient if used outside the provider.
    return { toast: () => undefined };
  }
  return context;
}
