"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { SEGMENTS, type Segment } from "@/lib/constants/segments";

interface ThemeContextValue {
  segment: Segment | null;
}

const ThemeContext = createContext<ThemeContextValue>({ segment: null });

export function useSegment() {
  return useContext(ThemeContext).segment;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const segment = useMemo(() => {
    // Extract segment from path: /en/adventure/... → "adventure"
    const parts = pathname.split("/").filter(Boolean);
    // parts[0] = locale, parts[1] = potential segment
    const potentialSegment = parts[1];
    return SEGMENTS.find((s) => s === potentialSegment) ?? null;
  }, [pathname]);

  return (
    <ThemeContext.Provider value={{ segment }}>
      <div data-segment={segment ?? undefined} className="min-h-screen">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
