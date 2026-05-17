import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Sparkles, Play, BarChart2, X, ChevronRight } from 'lucide-react';
import Magnetic from '../ui/Magnetic';

const STATS_BAR = [
  { num: '93%', label: 'Client Retention' },
  { num: '3.5x', label: 'Avg Year 1 ROI' },
  { num: '100+', label: 'Use Cases Delivered' },
  { num: '6', label: 'Service Pillars' },
];

const MARQUEE_REPEAT = Array.from({ length: 6 }, (_, i) => i);

const HERO_CARDS = [
  {
    id: 'one40-rooftop',
    type: 'image' as const,
    src: 'https://i.imgur.com/HOe0C2T.jpeg',
    client: 'ONE40 Rooftop',
    vertical: 'Rooftop & Hospitality',
    color: '#C9A84C',
    stat: '+120%',
    statLabel: 'Conversions',
    description: 'FiDi rooftop transformed from fragmented ads into a market-dominating growth engine.',
    stats: [
      { label: 'Google Conversions', value: '+120%' },
      { label: 'Meta ROAS', value: '4X' },
      { label: 'CAC', value: '<$10' },
    ],
    services: ['Google PMAX', 'Meta Ads', 'Website Build'],
    slug: 'one40-rooftop',
  },
  {
    id: 'pogba-mdx',
    type: 'image' as const,
    src: 'https://i.imgur.com/LJZRmet.png',
    client: 'POGBA MDX',
    vertical: 'Luxury Fashion · AI',
    color: '#C9A84C',
    stat: '$180K',
    statLabel: 'Saved',
    description: 'Paul Pogba\'s all-AI luxury fashion brand — models, PDPs, ecommerce, and film.',
    stats: [
      { label: 'Production Saved', value: '$180K+' },
      { label: 'Assets', value: 'All-AI' },
      { label: 'Launch', value: '<30d' },
    ],
    services: ['NOVA Engine', 'AI Models', 'Ecommerce'],
    slug: 'pogba-mdx',
  },
  {
    id: 'tina-stephens',
    type: 'image' as const,
    src: 'https://i.imgur.com/3j7TuA7.png',
    client: 'TINA Stephens',
    vertical: 'Luxury Retail',
    color: '#10B981',
    stat: '+75%',
    statLabel: 'YoY Sales',
    description: 'Email rebuilt end-to-end — open rate 14% to 56% and record YoY sales.',
    stats: [
      { label: 'Open Rate', value: '14% → 56%' },
      { label: 'Click-Through', value: '2.4%' },
      { label: 'YoY Sales', value: '+75%' },
    ],
    services: ['Email', 'CRM', 'Lifecycle'],
    slug: 'tina-stephens',
  },
  {
    id: 'anatomie',
    type: 'video' as const,
    src: 'https://i.imgur.com/6vqS1rs.mp4',
    client: 'Anatomie',
    vertical: 'Luxury Retail',
    color: '#C9A84C',
    stat: '+85%',
    statLabel: 'CTR',
    description: 'Optimized email flows and digital experience to increase retention and CTR.',
    stats: [
      { label: 'Open Rate', value: '+29%' },
      { label: 'Click-Through', value: '+85%' },
      { label: 'Bounce Rate', value: '-29%' },
    ],
    services: ['Email Marketing', 'CRM', 'Analytics'],
    slug: 'anatomie',
  },
  {
    id: 'dl-nyc',
    type: 'image' as const,
    src: 'https://i.imgur.com/32wLyZA.png',
    client: 'The DL-NYC',
    vertical: 'Rooftop & Nightlife',
    color: '#10B981',
    stat: '24x',
    statLabel: 'ROAS',
    description: 'Transformed low ticket sales into a sold-out weekly staple via PMAX and Meta.',
    stats: [
      { label: 'Peak ROAS', value: '24x' },
      { label: 'Google Rank', value: '#1' },
      { label: 'Bookings', value: 'Sold Out' },
    ],
    services: ['Meta Ads', 'Google PMAX', 'Creative'],
    slug: 'dl-nyc',
  },
  {
    id: 'loulou',
    type: 'image' as const,
    src: 'https://i.imgur.com/pKiXJyX.jpeg',
    client: 'Loulou Bistro',
    vertical: 'Fine Dining',
    color: '#C9A84C',
    stat: '9x',
    statLabel: 'Google ROAS',
    description: 'Multi-channel strategy delivering massive reach and return across paid channels.',
    stats: [
      { label: 'Meta ROAS', value: '4.5x' },
      { label: 'Google ROAS', value: '9x' },
      { label: 'Social Reach', value: '+120%' },
    ],
    services: ['Meta Ads', 'Google Ads', 'Social Media'],
    slug: 'loulou-bistro',
  },
  {
    id: 'mission',
    type: 'image' as const,
    src: 'https://i.imgur.com/UaNgQxW.jpeg',
    client: 'Mission Ceviche',
    vertical: 'Fine Dining',
    color: '#10B981',
    stat: '+138%',
    statLabel: 'Reservations',
    description: 'From a market stall to NYC staple via high-performance Meta & Google funnels.',
    stats: [
      { label: 'Reservations', value: '+138%' },
      { label: 'Ad ROAS', value: '5x+' },
      { label: 'Q4 Revenue', value: 'Best Ever' },
    ],
    services: ['Meta Ads', 'Google Ads', 'Social Media'],
    slug: 'mission-ceviche',
  },
  {
    id: 'le-jardin',
    type: 'image' as const,
    src: 'https://i.imgur.com/4SZ8ev5.png',
    client: 'Le Jardin Bistro',
    vertical: 'Fine Dining',
    color: '#FACC15',
    stat: '#1',
    statLabel: 'Google',
    description: 'Achieved #1 Google ranking with a limited sub-$4K budget in a competitive market.',
    stats: [
      { label: 'Google Rank', value: '#1' },
      { label: 'Budget', value: '<$4K/mo' },
      { label: 'vs Competitors', value: 'Top Spot' },
    ],
    services: ['Google Ads', 'SEO', 'Web Design'],
    slug: 'le-jardin-bistro',
  },
];

type HeroCard = typeof HERO_CARDS[0];

const CARD_W = 232;
const CARD_H = 424;

const POSITIONS = [
  { x: -(CARD_W / 2), y: -(CARD_H / 2), rotate: 2, scale: 1, opacity: 1, zIndex: 10 },
  { x: -238, y: -108, rotate: -11, scale: 0.63, opacity: 0.50, zIndex: 1 },
  { x: 14, y: -96, rotate: 10, scale: 0.63, opacity: 0.56, zIndex: 2 },
  { x: -234, y: -208, rotate: -7, scale: 0.81, opacity: 0.76, zIndex: 3 },
  { x: 12, y: -198, rotate: 6, scale: 0.78, opacity: 0.80, zIndex: 4 },
];

const SPRING = { type: 'spring' as const, stiffness: 220, damping: 28, mass: 0.9 };
const AUTO_ROTATE_MS = 4000;

function MediaEl({ card, active }: { card: HeroCard; active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!videoRef.current) return;
    active ? videoRef.current.play().catch(() => {}) : videoRef.current.pause();
  }, [active]);

  if (card.type === 'video') {
    return (
      <video
        ref={videoRef}
        src={card.src}
        autoPlay
        muted
        loop
        playsInline
        preload={active ? 'metadata' : 'none'}
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }
  const eager = card.id === 'one40-rooftop';
  return (
    <img
      src={card.src}
      alt={card.client}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

function ExpandedOverlay({ card, onClose }: { card: HeroCard; onClose: () => void }) {
  return (
    <motion.div
      key="overlay-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 flex items-center justify-center"
      style={{ zIndex: 50, backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0,0,0,0.72)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.78, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.82, y: 24 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.8 }}
        className="relative rounded-3xl overflow-hidden shadow-[0_60px_140px_rgba(0,0,0,0.7)]"
        style={{ width: '300px', maxHeight: '520px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative" style={{ height: '220px' }}>
          <MediaEl card={card} active />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 40%, rgba(0,0,0,0.75) 100%)' }}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}
          >
            <X size={14} className="text-white" />
          </button>
          {card.type === 'video' && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white text-[9px] font-barlow font-semibold uppercase tracking-widest opacity-90">Live</span>
            </div>
          )}
          <div className="absolute bottom-3 left-4">
            <span
              className="text-[9px] font-barlow font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)' }}
            >
              {card.vertical}
            </span>
          </div>
        </div>

        <div className="p-5" style={{ backgroundColor: 'var(--color-surface)' }}>
          <h3 className="text-xl font-semibold leading-tight" style={{ color: 'var(--color-text)' }}>{card.client}</h3>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{card.description}</p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {card.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-2.5 text-center"
                style={{ backgroundColor: 'var(--color-bg)' }}
              >
                <p className="text-sm font-semibold" style={{ color: card.color }}>{s.value}</p>
                <p className="text-[9px] mt-0.5 leading-tight" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {card.services.map((s) => (
              <span
                key={s}
                className="text-[9px] font-barlow font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
              >
                {s}
              </span>
            ))}
          </div>

          <Link
            to={`/work/${card.slug}`}
            className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
            onClick={onClose}
          >
            View Case Study
            <ChevronRight size={15} />
          </Link>
        </div>

        <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }} />
      </motion.div>
    </motion.div>
  );
}

function DesktopCard({
  card, posIndex, isActive, onClickBg, onClickActive,
}: {
  card: HeroCard;
  posIndex: number;
  isActive: boolean;
  onClickBg: () => void;
  onClickActive: () => void;
}) {
  const pos = POSITIONS[posIndex] ?? { ...POSITIONS[POSITIONS.length - 1], opacity: 0, scale: 0.5, zIndex: 0 };
  return (
    <motion.div
      className="absolute cursor-pointer overflow-hidden rounded-2xl"
      style={{ left: '50%', top: '50%', width: CARD_W, height: CARD_H, transformOrigin: 'top left' }}
      animate={{ x: pos.x, y: pos.y, rotate: pos.rotate, scale: pos.scale, opacity: pos.opacity, zIndex: pos.zIndex }}
      transition={SPRING}
      whileHover={!isActive ? { scale: pos.scale * 1.06, opacity: Math.min(pos.opacity + 0.15, 1) } : undefined}
      onClick={isActive ? onClickActive : onClickBg}
    >
      <MediaEl card={card} active={isActive} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 50%, rgba(0,0,0,0.88) 100%)' }} />
      {isActive && (
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white text-[9px] font-barlow font-semibold uppercase tracking-widest opacity-90">
              {card.type === 'video' ? 'Live Preview' : 'Case Study'}
            </span>
          </div>
          <div
            className="text-[9px] font-barlow font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)' }}
          >
            {card.vertical}
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white text-[9px] font-barlow font-semibold uppercase tracking-widest opacity-60">{card.vertical}</p>
        <p className="text-white font-semibold mt-0.5 leading-tight" style={{ fontSize: isActive ? '16px' : '12px' }}>{card.client}</p>
        {isActive && (
          <>
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              {card.stats.map((s) => (
                <div key={s.label} className="rounded-lg p-1.5 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
                  <p className="text-xs font-bold" style={{ color: card.color }}>{s.value}</p>
                  <p className="text-[8px] text-white opacity-55 mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-1.5 opacity-60">
              <Play size={10} className="text-white" />
              <p className="text-white text-[9px] font-barlow uppercase tracking-widest">Tap to expand</p>
            </div>
          </>
        )}
        {!isActive && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-xs font-bold" style={{ color: card.color }}>{card.stat}</span>
            <span className="text-white text-[9px] opacity-60">{card.statLabel}</span>
          </div>
        )}
      </div>
      <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }} />
    </motion.div>
  );
}

function FloatingBadges({ activeCard }: { activeCard: HeroCard }) {
  return (
    <>
      <motion.div
        key={`badge-roas-${activeCard.id}`}
        initial={{ opacity: 0, scale: 0.7, x: -10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.7, x: -10 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="absolute glass-card rounded-xl px-3.5 py-2.5 shadow-xl pointer-events-none"
        style={{ left: '-22px', top: '28px', zIndex: 20 }}
      >
        <p className="text-[10px] font-barlow font-semibold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{activeCard.statLabel}</p>
        <p className="text-2xl font-bold mt-0.5" style={{ color: activeCard.color }}>{activeCard.stat}</p>
      </motion.div>
      <motion.div
        key={`badge-ctr-${activeCard.id}`}
        initial={{ opacity: 0, scale: 0.7, x: 10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.7, x: 10 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.06 }}
        className="absolute glass-card rounded-xl px-3.5 py-2.5 shadow-xl pointer-events-none"
        style={{ right: '-18px', top: '18px', zIndex: 20 }}
      >
        <div className="flex items-center gap-2">
          <TrendingUp size={13} className="text-emerald-400" />
          <div>
            <p className="text-[10px] font-barlow font-semibold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{activeCard.stats[1].label}</p>
            <p className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{activeCard.stats[1].value}</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        key={`badge-stat2-${activeCard.id}`}
        initial={{ opacity: 0, scale: 0.7, x: -10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.7, x: -10 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.12 }}
        className="absolute glass-card rounded-xl px-3 py-2.5 shadow-xl pointer-events-none"
        style={{ left: '-14px', bottom: '55px', zIndex: 20 }}
      >
        <div className="flex items-center gap-2">
          <BarChart2 size={13} className="text-sky-400" />
          <div>
            <p className="text-[10px] font-barlow font-semibold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{activeCard.stats[2].label}</p>
            <p className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{activeCard.stats[2].value}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function ProgressDots({ count, active, onSelect }: { count: number; active: number; onSelect: (i: number) => void }) {
  return (
    <div className="absolute flex items-center gap-2" style={{ bottom: '-28px', left: '50%', transform: 'translateX(-50%)', zIndex: 15 }}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="transition-all duration-300 rounded-full"
          style={{
            width: i === active ? '20px' : '6px',
            height: '6px',
            backgroundColor: i === active ? 'var(--color-gold)' : 'var(--color-border-strong)',
          }}
        />
      ))}
    </div>
  );
}

function DesktopCardStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedCard, setExpandedCard] = useState<HeroCard | null>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { stiffness: 90, damping: 22 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), springCfg);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % HERO_CARDS.length);
    }, AUTO_ROTATE_MS);
  }, []);

  useEffect(() => {
    if (!paused && !expandedCard && visible) startTimer();
    else if (timerRef.current) clearInterval(timerRef.current);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, expandedCard, visible, startTimer]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setPaused(false);
  }, [mouseX, mouseY]);

  const selectCard = useCallback((cardIndex: number) => {
    setActiveIndex(cardIndex);
    startTimer();
  }, [startTimer]);

  const getPosIndex = (cardIndex: number) => {
    if (cardIndex === activeIndex) return 0;
    return ((cardIndex - activeIndex + HERO_CARDS.length) % HERO_CARDS.length);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ perspective: '1400px', height: '580px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setPaused(true)}
    >
      <motion.div style={{ rotateX, rotateY }} className="relative w-full h-full">
        {HERO_CARDS.map((card, i) => (
          <DesktopCard
            key={card.id}
            card={card}
            posIndex={getPosIndex(i)}
            isActive={i === activeIndex}
            onClickBg={() => selectCard(i)}
            onClickActive={() => setExpandedCard(card)}
          />
        ))}
        <AnimatePresence mode="wait">
          <FloatingBadges key={`badges-${activeIndex}`} activeCard={HERO_CARDS[activeIndex]} />
        </AnimatePresence>
        <ProgressDots count={HERO_CARDS.length} active={activeIndex} onSelect={selectCard} />
        <AnimatePresence>
          {expandedCard && (
            <ExpandedOverlay card={expandedCard} onClose={() => setExpandedCard(null)} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function MobileCardScroll() {
  const [expandedCard, setExpandedCard] = useState<HeroCard | null>(null);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="lg:hidden mt-10 -mx-6 px-6"
      >
        <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide">
          {HERO_CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.75 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="snap-start shrink-0 relative rounded-2xl overflow-hidden shadow-xl cursor-pointer active:scale-95 transition-transform"
              style={{ width: '160px', height: '240px' }}
              onClick={() => setExpandedCard(card)}
            >
              {card.type === 'video' ? (
                <video src={card.src} autoPlay muted loop playsInline preload="metadata" className="w-full h-full object-cover" />
              ) : (
                <img src={card.src} alt={card.client} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 35%, rgba(0,0,0,0.85) 100%)' }} />
              {card.type === 'video' && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-white text-[8px] font-barlow font-semibold uppercase tracking-widest opacity-90">Live</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-[8px] font-barlow font-semibold uppercase tracking-widest opacity-60">{card.vertical}</p>
                <p className="text-white text-xs font-semibold mt-0.5 leading-tight">{card.client}</p>
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
                  <span className="text-[10px] font-bold" style={{ color: card.color }}>{card.stat}</span>
                  <span className="text-[8px] text-white opacity-60 ml-0.5">{card.statLabel}</span>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }} />
            </motion.div>
          ))}
        </div>
        <p className="mono-eyebrow mt-3 opacity-40 text-center" style={{ color: 'var(--color-text-muted)' }}>
          Tap any card to expand
        </p>
      </motion.div>

      <AnimatePresence>
        {expandedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center px-4"
            style={{ zIndex: 100, backdropFilter: 'blur(16px)', backgroundColor: 'rgba(0,0,0,0.78)' }}
            onClick={() => setExpandedCard(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 24 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="relative rounded-3xl overflow-hidden w-full shadow-2xl"
              style={{ maxWidth: '340px', backgroundColor: 'var(--color-surface)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative" style={{ height: '220px' }}>
                <MediaEl card={expandedCard} active />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
                <button onClick={() => setExpandedCard(null)} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
                  <X size={14} className="text-white" />
                </button>
                <span className="absolute bottom-3 left-4 text-[9px] font-barlow font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)' }}>{expandedCard.vertical}</span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>{expandedCard.client}</h3>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{expandedCard.description}</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {expandedCard.stats.map((s) => (
                    <div key={s.label} className="rounded-xl p-2.5 text-center" style={{ backgroundColor: 'var(--color-bg)' }}>
                      <p className="text-sm font-semibold" style={{ color: expandedCard.color }}>{s.value}</p>
                      <p className="text-[9px] mt-0.5 leading-tight" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {expandedCard.services.map((s) => (
                    <span key={s} className="text-[9px] font-barlow font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>{s}</span>
                  ))}
                </div>
                <Link to={`/work/${expandedCard.slug}`} className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold" style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }} onClick={() => setExpandedCard(null)}>
                  View Case Study <ChevronRight size={15} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="absolute inset-0 grain-overlay" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 3, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden md:block absolute top-[10%] right-[15%] w-[600px] h-[600px] rounded-full blur-[180px] opacity-[0.10]"
          style={{ backgroundColor: 'var(--color-gold)', willChange: 'transform' }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden md:block absolute bottom-[5%] left-[5%] w-[450px] h-[450px] rounded-full blur-[150px] opacity-[0.07]"
          style={{ backgroundColor: 'var(--color-accent)', willChange: 'transform' }}
        />
      </div>

      {/* Editorial meta strip */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 section-padding w-full max-w-7xl mx-auto pt-28 md:pt-32"
      >
        <div
          className="grid grid-cols-12 gap-3 py-3 border-t border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div className="col-span-6 md:col-span-3 mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>
            [01] — The Growth Department
          </div>
          <div className="hidden md:block col-span-3 mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>
            Hospitality · Retail · F&amp;B
          </div>
          <div className="hidden md:block col-span-3 mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>
            NYC · Miami · LATAM
          </div>
          <div className="col-span-6 md:col-span-3 mono-eyebrow text-right" style={{ color: 'var(--color-text-muted)' }}>
            (Scroll) to enter <span style={{ color: 'var(--color-text)' }}>↓</span>
          </div>
        </div>
      </motion.div>

      {/* Hero body */}
      <div className="relative z-10 section-padding w-full max-w-7xl mx-auto pt-10 md:pt-16 pb-12 md:pb-16">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 xl:gap-16 items-center">
          <div className="min-w-0">
            <h1
              className="hero-headline text-[2.75rem] sm:text-[3.75rem] md:text-[5rem] lg:text-[5.5rem] xl:text-[6.25rem]"
              style={{ color: 'var(--color-text)' }}
            >
              {['The growth', 'department built', null].map((line, i) => (
                <span key={i} className="hero-line">
                  <motion.span
                    initial={{ y: '110%', opacity: 0, filter: 'blur(10px)' }}
                    animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.95, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="hero-line-inner"
                  >
                    {line ?? (
                      <>
                        for <span className="ital-accent">taste.</span>
                      </>
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-7 md:mt-10 text-base md:text-lg leading-[1.65] max-w-xl"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              AIREA embeds inside upscale hospitality and retail brands as a full-stack
              marketing and AI technology department. Senior-level strategy, performance
              media, and intelligent systems — engineered, not improvised.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-8 md:mt-10 flex flex-wrap items-center gap-3 md:gap-5"
            >
              <Magnetic>
                <a
                  href="https://aireasolutions.com/book"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold rounded-full transition-all duration-300"
                  style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
                >
                  Book a Strategy Call
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#nova"
                  className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold rounded-full border transition-all duration-300 relative overflow-hidden"
                  style={{ borderColor: 'var(--color-gold)', color: 'var(--color-text)' }}
                >
                  <Sparkles size={14} style={{ color: 'var(--color-gold)' }} />
                  Introducing NOVA
                  <span style={{ color: 'var(--color-gold)' }} aria-hidden>↓</span>
                </a>
              </Magnetic>
            </motion.div>

            {/* Stats — editorial 4-column */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.9 }}
              className="mt-14 md:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 max-w-xl"
            >
              {STATS_BAR.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 + i * 0.08 }}
                  className="border-t pt-3"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <span className="display-serif text-3xl md:text-4xl block" style={{ color: 'var(--color-text)' }}>
                    {stat.num}
                  </span>
                  <p className="mono-eyebrow mt-2 leading-tight" style={{ color: 'var(--color-text-muted)' }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <MobileCardScroll />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="hidden lg:block"
          >
            <DesktopCardStack />
          </motion.div>
        </div>
      </div>

      {/* Bottom editorial marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="relative z-10 w-full overflow-hidden py-6 md:py-8 select-none pointer-events-none"
      >
        <div className="flex animate-marquee whitespace-nowrap" style={{ animationDuration: '28s' }}>
          {MARQUEE_REPEAT.map((i) => (
            <span
              key={i}
              className="font-serif italic text-5xl sm:text-6xl md:text-8xl lg:text-9xl mx-6 sm:mx-8 md:mx-14 shrink-0"
              style={{ color: 'var(--color-text)', opacity: 0.06, fontWeight: 300, letterSpacing: '-0.02em' }}
            >
              Tailored Marketing, AI Driven
              <span className="mx-8 md:mx-14 opacity-50">·</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
