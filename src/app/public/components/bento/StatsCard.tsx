import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

interface StatsCardProps {
  number: string;
  label: string;
  ctaLabel: string;
  ctaHref: string;
}

/**
 * Stats Card - Large number display with CTA
 * Style: Inspired by modern AI platforms
 */
export function StatsCard({ number, label, ctaLabel, ctaHref }: StatsCardProps) {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <motion.div
          className="text-7xl sm:text-8xl font-light text-gray-900 mb-3"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {number}
        </motion.div>
        <p className="text-gray-600 text-base sm:text-lg font-light max-w-xs">
          {label}
        </p>
      </div>

      <Link
        to={ctaHref}
        className="group inline-flex items-center gap-2 px-5 py-3 mt-6 rounded-full border-2 border-gray-900 text-gray-900 font-medium text-sm hover:bg-gray-900 hover:text-white transition-all duration-300 self-start"
      >
        <span>{ctaLabel}</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
