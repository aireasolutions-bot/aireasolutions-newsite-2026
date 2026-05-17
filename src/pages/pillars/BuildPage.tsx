import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useSEO } from '../../hooks/useSEO';
import { seoBuild } from '../../data/seoConfig';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Code, LayoutGrid as Layout, Search, Smartphone, Layers } from 'lucide-react';

const TECH_STACK = [
  { name: 'React', sub: 'Custom Applications', letter: 'R', color: '#087EA4' },
  { name: 'Webflow', sub: 'Visual CMS Sites', letter: 'W', color: '#4353FF' },
  { name: 'Shopify', sub: 'E-Commerce', letter: 'S', color: '#96BF48' },
  { name: 'TypeScript', sub: 'Enterprise Grade', letter: 'TS', color: '#3178C6' },
];

const SERVICES = [
  { icon: Layout, title: 'Website Design & Development', description: 'Architecturally sound, visually stunning, and structurally built to turn visitors into guests. Not digital brochures.' },
  { icon: Globe, title: 'Webflow & Shopify Development', description: 'Platform-native builds that give you full control over your content while maintaining performance and design standards.' },
  { icon: Code, title: 'Custom Development', description: 'React, Python, TypeScript — when off-the-shelf won\'t cut it, we build exactly what your business needs.' },
  { icon: Layers, title: 'Landing Pages & Conversion Systems', description: 'High-converting landing pages designed for specific campaigns, events, and offers. Every pixel earns its place.' },
  { icon: Smartphone, title: 'App Development', description: 'Native and web applications for loyalty programs, ordering systems, and guest engagement platforms.' },
  { icon: Search, title: 'Technical SEO', description: 'Audit, sitemap, indexation, schema, deployment — the invisible infrastructure that makes your site discoverable.' },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Discovery', desc: 'Deep-dive into your brand, guests, and business goals. We map the user journey before we write a single line of code.' },
  { step: '02', title: 'Architecture', desc: 'Wireframes, information hierarchy, and conversion strategy. Form follows function — always.' },
  { step: '03', title: 'Design', desc: 'High-fidelity mockups that capture your brand essence. Every detail reviewed and refined.' },
  { step: '04', title: 'Develop & Launch', desc: 'Pixel-perfect build, performance optimization, and seamless deployment. Then we measure everything.' },
];

const SITE_METRICS = [
  { label: 'Load Time', value: '<1.2s', desc: 'Average page load' },
  { label: 'Mobile Score', value: '98/100', desc: 'Lighthouse performance' },
  { label: 'Conversion', value: '+180%', desc: 'Average lift vs old site' },
  { label: 'SEO Rank', value: 'Page 1', desc: 'Within 90 days' },
];

export default function BuildPage() {
  useSEO(seoBuild);
  const { ref: heroRef, isInView: heroVis } = useInView();
  const { ref: techRef, isInView: techVis } = useInView();
  const { ref: servRef, isInView: servVis } = useInView();
  const { ref: procRef, isInView: procVis } = useInView();
  const { ref: ctaRef, isInView: ctaVis } = useInView();

  return (
    <>
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="absolute inset-0 grain-overlay" />
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[15%] right-[15%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.08]"
            style={{ backgroundColor: '#8B4513' }}
          />
        </div>

        <div className="relative z-10 section-padding w-full max-w-7xl mx-auto pt-36 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#8B4513' }}>
                  <Globe size={20} color="#F5F1E8" />
                </div>
                <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>Web Design & Development</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.05]"
                style={{ color: 'var(--color-text)' }}
              >
                Your Website Is Your Most Important{' '}
                <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Marketing Asset.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 text-base md:text-lg leading-[1.7] max-w-lg"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Most websites are beautiful brochures that don't convert. We design and build websites that are architecturally sound, visually stunning, and built to turn visitors into customers.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }} className="mt-8">
                <Link to="/contact" className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.03]" style={{ backgroundColor: '#8B4513', color: '#F5F1E8' }}>
                  Book a Strategy Call <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={heroVis ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="hidden lg:block">
              <div className="relative">
                <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                  <div className="px-5 py-3 flex items-center gap-2" style={{ backgroundColor: 'var(--color-surface-elevated)' }}>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#C87E5F' }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-gold)' }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#0F4C3A' }} />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="h-5 rounded-full px-3 flex items-center" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                        <span className="text-[9px]" style={{ color: 'var(--color-text-muted)' }}>www.yourbrand.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80"
                      alt="Website design showcase"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroVis ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-5"
                >
                  <div className="flex items-center gap-5">
                    {SITE_METRICS.slice(0, 3).map((m) => (
                      <div key={m.label}>
                        <span className="text-lg font-bold" style={{ color: 'var(--color-gold)' }}>{m.value}</span>
                        <p className="text-[10px] font-barlow uppercase tracking-wider mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{m.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={heroVis ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="absolute -top-3 -right-3 glass-card rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <Code size={12} style={{ color: 'var(--color-gold)' }} />
                    <span className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>Pixel Perfect</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={techRef} className="relative py-16 md:py-24 section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={techVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
            <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>Technology Partners</span>
            <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              Built With the{' '}<span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Best Stack</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TECH_STACK.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                animate={techVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="rounded-2xl p-6 text-center border card-hover"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-sm font-bold text-white"
                  style={{ backgroundColor: t.color }}
                >
                  {t.letter}
                </div>
                <h3 className="text-base font-bold mb-1" style={{ color: 'var(--color-text)' }}>{t.name}</h3>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{t.sub}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={techVis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {SITE_METRICS.map((m, i) => (
              <div key={m.label} className="rounded-xl p-5 text-center" style={{ backgroundColor: 'var(--color-surface)' }}>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={techVis ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="text-2xl md:text-3xl font-bold block"
                  style={{ color: 'var(--color-gold)' }}
                >
                  {m.value}
                </motion.span>
                <p className="text-xs font-barlow uppercase tracking-wider mt-1" style={{ color: 'var(--color-text-muted)' }}>{m.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section ref={servRef} className="relative py-20 md:py-32 section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={servVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-14">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              The Build{' '}<span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Toolkit</span>
            </h2>
            <p className="mt-3 text-base max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
              From Webflow marketing sites to custom React applications. Every project is built for performance, conversion, and brand.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={servVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.08 * i }}
                className="group rounded-2xl p-7 border card-hover" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: 'rgba(139, 69, 19, 0.1)' }}>
                  <s.icon size={20} style={{ color: '#8B4513' }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--color-text)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={procRef} className="relative py-20 md:py-32 section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={procVis ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
              <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>Our Process</span>
              <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tightest leading-[1.1]" style={{ color: 'var(--color-text)' }}>
                From Concept to{' '}<span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Conversion</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Every project follows a disciplined methodology. No shortcuts, no templates, no surprises. Just a systematic approach to building digital assets that perform.
              </p>

              <div className="mt-10 aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
                  alt="Development workspace"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={procVis ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="space-y-4">
                {PROCESS_STEPS.map((s, i) => (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, y: 15 }}
                    animate={procVis ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="rounded-2xl p-6 border"
                    style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl font-bold shrink-0 opacity-15" style={{ color: 'var(--color-gold)' }}>{s.step}</span>
                      <div>
                        <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--color-text)' }}>{s.title}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{s.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={procVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-6 rounded-2xl p-6 border"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-gold)' }}
              >
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--color-text)' }}>Post-Launch Support</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  Every build includes 30 days of post-launch support, analytics setup, and performance monitoring. Your site keeps improving after day one.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="relative py-24 md:py-32 section-padding overflow-hidden" style={{ backgroundColor: '#8B4513' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ backgroundColor: '#F5F1E8' }} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={ctaVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="text-3xl md:text-5xl font-bold tracking-tightest text-white leading-[1.1]"
              >
                Ready for a website that{' '}<span className="font-serif italic opacity-80">actually converts?</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={ctaVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-base text-white/60 max-w-md"
              >
                Not a digital brochure. A performance-driven marketing asset built to turn visitors into guests.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={ctaVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 }} className="mt-8">
                <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-full bg-white transition-all duration-300 hover:scale-[1.02]" style={{ color: '#8B4513' }}>
                  Book Your Strategy Call <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={ctaVis ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80"
                  alt="Modern web design on devices"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
