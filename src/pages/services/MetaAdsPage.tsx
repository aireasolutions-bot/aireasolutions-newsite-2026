import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useSEO } from '../../hooks/useSEO';
import { seoMetaAds } from '../../data/seoConfig';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Zap, Target, Eye, RefreshCw, BarChart2, Layers, TrendingUp, Sparkles } from 'lucide-react';

const AD_FORMATS = [
  { title: 'Dynamic Creative Optimization', desc: 'AI-generated combinations of headlines, images, and CTAs. Each ad variation learns and improves autonomously.', icon: Sparkles },
  { title: 'Carousel & Collection Ads', desc: 'Multi-image storytelling that showcases your venue, menu, or product catalog in immersive swipeable formats.', icon: Layers },
  { title: 'Reels & Video Ads', desc: 'Short-form video optimized for discovery feeds. Designed to stop the scroll and build brand desire.', icon: Eye },
  { title: 'Lead Generation Forms', desc: 'In-platform forms that capture reservations, event RSVPs, and high-intent leads without leaving the app.', icon: Target },
  { title: 'Retargeting & Lookalikes', desc: 'First-party data audiences and algorithmically generated lookalikes that find your next best customer.', icon: RefreshCw },
  { title: 'Advantage+ Shopping', desc: 'Machine-learning powered campaigns for retail and DTC brands. Automated placements, audiences, and creative.', icon: TrendingUp },
];

const ANDROMEDA_PHASES = [
  { phase: 'Launch', week: 'Week 1-2', items: ['50+ creative variations deployed', 'Audience matrix activated', 'Pixel & conversion API verified', 'Baseline metrics captured'] },
  { phase: 'Learn', week: 'Week 3-4', items: ['AI identifies top 10% performers', 'Underperformers paused automatically', 'Audience segments refined', 'CPA baseline established'] },
  { phase: 'Scale', week: 'Week 5-8', items: ['Budget allocated to proven winners', 'New variations based on winner DNA', 'Lookalike audiences expanded', 'ROAS optimization activated'] },
  { phase: 'Compound', week: 'Ongoing', items: ['Continuous testing never stops', 'Seasonal creative rotations', 'First-party data loops deepening', 'Incremental ROAS compounding'] },
];

const METRICS = [
  { label: 'Avg ROAS', value: '4.5x', color: '#0668E1' },
  { label: 'CPA Reduction', value: '-40%', color: '#0668E1' },
  { label: 'Creative Variants/Mo', value: '50+', color: '#0668E1' },
  { label: 'Client Retention', value: '93%', color: '#0668E1' },
];

export default function MetaAdsPage() {
  useSEO(seoMetaAds);
  const { ref: heroRef, isInView: heroVis } = useInView();
  const { ref: formatRef, isInView: formatVis } = useInView();
  const { ref: androRef, isInView: androVis } = useInView();
  const { ref: ctaRef, isInView: ctaVis } = useInView();
  const [activePhase, setActivePhase] = useState(0);

  return (
    <>
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="absolute inset-0 grain-overlay" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 3, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.08]"
            style={{ backgroundColor: '#0668E1' }}
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full blur-[150px] opacity-[0.05]"
            style={{ backgroundColor: '#0F4C3A' }}
          />
        </div>

        <div className="relative z-10 section-padding w-full max-w-7xl mx-auto pt-36 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#0668E1' }}>
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
                  Meta Ads Management
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.05]"
                style={{ color: 'var(--color-text)' }}
              >
                Facebook & Instagram Ads That{' '}
                <span className="font-serif italic" style={{ color: '#0668E1' }}>Actually Convert.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 text-base md:text-lg leading-[1.7] max-w-lg"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Stop boosting posts and praying. We run Meta ads the way quantitative trading desks manage portfolios -- algorithmically, with 50+ creative variations, and one goal: measurable revenue.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }} className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.03]" style={{ backgroundColor: '#0668E1', color: '#FFFFFF' }}>
                  Get a Free Audit <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/amplify" className="inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold rounded-full border transition-all duration-300 hover:scale-[1.03]" style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text)' }}>
                  View All Amplify Services
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={heroVis ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="hidden lg:block">
              <div className="relative">
                <div className="rounded-2xl border p-6 md:p-8" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0668E1' }} />
                    <span className="text-[10px] font-barlow uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
                      Live Campaign Dashboard
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {METRICS.map((m, i) => (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={heroVis ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                        className="rounded-xl p-4"
                        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                      >
                        <span className="text-2xl font-bold" style={{ color: '#0668E1' }}>{m.value}</span>
                        <p className="text-[10px] font-barlow uppercase tracking-wider mt-1" style={{ color: 'var(--color-text-muted)' }}>{m.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {[85, 65, 92, 45, 78].map((val, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-[9px] font-barlow uppercase tracking-wider w-16 text-right" style={{ color: 'var(--color-text-muted)' }}>
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i]}
                        </span>
                        <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={heroVis ? { width: `${val}%` } : {}}
                            transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: '#0668E1', opacity: 0.7 + (val / 100) * 0.3 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={heroVis ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="absolute -top-3 -right-3 glass-card rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#34D399' }} />
                    <span className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>Andromeda Active</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={formatRef} className="relative py-20 md:py-32 section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={formatVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-14">
            <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>Ad Formats & Tactics</span>
            <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              Every Format,{' '}<span className="font-serif italic" style={{ color: '#0668E1' }}>Mastered.</span>
            </h2>
            <p className="mt-3 text-base max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
              We don't just run ads. We architect campaigns across every Meta placement -- each format chosen for a specific conversion goal.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {AD_FORMATS.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={formatVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                className="group rounded-2xl p-7 border card-hover"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: 'rgba(6, 104, 225, 0.1)' }}>
                  <f.icon size={20} style={{ color: '#0668E1' }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={androRef} className="relative py-20 md:py-32 section-padding overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div
            animate={{ x: [0, 30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[30%] right-[5%] w-[400px] h-[400px] rounded-full blur-[180px] opacity-[0.05]"
            style={{ backgroundColor: '#0668E1' }}
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={androVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-3 mb-4">
                  <Zap size={18} style={{ color: 'var(--color-gold)' }} />
                  <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
                    Proprietary System
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tightest leading-[1.1]" style={{ color: 'var(--color-text)' }}>
                  The Andromeda{' '}<span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Protocol</span>
                </h2>
                <p className="mt-6 text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  Named after the galaxy closest to our own, Andromeda is our proprietary creative testing framework for Meta campaigns. It treats ad platforms like stock markets -- algorithmically scaling winners and cutting losers in real-time.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={androVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8"
              >
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { val: '50+', label: 'Variations / Month' },
                    { val: '-40%', label: 'CPA Reduction' },
                    { val: '3.5x', label: 'Avg ROAS Lift' },
                  ].map((s) => (
                    <div key={s.label}>
                      <span className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-gold)' }}>{s.val}</span>
                      <p className="text-[10px] font-barlow uppercase tracking-wider mt-1" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={androVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-10 aspect-[16/10] rounded-2xl overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80"
                  alt="Social media campaign management"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            <div>
              <div className="flex gap-2 mb-6">
                {ANDROMEDA_PHASES.map((p, i) => (
                  <motion.button
                    key={p.phase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={androVis ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    onClick={() => setActivePhase(i)}
                    className="flex-1 rounded-xl px-3 py-3 text-center transition-all duration-300"
                    style={{
                      backgroundColor: activePhase === i ? '#0668E1' : 'var(--color-surface)',
                      borderColor: activePhase === i ? '#0668E1' : 'var(--color-border)',
                      color: activePhase === i ? '#FFFFFF' : 'var(--color-text-muted)',
                    }}
                  >
                    <span className="text-[10px] font-barlow font-semibold uppercase tracking-wider block">{p.phase}</span>
                    <span className="text-[9px] opacity-70 block mt-0.5">{p.week}</span>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl p-8 border"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                    {ANDROMEDA_PHASES[activePhase].phase}
                  </h3>
                  <p className="text-xs font-barlow uppercase tracking-wider mb-6" style={{ color: '#0668E1' }}>
                    {ANDROMEDA_PHASES[activePhase].week}
                  </p>
                  <ul className="space-y-3">
                    {ANDROMEDA_PHASES[activePhase].items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(6, 104, 225, 0.15)' }}>
                          <BarChart2 size={10} style={{ color: '#0668E1' }} />
                        </div>
                        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={androVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-6 rounded-2xl p-6 border"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-gold)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(139, 105, 20, 0.1)' }}>
                    <Zap size={18} style={{ color: 'var(--color-gold)' }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>Why Andromeda Wins</h4>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                      Traditional agencies test 2-3 ads per month. Andromeda deploys 50+ variations, algorithmically identifies the top 10%, kills the rest, and compounds what works. It's not a campaign -- it's a system.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="relative py-24 md:py-32 section-padding overflow-hidden" style={{ backgroundColor: '#0668E1' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ backgroundColor: '#F5F1E8' }} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2 initial={{ opacity: 0, y: 30 }} animate={ctaVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
                className="text-3xl md:text-5xl font-bold tracking-tightest text-white leading-[1.1]">
                Ready to stop boosting and start{' '}<span className="font-serif italic opacity-80">scaling?</span>
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={ctaVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-base text-white/70 max-w-md">
                Get a free Meta Ads audit. We'll show you exactly where your current campaigns are leaking budget -- and how Andromeda fixes it.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={ctaVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 }} className="mt-8">
                <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-full bg-white transition-all duration-300 hover:scale-[1.02]" style={{ color: '#0668E1' }}>
                  Get Your Free Audit <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={ctaVis ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:block">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80" alt="Creative campaign showcase" className="w-full h-full object-cover opacity-80" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
