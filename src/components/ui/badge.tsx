import { cn } from "@/lib/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

const badgeVariants = cva(
  "inline-flex items-center font-medium rounded-full transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--segment-primary)] text-white",
        secondary:
          "bg-[var(--segment-secondary)] text-white",
        outline:
          "border border-[var(--segment-primary)] text-[var(--segment-primary)] bg-transparent",
        success: "bg-emerald-100 text-emerald-800",
        warning: "bg-amber-100 text-amber-800",
        danger: "bg-red-100 text-red-800",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
