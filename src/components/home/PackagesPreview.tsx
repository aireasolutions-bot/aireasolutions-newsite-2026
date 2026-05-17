import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import { PACKAGES } from '../../data/services';

export default function PackagesPreview() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative py-24 md:py-36 section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
            Transparent Monthly Retainers
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
            No Hourly Billing.{' '}
            <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>No Hidden Fees.</span>
          </h2>
          <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            Every engagement is built for continuity and impact. You always know what you're getting.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className={`relative rounded-2xl p-8 border card-hover ${pkg.popular ? 'ring-2' : ''}`}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: pkg.popular ? 'var(--color-gold)' : 'var(--color-border)',
              }}
            >
              {pkg.popular && (
                <div
                  className="absolute -top-3 left-6 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: 'var(--color-gold)', color: '#F5F1E8' }}
                >
                  <Star size={10} fill="currentColor" /> Most Popular
                </div>
              )}

              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{pkg.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>{pkg.price}</span>
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{pkg.period}</span>
              </div>
              <p className="mt-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>{pkg.description}</p>

              <div className="glow-line my-6" />

              <ul className="space-y-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: 'var(--color-gold)' }} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="mt-8 block w-full text-center py-3 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: pkg.popular ? 'var(--color-accent)' : 'transparent',
                  color: pkg.popular ? '#F5F1E8' : 'var(--color-text)',
                  borderWidth: pkg.popular ? 0 : 1,
                  borderColor: 'var(--color-border-strong)',
                }}
              >
                Select Plan
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs mt-8" style={{ color: 'var(--color-text-muted)' }}>
          *All packages exclude ad spend. Media budgets are aligned collaboratively based on strategic goals.
        </p>
      </div>
    </section>
  );
}
