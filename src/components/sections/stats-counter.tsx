"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { key: "tours_offered", value: 50, suffix: "+" },
  { key: "happy_travelers", value: 1200, suffix: "+" },
  { key: "destinations_count", value: 30, suffix: "+" },
  { key: "countries_served", value: 25, suffix: "+" },
];

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatItem({
  labelKey,
  value,
  suffix,
}: {
  labelKey: string;
  value: number;
  suffix: string;
}) {
  const t = useTranslations("home");
  const { count, ref } = useCountUp(value);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-[var(--segment-primary,#1B4332)] sm:text-5xl">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-gray-600 sm:text-base">
        {t(labelKey)}
      </div>
    </div>
  );
}

export function StatsCounter() {
  return (
    <section className="border-y border-gray-100 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatItem
              key={stat.key}
              labelKey={stat.key}
              value={stat.value}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
