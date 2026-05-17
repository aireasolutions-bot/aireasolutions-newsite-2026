import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useSEO } from '../../hooks/useSEO';
import { seoAmplify } from '../../data/seoConfig';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, TrendingUp, MapPin, Zap, BarChart2, Layers } from 'lucide-react';

const PLATFORMS = [
  { name: 'Meta', sub: 'Facebook & Instagram Ads', letter: 'M', color: '#0668E1' },
  { name: 'Google', sub: 'Search, PMAX & Display', letter: 'G', color: '#34A853' },
  { name: 'YouTube', sub: 'Video & Streaming Ads', letter: 'Y', color: '#FF0000' },
  { name: 'TikTok', sub: 'Short-Form Discovery', letter: 'T', color: '#25F4EE' },
];

const SERVICES = [
  { icon: Target, title: 'Meta Ads', description: 'Designed around hospitality and retail demand cycles, not generic audiences. Dynamic creative optimization drives down CPA while scaling spend.' },
  { icon: TrendingUp, title: 'Google Search & PMAX', description: 'Capturing intent the moment someone searches "best rooftop near me." We turn search volume into booked reservations.' },
  { icon: Layers, title: 'Streaming Ads', description: 'Reaching affluent audiences through connected TV and premium video placements where they spend their time.' },
  { icon: MapPin, title: 'Geo-Targeting & Conquesting', description: 'Winning your local market neighborhood by neighborhood. Targeting guests near competitors and high-traffic areas.' },
  { icon: Zap, title: 'The Andromeda Protocol', description: 'Our proprietary creative testing system. 50+ ad variations per month, algorithmically scaling winners and cutting losers in real-time.' },
  { icon: BarChart2, title: 'Creative Testing & ROAS', description: 'Rapid iteration on creative, copy, and audience combinations. Every dollar tracked back to revenue.' },
];

const ANDROMEDA_COMPARISON = [
  { metric: 'Ad Structure', old: 'Single image, static text, high fatigue', airea: 'Dynamic Creative Optimization (DCO) grids' },
  { metric: 'Testing Velocity', old: '1-2 new ads per month', airea: '20+ variations tested weekly via AI' },
  { metric: 'Targeting', old: 'Broad interest guessing', airea: 'First-party data lookalikes & retention loops' },
  { metric: 'Result', old: 'Rising CPA over time', airea: 'Stable scale and incremental ROAS' },
];

export default function AmplifyPage() {
  useSEO(seoAmplify);
  const { ref: heroRef, isInView: heroVis } = useInView();
  const { ref: platRef, isInView: platVis } = useInView();
  const { ref: servRef, isInView: servVis } = useInView();
  const { ref: androRef, isInView: androVis } = useInView();
  const { ref: ctaRef, isInView: ctaVis } = useInView();

  return (
    <>
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="absolute inset-0 grain-overlay" />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[20%] right-[10%] w-[600px] h-[600px] rounded-full blur-[180px] opacity-[0.1]"
            style={{ backgroundColor: '#0F4C3A' }}
          />
        </div>

        <div className="relative z-10 section-padding w-full max-w-7xl mx-auto pt-36 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#0F4C3A' }}>
                  <Target size={20} color="#F5F1E8" />
                </div>
                <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
                  Performance Marketing
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.05]"
                style={{ color: 'var(--color-text)' }}
              >
                Turn Ad Spend Into{' '}
                <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Revenue.</span>
                <br />
                Not Reports.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 text-base md:text-lg leading-[1.7] max-w-lg"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Most restaurants boost posts. Most agencies set it and forget it.
                AIREA runs performance marketing the way a quantitative trading desk
                manages a portfolio — algorithmically, systematically, and with one
                goal: return.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.03]"
                  style={{ backgroundColor: '#0F4C3A', color: '#F5F1E8' }}
                >
                  Book a Strategy Call
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={heroVis ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--color-surface)' }}>
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                    alt="Performance analytics dashboard"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,76,58,0.6) 0%, transparent 60%)' }} />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroVis ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-5"
                >
                  <div className="flex items-center gap-6">
                    {[{ val: '24x', lab: 'ROAS' }, { val: '-40%', lab: 'CPA' }, { val: '50+', lab: 'Variations/Mo' }].map((s) => (
                      <div key={s.lab}>
                        <span className="text-xl font-bold" style={{ color: 'var(--color-gold)' }}>{s.val}</span>
                        <p className="text-[10px] font-barlow uppercase tracking-wider mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{s.lab}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={heroVis ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="absolute -top-3 -right-3 glass-card rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>Campaigns Active</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={platRef} className="relative py-16 md:py-24 section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={platVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
            <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>Platforms We Master</span>
            <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              Where Your{' '}
              <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Audience Lives</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PLATFORMS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                animate={platVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="rounded-2xl p-6 text-center border card-hover"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white"
                  style={{ backgroundColor: p.color }}
                >
                  {p.letter}
                </div>
                <h3 className="text-base font-bold mb-1" style={{ color: 'var(--color-text)' }}>{p.name}</h3>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{p.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={servRef} className="relative py-20 md:py-32 section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={servVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-12">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              The Amplify{' '}
              <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Arsenal</span>
            </h2>
            <p className="mt-3 text-base max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
              Every tactic is a lever pulled to generate revenue. Not impressions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={servVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                className="group rounded-2xl p-7 border card-hover"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: 'rgba(15, 76, 58, 0.1)' }}
                >
                  <s.icon size={20} style={{ color: '#0F4C3A' }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--color-text)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={androRef} className="relative py-20 md:py-32 section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={androVis ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-4">
                <Zap size={18} style={{ color: 'var(--color-gold)' }} />
                <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
                  Proprietary System
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tightest leading-[1.1]" style={{ color: 'var(--color-text)' }}>
                The Andromeda{' '}
                <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Protocol</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                The old way of running ads — static images, manual targeting, and "boosting posts" — is dead.
                We engineered Andromeda: a creative testing protocol that treats ad platforms like stock markets,
                algorithmically scaling winners and cutting losers in real-time.
              </p>

              <div className="grid grid-cols-3 gap-6 mt-8">
                {[
                  { val: '50+', label: 'Variations / Mo' },
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

            <motion.div initial={{ opacity: 0, x: 30 }} animate={androVis ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--color-border)' }}>
                <div className="px-6 py-4 flex items-center gap-2" style={{ backgroundColor: 'var(--color-surface-elevated)' }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-gold)' }} />
                  <span className="text-[10px] font-barlow uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
                    System Comparison
                  </span>
                </div>
                <div style={{ backgroundColor: 'var(--color-surface)' }}>
                  <div className="grid grid-cols-3 gap-4 px-6 py-3 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-elevated)' }}>
                    <span className="text-[10px] font-barlow uppercase tracking-widest font-semibold" style={{ color: 'var(--color-text-muted)' }}>Metric</span>
                    <span className="text-[10px] font-barlow uppercase tracking-widest font-semibold" style={{ color: 'var(--color-text-muted)' }}>Old Way</span>
                    <span className="text-[10px] font-barlow uppercase tracking-widest font-semibold" style={{ color: '#0F4C3A' }}>Andromeda</span>
                  </div>
                  {ANDROMEDA_COMPARISON.map((row, i) => (
                    <motion.div
                      key={row.metric}
                      initial={{ opacity: 0, x: 10 }}
                      animate={androVis ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                      className="grid grid-cols-3 gap-4 px-6 py-4 border-b last:border-b-0"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <span className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>{row.metric}</span>
                      <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{row.old}</span>
                      <span className="text-xs font-semibold" style={{ color: '#0F4C3A' }}>{row.airea}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="relative py-24 md:py-32 section-padding overflow-hidden" style={{ backgroundColor: '#0F4C3A' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ backgroundColor: '#8B6914' }} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={ctaVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="text-3xl md:text-5xl font-bold tracking-tightest text-white leading-[1.1]"
              >
                Ready to turn ad spend into{' '}
                <span className="font-serif italic opacity-80">measurable revenue?</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={ctaVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-base text-white/60 max-w-md"
              >
                No vanity metrics. No guesswork. Just performance marketing that shows up on your P&L.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={ctaVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-full bg-white transition-all duration-300 hover:scale-[1.02]"
                  style={{ color: '#0F4C3A' }}
                >
                  Book Your Strategy Call
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
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
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
                  alt="Team analyzing performance data"
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
