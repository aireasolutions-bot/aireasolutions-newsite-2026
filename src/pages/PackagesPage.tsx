import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useSEO } from '../hooks/useSEO';
import { seoPackages } from '../data/seoConfig';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star, HelpCircle } from 'lucide-react';
import { PACKAGES } from '../data/services';

const FAQ = [
  { q: 'What\'s included in the monthly retainer?', a: 'Each package has a defined scope detailed above. You always know what you\'re getting, who\'s doing it, and what it should deliver.' },
  { q: 'Is ad spend included?', a: 'No. All packages exclude ad spend. Media budgets are scoped collaboratively based on your market position and strategic goals.' },
  { q: 'Can I switch packages?', a: 'Yes. Partnerships evolve. You can scale up or adjust scope as your needs change, always with full transparency.' },
  { q: 'Who will I work with day-to-day?', a: 'Every partner gets direct access to Nicolas Santos as their Fractional CMO. Senior thinking, not junior execution.' },
  { q: 'What\'s the minimum commitment?', a: 'We recommend a 3-month initial engagement to properly embed and demonstrate results, but we don\'t lock you into long-term contracts.' },
];

export default function PackagesPage() {
  useSEO({
    ...seoPackages,
    jsonLd: [
      seoPackages.jsonLd as object,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  });
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: pkgRef, isInView: pkgVisible } = useInView();
  const { ref: faqRef, isInView: faqVisible } = useInView();

  return (
    <>
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center section-padding pt-32 pb-16">
        <div className="absolute inset-0 grain-overlay" style={{ backgroundColor: 'var(--color-bg)' }} />
        <div className="relative z-10 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]"
            style={{ color: 'var(--color-gold)' }}
          >
            Partnership Models
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.05]"
            style={{ color: 'var(--color-text)' }}
          >
            Clear Pricing.{' '}
            <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>No Surprises.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            We don't do hourly billing. We don't do hidden fees. Every AIREA partnership is structured
            around a transparent monthly retainer with a direct line to Nicolas Santos.
          </motion.p>
        </div>
      </section>

      <section ref={pkgRef} className="relative py-12 md:py-20 section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                animate={pkgVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`relative rounded-2xl p-8 md:p-10 border card-hover ${pkg.popular ? 'ring-2' : ''}`}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: pkg.popular ? 'var(--color-gold)' : 'var(--color-border)',
                  ...(pkg.popular ? { boxShadow: '0 0 40px rgba(139, 105, 20, 0.1)' } : {}),
                }}
              >
                {pkg.popular && (
                  <div
                    className="absolute -top-3 left-6 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: 'var(--color-gold)', color: '#F5F1E8' }}
                  >
                    <Star size={10} fill="currentColor" /> Most Popular
                  </div>
                )}

                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{pkg.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold" style={{ color: 'var(--color-text)' }}>{pkg.price}</span>
                  <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{pkg.period}</span>
                </div>
                <p className="mt-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>{pkg.description}</p>

                <div className="glow-line my-6" />

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: 'var(--color-gold)' }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="block w-full text-center py-3.5 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.02]"
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

      <section ref={faqRef} className="relative py-24 md:py-32 section-padding">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              Frequently Asked{' '}
              <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={faqVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                className="rounded-xl p-6 border"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-start gap-3">
                  <HelpCircle size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--color-gold)' }} />
                  <div>
                    <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{item.q}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{item.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 section-padding overflow-hidden" style={{ backgroundColor: 'var(--color-accent)' }}>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tightest text-white">
            Ready to{' '}
            <span className="font-serif italic opacity-80">get started?</span>
          </h2>
          <p className="mt-4 text-base text-white/60">
            Nicolas Santos on every call. No commitment required.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 mt-8 px-8 py-4 text-sm font-semibold rounded-full bg-white transition-all duration-300 hover:scale-[1.02]"
            style={{ color: 'var(--color-accent)' }}
          >
            Book Your Strategy Call
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
