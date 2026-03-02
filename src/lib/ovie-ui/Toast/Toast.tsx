import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useToastStore } from "@/lib/store/toast";
import type { ToastData, ToastProps } from "./types";

const DEFAULT_DURATION = 5000;

const toastVariants = cva(
  "pointer-events-auto relative flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground",
        success: "border-primary/30 bg-card text-card-foreground",
        error: "border-destructive/30 bg-card text-card-foreground",
        warning: "border-primary/40 bg-card text-card-foreground",
        info: "border-ring/30 bg-card text-card-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconMap = {
  default: null,
  success: <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />,
  error: <AlertCircle className="h-5 w-5 text-destructive shrink-0" />,
  warning: <AlertTriangle className="h-5 w-5 text-primary shrink-0" />,
  info: <Info className="h-5 w-5 text-muted-foreground shrink-0" />,
};

function ToastItem({ toast: t, onDismiss }: ToastProps) {
  const [exiting, setExiting] = useState(false);

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => onDismiss(t.id), 200);
  }, [t.id, onDismiss]);

  useEffect(() => {
    const duration = t.duration ?? DEFAULT_DURATION;
    if (duration <= 0) return;
    const timer = setTimeout(dismiss, duration);
    return () => clearTimeout(timer);
  }, [t.duration, dismiss]);

  const variant = t.variant ?? "default";
  const icon = iconMap[variant];

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        toastVariants({ variant }),
        "animate-in slide-in-from-right-full fade-in duration-200",
        exiting && "animate-out slide-out-to-right-full fade-out duration-200"
      )}
    >
      {icon}
      <div className="flex-1 min-w-0">
        {t.title && <p className="text-sm font-semibold">{t.title}</p>}
        {t.description && (
          <p className="text-sm text-muted-foreground mt-0.5">{t.description}</p>
        )}
        {t.action && <div className="mt-2">{t.action}</div>}
      </div>
      <button
        onClick={dismiss}
        className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts, dismissToast } = useToastStore();

  if (toasts.length === 0) return null;

  return createPortal(
    <div
      className="fixed bottom-4 right-4 z-[100] flex flex-col-reverse gap-2 w-full max-w-sm pointer-events-none"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={dismissToast} />
      ))}
    </div>,
    document.body
  );
}
