import type { ReactNode, HTMLAttributes } from "react";

export interface DropdownContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  itemCount: number;
  registerItem: () => number;
}

export interface DropdownProps {
  children: ReactNode;
}

export interface DropdownTriggerProps {
  children: ReactNode;
}

export interface DropdownContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  align?: "start" | "end";
}

export interface DropdownItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
}
