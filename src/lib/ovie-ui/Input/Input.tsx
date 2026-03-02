import React, { forwardRef, useId } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { InputProps } from "./types";

const inputVariants = cva(
  "w-full rounded-md border bg-background text-foreground transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
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
    defaultVariants: {
      size: "md",
      hasError: false,
    },
  }
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size, error, label, helperText, iconLeft, iconRight, className, id: externalId, ...props }, ref) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          {iconLeft && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {iconLeft}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              inputVariants({ size, hasError: !!error }),
              iconLeft && "pl-9",
              iconRight && "pr-9",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            {...props}
          />
          {iconRight && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {iconRight}
            </span>
          )}
        </div>
        {error && (
          <p id={errorId} className="text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
