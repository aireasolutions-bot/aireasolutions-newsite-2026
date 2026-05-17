import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useSEO } from '../hooks/useSEO';
import { seoServices } from '../data/seoConfig';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PILLARS } from '../data/services';

export default function ServicesPage() {
  useSEO(seoServices);
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: gridRef, isInView: gridVisible } = useInView();

  return (
    <>
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center section-padding pt-32 pb-20">
        <div className="absolute inset-0 grain-overlay" style={{ backgroundColor: 'var(--color-bg)' }} />
        <div className="relative z-10 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]"
            style={{ color: 'var(--color-gold)' }}
          >
            Full-Stack Marketing & AI
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.05]"
            style={{ color: 'var(--color-text)' }}
          >
            One Partner.{' '}
            <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Every Pillar.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Why full-stack beats fragmented: one strategy, one team, one point of accountability.
            Every tactic is a lever pulled to generate revenue.
          </motion.p>
        </div>
      </section>

      <section ref={gridRef} className="relative py-16 md:py-24 section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl mx-auto space-y-6">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.key}
              initial={{ opacity: 0, y: 25 }}
              animate={gridVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                to={pillar.href}
                className="group grid md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-8 rounded-2xl p-7 md:p-8 border card-hover"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: pillar.color }}
                >
                  <pillar.icon size={24} color="#F5F1E8" />
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-barlow font-bold uppercase tracking-widest" style={{ color: pillar.color }}>
                      {pillar.letter} —
                    </span>
                    <h3 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{pillar.title}</h3>
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>{pillar.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {pillar.services.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2.5 py-1 rounded-full border"
                        style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <ArrowRight
                  size={20}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 hidden md:block"
                  style={{ color: 'var(--color-text-muted)' }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
