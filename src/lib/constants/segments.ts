export const SEGMENTS = ["adventure", "culture", "invest", "leisure"] as const;
export type Segment = (typeof SEGMENTS)[number];

export interface SegmentConfig {
  slug: Segment;
  icon: string;
  gradient: string;
  defaultHeroImage: string;
}

export const SEGMENT_CONFIG: Record<Segment, SegmentConfig> = {
  adventure: {
    slug: "adventure",
    icon: "🏔️",
    gradient: "from-emerald-900 to-amber-800",
    defaultHeroImage: "/images/hero-adventure.webp",
  },
  culture: {
    slug: "culture",
    icon: "🏛️",
    gradient: "from-rose-900 to-amber-700",
    defaultHeroImage: "/images/hero-culture.webp",
  },
  invest: {
    slug: "invest",
    icon: "📊",
    gradient: "from-slate-900 to-blue-900",
    defaultHeroImage: "/images/hero-invest.webp",
  },
  leisure: {
    slug: "leisure",
    icon: "🏖️",
    gradient: "from-rose-500 to-teal-500",
    defaultHeroImage: "/images/hero-leisure.webp",
  },
};

export const SEGMENT_LABELS: Record<Segment, string> = {
  adventure: "Adventure",
  culture: "Culture",
  invest: "Invest",
  leisure: "Leisure",
};
