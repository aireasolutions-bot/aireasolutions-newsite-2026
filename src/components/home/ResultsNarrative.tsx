import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { ArrowRight, ArrowLeft, Quote } from 'lucide-react';

const TRANSFORMATIONS = [
  {
    before: 'Struggling with 1.2x ROAS across 3 disconnected agencies.',
    after: '24x peak ROAS within 6 months with unified strategy.',
    client: 'Luxury Rooftop Venue',
    vertical: 'Nightlife & Hospitality',
    quote: 'AIREA didn\'t just improve our marketing -- they built the engine we didn\'t know we needed. For the first time, every dollar is accounted for.',
    metrics: [
      { label: 'ROAS', before: '1.2x', after: '24x' },
      { label: 'Cost Per Reservation', before: '$47', after: '$8' },
      { label: 'Monthly Revenue', before: '$180K', after: '$420K' },
    ],
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80',
  },
  {
    before: 'Zero digital presence. Word-of-mouth only.',
    after: '#1 Google ranking in their city within 90 days.',
    client: 'Fine Dining Restaurant',
    vertical: 'Fine Dining',
    quote: 'We went from invisible online to the first result when someone searches for fine dining in our city. The reservation pipeline has never been this full.',
    metrics: [
      { label: 'Google Ranking', before: 'Not ranked', after: '#1' },
      { label: 'Online Reservations', before: '12/mo', after: '340/mo' },
      { label: 'Revenue Growth', before: 'Flat', after: '+138%' },
    ],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  },
  {
    before: '$15K/mo ad spend with no tracking or attribution.',
    after: 'Full-funnel attribution with 40% cost reduction.',
    client: 'Multi-Location Hotel Group',
    vertical: 'Hotels & Resorts',
    quote: 'Before AIREA, we were guessing. Now we see exactly which campaigns drive which bookings. They gave us the visibility we\'ve been asking for.',
    metrics: [
      { label: 'Wasted Spend', before: '$9K/mo', after: '$0' },
      { label: 'Bookings', before: '45/mo', after: '128/mo' },
      { label: 'Cost Per Booking', before: '$333', after: '$70' },
    ],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  },
];

export default function ResultsNarrative() {
  const { ref, isInView } = useInView();
  const [active, setActive] = useState(0);
  const current = TRANSFORMATIONS[active];

  const next = () => setActive((prev) => (prev + 1) % TRANSFORMATIONS.length);
  const prev = () => setActive((prev) => (prev - 1 + TRANSFORMATIONS.length) % TRANSFORMATIONS.length);

  return (
    <section ref={ref} className="relative py-24 md:py-36 section-padding overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
            Transformation Stories
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
            From Where They Were.{' '}
            <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>
              To Where They Are.
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12"
            >
              <div className="rounded-2xl overflow-hidden relative aspect-[4/3]">
                <img
                  src={current.image}
                  alt={current.client}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[10px] font-barlow font-semibold uppercase tracking-widest text-white/60">
                    {current.vertical}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{current.client}</h3>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {current.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl p-4 border"
                      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                    >
                      <p className="text-[10px] font-barlow uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
                        {m.label}
                      </p>
                      <p className="text-xs line-through opacity-50 mb-0.5" style={{ color: 'var(--color-text-muted)' }}>
                        {m.before}
                      </p>
                      <p className="text-lg font-bold" style={{ color: 'var(--color-gold)' }}>
                        {m.after}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="relative pl-5 mb-6" style={{ borderLeft: '2px solid var(--color-gold)' }}>
                  <Quote size={14} className="mb-2 opacity-40" style={{ color: 'var(--color-gold)' }} />
                  <p className="text-sm leading-relaxed italic" style={{ color: 'var(--color-text-secondary)' }}>
                    {current.quote}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-auto pt-4">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-105"
                    style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text-muted)' }}
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-105"
                    style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text-muted)' }}
                  >
                    <ArrowRight size={14} />
                  </button>
                  <span className="text-xs ml-2" style={{ color: 'var(--color-text-muted)' }}>
                    {active + 1} / {TRANSFORMATIONS.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
