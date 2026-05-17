import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useSEO } from '../../hooks/useSEO';
import { seoGoogleAds } from '../../data/seoConfig';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, MapPin, Monitor, ShoppingBag, TrendingUp, BarChart2, Globe, Zap } from 'lucide-react';

const CAMPAIGN_TYPES = [
  { icon: Search, title: 'Search Campaigns', desc: 'Capturing high-intent queries like "best restaurant near me" or "luxury hotel NYC." Every click is someone ready to act.', color: '#F4B400' },
  { icon: Globe, title: 'Performance Max (PMAX)', desc: 'Google\'s AI-driven campaign type that runs across Search, Display, YouTube, Maps, and Discover. We structure the inputs so AI outputs revenue.', color: '#4285F4' },
  { icon: MapPin, title: 'Local Campaigns', desc: 'Driving foot traffic with Google Maps placements, local inventory ads, and location-based targeting that puts you on the map -- literally.', color: '#FBBC04' },
  { icon: Monitor, title: 'YouTube & Display', desc: 'Video pre-roll and programmatic display for brand awareness. Reaching affluent audiences on premium placements.', color: '#EA4335' },
  { icon: ShoppingBag, title: 'Shopping & Product Ads', desc: 'For retail and DTC brands: product listing ads, merchant center optimization, and feed management that drives purchases.', color: '#F4B400' },
  { icon: TrendingUp, title: 'Demand Gen Campaigns', desc: 'Google\'s newest campaign type. Visually rich ads across Gmail, YouTube Shorts, and Discover -- designed for mid-funnel conversion.', color: '#4285F4' },
];

const FUNNEL_STAGES = [
  { stage: 'Awareness', pct: 100, tactics: 'YouTube Pre-Roll, Display Network, Demand Gen', color: '#4285F4' },
  { stage: 'Consideration', pct: 75, tactics: 'PMAX, Discovery Ads, Local Campaigns', color: '#F4B400' },
  { stage: 'Intent', pct: 50, tactics: 'Search Campaigns, Shopping Ads, Remarketing', color: '#FBBC04' },
  { stage: 'Conversion', pct: 30, tactics: 'Brand Search, Call Extensions, Location Ads', color: '#EA4335' },
  { stage: 'Retention', pct: 20, tactics: 'Customer Match, RLSA, Loyalty Campaigns', color: '#F4B400' },
];

const GOOGLE_COLORS = ['#4285F4', '#EA4335', '#FBBC04', '#F4B400'];

export default function GoogleAdsPage() {
  useSEO(seoGoogleAds);
  const { ref: heroRef, isInView: heroVis } = useInView();
  const { ref: typeRef, isInView: typeVis } = useInView();
  const { ref: funnelRef, isInView: funnelVis } = useInView();
  const { ref: stratRef, isInView: stratVis } = useInView();
  const { ref: ctaRef, isInView: ctaVis } = useInView();

  return (
    <>
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="absolute inset-0 grain-overlay" />
          {GOOGLE_COLORS.map((c, i) => (
            <motion.div
              key={c}
              animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
              transition={{ duration: 12 + i * 4, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
              className="absolute rounded-full blur-[180px]"
              style={{
                backgroundColor: c,
                width: '300px',
                height: '300px',
                top: `${15 + i * 20}%`,
                right: `${5 + i * 10}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 section-padding w-full max-w-7xl mx-auto pt-36 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F4B400' }}>
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
                  Google Ads & PMAX
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.05]"
                style={{ color: 'var(--color-text)' }}
              >
                Capture Intent.{' '}
                <span className="font-serif italic" style={{ color: '#F4B400' }}>Convert Demand.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 text-base md:text-lg leading-[1.7] max-w-lg"
                style={{ color: 'var(--color-text-muted)' }}
              >
                When someone searches "best rooftop bar near me" -- that's intent you can't waste. We build Google Ads campaigns that capture demand at the exact moment it exists and convert it into revenue.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }} className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.03]" style={{ backgroundColor: '#F4B400', color: '#FFFFFF' }}>
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
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Search size={14} style={{ color: '#F4B400' }} />
                      <span className="text-[10px] font-barlow uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
                        Search Performance
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {GOOGLE_COLORS.map((c) => (
                        <div key={c} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {['best rooftop bar nyc', 'fine dining near me', 'luxury hotel restaurant', 'birthday dinner reservations'].map((q, i) => (
                      <motion.div
                        key={q}
                        initial={{ opacity: 0, x: -15 }}
                        animate={heroVis ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                        className="flex items-center gap-3 rounded-xl px-4 py-3"
                        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                      >
                        <Search size={12} style={{ color: 'var(--color-text-muted)' }} />
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{q}</span>
                        <span className="ml-auto text-[10px] font-bold" style={{ color: '#F4B400' }}>
                          {['#1', '#1', '#2', '#1'][i]}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { val: '#1', lab: 'Avg Rank' },
                      { val: '9x', lab: 'ROAS' },
                      { val: '$2.10', lab: 'Avg CPC' },
                    ].map((m, i) => (
                      <motion.div
                        key={m.lab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={heroVis ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: 1.1 + i * 0.08 }}
                        className="text-center rounded-xl p-3"
                        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                      >
                        <span className="text-lg font-bold" style={{ color: GOOGLE_COLORS[i] }}>{m.val}</span>
                        <p className="text-[9px] font-barlow uppercase tracking-wider mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{m.lab}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={typeRef} className="relative py-20 md:py-32 section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={typeVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-14">
            <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>Campaign Types</span>
            <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              Full-Spectrum{' '}<span className="font-serif italic" style={{ color: '#F4B400' }}>Google Coverage</span>
            </h2>
            <p className="mt-3 text-base max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
              From search intent to YouTube awareness. We architect campaigns across every Google surface that matters for your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAMPAIGN_TYPES.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                animate={typeVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                className="group rounded-2xl p-7 border card-hover"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${c.color}15` }}>
                  <c.icon size={20} style={{ color: c.color }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--color-text)' }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={funnelRef} className="relative py-20 md:py-32 section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={funnelVis ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
              <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
                Full-Funnel Strategy
              </span>
              <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tightest leading-[1.1]" style={{ color: 'var(--color-text)' }}>
                Every Stage of the{' '}<span className="font-serif italic" style={{ color: '#F4B400' }}>Customer Journey</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Most agencies only run search campaigns. We build full-funnel Google strategies that guide potential customers from first awareness to loyal repeat buyer -- with the right message at every stage.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={funnelVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 rounded-2xl p-6 border"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-gold)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(139, 105, 20, 0.1)' }}>
                    <Zap size={18} style={{ color: 'var(--color-gold)' }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>PMAX + Search Synergy</h4>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                      We don't let PMAX cannibalize your branded search. Our structure isolates brand, non-brand, and competitor queries to ensure every dollar is incremental.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={funnelVis ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="space-y-4">
                {FUNNEL_STAGES.map((s, i) => (
                  <motion.div
                    key={s.stage}
                    initial={{ opacity: 0, x: 15 }}
                    animate={funnelVis ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="rounded-2xl p-5 border"
                    style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{s.stage}</h3>
                      <span className="text-xs font-bold" style={{ color: s.color }}>{s.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden mb-3" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={funnelVis ? { width: `${s.pct}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                    </div>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{s.tactics}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={stratRef} className="relative py-20 md:py-32 section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={stratVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              Our Google Ads{' '}<span className="font-serif italic" style={{ color: '#F4B400' }}>Edge</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Keyword-Level Bidding Strategy', desc: 'We don\'t use broad match and hope for the best. Exact match, phrase match, and negative keyword sculpting ensure every click has intent.', icon: Search },
              { title: 'Conversion-Optimized Landing Pages', desc: 'Each campaign links to purpose-built landing pages designed for the specific query. Not your homepage -- a conversion system.', icon: Monitor },
              { title: 'First-Party Data Audiences', desc: 'Customer Match, RLSA, and similar audiences built from your actual guest data. Not generic interest targeting.', icon: BarChart2 },
              { title: 'Real-Time Budget Allocation', desc: 'Dayparting, geo-bidding, and device adjustments that shift budget to where conversions are happening right now.', icon: TrendingUp },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={stratVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="group rounded-2xl p-8 border card-hover"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${GOOGLE_COLORS[i]}15` }}>
                  <item.icon size={22} style={{ color: GOOGLE_COLORS[i] }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="relative py-24 md:py-32 section-padding overflow-hidden" style={{ backgroundColor: '#F4B400' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ backgroundColor: '#EA4335' }} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2 initial={{ opacity: 0, y: 30 }} animate={ctaVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
                className="text-3xl md:text-5xl font-bold tracking-tightest leading-[1.1]" style={{ color: '#1A1A1A' }}>
                Ready to own page one for{' '}<span className="font-serif italic opacity-70">your market?</span>
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={ctaVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-base max-w-md" style={{ color: 'rgba(26,26,26,0.65)' }}>
                Free Google Ads audit. We'll analyze your current campaigns, keyword strategy, and conversion tracking -- then show you the revenue you're leaving on the table.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={ctaVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 }} className="mt-8">
                <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.02]" style={{ backgroundColor: '#1A1A1A', color: '#F4B400' }}>
                  Get Your Free Audit <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={ctaVis ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:block">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" alt="Analytics and search performance" className="w-full h-full object-cover opacity-80" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
