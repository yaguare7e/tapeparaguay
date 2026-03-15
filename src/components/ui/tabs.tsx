"use client";

import { cn } from "@/lib/utils/cn";
import { useCallback, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export interface TabItem {
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  /** Index of the tab that should be open by default (0-based) */
  defaultTab?: number;
  className?: string;
}

function Tabs({ tabs, defaultTab = 0, className }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultTab);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = useCallback(
    (index: number) => {
      const clamped = ((index % tabs.length) + tabs.length) % tabs.length;
      tabRefs.current[clamped]?.focus();
      setActiveIndex(clamped);
    },
    [tabs.length]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          focusTab(activeIndex + 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          focusTab(activeIndex - 1);
          break;
        case "Home":
          e.preventDefault();
          focusTab(0);
          break;
        case "End":
          e.preventDefault();
          focusTab(tabs.length - 1);
          break;
      }
    },
    [activeIndex, focusTab, tabs.length]
  );

  return (
    <div className={cn("w-full", className)}>
      {/* Tab list */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex border-b border-gray-200"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          const tabId = `${baseId}-tab-${index}`;
          const panelId = `${baseId}-panel-${index}`;

          return (
            <button
              key={index}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--segment-primary)]",
                isActive
                  ? "text-[var(--segment-primary)]"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab.label}
              {/* Active indicator */}
              {isActive && (
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--segment-primary)]"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex;
        const tabId = `${baseId}-tab-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div
            key={index}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            tabIndex={0}
            hidden={!isActive}
            className="py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--segment-primary)] rounded"
          >
            {isActive && tab.content}
          </div>
        );
      })}
    </div>
  );
}

export { Tabs };
