import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { Link } from 'react-router-dom';
import { ArrowRight, type LucideIcon } from 'lucide-react';

interface PillarService {
  title: string;
  description: string;
}

interface PillarLayoutProps {
  overline: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  color: string;
  icon: LucideIcon;
  services: PillarService[];
  ctaText?: string;
}

export default function PillarLayout({
  overline,
  title,
  titleAccent,
  subtitle,
  color,
  icon: Icon,
  services,
  ctaText = 'Book a Strategy Call',
}: PillarLayoutProps) {
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: servicesRef, isInView: servicesVisible } = useInView();

  return (
    <>
      <section ref={heroRef} className="relative min-h-[65vh] flex items-center section-padding pt-32 pb-20">
        <div className="absolute inset-0 grain-overlay" style={{ backgroundColor: 'var(--color-bg)' }} />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-[120px] opacity-15" style={{ backgroundColor: color }} />

        <div className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
            style={{ backgroundColor: color }}
          >
            <Icon size={26} color="#F5F1E8" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]"
            style={{ color: 'var(--color-gold)' }}
          >
            {overline}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.05]"
            style={{ color: 'var(--color-text)' }}
          >
            {title}{' '}
            <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>{titleAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-base md:text-lg leading-relaxed max-w-2xl"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.02]"
              style={{ backgroundColor: 'var(--color-accent)', color: '#F5F1E8' }}
            >
              {ctaText}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section ref={servicesRef} className="relative py-20 md:py-32 section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              What's{' '}
              <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Included</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={servicesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                className="group rounded-xl p-7 border card-hover"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-2 h-2 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <div>
                    <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{s.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 section-padding overflow-hidden" style={{ backgroundColor: color }}>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tightest text-white">
            Ready to{' '}
            <span className="font-serif italic opacity-80">get started?</span>
          </h2>
          <p className="mt-4 text-base text-white/60">
            Let's discuss how this pillar fits into your growth strategy.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 mt-8 px-8 py-4 text-sm font-semibold rounded-full bg-white transition-all duration-300 hover:scale-[1.02]"
            style={{ color }}
          >
            Book Your Strategy Call
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
