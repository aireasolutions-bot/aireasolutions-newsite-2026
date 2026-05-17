import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useSEO } from '../../hooks/useSEO';
import { seoEngage } from '../../data/seoConfig';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Camera, Video, Palette, Sparkles, FileImage } from 'lucide-react';
import InteractiveFeed from '../../components/engage/InteractiveFeed';

const SERVICES = [
  { icon: Users, title: 'Social Media Strategy', description: 'A unified social presence that reflects your brand, not a content calendar filled by someone who\'s never visited your venue.' },
  { icon: Sparkles, title: 'AI-Powered Creatives', description: 'AI-generated photoshoots, product shots, and lifestyle content at a fraction of traditional production costs.' },
  { icon: Video, title: 'Video Production', description: 'From Reels to long-form brand storytelling. Capture the energy, atmosphere, and soul of your space.' },
  { icon: Camera, title: 'Ad Creatives', description: 'Performance-focused creative assets designed for Meta, Google, and beyond. Rapid iteration, always on-brand.' },
  { icon: Palette, title: 'Brand Identity', description: 'Defining and evolving your visual brand — from color palettes and typography to photography direction.' },
  { icon: FileImage, title: 'Event Collateral', description: 'Flyers, menus, invitations — everything your brand needs to show up consistently at every touchpoint.' },
];

const CONTENT_TYPES = [
  { type: 'AI Photoshoots', desc: 'Magazine-quality imagery generated for your brand', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
  { type: 'Video Production', desc: 'Cinematic brand stories that move audiences', img: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&q=80' },
  { type: 'Social Content', desc: 'Scroll-stopping posts that build culture', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80' },
  { type: 'Ad Creatives', desc: 'Performance-optimized assets at scale', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80' },
];

export default function EngagePage() {
  useSEO(seoEngage);
  const { ref: heroRef, isInView: heroVis } = useInView();
  const { ref: servRef, isInView: servVis } = useInView();
  const { ref: studioRef, isInView: studioVis } = useInView();
  const { ref: ctaRef, isInView: ctaVis } = useInView();

  return (
    <>
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="absolute inset-0 grain-overlay" />
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[25%] right-[20%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.08]" style={{ backgroundColor: '#6BA5C8' }} />
        </div>

        <div className="relative z-10 section-padding w-full max-w-7xl mx-auto pt-36 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#6BA5C8' }}>
                  <Camera size={20} color="#F5F1E8" />
                </div>
                <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>Social Media & Content</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.05]" style={{ color: 'var(--color-text)' }}>
                Culture Isn't Created by Algorithms.{' '}
                <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>It's Created by People.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 text-base md:text-lg leading-[1.7] max-w-lg" style={{ color: 'var(--color-text-muted)' }}>
                Great social media happens when someone understands what your brand stands for, who your guests are, and what makes your space unlike anything else in the city.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }} className="mt-8">
                <Link to="/contact" className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.03]" style={{ backgroundColor: '#6BA5C8', color: '#F5F1E8' }}>
                  Book a Strategy Call <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={heroVis ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {CONTENT_TYPES.map((c, i) => (
                  <motion.div
                    key={c.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroVis ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    className={`rounded-2xl overflow-hidden relative group ${i === 0 ? 'row-span-2' : ''}`}
                  >
                    <img src={c.img} alt={c.type} className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${i === 0 ? 'h-full' : 'h-48'}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white text-sm font-bold">{c.type}</p>
                      <p className="text-white/60 text-[10px]">{c.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <InteractiveFeed />

      <section ref={servRef} className="relative py-20 md:py-32 section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={servVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
            <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>Creative Services</span>
            <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              The Engage{' '}<span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Suite</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={servVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.08 * i }}
                className="group rounded-2xl p-7 border card-hover" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: 'rgba(107, 165, 200, 0.1)' }}>
                  <s.icon size={20} style={{ color: '#6BA5C8' }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--color-text)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={studioRef} className="relative py-20 md:py-32 section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={studioVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-14">
            <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>AIREA Studio</span>
            <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              Full-Service Content{' '}<span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Production</span>
            </h2>
            <p className="mt-3 text-base max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
              From AI-powered photoshoots to cinematic brand films. Everything your brand needs to stand out in a noisy feed.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={studioVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--color-border)' }}>
            <div className="grid md:grid-cols-2">
              <div className="aspect-[4/3] md:aspect-auto">
                <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80" alt="AIREA Studio production" className="w-full h-full object-cover" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center" style={{ backgroundColor: 'var(--color-surface)' }}>
                <h3 className="text-xl md:text-2xl font-bold tracking-tightest mb-4" style={{ color: 'var(--color-text)' }}>
                  Where AI Meets{' '}<span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Artistry</span>
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
                  AIREA Studio combines AI-powered creative tools with human art direction to produce content that looks like it belongs in Vogue Business — at a fraction of traditional production costs.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[{ val: '10x', lab: 'Faster Production' }, { val: '70%', lab: 'Cost Reduction' }, { val: '50+', lab: 'Assets / Month' }, { val: 'Magazine', lab: 'Quality Standard' }].map((s) => (
                    <div key={s.lab} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                      <span className="text-lg font-bold" style={{ color: 'var(--color-gold)' }}>{s.val}</span>
                      <p className="text-[10px] font-barlow uppercase tracking-wider mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{s.lab}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={ctaRef} className="relative py-24 md:py-32 section-padding overflow-hidden" style={{ backgroundColor: '#6BA5C8' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ backgroundColor: '#F5F1E8' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={ctaVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-bold tracking-tightest text-white leading-[1.1]">
            Ready to build a brand guests{' '}<span className="font-serif italic opacity-80">can't stop sharing?</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={ctaVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }} className="mt-8">
            <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-full bg-white transition-all duration-300 hover:scale-[1.02]" style={{ color: '#6BA5C8' }}>
              Book Your Strategy Call <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
