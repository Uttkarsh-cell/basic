'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import type { Category } from '@/lib/types';

export function CategoryCard({ category, count, index = 0 }: { category: Category; count?: number; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
    >
      <Link
        href={`/category/${category.slug}`}
        className="group relative flex h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-white/10 bg-surface p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-card"
      >
        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-20', category.gradient)} />
        <span className={cn('relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110', category.gradient)}>
          <Icon name={category.icon} className="h-6 w-6" strokeWidth={2} />
        </span>
        <span className="relative text-sm font-semibold text-white">{category.name}</span>
        {typeof count === 'number' && (
          <span className="relative text-[11px] text-text-muted">{count} games</span>
        )}
      </Link>
    </motion.div>
  );
}
