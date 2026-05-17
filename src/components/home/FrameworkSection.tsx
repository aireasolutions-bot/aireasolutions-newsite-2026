import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { PILLARS } from '../../data/services';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import EmailShowcase from '../engage/EmailShowcase';

const PLATFORMS = [
  'Meta', 'Google Ads', 'Klaviyo', 'Mailchimp', 'HubSpot',
  'Shopify', 'Webflow', 'OpenAI', 'Stripe', 'Figma',
  'Notion', 'Slack', 'Zapier', 'Airtable', 'Semrush',
  'GA4', 'Hotjar', 'Vercel', 'AWS', 'Make',
];

const PLATFORM_COLORS: Record<string, string> = {
  'Meta': '#0081FB',
  'Google Ads': '#34A853',
  'Klaviyo': '#2E8B57',
  'Mailchimp': '#FFE01B',
  'HubSpot': '#FF7A59',
  'Shopify': '#96BF48',
  'Webflow': '#4353FF',
  'OpenAI': '#10A37F',
  'Stripe': '#635BFF',
  'Figma': '#F24E1E',
  'Notion': '#999',
  'Slack': '#E01E5A',
  'Zapier': '#FF4A00',
  'Airtable': '#18BFFF',
  'Semrush': '#FF642D',
  'GA4': '#E37400',
  'Hotjar': '#FD3A5C',
  'Vercel': '#888',
  'AWS': '#FF9900',
  'Make': '#6D00CC',
};

const AUTO_ADVANCE_MS = 5000;

function PlatformMarquee({ direction = 'left' }: { direction?: 'left' | 'right' }) {
  const platforms = direction === 'left' ? PLATFORMS : [...PLATFORMS].reverse();
  const doubled = [...platforms, ...platforms];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-3"
        animate={{ x: direction === 'left' ? [0, -(platforms.length * 128)] : [-(platforms.length * 128), 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((name, i) => {
          const color = PLATFORM_COLORS[name] || '#888';
          return (
            <div
              key={`${name}-${i}`}
              className="shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 hover:scale-105 cursor-default group"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
            >
              <div
                className="w-2 h-2 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-150"
                style={{ backgroundColor: color }}
              />
              <span
                className="text-xs font-semibold whitespace-nowrap transition-colors duration-300"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {name}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function PillarTimerBar({ active, total, progress }: { active: number; total: number; progress: number }) {
  return (
    <div className="flex gap-1.5 mt-6">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="h-1 rounded-full flex-1 overflow-hidden"
          style={{ backgroundColor: 'var(--color-border)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: i < active ? 'var(--color-gold)' : i === active ? 'var(--color-gold)' : 'transparent' }}
            initial={false}
            animate={{
              width: i < active ? '100%' : i === active ? `${progress}%` : '0%',
            }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      ))}
    </div>
  );
}

function FloatingOrb({ delay, size, x, y }: { delay: number; size: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        backgroundColor: 'var(--color-gold)',
        filter: `blur(${size * 0.6}px)`,
        opacity: 0.06,
      }}
      animate={{
        y: [0, -20, 0, 15, 0],
        x: [0, 10, 0, -8, 0],
        scale: [1, 1.15, 1, 0.95, 1],
      }}
      transition={{ duration: 12, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function ServicePill({ label, delay, color }: { label: string; delay: number; color: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -6 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      className="text-xs px-3.5 py-2 rounded-full border inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-default"
      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
      {label}
    </motion.span>
  );
}

export default function FrameworkSection() {
  const { ref, isInView } = useInView();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const current = PILLARS[active];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const goTo = useCallback((index: number) => {
    setActive(index);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!isInView || isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActive((a) => (a + 1) % PILLARS.length);
          return 0;
        }
        return prev + (100 / (AUTO_ADVANCE_MS / 50));
      });
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isInView, isPaused]);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 section-padding overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <FloatingOrb delay={0} size={200} x="5%" y="10%" />
      <FloatingOrb delay={3} size={150} x="80%" y="60%" />
      <FloatingOrb delay={6} size={120} x="50%" y="85%" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
          >
            <Zap size={12} style={{ color: 'var(--color-gold)' }} />
            <span className="text-[10px] font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
              The A.I.R.E.A. Methodology
            </span>
          </motion.div>

          <h2 className="mt-2 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
            Five Pillars. One System.{' '}
            <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>One Partner.</span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Integrated across the platforms that power modern growth.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-14 space-y-3"
        >
          <PlatformMarquee direction="left" />
          <PlatformMarquee direction="right" />
        </motion.div>

        <div
          className="grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-2">
              {PILLARS.map((pillar, i) => (
                <button
                  key={pillar.key}
                  onClick={() => goTo(i)}
                  className="w-full text-left px-5 py-4 rounded-xl transition-colors duration-300 flex items-center gap-4 group relative"
                >
                  {active === i && (
                    <motion.div
                      layoutId="pillar-active-bg"
                      className="absolute inset-0 rounded-xl border"
                      style={{
                        backgroundColor: 'var(--color-surface-elevated)',
                        borderColor: 'var(--color-border-strong)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <motion.span
                    className="relative z-10 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 transition-colors duration-300"
                    style={{
                      backgroundColor: active === i ? pillar.color : 'var(--color-border)',
                      color: active === i ? '#F5F1E8' : 'var(--color-text-muted)',
                    }}
                    animate={active === i ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {pillar.letter}
                  </motion.span>
                  <div className="relative z-10 flex-1 min-w-0">
                    <span
                      className="text-sm font-semibold block transition-colors duration-300"
                      style={{ color: active === i ? 'var(--color-text)' : 'var(--color-text-muted)' }}
                    >
                      {pillar.title}
                    </span>
                    <span className="text-xs hidden md:block truncate" style={{ color: 'var(--color-text-muted)' }}>
                      {pillar.tagline}
                    </span>
                  </div>
                  {active === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative z-10 w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: pillar.color }}
                    />
                  )}
                </button>
              ))}
            </div>

            <PillarTimerBar active={active} total={PILLARS.length} progress={progress} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              className="rounded-2xl p-8 md:p-10 border relative overflow-hidden"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', x: bgX, y: bgY }}
            >
              <motion.div
                className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ backgroundColor: current.color, filter: 'blur(100px)', opacity: 0.08 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: current.color }}
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <current.icon size={22} color="#F5F1E8" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{current.title}</h3>
                      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{current.tagline}</p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-6 relative z-10" style={{ color: 'var(--color-text-secondary)' }}>
                    {current.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    <AnimatePresence mode="wait">
                      {current.services.map((s, i) => (
                        <ServicePill key={`${current.key}-${s}`} label={s} delay={i * 0.04} color={current.color} />
                      ))}
                    </AnimatePresence>
                  </div>

                  <Link
                    to={current.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold group relative z-10"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    <motion.span
                      className="flex items-center gap-2"
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      Explore {current.title}
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </motion.span>
                  </Link>

                  {current.key === 'reach' && (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                      className="mt-8 pt-6 border-t"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <EmailShowcase compact />
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-lg group"
            style={{ backgroundColor: 'var(--color-accent)', color: '#F5F1E8' }}
          >
            See All Services
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
