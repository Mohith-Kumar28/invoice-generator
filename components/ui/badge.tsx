"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-transparent",
        secondary: "bg-muted text-foreground border-transparent",
        outline: "text-foreground border-border",
        success: "bg-emerald-600/15 text-emerald-700 border-emerald-600/25 dark:text-emerald-400",
        warning: "bg-amber-500/15 text-amber-700 border-amber-500/25 dark:text-amber-400",
        destructive: "bg-destructive/15 text-destructive border-destructive/25",
        info: "bg-sky-500/15 text-sky-700 border-sky-500/25 dark:text-sky-400",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
);

function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

