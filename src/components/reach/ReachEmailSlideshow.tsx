import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Maximize2, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { EMAILS } from '../../data/emails';
import { EmailModal } from '../engage/EmailShowcase';

const AUTO_ADVANCE_MS = 5200;
const THUMB_W = 220;
const THUMB_H = 290;
const THUMB_GAP = 20;

function LoopThumb({ index, active, onClick }: { index: number; active: boolean; onClick: () => void }) {
  const email = EMAILS[index];
  return (
    <button
      onClick={onClick}
      className="relative group shrink-0 rounded-2xl overflow-hidden border transition-all duration-500"
      style={{
        width: THUMB_W,
        height: THUMB_H,
        borderColor: active ? email.accent : 'var(--color-border)',
        boxShadow: active ? `0 18px 50px -14px ${email.accent}70` : '0 6px 24px -12px rgba(0,0,0,0.25)',
        transform: active ? 'translateY(-4px)' : 'translateY(0)',
        backgroundColor: '#f0ece6',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: 'scale(0.36)',
          transformOrigin: 'top left',
          width: '278%',
          height: '278%',
        }}
      >
        <iframe
          src={email.path}
          title={email.title}
          className="w-full h-full border-0 pointer-events-none"
          sandbox="allow-same-origin"
          scrolling="no"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: active
            ? 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.78) 100%)'
            : 'linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.82) 100%)',
        }}
      />
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full backdrop-blur-md" style={{ backgroundColor: 'rgba(255,255,255,0.88)' }}>
        <Mail size={9} style={{ color: email.accent }} />
        <span className="text-[8px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#1a1a1a' }}>
          {email.category.split(' / ')[0]}
        </span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 text-left">
        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] truncate" style={{ color: 'rgba(255,255,255,0.72)' }}>
          {email.brand}
        </p>
        <p className="text-white text-sm font-serif italic leading-tight line-clamp-2 mt-0.5">
          {email.title}
        </p>
      </div>
    </button>
  );
}

function LoopStrip({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const virtualRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const dragState = useRef({ dragging: false, startX: 0, startScroll: 0, moved: false });

  const loop = [...EMAILS, ...EMAILS, ...EMAILS];

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    let initialized = false;

    const init = () => {
      if (initialized) return;
      const oneThird = el.scrollWidth / 3;
      if (oneThird > 0) {
        el.scrollLeft = oneThird;
        virtualRef.current = oneThird;
        initialized = true;
      }
    };

    const onUserScroll = () => {
      if (paused) virtualRef.current = el.scrollLeft;
    };
    el.addEventListener('scroll', onUserScroll, { passive: true });

    const speed = 40;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      init();
      const oneThird = el.scrollWidth / 3;
      if (oneThird > 0) {
        if (!paused) {
          virtualRef.current += (dt / 1000) * speed;
          if (virtualRef.current >= oneThird * 2) virtualRef.current -= oneThird;
          if (virtualRef.current < oneThird * 0.5) virtualRef.current += oneThird;
          el.scrollLeft = virtualRef.current;
        } else {
          if (el.scrollLeft >= oneThird * 2) {
            el.scrollLeft -= oneThird;
            virtualRef.current = el.scrollLeft;
          } else if (el.scrollLeft < oneThird * 0.5) {
            el.scrollLeft += oneThird;
            virtualRef.current = el.scrollLeft;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onUserScroll);
    };
  }, [paused]);

  const nudge = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = (THUMB_W + THUMB_GAP) * 2;
    const target = el.scrollLeft + dir * step;
    virtualRef.current = target;
    el.scrollTo({ left: target, behavior: 'smooth' });
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    dragState.current = { dragging: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    setPaused(true);
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.dragging) return;
    const el = scrollerRef.current;
    if (!el) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 4) dragState.current.moved = true;
    el.scrollLeft = dragState.current.startScroll - dx;
    virtualRef.current = el.scrollLeft;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    dragState.current.dragging = false;
    if (el) {
      try { el.releasePointerCapture(e.pointerId); } catch { /* noop */ }
    }
    setTimeout(() => setPaused(false), 800);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-text-muted)' }}>
          Browse the Collection &middot; Drag, scroll, or tap any cover
        </span>
        <button
          onClick={() => setPaused((p) => !p)}
          className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] transition-opacity hover:opacity-80"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {paused ? <Play size={10} /> : <Pause size={10} />}
          {paused ? 'Play loop' : 'Pause loop'}
        </button>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="flex overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
          style={{ gap: THUMB_GAP, scrollBehavior: 'auto', paddingLeft: 8, paddingRight: 8, paddingTop: 8, paddingBottom: 12 }}
        >
          {loop.map((email, i) => {
            const realIdx = i % EMAILS.length;
            return (
              <LoopThumb
                key={`${email.id}-${i}`}
                index={realIdx}
                active={realIdx === active}
                onClick={() => {
                  if (dragState.current.moved) return;
                  onSelect(realIdx);
                }}
              />
            );
          })}
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24"
          style={{ background: 'linear-gradient(to right, var(--color-bg), transparent)' }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24"
          style={{ background: 'linear-gradient(to left, var(--color-bg), transparent)' }}
        />

        <button
          onClick={() => nudge(-1)}
          aria-label="Scroll left"
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
            boxShadow: '0 8px 28px rgba(0,0,0,0.15)',
          }}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => nudge(1)}
          aria-label="Scroll right"
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
            boxShadow: '0 8px 28px rgba(0,0,0,0.15)',
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default function ReachEmailSlideshow() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const current = EMAILS[active];

  const go = (i: number) => {
    setActive((i + EMAILS.length) % EMAILS.length);
    setProgress(0);
  };

  useEffect(() => {
    if (paused || modalOpen) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setActive((a) => (a + 1) % EMAILS.length);
          return 0;
        }
        return p + (100 / (AUTO_ADVANCE_MS / 50));
      });
    }, 50);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, modalOpen]);

  return (
    <section
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <motion.div
        className="absolute top-[15%] -left-32 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        style={{ backgroundColor: current.accent, opacity: 0.08 }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[10%] -right-32 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none"
        style={{ backgroundColor: current.accent, opacity: 0.05 }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12 md:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
              Lifecycle Gallery &middot; Live Campaigns
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tightest leading-[1.05]" style={{ color: 'var(--color-text)' }}>
              Email, Art{' '}
              <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Directed.</span>
            </h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed max-w-lg" style={{ color: 'var(--color-text-muted)' }}>
              A rotating exhibition of lifecycle emails we've shipped for premium brands. Each one engineered for inboxes, composed like editorial.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-3 py-2 rounded-full border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] tabular-nums" style={{ color: 'var(--color-text)' }}>
                {String(active + 1).padStart(2, '0')}
              </span>
              <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>/</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] tabular-nums" style={{ color: 'var(--color-text-muted)' }}>
                {String(EMAILS.length).padStart(2, '0')}
              </span>
            </div>
            <button
              onClick={() => setPaused((p) => !p)}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-105"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
              aria-label={paused ? 'Play' : 'Pause'}
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
            </button>
            <button
              onClick={() => go(active - 1)}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-105"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => go(active + 1)}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-105"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-14 items-center">
          <div className="relative">
            <div
              className="relative rounded-3xl overflow-hidden border"
              style={{
                backgroundColor: '#f0ece6',
                borderColor: 'var(--color-border)',
                boxShadow: `0 40px 120px -40px ${current.accent}50`,
              }}
            >
              <div className="aspect-[3/4] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        transform: 'scale(0.62)',
                        transformOrigin: 'top left',
                        width: '161%',
                        height: '161%',
                      }}
                    >
                      <iframe
                        src={current.path}
                        title={current.title}
                        className="w-full h-full border-0 pointer-events-none"
                        sandbox="allow-same-origin"
                        scrolling="no"
                        tabIndex={-1}
                      />
                    </div>
                    <div
                      className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
                      style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)' }}
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full backdrop-blur-md" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
                  <Mail size={10} style={{ color: current.accent }} />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#1a1a1a' }}>
                    {current.category}
                  </span>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="absolute bottom-4 right-4 group flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: 'rgba(255,255,255,0.95)', color: '#1a1a1a' }}
                >
                  <Maximize2 size={12} />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">Open Full Email</span>
                </button>
              </div>
            </div>

            <div className="mt-4 h-0.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
              <motion.div
                className="h-full"
                style={{ backgroundColor: current.accent, width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + '-meta'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: current.accent }}>
                  {current.brand}
                </span>
                <h3 className="mt-3 text-2xl md:text-4xl lg:text-5xl font-bold tracking-tightest leading-[1.05]" style={{ color: 'var(--color-text)' }}>
                  {current.title}
                </h3>
                <p className="mt-3 text-lg md:text-xl font-serif italic" style={{ color: 'var(--color-text-muted)' }}>
                  {current.subtitle}
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[
                    { k: 'Open Rate', v: '52%' },
                    { k: 'CTR', v: '8.4%' },
                    { k: 'Revenue / Send', v: '$0.42' },
                  ].map((m) => (
                    <div key={m.k} className="rounded-xl p-3 border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                      <p className="text-lg font-bold tracking-tightest" style={{ color: 'var(--color-gold)' }}>{m.v}</p>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{m.k}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <LoopStrip active={active} onSelect={go} />
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <EmailModal
            email={current}
            onClose={() => setModalOpen(false)}
            onPrev={() => go(active - 1)}
            onNext={() => go(active + 1)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
