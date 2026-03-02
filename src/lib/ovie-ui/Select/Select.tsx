import React, { useState, useRef, useEffect, useCallback, useId } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";
import type { SelectProps, SelectOption } from "./types";

const triggerVariants = cva(
  "flex w-full items-center justify-between rounded-md border bg-background text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
      hasError: {
        true: "border-destructive focus-visible:ring-destructive",
        false: "border-input",
      },
    },
    defaultVariants: { size: "md", hasError: false },
  }
);

export function Select({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = "Select…",
  label,
  error,
  helperText,
  disabled,
  size = "md",
  className,
  id: externalId,
}: SelectProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const listboxId = `${id}-listbox`;
  const errorId = `${id}-error`;

  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((o) => o.value === currentValue);
  const enabledOptions = options.filter((o) => !o.disabled);

  const selectOption = useCallback(
    (opt: SelectOption) => {
      if (opt.disabled) return;
      if (!isControlled) setInternalValue(opt.value);
      onChange?.(opt.value);
      setOpen(false);
    },
    [isControlled, onChange]
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Scroll focused item into view
  useEffect(() => {
    if (open && focusedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[role="option"]');
      items[focusedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex, open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (open && focusedIndex >= 0) {
          selectOption(options[focusedIndex]);
        } else {
          setOpen(true);
          setFocusedIndex(options.findIndex((o) => o.value === currentValue));
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((i) => {
            let next = i + 1;
            while (next < options.length && options[next].disabled) next++;
            return next < options.length ? next : i;
          });
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (open) {
          setFocusedIndex((i) => {
            let prev = i - 1;
            while (prev >= 0 && options[prev].disabled) prev--;
            return prev >= 0 ? prev : i;
          });
        }
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  };

  return (
    <div className={cn("space-y-1.5", className)} ref={containerRef}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <button
        type="button"
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        disabled={disabled}
        className={cn(triggerVariants({ size, hasError: !!error }))}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
      >
        <span className={cn(!selectedOption && "text-muted-foreground")}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-[var(--radix-select-trigger-width)] overflow-auto rounded-md border border-border bg-popover py-1 shadow-lg"
          style={{ width: containerRef.current?.offsetWidth }}
        >
          {options.map((opt, i) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === currentValue}
              aria-disabled={opt.disabled}
              className={cn(
                "flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-popover-foreground transition-colors",
                opt.disabled && "cursor-not-allowed opacity-50",
                !opt.disabled && "hover:bg-accent hover:text-accent-foreground",
                i === focusedIndex && "bg-accent text-accent-foreground",
                opt.value === currentValue && "font-medium"
              )}
              onClick={() => selectOption(opt)}
              onMouseEnter={() => !opt.disabled && setFocusedIndex(i)}
            >
              <Check
                className={cn(
                  "h-4 w-4 shrink-0",
                  opt.value === currentValue ? "opacity-100" : "opacity-0"
                )}
              />
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p id={errorId} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
