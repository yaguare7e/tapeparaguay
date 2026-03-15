import { cn } from "@/lib/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, useId } from "react";

/* --------------------------------- Input ---------------------------------- */

const inputVariants = cva(
  "w-full text-gray-900 placeholder:text-gray-400 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "rounded-lg border border-gray-300 bg-white px-4 py-2.5 focus:border-[var(--segment-primary)] focus:ring-2 focus:ring-[var(--segment-primary)]/20",
        underline:
          "border-b-2 border-gray-300 bg-transparent px-1 py-2.5 focus:border-[var(--segment-primary)]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, label, error, helperText, id: idProp, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            inputVariants({ variant }),
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

/* -------------------------------- Textarea -------------------------------- */

const textareaVariants = cva(
  "w-full text-gray-900 placeholder:text-gray-400 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none resize-y min-h-[100px]",
  {
    variants: {
      variant: {
        default:
          "rounded-lg border border-gray-300 bg-white px-4 py-2.5 focus:border-[var(--segment-primary)] focus:ring-2 focus:ring-[var(--segment-primary)]/20",
        underline:
          "border-b-2 border-gray-300 bg-transparent px-1 py-2.5 focus:border-[var(--segment-primary)]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, label, error, helperText, id: idProp, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            textareaVariants({ variant }),
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Input, inputVariants, Textarea, textareaVariants };
