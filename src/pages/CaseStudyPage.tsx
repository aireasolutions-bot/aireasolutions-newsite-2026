import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Check } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useSEO, SITE_URL } from '../hooks/useSEO';
import { CASE_STUDIES } from '../data/caseStudies';

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  const { ref: statsRef, isInView: statsVisible } = useInView();
  const { ref: detailRef, isInView: detailVisible } = useInView();

  useSEO({
    title: study
      ? `${study.client} Case Study — ${study.vertical} | AIREA Solutions`
      : 'Case Study Not Found | AIREA Solutions',
    description: study
      ? `${study.tagline} ${study.description}`.slice(0, 300)
      : 'The case study you are looking for does not exist.',
    path: study ? `/work/${study.slug}` : '/work',
    image: study?.image,
    type: 'article',
    noindex: !study,
    keywords: study
      ? [study.client, study.vertical, 'case study', 'AIREA Solutions', ...study.services]
      : undefined,
    breadcrumbs: study
      ? [
          { name: 'Home', url: '/' },
          { name: 'Work', url: '/work' },
          { name: study.client, url: `/work/${study.slug}` },
        ]
      : undefined,
    jsonLd: study
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `${study.client} — ${study.tagline}`,
            description: study.fullDescription.slice(0, 400),
            image: [study.image, ...(study.heroSlides || []), ...(study.gridImages || [])],
            mainEntityOfPage: `${SITE_URL}/work/${study.slug}`,
            author: { '@type': 'Organization', name: 'AIREA Solutions', url: SITE_URL },
            publisher: {
              '@type': 'Organization',
              name: 'AIREA Solutions',
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/og/airea-og.jpg` },
            },
            about: study.vertical,
            keywords: study.services.join(', '),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: `${study.client} Case Study`,
            about: study.client,
            description: study.description,
            url: `${SITE_URL}/work/${study.slug}`,
            provider: { '@type': 'Organization', name: 'AIREA Solutions', url: SITE_URL },
          },
        ]
      : undefined,
  });

  if (!study) {
    return (
      <section className="min-h-screen flex items-center justify-center section-padding">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            Case Study Not Found
          </h1>
          <Link to="/work" className="text-sm font-semibold" style={{ color: 'var(--color-gold)' }}>
            Back to Work
          </Link>
        </div>
      </section>
    );
  }

  const currentIndex = CASE_STUDIES.findIndex((s) => s.slug === slug);
  const prevStudy = currentIndex > 0 ? CASE_STUDIES[currentIndex - 1] : null;
  const nextStudy = currentIndex < CASE_STUDIES.length - 1 ? CASE_STUDIES[currentIndex + 1] : null;

  const slides = study.heroSlides && study.heroSlides.length > 0 ? study.heroSlides : null;
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    if (!slides) return;
    const id = setInterval(() => setSlideIdx((i) => (i + 1) % slides.length), 4200);
    return () => clearInterval(id);
  }, [slides]);

  return (
    <>
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {slides ? (
            <AnimatePresence mode="sync">
              <motion.img
                key={slides[slideIdx]}
                src={slides[slideIdx]}
                alt={study.client}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          ) : study.mediaType === 'video' ? (
            <video
              src={study.image}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={study.image}
              alt={study.client}
              className="w-full h-full object-cover"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.2) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 section-padding pb-16 pt-32 w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-xs font-barlow font-semibold uppercase tracking-widest text-white/60 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              Back to Work
            </Link>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-xs font-barlow font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white/80 mb-6"
          >
            {study.vertical}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest text-white leading-[1.05] mb-4"
          >
            {study.client}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl font-serif italic"
          >
            {study.tagline}
          </motion.p>

          {slides && (
            <div className="flex items-center gap-2 mt-8">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIdx(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: i === slideIdx ? 40 : 16,
                    backgroundColor: i === slideIdx ? 'var(--color-gold)' : 'rgba(255,255,255,0.35)',
                  }}
                />
              ))}
            </div>
          )}

          {study.website && (
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              href={study.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-white/60 hover:text-white transition-colors"
            >
              Visit Website <ExternalLink size={14} />
            </motion.a>
          )}
        </div>
      </section>

      <section
        ref={statsRef}
        className="relative py-16 md:py-24 section-padding border-b"
        style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {study.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-gold">
                  {stat.value}
                </span>
                <p className="text-xs font-barlow uppercase tracking-widest mt-2" style={{ color: 'var(--color-text-muted)' }}>
                  {stat.label}
                </p>
                {stat.before && stat.after && (
                  <div className="mt-3 flex items-center justify-center gap-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    <span className="line-through opacity-60">{stat.before}</span>
                    <ArrowRight size={12} style={{ color: 'var(--color-gold)' }} />
                    <span className="font-semibold" style={{ color: 'var(--color-gold)' }}>{stat.after}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={detailRef}
        className="relative py-20 md:py-32 section-padding"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={detailVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
                The Challenge & Solution
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tightest leading-[1.1] mb-8" style={{ color: 'var(--color-text)' }}>
                How We Delivered{' '}
                <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Real Results</span>
              </h2>
              <p className="text-base md:text-lg leading-[1.8]" style={{ color: 'var(--color-text-secondary)' }}>
                {study.fullDescription}
              </p>

              <div className="flex flex-wrap gap-2 mt-8">
                {study.services.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-4 py-2 rounded-full border font-semibold"
                    style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text-muted)' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>

            {study.highlights && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={detailVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="rounded-2xl p-8 md:p-10 border"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--color-text)' }}>
                  Key Outcomes
                </h3>
                <ul className="space-y-4">
                  {study.highlights.map((h, i) => (
                    <motion.li
                      key={h}
                      initial={{ opacity: 0, x: 10 }}
                      animate={detailVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                      >
                        <Check size={12} color="#F5F1E8" />
                      </div>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        {h}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {study.gridImages && study.gridImages.length > 0 && (
        <section
          className="relative py-20 md:py-28 section-padding"
          style={{ backgroundColor: 'var(--color-bg-secondary)' }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 md:mb-14">
              <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
                The Work, Up Close
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tightest leading-[1.1]" style={{ color: 'var(--color-text)' }}>
                Inside the <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Execution</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {study.gridImages.map((img, i) => (
                <motion.div
                  key={img}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden rounded-2xl border group"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={img}
                      alt={`${study.client} detail ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="py-16 md:py-20 section-padding border-t"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {prevStudy ? (
              <Link
                to={`/work/${prevStudy.slug}`}
                className="group flex items-center gap-3 text-sm font-semibold transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                {prevStudy.client}
              </Link>
            ) : (
              <div />
            )}

            <Link
              to="/work"
              className="text-xs font-barlow font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-gold)' }}
            >
              All Case Studies
            </Link>

            {nextStudy ? (
              <Link
                to={`/work/${nextStudy.slug}`}
                className="group flex items-center gap-3 text-sm font-semibold transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {nextStudy.client}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      <section
        className="relative py-20 md:py-28 section-padding overflow-hidden"
        style={{ backgroundColor: 'var(--color-accent)' }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ backgroundColor: '#8B6914' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tightest text-white mb-4">
            100+ Successful Use Cases.
          </h2>
          <p className="text-base text-white/60 mb-8 font-serif italic">
            Want to learn more? Let's talk about your brand.
          </p>
          <a
            href="https://aireasolutions.com/book"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-full bg-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            style={{ color: 'var(--color-accent)' }}
          >
            Book a Strategy Call
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
