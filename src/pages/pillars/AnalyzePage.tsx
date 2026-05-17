import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useSEO } from '../../hooks/useSEO';
import { seoAnalyze } from '../../data/seoConfig';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, TrendingUp, Lightbulb, CalendarCheck, GitBranch } from 'lucide-react';

const SERVICES = [
  { icon: BarChart3, title: 'Real-Time Dashboards', description: 'Live performance data across every channel. No waiting for monthly PDFs. See what\'s working right now.' },
  { icon: TrendingUp, title: 'Revenue Forecasting', description: 'Predictive models built on your historical data, seasonality, and market conditions. Plan with confidence.' },
  { icon: Lightbulb, title: 'AI Smart Recommendations', description: 'Actionable insights generated from your data. Not just what happened — what to do about it.' },
  { icon: CalendarCheck, title: 'Quarterly Strategic Reviews', description: 'Deep-dive sessions connecting marketing performance to business outcomes. P&L-informed, not vanity-driven.' },
  { icon: GitBranch, title: 'Full Channel Attribution', description: 'Understanding exactly which channels and campaigns are driving results. No guesswork.' },
];

const METRICS = [
  { label: 'Revenue', value: '$142K', change: '+23%', positive: true },
  { label: 'ROAS', value: '4.8x', change: '+0.6x', positive: true },
  { label: 'CPA', value: '$12.40', change: '-18%', positive: true },
  { label: 'Reservations', value: '1,847', change: '+34%', positive: true },
  { label: 'Email Revenue', value: '$28K', change: '+45%', positive: true },
  { label: 'Social Reach', value: '340K', change: '+67%', positive: true },
];

export default function AnalyzePage() {
  useSEO(seoAnalyze);
  const { ref: heroRef, isInView: heroVis } = useInView();
  const { ref: dashRef, isInView: dashVis } = useInView();
  const { ref: servRef, isInView: servVis } = useInView();
  const { ref: ctaRef, isInView: ctaVis } = useInView();

  return (
    <>
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="absolute inset-0 grain-overlay" />
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[20%] right-[15%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.08]" style={{ backgroundColor: '#4A5759' }} />
        </div>

        <div className="relative z-10 section-padding w-full max-w-7xl mx-auto pt-36 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#4A5759' }}>
                  <BarChart3 size={20} color="#F5F1E8" />
                </div>
                <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>Insights & Forecasting</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.05]" style={{ color: 'var(--color-text)' }}>
                You Deserve to Know Exactly{' '}
                <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>What's Working.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 text-base md:text-lg leading-[1.7] max-w-lg" style={{ color: 'var(--color-text-muted)' }}>
                No black-box reporting. No vanity decks. Real-time dashboards, actionable forecasts, and strategic recommendations tied directly to your P&L.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }} className="mt-8">
                <Link to="/contact" className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.03]" style={{ backgroundColor: '#4A5759', color: '#F5F1E8' }}>
                  Book a Strategy Call <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={heroVis ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="hidden lg:block">
              <div className="relative rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                <div className="px-6 py-4 flex items-center gap-2" style={{ backgroundColor: 'var(--color-surface-elevated)' }}>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#C87E5F' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-gold)' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#0F4C3A' }} />
                  </div>
                  <span className="text-[10px] font-barlow uppercase tracking-widest ml-2" style={{ color: 'var(--color-text-muted)' }}>
                    AIREA Analytics Dashboard
                  </span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-3">
                    {METRICS.map((m, i) => (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={heroVis ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                        className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                      >
                        <p className="text-[10px] font-barlow uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>{m.label}</p>
                        <p className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{m.value}</p>
                        <span className="text-xs font-semibold" style={{ color: m.positive ? '#0F4C3A' : '#C87E5F' }}>{m.change}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl p-4" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>Revenue Trend</span>
                      <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>Last 12 months</span>
                    </div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[30, 35, 28, 45, 50, 42, 55, 60, 68, 72, 80, 92].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={heroVis ? { height: `${h}%` } : {}}
                          transition={{ duration: 0.6, delay: 0.8 + i * 0.05 }}
                          className="flex-1 rounded-t"
                          style={{ backgroundColor: i === 11 ? 'var(--color-gold)' : 'var(--color-border-strong)' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={dashRef} className="relative py-16 md:py-24 section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={dashVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
            <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>Transparency Model</span>
            <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              The AIREA{' '}<span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Difference</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'The Old Way', items: ['Monthly PDF reports nobody reads', 'Impressions and reach as "success"', 'No connection to revenue', 'Vanity metrics only'], bad: true },
              { title: 'The AIREA Way', items: ['Real-time dashboards with live data', 'KPIs tied directly to your P&L', 'Full channel attribution', 'AI-powered recommendations'], bad: false },
            ].map((col, ci) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                animate={dashVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: ci * 0.15 }}
                className="rounded-2xl p-8 border"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: col.bad ? 'var(--color-border)' : 'var(--color-gold)', opacity: col.bad ? 0.7 : 1 }}
              >
                <h3 className="text-lg font-bold mb-4" style={{ color: col.bad ? 'var(--color-text-muted)' : 'var(--color-text)' }}>{col.title}</h3>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: col.bad ? 'var(--color-text-muted)' : 'var(--color-text-secondary)' }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: col.bad ? 'var(--color-text-muted)' : '#0F4C3A' }} />
                      {col.bad ? <s>{item}</s> : item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={servRef} className="relative py-20 md:py-32 section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={servVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-14">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              Analyze{' '}<span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Capabilities</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={servVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.08 * i }}
                className="group rounded-2xl p-7 border card-hover" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: 'rgba(74, 87, 89, 0.1)' }}>
                  <s.icon size={20} style={{ color: '#4A5759' }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--color-text)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="relative py-24 md:py-32 section-padding overflow-hidden" style={{ backgroundColor: '#4A5759' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ backgroundColor: '#8B6914' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={ctaVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-bold tracking-tightest text-white leading-[1.1]">
            Ready for reporting that{' '}<span className="font-serif italic opacity-80">actually matters?</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={ctaVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }} className="mt-8">
            <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-full bg-white transition-all duration-300 hover:scale-[1.02]" style={{ color: '#4A5759' }}>
              Book Your Strategy Call <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
