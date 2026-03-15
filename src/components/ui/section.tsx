import { cn } from "@/lib/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

const sectionVariants = cva("w-full", {
  variants: {
    padded: {
      true: "py-16 md:py-24",
      false: "",
    },
    background: {
      default: "bg-white",
      segment: "bg-[var(--segment-bg,theme(colors.gray.50))]",
      dark: "bg-gray-900 text-white",
      gradient:
        "bg-gradient-to-br from-[var(--segment-primary)] to-[var(--segment-secondary)] text-white",
      surface: "bg-[var(--segment-surface,theme(colors.gray.50))]",
      transparent: "bg-transparent",
    },
  },
  defaultVariants: { padded: true, background: "default" },
});

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

function Section({
  className,
  padded,
  background,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(sectionVariants({ padded, background, className }))}
      {...props}
    />
  );
}

export { Section, sectionVariants };
