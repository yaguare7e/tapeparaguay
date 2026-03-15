import { cn } from "@/lib/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    variant: {
      default: "max-w-7xl",
      narrow: "max-w-4xl",
      wide: "max-w-screen-2xl",
      full: "max-w-full",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

function Container({ className, variant, ...props }: ContainerProps) {
  return (
    <div
      className={cn(containerVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Container, containerVariants };
