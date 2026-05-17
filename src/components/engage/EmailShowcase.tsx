import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowLeft, ArrowRight, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { EMAILS, type EmailItem } from '../../data/emails';

type Props = {
  compact?: boolean;
  heading?: string;
  eyebrow?: string;
};

function EmailThumbnail({ email, onClick, compact = false }: { email: EmailItem; onClick: () => void; compact?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`group relative shrink-0 rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 ${compact ? 'w-[150px] md:w-[170px]' : 'w-[280px] md:w-[320px]'}`}
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div
        className="relative w-full aspect-[3/4] overflow-hidden"
        style={{ backgroundColor: '#f0ece6' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: 'scale(0.47)',
            transformOrigin: 'top left',
            width: '213%',
            height: '213%',
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
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md" style={{ backgroundColor: 'rgba(255,255,255,0.85)' }}>
          <Mail size={10} style={{ color: email.accent }} />
          <span className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#1a1a1a' }}>
            {email.category}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {email.brand}
          </p>
          <h4 className="text-white text-lg leading-tight font-serif italic">
            {email.title}
          </h4>
        </div>
      </div>
      <div className="px-4 py-3 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
          Preview
        </span>
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.2em] transition-transform duration-300 group-hover:translate-x-1"
          style={{ color: 'var(--color-gold)' }}
        >
          Open
        </span>
      </div>
    </button>
  );
}

export function EmailModal({ email, onClose, onPrev, onNext }: { email: EmailItem; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  const modal = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: 'rgba(10,10,10,0.82)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[760px] h-[90vh] rounded-2xl overflow-hidden flex flex-col"
        style={{ backgroundColor: 'var(--color-surface)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: email.accent }}>
              <Mail size={16} color="#fff" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] truncate" style={{ color: 'var(--color-text-muted)' }}>
                {email.brand} &middot; {email.category}
              </p>
              <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>
                {email.title}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onPrev}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
              aria-label="Previous email"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={onNext}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
              aria-label="Next email"
            >
              <ArrowRight size={16} />
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ color: 'var(--color-text)' }}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden" style={{ backgroundColor: '#f0ece6' }}>
          <iframe
            key={email.id}
            src={email.path}
            title={email.title}
            className="w-full h-full border-0"
            sandbox="allow-same-origin"
          />
        </div>
      </motion.div>
    </motion.div>
  );

  if (typeof document === 'undefined') return modal;
  return createPortal(modal, document.body);
}

export default function EmailShowcase({ compact = false, heading = 'Email, Art Directed.', eyebrow = 'Lifecycle & Campaigns' }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const virtualRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  const loop = [...EMAILS, ...EMAILS, ...EMAILS];
  const PER_PAGE = 4;
  const totalPages = Math.ceil(EMAILS.length / PER_PAGE);
  const pageStart = page * PER_PAGE;
  const pageItems = EMAILS.slice(pageStart, pageStart + PER_PAGE);

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

    const speed = 28;
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
    const firstChild = el.firstElementChild as HTMLElement | null;
    const step = firstChild ? firstChild.getBoundingClientRect().width + 20 : 300;
    const target = el.scrollLeft + dir * step;
    virtualRef.current = target;
    el.scrollTo({ left: target, behavior: 'smooth' });
  }, []);

  const open = (index: number) => setOpenIndex(index);
  const close = () => setOpenIndex(null);
  const prev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + EMAILS.length) % EMAILS.length));
  const next = () => setOpenIndex((i) => (i === null ? null : (i + 1) % EMAILS.length));

  if (compact) {
    return (
      <div className="relative">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: 'var(--color-gold)' }}>
            Recent Email Work
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold tracking-[0.22em] tabular-nums" style={{ color: 'var(--color-text-muted)' }}>
              {String(page + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
            </span>
            <button
              onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
              aria-label="Previous emails"
              className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setPage((p) => (p + 1) % totalPages)}
              aria-label="Next emails"
              className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <AnimatePresence mode="wait">
            {pageItems.map((email, i) => (
              <motion.div
                key={`${page}-${email.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-0"
              >
                <button
                  onClick={() => open(pageStart + i)}
                  className="group w-full rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 block"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <div className="relative w-full aspect-[3/4] overflow-hidden" style={{ backgroundColor: '#f0ece6' }}>
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ transform: 'scale(0.47)', transformOrigin: 'top left', width: '213%', height: '213%' }}
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
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.55) 100%)' }}
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur-md" style={{ backgroundColor: 'rgba(255,255,255,0.88)' }}>
                      <Mail size={9} style={{ color: email.accent }} />
                      <span className="text-[8px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#1a1a1a' }}>
                        {email.category.split(' / ')[0]}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.22em] mb-0.5 truncate" style={{ color: 'rgba(255,255,255,0.75)' }}>
                        {email.brand}
                      </p>
                      <h4 className="text-white text-sm leading-tight font-serif italic line-clamp-2">
                        {email.title}
                      </h4>
                    </div>
                  </div>
                  <div className="px-3 py-2 flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
                      Preview
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--color-gold)' }}>
                      Open
                    </span>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {openIndex !== null && (
            <EmailModal
              email={EMAILS[openIndex]}
              onClose={close}
              onPrev={prev}
              onNext={next}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative py-16 md:py-24">
      {!compact && (
        <div className="max-w-6xl mx-auto section-padding mb-8 md:mb-10">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <span className="mono-eyebrow" style={{ color: 'var(--color-gold)' }}>{eyebrow}</span>
              <h2 className="display-serif mt-3 text-3xl md:text-5xl" style={{ color: 'var(--color-text)' }}>
                {heading.split(',')[0]},<br />
                <em>{heading.split(',').slice(1).join(',').trim()}</em>
              </h2>
            </div>
            <p className="text-sm max-w-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              A selection of lifecycle emails crafted for premium brands. Click any preview to view the full design.
            </p>
          </div>
        </div>
      )}

      {compact && (
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: 'var(--color-gold)' }}>
            Recent Email Work
          </span>
          <button
            onClick={() => setPaused((p) => !p)}
            className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {paused ? <Play size={10} /> : <Pause size={10} />}
            {paused ? 'Play' : 'Pause'}
          </button>
        </div>
      )}

      <div className="relative">
        {!compact && (
          <button
            onClick={() => setPaused((p) => !p)}
            className="absolute right-4 md:right-8 -top-10 z-10 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {paused ? <Play size={10} /> : <Pause size={10} />}
            {paused ? 'Play' : 'Pause'}
          </button>
        )}

        <div
          ref={scrollerRef}
          className={`flex overflow-x-auto no-scrollbar ${compact ? 'gap-3 md:gap-4 px-2 md:px-4' : 'gap-4 md:gap-5 px-4 md:px-8'}`}
          style={{ scrollBehavior: 'auto' }}
        >
          {loop.map((email, i) => (
            <EmailThumbnail
              key={`${email.id}-${i}`}
              email={email}
              compact={compact}
              onClick={() => open(i % EMAILS.length)}
            />
          ))}
        </div>

        <div
          className={`pointer-events-none absolute inset-y-0 left-0 ${compact ? 'w-12 md:w-20' : 'w-10 md:w-16'}`}
          style={{ background: `linear-gradient(to right, var(--color-bg-secondary), transparent)` }}
        />
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 ${compact ? 'w-12 md:w-20' : 'w-10 md:w-16'}`}
          style={{ background: `linear-gradient(to left, var(--color-bg-secondary), transparent)` }}
        />

        <button
          onClick={() => nudge(-1)}
          aria-label="Scroll emails left"
          className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
        >
          <ChevronLeft size={compact ? 16 : 18} />
        </button>
        <button
          onClick={() => nudge(1)}
          aria-label="Scroll emails right"
          className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
        >
          <ChevronRight size={compact ? 16 : 18} />
        </button>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <EmailModal
            email={EMAILS[openIndex]}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
