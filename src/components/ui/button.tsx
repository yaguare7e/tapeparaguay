import { cn } from "@/lib/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--segment-primary)] text-white hover:opacity-90 shadow-md hover:shadow-lg",
        secondary:
          "bg-[var(--segment-secondary)] text-white hover:opacity-90",
        outline:
          "border-2 border-[var(--segment-primary)] text-[var(--segment-primary)] hover:bg-[var(--segment-primary)] hover:text-white",
        ghost:
          "hover:bg-[var(--segment-primary)]/10 text-[var(--segment-primary)]",
        accent:
          "bg-[var(--segment-accent)] text-white hover:opacity-90",
        white: "bg-white text-gray-900 hover:bg-gray-50 shadow-md",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        xl: "h-16 px-10 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
