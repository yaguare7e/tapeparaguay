"use client";

import { cn } from "@/lib/utils/cn";
import {
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  /* -- sync open state with native dialog -- */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      previouslyFocused.current = document.activeElement as HTMLElement;
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
      previouslyFocused.current?.focus();
    }
  }, [isOpen]);

  /* -- handle native close event (escape key) -- */
  const handleDialogClose = useCallback(() => {
    if (isOpen) onClose();
  }, [isOpen, onClose]);

  /* -- close on backdrop click -- */
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <dialog
      ref={dialogRef}
      onClose={handleDialogClose}
      onClick={handleBackdropClick}
      className={cn(
        /* backdrop */
        "backdrop:bg-black/50 backdrop:backdrop-blur-sm",
        /* dialog reset & styling */
        "m-auto w-[calc(100%-2rem)] rounded-2xl border-none bg-white p-0 shadow-2xl",
        /* open/close animation */
        "opacity-0 scale-95 transition-[opacity,transform] duration-200 ease-out",
        "open:opacity-100 open:scale-100",
        sizeClasses[size],
        className
      )}
      aria-modal="true"
    >
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--segment-primary)]"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Body */}
      <div className="px-6 py-5">{children}</div>

      {/* Close button if no title */}
      {!title && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--segment-primary)]"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </dialog>
  );
}

export { Modal };
