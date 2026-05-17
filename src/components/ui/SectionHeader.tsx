import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

interface SectionHeaderProps {
  overline?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  overline,
  title,
  titleAccent,
  description,
  align = 'center',
}: SectionHeaderProps) {
  const { ref, isInView } = useInView();
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div ref={ref} className={`max-w-3xl mb-16 md:mb-20 ${alignClass}`}>
      {overline && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-barlow font-semibold uppercase tracking-widest mb-4"
          style={{ color: 'var(--color-gold)' }}
        >
          {overline}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tightest leading-[1.1]"
        style={{ color: 'var(--color-text)' }}
      >
        {title}
        {titleAccent && (
          <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>
            {' '}{titleAccent}
          </span>
        )}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base md:text-lg leading-relaxed max-w-2xl"
          style={{ color: 'var(--color-text-muted)', ...(align === 'center' ? { margin: '1.5rem auto 0' } : {}) }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
