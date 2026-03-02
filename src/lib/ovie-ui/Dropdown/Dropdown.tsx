import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { cn } from "@/lib/utils";
import type {
  DropdownContextValue,
  DropdownProps,
  DropdownTriggerProps,
  DropdownContentProps,
  DropdownItemProps,
} from "./types";

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("Dropdown compounds must be within <Dropdown>");
  return ctx;
}

function DropdownRoot({ children }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemCountRef = useRef(0);

  const onOpenChange = useCallback((next: boolean) => {
    setOpen(next);
    if (!next) {
      setActiveIndex(-1);
      itemCountRef.current = 0;
    } else {
      itemCountRef.current = 0;
    }
  }, []);

  const registerItem = useCallback(() => {
    const idx = itemCountRef.current;
    itemCountRef.current += 1;
    return idx;
  }, []);

  return (
    <DropdownContext.Provider
      value={{ open, onOpenChange, activeIndex, setActiveIndex, itemCount: itemCountRef.current, registerItem }}
    >
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
}

function Trigger({ children }: DropdownTriggerProps) {
  const { open, onOpenChange } = useDropdownContext();
  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={() => onOpenChange(!open)}
      className="cursor-pointer"
    >
      {children}
    </button>
  );
}

function Content({ children, className, align = "start", ...props }: DropdownContentProps) {
  const { open, onOpenChange, setActiveIndex } = useDropdownContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.closest(".relative")?.contains(e.target as Node)) {
        onOpenChange(false);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex(-1); // handled by items
        const items = ref.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])');
        if (items?.length) {
          const current = Array.from(items).findIndex((el) => el === document.activeElement);
          const next = current < items.length - 1 ? current + 1 : 0;
          items[next].focus();
        }
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const items = ref.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])');
        if (items?.length) {
          const current = Array.from(items).findIndex((el) => el === document.activeElement);
          const prev = current > 0 ? current - 1 : items.length - 1;
          items[prev].focus();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onOpenChange, setActiveIndex]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="menu"
      className={cn(
        "absolute z-50 mt-1 min-w-[10rem] rounded-md border border-border bg-popover p-1 shadow-lg animate-slide-down",
        align === "end" ? "right-0" : "left-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function Item({ children, onSelect, disabled, className, ...props }: DropdownItemProps) {
  const { onOpenChange } = useDropdownContext();

  const handleClick = () => {
    if (disabled) return;
    onSelect?.();
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm text-popover-foreground outline-none transition-colors",
        "hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger,
  Content,
  Item,
});
