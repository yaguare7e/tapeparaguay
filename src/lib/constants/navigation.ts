import type { Segment } from "./segments";

export interface NavItem {
  labelKey: string;
  href: string;
  segment?: Segment;
  children?: NavItem[];
}

export const MAIN_NAV: NavItem[] = [
  {
    labelKey: "nav.adventure",
    href: "/adventure",
    segment: "adventure",
  },
  {
    labelKey: "nav.culture",
    href: "/culture",
    segment: "culture",
  },
  {
    labelKey: "nav.invest",
    href: "/invest",
    segment: "invest",
    children: [
      { labelKey: "nav.residency", href: "/invest/residency" },
      { labelKey: "nav.tax_benefits", href: "/invest/tax-benefits" },
      { labelKey: "nav.real_estate", href: "/invest/real-estate" },
      { labelKey: "nav.calculator", href: "/invest/calculator" },
    ],
  },
  {
    labelKey: "nav.leisure",
    href: "/leisure",
    segment: "leisure",
  },
  {
    labelKey: "nav.destinations",
    href: "/destinations",
  },
  {
    labelKey: "nav.blog",
    href: "/blog",
  },
  {
    labelKey: "nav.about",
    href: "/about",
  },
  {
    labelKey: "nav.contact",
    href: "/contact",
  },
];

export const FOOTER_NAV = {
  segments: [
    { labelKey: "nav.adventure", href: "/adventure" },
    { labelKey: "nav.culture", href: "/culture" },
    { labelKey: "nav.invest", href: "/invest" },
    { labelKey: "nav.leisure", href: "/leisure" },
  ],
  resources: [
    { labelKey: "nav.destinations", href: "/destinations" },
    { labelKey: "nav.blog", href: "/blog" },
    { labelKey: "nav.faq", href: "/faq" },
    { labelKey: "nav.tools", href: "/tools" },
    { labelKey: "nav.gallery", href: "/gallery" },
  ],
  legal: [
    { labelKey: "nav.terms", href: "/legal/terms" },
    { labelKey: "nav.privacy", href: "/legal/privacy" },
    { labelKey: "nav.cancellation", href: "/legal/cancellation" },
  ],
};

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/tapeparaguay",
  facebook: "https://facebook.com/tapeparaguay",
  youtube: "https://youtube.com/@tapeparaguay",
  tiktok: "https://tiktok.com/@tapeparaguay",
  linkedin: "https://linkedin.com/company/tapeparaguay",
};
