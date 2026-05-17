import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowDown, Sparkles, Shield, Volume2, VolumeX, Play, Check, X, Maximize2,
  Image as ImageIcon, Users, Film, Video, Megaphone, MapPin, Box, ShoppingBag,
} from 'lucide-react';
import {
  NOVA_HERO_VIDEO, SHOWCASE, NovaShowcase, PipelineBoard, VideoLightbox,
  useNoSaveGuards, type ShowcaseItem,
} from '../components/home/NovaSection';
import { useSEO } from '../hooks/useSEO';
import { seoNova } from '../data/seoConfig';

const HERO_METRICS = [
  { k: '80–150', v: 'Assets / Month' },
  { k: '5–7 days', v: 'UGC Batch' },
  { k: '$40–120', v: 'Cost / asset' },
  { k: '10–50+', v: 'Variations / concept' },
];

const COMPARE_ROWS: Array<{ dim: string; trad: string; nova: string }> = [
  { dim: 'Time to deliver UGC batch', trad: '4–6 weeks', nova: '5–7 days' },
  { dim: 'Cost per UGC asset', trad: '$400–$1,500', nova: '$40–$120' },
  { dim: 'Variations per concept', trad: '1–2', nova: '10–50+' },
  { dim: 'Multi-ethnicity casting', trad: 'Multiple shoots required', nova: 'Built into a single brief' },
  { dim: 'Pre-sale product rendering', trad: 'Not feasible', nova: 'Standard deliverable' },
  { dim: 'Reshoots / iteration', trad: 'Re-book studio + models', nova: 'Re-render in hours' },
  { dim: 'Brand consistency at scale', trad: 'Variable across batches', nova: 'Locked' },
];

type Deliverable = {
  num: string;
  icon: typeof ImageIcon;
  title: string;
  tagline: string;
  bullets: string[];
  media: string;
  mediaType: 'video' | 'image';
};

const DELIVERABLES: Deliverable[] = [
  {
    num: '01',
    icon: ImageIcon,
    title: 'Product Imagery',
    tagline: 'Editorial campaign imagery — Korean dewy minimalism, sun-soaked Latin warmth, clinical modernity.',
    bullets: [
      'Hero shots & lifestyle scenes',
      'Texture macros & ingredient renders',
      'Pre-sale renders for unreleased SKUs',
      'On-brand art direction every frame',
    ],
    media: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=80',
    mediaType: 'image',
  },
  {
    num: '02',
    icon: Users,
    title: 'UGC Library',
    tagline: 'Multi-ethnicity casting without commissioning eight separate shoots — each persona with distinct voice.',
    bullets: [
      'Korean, Latina, Black, Asian-American, mixed',
      'Bathroom mirror, GRWM, ritual sequences',
      'Bilingual scripting (English + Spanish)',
      'Founder-style extensions when authorized',
    ],
    media: SHOWCASE.find((s) => s.id === 's8')?.src || SHOWCASE[0].src,
    mediaType: 'video',
  },
  {
    num: '03',
    icon: Film,
    title: 'Commercials & TV Spots',
    tagline: 'Cinematic spots ready for streaming, OOH, and broadcast — founder, ingredient, or ritual-led.',
    bullets: [
      '15s, 30s, 60s formats',
      'Hero narrative cuts',
      'Platform-native conforms',
      'Multi-language voice-over & subs',
    ],
    media: SHOWCASE.find((s) => s.id === 's11')?.src || SHOWCASE[1].src,
    mediaType: 'video',
  },
  {
    num: '04',
    icon: Video,
    title: 'Product Videos',
    tagline: '360° rotations, in-use macro shots, ingredient-drop slow motion. The ritual as a visual language.',
    bullets: [
      'Step-by-step tutorial assets',
      'Ingredient hero drops',
      'Texture & application macros',
      'Ritual sequence edits',
    ],
    media: SHOWCASE.find((s) => s.id === 's6')?.src || SHOWCASE[2].src,
    mediaType: 'video',
  },
  {
    num: '05',
    icon: Megaphone,
    title: 'Social Creatives & Ads',
    tagline: 'Meta, TikTok, and YouTube Shorts — native formats optimized for each algorithm.',
    bullets: [
      'Feed, Reels, Stories · static + video',
      'Before / after sets, transformation arcs',
      'Carousel ads & DCO variants',
      '50+ ad variations per month',
    ],
    media: SHOWCASE.find((s) => s.id === 's4')?.src || SHOWCASE[3].src,
    mediaType: 'video',
  },
  {
    num: '06',
    icon: MapPin,
    title: 'Pop-Up & Activation',
    tagline: 'Renders of pop-up retail concepts for partnerships and regional rollouts.',
    bullets: [
      'Environment renders for pitches',
      'City-specific localized creatives',
      'Influencer event packs',
      'Esthetician training visuals',
    ],
    media: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=1200&q=80',
    mediaType: 'image',
  },
  {
    num: '07',
    icon: Box,
    title: 'Pre-Sale Rendering',
    tagline: 'Hyper-realistic photography and motion before production is finalized. Test demand before manufacturing.',
    bullets: [
      'Pre-launch teaser campaigns',
      'Investor & retail buyer decks',
      'Influencer seeding before samples',
      'Low-cost concept validation',
    ],
    media: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=1200&q=80',
    mediaType: 'image',
  },
  {
    num: '08',
    icon: ShoppingBag,
    title: 'Upsell & AOV Engine',
    tagline: 'Dedicated creative for ancillary products — ritual sets, bags, accessories — that move AOV.',
    bullets: [
      'Shopify cart cross-sell modules',
      "'Complete the Ritual' variations",
      'Email-embedded upsell modules',
      'Bundle-focused TikTok & Reels',
    ],
    media: SHOWCASE.find((s) => s.id === 's7')?.src || SHOWCASE[4].src,
    mediaType: 'video',
  },
];

/* ======================== HERO ======================== */

function NovaHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end start'] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  return (
    <section
      ref={scrollRef}
      className="relative min-h-[100vh] w-full overflow-hidden"
      style={{ backgroundColor: '#0A0907' }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <motion.div className="absolute inset-0" style={{ y: yParallax }}>
        <video
          ref={videoRef}
          src={NOVA_HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noremoteplayback noplaybackrate"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          onCanPlay={(e) => { (e.currentTarget as HTMLVideoElement).play().catch(() => {}); }}
        />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(10,9,7,0.55) 0%, rgba(10,9,7,0.35) 35%, rgba(10,9,7,0.78) 75%, rgba(10,9,7,0.95) 100%)' }} />
      <div className="absolute inset-0 pointer-events-none opacity-40 grain-overlay" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>\")",
        }}
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col min-h-[100vh] section-padding max-w-7xl mx-auto pt-40 pb-12"
      >
        <div className="flex items-center justify-between text-white/70 mono-eyebrow">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-gold)' }} />
            NOVA · v2.4 LIVE
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Sparkles size={12} style={{ color: 'var(--color-gold)' }} />
            <span>AIREA × NOVA — AI Creative Engine</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center pt-24 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mono-eyebrow text-white/70 mb-6"
          >
            [Slide 01] — Introducing
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="display-serif text-white leading-[0.82] tracking-tight relative"
            style={{ fontSize: 'clamp(5rem, 18vw, 16rem)' }}
          >
            NOVA
            <span
              className="inline-block ml-3 align-super"
              style={{ color: 'var(--color-gold)', fontSize: '0.3em', letterSpacing: '0.02em' }}
            >
              ✦
            </span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.35 }}
            className="mt-6 h-px origin-left"
            style={{ backgroundColor: 'rgba(201,169,110,0.5)' }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="display-serif mt-8 text-white/95 max-w-3xl"
            style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.25rem)', lineHeight: 1.18 }}
          >
            The AI Creative Engine —{' '}
            <span className="ital-accent" style={{ color: 'var(--color-gold)' }}>
              engineered for your brand DNA.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.03]"
              style={{ backgroundColor: 'var(--color-gold)', color: '#0E0C0A' }}
            >
              Request a NOVA Sample
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#nova-showcase"
              className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold rounded-full border transition-all duration-300 hover:scale-[1.03]"
              style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'white', backgroundColor: 'rgba(15,14,12,0.35)', backdropFilter: 'blur(10px)' }}
            >
              <Play size={13} fill="currentColor" />
              Watch the Showreel
            </a>
            <button
              onClick={() => setMuted((m) => !m)}
              className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: 'rgba(15,14,12,0.55)', border: '1px solid rgba(255,255,255,0.18)', color: 'white' }}
              aria-label={muted ? 'Unmute hero video' : 'Mute hero video'}
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <button
              onClick={() => {
                const section = scrollRef.current as (HTMLDivElement & { webkitRequestFullscreen?: () => Promise<void> }) | null;
                const v = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
                try {
                  if (section?.requestFullscreen) return void section.requestFullscreen();
                  if (section?.webkitRequestFullscreen) return void section.webkitRequestFullscreen();
                  if (v?.webkitEnterFullscreen) return void v.webkitEnterFullscreen();
                } catch {
                  /* noop */
                }
              }}
              className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: 'rgba(15,14,12,0.55)', border: '1px solid rgba(255,255,255,0.18)', color: 'white' }}
              aria-label="Fullscreen hero video"
            >
              <Maximize2 size={14} />
            </button>
          </motion.div>
        </div>

        {/* Metrics strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          {HERO_METRICS.map((m) => (
            <div key={m.v} className="px-5 py-5 md:py-6" style={{ backgroundColor: 'rgba(15,14,12,0.72)', backdropFilter: 'blur(8px)' }}>
              <div className="mono-eyebrow text-white/55">{m.v}</div>
              <div className="display-serif mt-1.5 text-2xl md:text-3xl" style={{ color: 'var(--color-gold)' }}>
                {m.k}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Footer row */}
        <div className="mt-8 flex items-center justify-between text-white/60 mono-eyebrow">
          <motion.a
            href="#nova-compare"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            Scroll to descend
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
              <ArrowDown size={12} />
            </motion.span>
          </motion.a>
          <div className="flex items-center gap-2">
            <Shield size={10} />
            Protected · No download
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ======================== COMPARE ======================== */

function CompareSection() {
  return (
    <section
      id="nova-compare"
      className="relative py-24 md:py-36 section-padding overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="absolute top-10 right-10 w-[480px] h-[480px] rounded-full blur-[180px] pointer-events-none" style={{ backgroundColor: 'var(--color-gold)', opacity: 0.08 }} />

      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="mono-eyebrow mb-3" style={{ color: 'var(--color-text-muted)' }}>
              [03.1] — Comparative · Traditional vs. NOVA
            </p>
            <h2 className="display-serif text-3xl md:text-5xl lg:text-6xl leading-[1.02]" style={{ color: 'var(--color-text)' }}>
              Where traditional gives you <span className="ital-accent">ten assets</span>,
              <br />
              NOVA delivers <span style={{ color: 'var(--color-gold)' }}>one-fifty</span>.
            </h2>
          </div>
          <p className="text-sm max-w-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Same brief. One-tenth the spend. Ten times the variation. Locked to your brand, every frame.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden border"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
        >
          <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b" style={{ borderColor: 'var(--color-border)' }}>
            <div className="px-5 md:px-8 py-5 mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>
              Dimension
            </div>
            <div className="px-5 md:px-8 py-5 mono-eyebrow border-l" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
              Traditional Production
            </div>
            <div className="px-5 md:px-8 py-5 mono-eyebrow border-l flex items-center gap-2" style={{ color: 'var(--color-gold)', borderColor: 'var(--color-border)', backgroundColor: 'rgba(201,169,110,0.06)' }}>
              NOVA
              <span style={{ color: 'var(--color-gold)' }}>✦</span>
            </div>
          </div>
          {COMPARE_ROWS.map((row, i) => (
            <motion.div
              key={row.dim}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="grid grid-cols-[1.2fr_1fr_1fr] border-b last:border-b-0 group"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="px-5 md:px-8 py-5 text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                {row.dim}
              </div>
              <div className="px-5 md:px-8 py-5 border-l text-sm flex items-center gap-3" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
                <X size={14} className="shrink-0 opacity-50" />
                {row.trad}
              </div>
              <div className="px-5 md:px-8 py-5 border-l text-sm flex items-center gap-3 transition-colors group-hover:bg-[var(--color-surface-elevated)]" style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)' }}>
                <Check size={14} className="shrink-0" style={{ color: 'var(--color-gold)' }} />
                <span>{row.nova}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ======================== DELIVERABLES ======================== */

function DeliverableRow({ item, index }: { item: Deliverable; index: number }) {
  const Icon = item.icon;
  const reversed = index % 2 === 1;
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (item.mediaType !== 'video') return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = videoRef.current;
          if (e.isIntersecting) {
            setShouldLoad(true);
            if (v) v.play().catch(() => {});
          } else if (v) {
            v.pause();
          }
        });
      },
      { rootMargin: '300px', threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [item.mediaType]);

  const requestFullscreen = () => {
    const el = wrapRef.current as (HTMLDivElement & { webkitRequestFullscreen?: () => Promise<void> }) | null;
    const v = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    try {
      if (el?.requestFullscreen) return void el.requestFullscreen();
      if (el?.webkitRequestFullscreen) return void el.webkitRequestFullscreen();
      if (v?.webkitEnterFullscreen) return void v.webkitEnterFullscreen();
    } catch {
      /* noop */
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}
    >
      <div ref={wrapRef} className="relative rounded-3xl overflow-hidden border aspect-[4/5] md:aspect-[16/10] group" style={{ borderColor: 'var(--color-border)', backgroundColor: '#0A0907' }}>
        {item.mediaType === 'video' ? (
          <>
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: '#0A0907' }}>
                <div
                  className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: 'var(--color-gold)', borderTopColor: 'transparent' }}
                />
              </div>
            )}
            {shouldLoad && (
              <video
                ref={videoRef}
                src={item.media}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                disablePictureInPicture
                disableRemotePlayback
                controlsList="nodownload noremoteplayback noplaybackrate"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onLoadedData={() => setLoaded(true)}
                onCanPlay={(e) => { setLoaded(true); (e.currentTarget as HTMLVideoElement).play().catch(() => {}); }}
                className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
            <button
              type="button"
              onClick={requestFullscreen}
              className="absolute bottom-4 right-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 opacity-0 group-hover:opacity-100 z-10"
              style={{ backgroundColor: 'rgba(15,14,12,0.72)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
              aria-label="Fullscreen"
            >
              <Maximize2 size={14} />
            </button>
          </>
        ) : (
          <img src={item.media} alt={item.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]" />
        )}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)' }} />
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md" style={{ backgroundColor: 'rgba(15,14,12,0.65)', border: '1px solid rgba(201,169,110,0.35)' }}>
          <span className="mono-eyebrow" style={{ color: 'var(--color-gold)' }}>
            [{item.num}]
          </span>
          <span className="mono-eyebrow text-white/80">NOVA Output</span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center border" style={{ borderColor: 'var(--color-border-strong)', backgroundColor: 'var(--color-surface)' }}>
            <Icon size={20} style={{ color: 'var(--color-gold)' }} />
          </div>
          <span className="display-serif text-3xl md:text-4xl" style={{ color: 'var(--color-text-muted)' }}>
            [{item.num}]
          </span>
        </div>
        <h3 className="display-serif text-3xl md:text-5xl leading-[1.04]" style={{ color: 'var(--color-text)' }}>
          {item.title}
        </h3>
        <p className="mt-4 text-base md:text-lg leading-relaxed max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
          {item.tagline}
        </p>
        <ul className="mt-7 space-y-3">
          {item.bullets.map((b, i) => (
            <motion.li
              key={b}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-start gap-3 text-sm md:text-base"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-gold)' }} />
              {b}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

function DeliverablesSection() {
  return (
    <section
      className="relative py-24 md:py-36 section-padding overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16 md:mb-24">
          <div className="max-w-3xl">
            <p className="mono-eyebrow mb-3" style={{ color: 'var(--color-text-muted)' }}>
              [03.2] — Output · Eight Deliverables · One Engine
            </p>
            <h2 className="display-serif text-3xl md:text-5xl lg:text-6xl leading-[1.02]" style={{ color: 'var(--color-text)' }}>
              Eight deliverables.
              <br />
              <span className="ital-accent">One creative engine.</span>
            </h2>
          </div>
          <p className="text-sm max-w-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Every format modern brands need, produced on a single brand-locked pipeline.
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {DELIVERABLES.map((d, i) => (
            <DeliverableRow key={d.num} item={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================== PAGE ======================== */

export default function NovaPage() {
  useSEO(seoNova);
  const [lightbox, setLightbox] = useState<ShowcaseItem | null>(null);
  useNoSaveGuards();

  return (
    <AnimatePresence>
      <NovaHero />

      <section
        id="nova-showcase"
        className="relative py-24 md:py-32 section-padding overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.06 }} />
        <div className="max-w-7xl mx-auto relative">
          <NovaShowcase onExpand={(it) => setLightbox(it)} />
        </div>
      </section>

      <CompareSection />

      <DeliverablesSection />

      <section
        className="relative py-24 md:py-36 section-padding overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10 md:mb-14">
            <div className="max-w-2xl">
              <p className="mono-eyebrow mb-3" style={{ color: 'var(--color-text-muted)' }}>
                [03.3] — Methodology · Proprietary · Ten Stages
              </p>
              <h2 className="display-serif text-3xl md:text-5xl lg:text-6xl leading-[1.02]" style={{ color: 'var(--color-text)' }}>
                NOVA isn&apos;t a prompt.
                <br />
                <span className="ital-accent">It&apos;s a ten-stage production pipeline.</span>
              </h2>
              <p className="mt-6 text-base md:text-lg leading-relaxed max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
                Hover or scroll any stage below — brand encoding, reference training, prompt engineering, model routing,
                voice cloning, orchestration. This is what sits between <em>brief</em> and <em>asset</em>.
              </p>
            </div>
            <div
              className="hidden md:flex items-center gap-3 px-4 py-3 rounded-full border"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-gold)' }} />
              <span className="mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>
                Live · auto-advancing
              </span>
            </div>
          </div>
          <PipelineBoard />
        </div>
      </section>

      <section
        className="relative py-24 md:py-36 section-padding overflow-hidden"
        style={{ backgroundColor: '#0A0907' }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-30 grain-overlay" />
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-[180px] pointer-events-none"
          style={{ backgroundColor: 'var(--color-gold)', opacity: 0.15 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="mono-eyebrow mb-4" style={{ color: 'var(--color-gold)' }}>
            The Pilot Production
          </p>
          <h2 className="display-serif text-white leading-[1.02]" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            See the engine <span className="ital-accent" style={{ color: 'var(--color-gold)' }}>running on your brand.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            Pilot productions begin with a Brand DNA intake and a 72-hour creative sample — so you can feel the
            difference before you commit to a retainer.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.03]"
              style={{ backgroundColor: 'var(--color-gold)', color: '#0E0C0A' }}
            >
              Request a NOVA Sample
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/packages"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-full border transition-all duration-300 hover:scale-[1.03]"
              style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'white', backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              See Packages
            </Link>
          </div>
        </div>
      </section>

      <VideoLightbox item={lightbox} onClose={() => setLightbox(null)} />
    </AnimatePresence>
  );
}
