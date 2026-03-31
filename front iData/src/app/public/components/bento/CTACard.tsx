import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

interface CTACardProps {
  title: string;
  ctaLabel: string;
  ctaHref: string;
  background?: string;
  image?: string;
}

/**
 * CTA Card - Call to action with prominent button
 * Style: Bold, high contrast
 */
export function CTACard({ 
  title, 
  ctaLabel, 
  ctaHref,
  background = 'bg-gray-50',
  image,
}: CTACardProps) {
  return (
    <div className={`relative flex flex-col justify-between h-full min-h-[280px] ${background} rounded-[20px] overflow-hidden`}>
      
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 opacity-10">
          <img 
            src={image} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full">
        <motion.h3
          className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 max-w-md leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h3>

        <Link
          to={ctaHref}
          className="group self-start inline-flex items-center justify-center gap-2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 hover:scale-110"
        >
          <span className="text-xs font-medium uppercase tracking-wider">
            {ctaLabel}
          </span>
          <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
