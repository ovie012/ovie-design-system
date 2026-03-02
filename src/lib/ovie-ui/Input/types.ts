import type { InputHTMLAttributes, ReactNode } from "react";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  error?: string;
  label?: string;
  helperText?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}
