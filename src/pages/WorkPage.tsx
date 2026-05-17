import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { useSEO, SITE_URL } from '../hooks/useSEO';
import { seoWork } from '../data/seoConfig';
import { CASE_STUDIES } from '../data/caseStudies';
import { ArrowRight } from 'lucide-react';

const FILTERS = ['All', 'Fine Dining', 'Rooftop & Nightlife', 'Nightlife', 'Luxury Retail', 'Lounge & Speakeasy'];

export default function WorkPage() {
  useSEO({
    ...seoWork,
    jsonLd: [
      seoWork.jsonLd as object,
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'AIREA Solutions Case Studies',
        numberOfItems: CASE_STUDIES.length,
        itemListElement: CASE_STUDIES.map((cs, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/work/${cs.slug}`,
          name: `${cs.client} — ${cs.tagline}`,
        })),
      },
    ],
  });
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: gridRef, isInView: gridVisible } = useInView();
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.vertical === filter);

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
            Proof
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.05]"
            style={{ color: 'var(--color-text)' }}
          >
            100+ Successful Engagements.{' '}
            <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Here Are Some Favorites.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            We measure every engagement in the metrics that matter to a P&L. The numbers below are not projections. They are results.
          </motion.p>
        </div>
      </section>

      <section ref={gridRef} className="relative py-12 md:py-20 section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={gridVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 text-xs font-barlow font-semibold uppercase tracking-wider rounded-full border transition-all duration-300"
                style={{
                  backgroundColor: filter === f ? 'var(--color-gold)' : 'transparent',
                  borderColor: filter === f ? 'var(--color-gold)' : 'var(--color-border)',
                  color: filter === f ? '#F5F1E8' : 'var(--color-text-muted)',
                }}
              >
                {f}
              </button>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((study, i) => (
                <motion.div
                  key={study.slug}
                  initial={{ opacity: 0, y: 25, scale: 0.97 }}
                  animate={gridVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  layout
                >
                  <Link
                    to={`/work/${study.slug}`}
                    className="group block rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-xl card-hover"
                    style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      {study.mediaType === 'video' ? (
                        <video
                          src={study.image}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <img
                          src={study.image}
                          alt={study.client}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute top-4 left-4 text-[10px] font-barlow font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white">
                        {study.vertical}
                      </span>
                    </div>

                    <div className="p-7">
                      <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                        {study.client}
                      </h3>
                      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
                        {study.description}
                      </p>

                      <div className="flex gap-6 mb-6">
                        {study.stats.map((s) => (
                          <div key={s.label}>
                            <span className="text-2xl font-bold" style={{ color: 'var(--color-gold)' }}>{s.value}</span>
                            <p className="text-[10px] font-barlow uppercase tracking-wider mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                              {s.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {study.services.map((s) => (
                          <span
                            key={s}
                            className="text-xs px-2.5 py-1 rounded-full border"
                            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--color-gold)' }}>
                        View Case Study
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={gridVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div
              className="rounded-2xl p-10 md:p-14 border border-dashed"
              style={{ borderColor: 'var(--color-border-strong)' }}
            >
              <span className="text-5xl font-bold text-gradient-gold">100+</span>
              <p className="text-lg font-bold mt-3 mb-2" style={{ color: 'var(--color-text)' }}>
                Successful Use Cases
              </p>
              <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
                Want to learn more? Book a call and let's talk about your brand.
              </p>
              <a
                href="https://aireasolutions.com/book"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.02]"
                style={{ backgroundColor: 'var(--color-accent)', color: '#F5F1E8' }}
              >
                Book a Strategy Call
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
