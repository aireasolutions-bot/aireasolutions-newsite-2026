import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useSEO } from '../../hooks/useSEO';
import { seoIntelligence } from '../../data/seoConfig';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Cpu, Cog, Wrench, GraduationCap, Sparkles } from 'lucide-react';

const SERVICES = [
  { icon: Brain, title: 'AI Workflow Design', description: 'Custom AI workflows designed around your specific operational bottlenecks. Purpose-built systems, not off-the-shelf demos.' },
  { icon: Sparkles, title: 'AI Creative Suite', description: 'AI-generated photoshoots, product shots, lifestyle assets, and ad creatives at a fraction of traditional production cost.' },
  { icon: Cog, title: 'Tech Stack Optimization', description: 'Audit and streamline the tools you\'re already paying for. Eliminate redundancy, integrate systems, reduce overhead.' },
  { icon: Wrench, title: 'Internal Tool Development', description: 'Custom-built tools for your specific operational needs. From reservation analytics to inventory management.' },
  { icon: Cpu, title: 'Process Automation', description: 'From reservation management to reporting to vendor coordination — automate the repetitive so your team focuses on guests.' },
  { icon: GraduationCap, title: 'AI Education & Training', description: 'Guided AI maturity journeys for your team. Workshops, playbooks, and ongoing support to build internal AI fluency.' },
];

const WORKFLOW_STEPS = [
  { step: '01', title: 'Audit', desc: 'Map every manual process and identify automation opportunities.' },
  { step: '02', title: 'Design', desc: 'Architect custom AI workflows tailored to your operations.' },
  { step: '03', title: 'Build', desc: 'Develop, test, and integrate systems into your existing stack.' },
  { step: '04', title: 'Optimize', desc: 'Monitor, refine, and scale as your business evolves.' },
];

export default function IntelligencePage() {
  useSEO(seoIntelligence);
  const { ref: heroRef, isInView: heroVis } = useInView();
  const { ref: servRef, isInView: servVis } = useInView();
  const { ref: flowRef, isInView: flowVis } = useInView();
  const { ref: ctaRef, isInView: ctaVis } = useInView();

  return (
    <>
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="absolute inset-0 grain-overlay" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[15%] right-[20%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.1]"
            style={{ backgroundColor: '#8B6914' }}
          />
        </div>

        <div className="relative z-10 section-padding w-full max-w-7xl mx-auto pt-36 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#8B6914' }}>
                  <Brain size={20} color="#F5F1E8" />
                </div>
                <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>AI Workflows & Technology</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.05]"
                style={{ color: 'var(--color-text)' }}
              >
                Every Brand Has
                <br />
                Bottlenecks.{' '}
                <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>We Remove Them.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }} className="mt-8 text-base md:text-lg leading-[1.7] max-w-lg" style={{ color: 'var(--color-text-muted)' }}>
                AI is the most powerful tool in marketing history. It is also the most misused.
                We build workflows that solve real problems — not demonstrations.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }} className="mt-8">
                <Link to="/contact" className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.03]" style={{ backgroundColor: '#8B6914', color: '#F5F1E8' }}>
                  Book a Strategy Call
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={heroVis ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="hidden lg:block">
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--color-surface)' }}>
                  <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80" alt="AI technology visualization" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(139,105,20,0.5) 0%, transparent 60%)' }} />
                </div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 right-8 glass-card rounded-xl px-5 py-3"
                >
                  <div className="flex items-center gap-2">
                    <Cpu size={14} style={{ color: 'var(--color-gold)' }} />
                    <span className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>AI Processing</span>
                  </div>
                  <div className="mt-2 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [8, 20, 8] }}
                        transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity }}
                        className="w-2 rounded-full"
                        style={{ backgroundColor: 'var(--color-gold)' }}
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 1 }} className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-5">
                  <p className="text-[10px] font-barlow uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>Automation Impact</p>
                  <div className="flex items-center gap-5">
                    {[{ val: '70%', lab: 'Time Saved' }, { val: '3x', lab: 'Output Speed' }].map((s) => (
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
            <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>Capabilities</span>
            <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              Intelligence{' '}<span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Toolkit</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={servVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.08 * i }}
                className="group rounded-2xl p-7 border card-hover" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: 'rgba(139, 105, 20, 0.1)' }}>
                  <s.icon size={20} style={{ color: '#8B6914' }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--color-text)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={flowRef} className="relative py-20 md:py-32 section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={flowVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-14">
            <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>Our Process</span>
            <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              From Bottleneck to{' '}<span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Breakthrough</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW_STEPS.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} animate={flowVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.12 * i }}
                className="relative rounded-2xl p-6 border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <span className="text-4xl font-bold opacity-10" style={{ color: 'var(--color-gold)' }}>{s.step}</span>
                <h3 className="text-lg font-bold mt-2 mb-2" style={{ color: 'var(--color-text)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{s.desc}</p>
                {i < 3 && <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px" style={{ backgroundColor: 'var(--color-border-strong)' }} />}
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={flowVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 rounded-2xl p-8 md:p-10 border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>Philosophy</span>
                <h3 className="mt-3 text-xl md:text-2xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
                  Human-First.{' '}<span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>AI-Accelerated.</span>
                </h3>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  We are not an AI company that happens to do marketing. We are marketers who wield AI to deliver results faster, cheaper, and smarter. AI is the engine under the hood. People are why clients stay.
                </p>
              </div>
              <div className="aspect-[3/2] rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" alt="Team collaboration" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={ctaRef} className="relative py-24 md:py-32 section-padding overflow-hidden" style={{ backgroundColor: '#8B6914' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ backgroundColor: '#F5F1E8' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={ctaVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-bold tracking-tightest text-white leading-[1.1]">
            Ready to build AI systems that{' '}<span className="font-serif italic opacity-80">actually work?</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={ctaVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="mt-4 text-base text-white/60">
            Not demos. Not dashboards. Systems that save time, cut cost, and scale output.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={ctaVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 }} className="mt-8">
            <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-full bg-white transition-all duration-300 hover:scale-[1.02]" style={{ color: '#8B6914' }}>
              Book Your Strategy Call
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
