import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useSEO } from '../hooks/useSEO';
import { seoAbout } from '../data/seoConfig';
import { Shield, TrendingUp, Users, Eye, Handshake, Target, Brain } from 'lucide-react';

const VALUES = [
  { icon: Shield, title: 'Ownership Over Excuses', desc: 'We don\'t explain why something didn\'t work. We fix it. Full accountability is the foundation.' },
  { icon: TrendingUp, title: 'Revenue Over Vanity', desc: 'Impressions don\'t pay rent. We build toward metrics that appear on a P&L statement.' },
  { icon: Users, title: 'Human-First, AI-Accelerated', desc: 'Relationships are built by people. AI is the engine we use to move faster and think sharper.' },
  { icon: Eye, title: 'Radical Transparency', desc: 'No black-box reporting. Clients see exactly what\'s working and what we\'re doing about what isn\'t.' },
  { icon: Handshake, title: 'Embedded, Not Transactional', desc: 'We sit inside your business, understand your culture, and make decisions as if our name is on the lease.' },
  { icon: Target, title: 'Precision Over Volume', desc: 'A smaller roster of deeply embedded partnerships always outperforms a sprawling client list.' },
  { icon: Brain, title: 'Ethical AI Adoption', desc: 'Every AI system we deploy is purpose-built, tested, and transparent in how it operates.' },
];

export default function AboutPage() {
  useSEO(seoAbout);
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: storyRef, isInView: storyVisible } = useInView();
  const { ref: valuesRef, isInView: valuesVisible } = useInView();
  const { ref: leaderRef, isInView: leaderVisible } = useInView();

  return (
    <>
      <section ref={heroRef} className="relative min-h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="absolute inset-0 grain-overlay" />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[20%] right-[20%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.1]"
            style={{ backgroundColor: 'var(--color-gold)' }}
          />
        </div>

        <div className="relative z-10 section-padding w-full max-w-7xl mx-auto pt-36 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]"
                style={{ color: 'var(--color-gold)' }}
              >
                The Story Behind The System
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-4 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.05]"
                style={{ color: 'var(--color-text)' }}
              >
                AIREA Was Born From a Problem{' '}
                <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>
                  We Couldn't Stop Seeing.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 text-base md:text-lg leading-[1.7] max-w-lg"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Nicolas Santos spent years inside some of the world's largest brands. He watched hospitality
                groups burn budget across three agencies with no accountability, no unified strategy, and
                no single person willing to own the outcome. He built AIREA to be that person. At scale.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={heroVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                    alt="AIREA team in action"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, var(--color-bg) 100%)' }} />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-5"
                >
                  <div className="flex items-center gap-5">
                    {[{ val: '2023', lab: 'Founded' }, { val: 'NYC', lab: '& Miami' }, { val: '100+', lab: 'Use Cases' }].map((s) => (
                      <div key={s.lab}>
                        <span className="text-lg font-bold" style={{ color: 'var(--color-gold)' }}>{s.val}</span>
                        <p className="text-[10px] font-barlow uppercase tracking-wider mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{s.lab}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={storyRef} className="relative py-24 md:py-32 section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={storyVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="rounded-2xl p-8 md:p-10 border relative overflow-hidden"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] opacity-10" style={{ backgroundColor: 'var(--color-gold)' }} />
              <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
                Why The Name Means Something
              </span>
              <h2 className="mt-4 text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
                Named for{' '}
                <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Aria.</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                AIREA is named for Nicolas's first daughter, Aria. This is not a venture-backed startup
                optimized for a flip. It is the culmination of everything he has learned, built, and
                believed -- brought to life for the brands that deserve real partnership. That personal
                weight lives in every client relationship. Every campaign. Every result.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={storyVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl p-8 md:p-10 border relative overflow-hidden"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] opacity-10" style={{ backgroundColor: 'var(--color-accent)' }} />
              <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
                The Era We Operate In
              </span>
              <h2 className="mt-4 text-2xl md:text-4xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
                Clarity Is{' '}
                <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>the Product.</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                We are living through the most significant disruption to marketing in a generation.
                AI, LLMs, automation, and an ocean of noise have changed what it means to compete
                for attention. AIREA sits at the intersection. Human-first, AI-accelerated. We guide
                each brand through their AI maturity journey -- ethically, practically, and with full transparency.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={valuesRef} className="relative py-24 md:py-36 section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
              What We Stand For
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              Our{' '}
              <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Values.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 25 }}
                animate={valuesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                className="group rounded-2xl p-7 border card-hover"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: 'var(--color-border)' }}>
                  <v.icon size={20} style={{ color: 'var(--color-gold)' }} />
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={leaderRef}
        className="relative py-24 md:py-36 section-padding overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={leaderVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
                <img
                  src="https://i.imgur.com/XZHaFHI.jpeg"
                  alt="Nicolas Santos, Founder & Fractional CMO"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white text-lg font-bold">Nicolas Santos</p>
                  <p className="text-white/70 text-xs font-barlow uppercase tracking-wider">Founder & Fractional CMO</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={leaderVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
                Leadership
              </span>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
                The Person in{' '}
                <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>the Room.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Nicolas leads strategy across every AIREA partnership. He is not the person you meet
                in the pitch and never hear from again. He is the person in the room -- on the call,
                in the data, and accountable to every result.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-6">
                {[
                  { label: 'Revenue Focus', desc: 'KPIs tied to P&L' },
                  { label: 'Systems Architect', desc: 'Automated growth' },
                  { label: 'Team Leadership', desc: 'Managing vendors' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={leaderVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    className="rounded-xl p-4"
                    style={{ backgroundColor: 'var(--color-surface)' }}
                  >
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{item.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.blockquote
                initial={{ opacity: 0 }}
                animate={leaderVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-10 pl-5 border-l-2"
                style={{ borderColor: 'var(--color-gold)' }}
              >
                <p className="text-sm font-serif italic leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  "We don't ask what you want to post. We ask what needs to move the business forward."
                </p>
              </motion.blockquote>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
