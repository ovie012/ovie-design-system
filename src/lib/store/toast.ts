import { create } from "zustand";
import type { ToastData, ToastVariant } from "@/lib/ovie-ui/Toast/types";

let toastCount = 0;

interface ToastStore {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, "id">) => string;
  dismissToast: (id: string) => void;
  dismissAll: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = `toast-${++toastCount}`;
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));
    return id;
  },
  dismissToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
  dismissAll: () => set({ toasts: [] }),
}));

type ToastOptions = Omit<ToastData, "id" | "variant">;

export function toast(options: ToastOptions & { variant?: ToastVariant }) {
  return useToastStore.getState().addToast(options);
}

toast.success = (options: ToastOptions) =>
  useToastStore.getState().addToast({ ...options, variant: "success" });

toast.error = (options: ToastOptions) =>
  useToastStore.getState().addToast({ ...options, variant: "error" });

toast.warning = (options: ToastOptions) =>
  useToastStore.getState().addToast({ ...options, variant: "warning" });

toast.info = (options: ToastOptions) =>
  useToastStore.getState().addToast({ ...options, variant: "info" });
