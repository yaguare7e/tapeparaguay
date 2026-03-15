import { cn } from "@/lib/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ImgHTMLAttributes } from "react";

const cardVariants = cva("rounded-xl overflow-hidden transition-shadow duration-200", {
  variants: {
    variant: {
      default: "bg-white shadow-sm border border-gray-100",
      elevated: "bg-white shadow-lg hover:shadow-xl",
      segment:
        "bg-white shadow-sm border border-gray-100 border-t-4 border-t-[var(--segment-primary)]",
      glass:
        "bg-white/30 backdrop-blur-md border border-white/20 shadow-lg",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

/* -------------------------------------------------------------------------- */

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-6 pt-6 pb-2", className)}
        {...props}
      />
    );
  }
);
CardHeader.displayName = "CardHeader";

/* -------------------------------------------------------------------------- */

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("px-6 py-4", className)} {...props} />
    );
  }
);
CardBody.displayName = "CardBody";

/* -------------------------------------------------------------------------- */

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-6 pb-6 pt-2 flex items-center gap-3", className)}
        {...props}
      />
    );
  }
);
CardFooter.displayName = "CardFooter";

/* -------------------------------------------------------------------------- */

export interface CardImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Aspect ratio class – defaults to "aspect-video" */
  aspect?: "video" | "square" | "portrait";
}

const aspectMap: Record<string, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
};

const CardImage = forwardRef<HTMLImageElement, CardImageProps>(
  ({ className, aspect = "video", alt = "", ...props }, ref) => {
    return (
      <img
        ref={ref}
        alt={alt}
        className={cn(
          "w-full object-cover",
          aspectMap[aspect],
          className
        )}
        {...props}
      />
    );
  }
);
CardImage.displayName = "CardImage";

export { Card, cardVariants, CardHeader, CardBody, CardFooter, CardImage };
