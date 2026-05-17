import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useSEO } from '../../hooks/useSEO';
import { seoReach } from '../../data/seoConfig';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MessageSquare, Database, RefreshCw, Heart } from 'lucide-react';
import ReachEmailSlideshow from '../../components/reach/ReachEmailSlideshow';

const SERVICES = [
  { icon: Mail, title: 'Email Marketing', description: 'Strategy, design, copywriting, and automation. Every email drives action, not just fills inboxes.' },
  { icon: MessageSquare, title: 'SMS Marketing', description: 'High-conversion direct communication for time-sensitive promotions, events, and reservations.' },
  { icon: Database, title: 'CRM Foundations', description: 'Setting up and integrating the right retention stack. Your guest data, unified and actionable.' },
  { icon: RefreshCw, title: 'Retention Flows', description: 'Lifecycle sequences triggered by guest behavior. From first visit to VIP, mapped and automated.' },
  { icon: Heart, title: 'Lifecycle Marketing', description: 'Turning one-time guests into regulars, and regulars into advocates. Every touchpoint is intentional.' },
];

const LIFECYCLE = [
  { stage: 'First Visit', desc: 'Welcome sequence + review request', pct: 100 },
  { stage: 'Return Guest', desc: 'Loyalty offers + personalized recs', pct: 82 },
  { stage: 'Regular', desc: 'VIP access + exclusive events', pct: 65 },
  { stage: 'Advocate', desc: 'Referral programs + ambassador perks', pct: 45 },
];

export default function ReachPage() {
  useSEO(seoReach);
  const { ref: heroRef, isInView: heroVis } = useInView();
  const { ref: servRef, isInView: servVis } = useInView();
  const { ref: lifeRef, isInView: lifeVis } = useInView();
  const { ref: ctaRef, isInView: ctaVis } = useInView();

  return (
    <>
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="absolute inset-0 grain-overlay" />
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.08]" style={{ backgroundColor: '#C87E5F' }} />
        </div>

        <div className="relative z-10 section-padding w-full max-w-7xl mx-auto pt-36 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#C87E5F' }}>
                  <Mail size={20} color="#F5F1E8" />
                </div>
                <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>Owned Media & Retention</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.05]" style={{ color: 'var(--color-text)' }}>
                Your Existing Guests Are Your Greatest{' '}
                <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Growth Asset.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 text-base md:text-lg leading-[1.7] max-w-lg" style={{ color: 'var(--color-text-muted)' }}>
                Paid media brings new guests through the door. Owned media keeps them coming back. We build the infrastructure that turns a great first experience into lifetime loyalty.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }} className="mt-8">
                <Link to="/contact" className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.03]" style={{ backgroundColor: '#C87E5F', color: '#F5F1E8' }}>
                  Book a Strategy Call <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={heroVis ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="hidden lg:block">
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--color-surface)' }}>
                  <img src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80" alt="Email marketing" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, var(--color-bg) 100%)' }} />
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.9 }}
                  className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-5">
                  <div className="flex items-center gap-5">
                    {[{ val: '+29%', lab: 'Open Rate' }, { val: '+85%', lab: 'CTR' }, { val: '-29%', lab: 'Bounce' }].map((s) => (
                      <div key={s.lab}>
                        <span className="text-lg font-bold" style={{ color: 'var(--color-gold)' }}>{s.val}</span>
                        <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{s.lab}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={servRef} className="relative py-20 md:py-32 section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={servVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
            <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>Owned Media Channels</span>
            <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              The Reach{' '}<span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Toolkit</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={servVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.08 * i }}
                className="group rounded-2xl p-7 border card-hover" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: 'rgba(200, 126, 95, 0.1)' }}>
                  <s.icon size={20} style={{ color: '#C87E5F' }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--color-text)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={lifeRef} className="relative py-20 md:py-32 section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={lifeVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-14">
            <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>Guest Journey</span>
            <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              Lifecycle{' '}<span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Mapping</span>
            </h2>
            <p className="mt-3 text-base max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
              From first visit to brand advocate. Every touchpoint mapped, automated, and optimized.
            </p>
          </motion.div>

          <div className="space-y-4">
            {LIFECYCLE.map((l, i) => (
              <motion.div key={l.stage} initial={{ opacity: 0, x: -20 }} animate={lifeVis ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 * i }}
                className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{l.stage}</h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{l.desc}</p>
                  </div>
                  <span className="text-sm font-bold" style={{ color: 'var(--color-gold)' }}>{l.pct}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={lifeVis ? { width: `${l.pct}%` } : {}}
                    transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: '#C87E5F' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ReachEmailSlideshow />

      <section ref={ctaRef} className="relative py-24 md:py-32 section-padding overflow-hidden" style={{ backgroundColor: '#C87E5F' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ backgroundColor: '#F5F1E8' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={ctaVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-bold tracking-tightest text-white leading-[1.1]">
            Ready to turn guests into{' '}<span className="font-serif italic opacity-80">lifelong regulars?</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={ctaVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }} className="mt-8">
            <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-full bg-white transition-all duration-300 hover:scale-[1.02]" style={{ color: '#C87E5F' }}>
              Book Your Strategy Call <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
