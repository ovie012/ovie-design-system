import type { ReactNode } from "react";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: ReactNode;
}

export interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}
