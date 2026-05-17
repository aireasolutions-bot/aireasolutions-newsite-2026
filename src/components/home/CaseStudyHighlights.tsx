import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { CASE_STUDIES } from '../../data/caseStudies';

export default function CaseStudyHighlights() {
  const { ref, isInView } = useInView();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      <div className="section-padding max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
              Credibility & Proof
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              100+ Successful{' '}
              <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Use Cases.</span>
            </h2>
            <p className="mt-4 text-base max-w-lg" style={{ color: 'var(--color-text-muted)' }}>
              Real brands. Real numbers. No vanity metrics. These are results tied directly to revenue.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
              style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text-muted)' }}
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
              style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text-muted)' }}
            >
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 px-6 md:px-12 lg:px-20 xl:px-32"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {CASE_STUDIES.map((study, i) => (
          <motion.div
            key={study.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
            className="shrink-0 w-[340px] md:w-[380px] scroll-snap-start"
          >
            <Link
              to={`/work/${study.slug}`}
              className="group block rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-xl"
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
              <div className="p-6">
                <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                  {study.client}
                </h3>
                <p className="text-sm leading-relaxed mb-5 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
                  {study.tagline}
                </p>
                <div className="flex gap-5">
                  {study.stats.slice(0, 3).map((s) => (
                    <div key={s.label}>
                      <span className="text-lg font-bold" style={{ color: 'var(--color-gold)' }}>
                        {s.value}
                      </span>
                      <p className="text-[10px] font-barlow uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 text-xs font-semibold transition-colors" style={{ color: 'var(--color-gold)' }}>
                  View Case Study
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="shrink-0 w-[340px] md:w-[380px] scroll-snap-start"
        >
          <a
            href="https://aireasolutions.com/book"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center h-full rounded-2xl border border-dashed p-10 text-center transition-all duration-500 hover:border-solid"
            style={{ borderColor: 'var(--color-border-strong)', minHeight: '420px' }}
          >
            <span className="text-5xl md:text-6xl font-bold text-gradient-gold mb-4">100+</span>
            <p className="text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>
              Successful Use Cases
            </p>
            <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
              Want to learn more? Let's talk about your brand.
            </p>
            <span
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 group-hover:scale-[1.03]"
              style={{ backgroundColor: 'var(--color-accent)', color: '#F5F1E8' }}
            >
              Book a Call
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </motion.div>
      </div>

      <div className="section-padding max-w-7xl mx-auto mt-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold group"
            style={{ color: 'var(--color-gold)' }}
          >
            View All Case Studies
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
