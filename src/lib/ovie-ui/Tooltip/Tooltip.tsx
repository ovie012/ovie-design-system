import React, { useState, useRef, useCallback, useId } from "react";
import { cn } from "@/lib/utils";
import type { TooltipProps } from "./types";

const positionClasses = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = "top",
  delayOpen = 200,
  delayClose = 100,
}) => {
  const [visible, setVisible] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout>>();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const tooltipId = useId();

  const show = useCallback(() => {
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => setVisible(true), delayOpen);
  }, [delayOpen]);

  const hide = useCallback(() => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setVisible(false), delayClose);
  }, [delayClose]);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span aria-describedby={visible ? tooltipId : undefined}>{children}</span>
      {visible && (
        <span
          id={tooltipId}
          role="tooltip"
          className={cn(
            "absolute z-50 max-w-xs rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md animate-fade-in whitespace-nowrap pointer-events-none",
            positionClasses[position]
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
};
