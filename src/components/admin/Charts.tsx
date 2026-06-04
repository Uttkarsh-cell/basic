'use client';

import { motion } from 'framer-motion';
import { formatCompact } from '@/lib/utils';
import type { SeriesPoint } from '@/lib/data/analytics';

/** Animated vertical bar chart (pure SVG/divs, no chart library). */
export function BarChart({ data, unit = '' }: { data: SeriesPoint[]; unit?: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex h-56 items-end gap-1.5">
      {data.map((d, i) => (
        <div key={i} className="group relative flex flex-1 flex-col items-center justify-end">
          <div className="pointer-events-none absolute -top-1 z-10 -translate-y-full whitespace-nowrap rounded-md bg-background px-2 py-1 text-[11px] font-semibold text-white opacity-0 shadow-lg ring-1 ring-white/10 transition-opacity group-hover:opacity-100">
            {unit}
            {formatCompact(d.value)}
          </div>
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: `${(d.value / max) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.03, ease: 'easeOut' }}
            className="w-full rounded-t-md bg-gradient-to-t from-primary to-secondary transition-colors group-hover:from-primary group-hover:to-accent"
          />
          <span className="mt-2 text-[10px] text-text-muted">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Donut chart for distribution data (values are percentages summing to ~100). */
export function DonutChart({ data }: { data: SeriesPoint[] }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const colors = ['#6C5CE7', '#00D2FF', '#00FFB3', '#f472b6', '#f59e0b'];
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
      <svg viewBox="0 0 160 160" className="h-40 w-40 -rotate-90">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="18" />
        {data.map((d, i) => {
          const fraction = d.value / total;
          const dash = fraction * circumference;
          const seg = (
            <motion.circle
              key={i}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={colors[i % colors.length]}
              strokeWidth="18"
              strokeLinecap="round"
              initial={{ strokeDasharray: `0 ${circumference}` }}
              whileInView={{ strokeDasharray: `${dash} ${circumference - dash}` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              style={{ strokeDashoffset: -offset }}
            />
          );
          offset += dash;
          return seg;
        })}
      </svg>
      <ul className="space-y-2">
        {data.map((d, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <span className="h-3 w-3 rounded-full" style={{ background: colors[i % colors.length] }} />
            <span className="text-text-muted">{d.label}</span>
            <span className="ml-auto font-semibold text-white">{d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
