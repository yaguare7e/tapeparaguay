import { cn } from "@/lib/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

const skeletonVariants = cva("animate-pulse bg-gray-200 rounded", {
  variants: {
    variant: {
      text: "h-4 w-full rounded",
      title: "h-7 w-3/4 rounded",
      image: "w-full rounded-lg",
      card: "w-full rounded-xl",
      circle: "rounded-full",
    },
    /** Only applies to the "image" variant */
    aspect: {
      square: "aspect-square",
      video: "aspect-video",
      portrait: "aspect-[3/4]",
    },
  },
  compoundVariants: [
    { variant: "card", className: "h-64" },
    { variant: "circle", className: "h-12 w-12" },
  ],
  defaultVariants: { variant: "text" },
});

export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /** Number of repeated skeleton lines (only for text/title) */
  lines?: number;
}

function Skeleton({
  className,
  variant,
  aspect,
  lines = 1,
  ...props
}: SkeletonProps) {
  if ((variant === "text" || variant === "title") && lines > 1) {
    return (
      <div className="flex flex-col gap-2" {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              skeletonVariants({ variant }),
              i === lines - 1 && "w-2/3",
              className
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        skeletonVariants({
          variant,
          aspect: variant === "image" ? (aspect ?? "video") : undefined,
          className,
        })
      )}
      {...props}
    />
  );
}

export { Skeleton, skeletonVariants };
