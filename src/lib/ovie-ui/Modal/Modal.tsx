import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  useId,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  ModalContextValue,
  ModalProps,
  ModalTriggerProps,
  ModalContentProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
} from "./types";

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("Modal compound components must be used within <Modal>");
  return ctx;
}

function ModalRoot({ children, open: controlledOpen, onOpenChange, defaultOpen = false }: ModalProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const titleId = useId();

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  return (
    <ModalContext.Provider value={{ open, onOpenChange: handleOpenChange, titleId }}>
      {children}
    </ModalContext.Provider>
  );
}

function Trigger({ children }: ModalTriggerProps) {
  const { onOpenChange } = useModalContext();
  return (
    <span onClick={() => onOpenChange(true)} className="cursor-pointer">
      {children}
    </span>
  );
}

function Content({ children, className, ...props }: ModalContentProps) {
  const { open, onOpenChange, titleId } = useModalContext();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handleKey);

    // Focus trap: focus first focusable element
    const focusable = contentRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable?.length) focusable[0].focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-foreground/20 animate-fade-in"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative z-50 w-full max-w-lg rounded-lg border border-border bg-card p-0 shadow-xl animate-scale-in",
          className
        )}
        {...props}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 rounded-sm p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

function Header({ children, className, ...props }: ModalHeaderProps) {
  const { titleId } = useModalContext();
  return (
    <div className={cn("border-b border-border px-6 py-4", className)} {...props}>
      <h2 id={titleId} className="text-lg font-semibold text-card-foreground">
        {children}
      </h2>
    </div>
  );
}

function Body({ children, className, ...props }: ModalBodyProps) {
  return (
    <div className={cn("px-6 py-4 text-sm text-card-foreground", className)} {...props}>
      {children}
    </div>
  );
}

function Footer({ children, className, ...props }: ModalFooterProps) {
  return (
    <div className={cn("flex items-center justify-end gap-2 border-t border-border px-6 py-4", className)} {...props}>
      {children}
    </div>
  );
}

export const Modal = Object.assign(ModalRoot, {
  Trigger,
  Content,
  Header,
  Body,
  Footer,
});
