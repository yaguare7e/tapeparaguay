"use client";

import { cn } from "@/lib/utils/cn";
import { useCallback, useId, useState, type ReactNode } from "react";

export interface AccordionItem {
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple panels to be open at the same time */
  allowMultiple?: boolean;
  className?: string;
}

function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());
  const baseId = useId();

  const toggle = useCallback(
    (index: number) => {
      setOpenIndices((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          if (!allowMultiple) {
            next.clear();
          }
          next.add(index);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  return (
    <div
      className={cn("divide-y divide-gray-200 rounded-xl border border-gray-200 overflow-hidden", className)}
    >
      {items.map((item, index) => {
        const isOpen = openIndices.has(index);
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={index}>
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className={cn(
                  "flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-gray-900 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--segment-primary)]",
                  isOpen && "bg-gray-50"
                )}
              >
                <span className="flex items-center gap-3">
                  {isOpen && (
                    <span
                      className="h-full w-0.5 self-stretch rounded-full bg-[var(--segment-primary)]"
                      aria-hidden="true"
                    />
                  )}
                  {item.title}
                </span>
                {/* Chevron icon */}
                <svg
                  className={cn(
                    "h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-4 pt-1 text-gray-600">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Accordion };
