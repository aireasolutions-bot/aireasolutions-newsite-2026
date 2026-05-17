import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Flame } from 'lucide-react';
import { NAV_ITEMS } from '../data/navigation';
import MiamiTime from './ui/MiamiTime';
import ThemeToggle from './ui/ThemeToggle';
import Magnetic from './ui/Magnetic';

const MEGA_PILLARS = [
  {
    num: '01', title: 'Amplify', desc: 'Paid media at compounding scale.', href: '/amplify',
    sub: [
      { name: 'Meta Ads', desc: 'Facebook + Instagram', href: '/services/meta-ads' },
      { name: 'Google Ads', desc: 'Search · YouTube · PMAX', href: '/services/google-ads' },
      { name: 'Creative Testing', desc: 'Velocity + learnings', href: '/amplify' },
    ],
  },
  {
    num: '02', title: 'Intelligence', desc: 'Operational AI for revenue ops.', href: '/intelligence',
    sub: [
      { name: 'AI Workflows', desc: 'Automations & agents', href: '/intelligence' },
      { name: 'Revenue Ops', desc: 'Stack + attribution', href: '/intelligence' },
      { name: 'Data + BI', desc: 'Decision dashboards', href: '/analyze' },
      { name: 'NOVA', desc: 'AI creative engine', href: '/#nova', hot: true },
    ],
  },
  {
    num: '03', title: 'Reach', desc: 'Email, SMS, CRM & lifecycle.', href: '/reach',
    sub: [
      { name: 'Email', desc: 'Klaviyo + custom flows', href: '/reach' },
      { name: 'SMS', desc: 'High-intent retention', href: '/reach' },
      { name: 'CRM', desc: 'Loyalty + segmentation', href: '/reach' },
    ],
  },
  {
    num: '04', title: 'Engage', desc: 'Social, content, studio.', href: '/engage',
    sub: [
      { name: 'Social Strategy', desc: 'Native channel craft', href: '/engage' },
      { name: 'AIREA Studio', desc: 'AI-powered creative', href: '/engage' },
      { name: 'Video', desc: 'Production + edit', href: '/engage' },
    ],
  },
  {
    num: '05', title: 'Analyze', desc: 'Attribution & decision data.', href: '/analyze',
    sub: [
      { name: 'Dashboards', desc: 'Operator-grade BI', href: '/analyze' },
      { name: 'Forecasting', desc: 'Revenue + pacing', href: '/analyze' },
      { name: 'Audits', desc: 'Stack diagnostics', href: '/analyze' },
    ],
  },
  {
    num: '06', title: 'Build', desc: 'Web, product, conversion.', href: '/build',
    sub: [
      { name: 'Shopify', desc: 'Headless + custom', href: '/build' },
      { name: 'Web', desc: 'Editorial + CRO', href: '/build' },
      { name: 'CRO', desc: 'Funnels + experiments', href: '/build' },
    ],
  },
];

export default function Navigation() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 160);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 backdrop-blur-xl border-b' : 'py-5'}`}
        style={{
          backgroundColor: scrolled ? 'var(--color-glass-bg)' : 'transparent',
          borderColor: scrolled ? 'var(--color-border)' : 'transparent',
        }}
      >
        <nav className="section-padding flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label="AIREA Solutions home">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: 'var(--color-gold)' }} />
            <span className="text-lg md:text-xl font-semibold tracking-tight" style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
              AIREA
            </span>
            <span className="text-lg md:text-xl font-serif italic font-light" style={{ color: 'var(--color-gold)' }}>
              Solutions
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <button
              type="button"
              onMouseEnter={openMega}
              onMouseLeave={scheduleCloseMega}
              onClick={() => setMegaOpen((v) => !v)}
              className="mono-eyebrow px-3 py-2 rounded-md transition-colors hover:opacity-100"
              style={{ color: megaOpen ? 'var(--color-text)' : 'var(--color-text-secondary)' }}
              aria-expanded={megaOpen}
            >
              Pillars <span className="ml-1 opacity-60">+</span>
            </button>

            {NAV_ITEMS.filter((i) => i.label !== 'Pillars' && i.label !== 'Services').map((item) => {
              const isNova = item.label === 'NOVA';
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className="mono-eyebrow px-3 py-2 rounded-md transition-colors inline-flex items-center gap-1.5 relative group"
                  style={{ color: location.pathname === item.href ? 'var(--color-gold)' : 'var(--color-text-secondary)' }}
                  onMouseEnter={scheduleCloseMega}
                >
                  {isNova && (
                    <motion.span
                      animate={{ scale: [1, 1.15, 1], rotate: [0, -6, 6, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="inline-flex"
                    >
                      <Flame size={13} style={{ color: '#FF6B2B' }} fill="#FF8A3D" />
                    </motion.span>
                  )}
                  <span>{item.label}</span>
                  {isNova && (
                    <span
                      className="mono-eyebrow text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                      style={{ backgroundColor: 'rgba(255,107,43,0.14)', color: '#FF6B2B', letterSpacing: '0.14em' }}
                    >
                      NEW
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <MiamiTime />
            <ThemeToggle />
            <Magnetic>
              <Link
                to="/contact"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 mono-eyebrow rounded-full transition-all"
                style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
              >
                Book Audit
                <span aria-hidden>↗</span>
              </Link>
            </Magnetic>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} style={{ color: 'var(--color-text)' }} /> : <Menu size={22} style={{ color: 'var(--color-text)' }} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Megamenu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 right-0 top-[72px] z-40 hidden lg:block"
            onMouseEnter={openMega}
            onMouseLeave={scheduleCloseMega}
          >
            <div
              className="section-padding py-10 border-t border-b"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.12)',
              }}
            >
              <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
                <div className="col-span-3">
                  <p className="mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>[01] · Six disciplines</p>
                  <h3 className="display-serif text-3xl mt-3" style={{ color: 'var(--color-text)' }}>
                    Growth, engineered as a <i>system.</i>
                  </h3>
                  <p className="text-sm mt-5 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    Each pillar runs as a standalone engagement — or compounds inside a full-stack retainer.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-6 inline-flex items-center gap-2 mono-eyebrow px-4 py-2.5 rounded-full"
                    style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
                  >
                    Book a free audit <span aria-hidden>↗</span>
                  </Link>

                  <Link
                    to="/nova"
                    onClick={() => setMegaOpen(false)}
                    className="mt-6 block group relative overflow-hidden rounded-xl border transition-all duration-500 hover:border-[var(--color-gold)]"
                    style={{ borderColor: 'var(--color-border)', backgroundColor: '#0A0907' }}
                  >
                    <div className="relative aspect-video w-full overflow-hidden">
                      <video
                        key={megaOpen ? 'mega-open' : 'mega-closed'}
                        src="https://www.image2url.com/r2/default/videos/1777695459715-43dce0f2-7125-4590-9265-ad51614ea73d.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        ref={(el) => {
                          if (!el) return;
                          el.muted = true;
                          const tryPlay = () => { el.play().catch(() => {}); };
                          if (el.readyState >= 2) tryPlay();
                          else el.addEventListener('loadeddata', tryPlay, { once: true });
                        }}
                        onLoadedData={(e) => { (e.currentTarget as HTMLVideoElement).play().catch(() => {}); }}
                        onCanPlay={(e) => { (e.currentTarget as HTMLVideoElement).play().catch(() => {}); }}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.85) 100%)' }}
                      />
                      <span
                        className="absolute top-2 left-2 mono-eyebrow text-[9px] px-2 py-0.5 rounded-full backdrop-blur-md"
                        style={{ backgroundColor: 'rgba(15,14,12,0.65)', color: 'var(--color-gold)', border: '1px solid rgba(201,169,110,0.4)' }}
                      >
                        New · AI Studio
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <div className="display-serif text-lg leading-none italic">NOVA</div>
                            <div className="text-[10px] mt-1 opacity-80">Creative engine · explore</div>
                          </div>
                          <span
                            className="inline-flex items-center justify-center w-7 h-7 rounded-full transition-transform duration-500 group-hover:translate-x-1"
                            style={{ backgroundColor: 'var(--color-gold)', color: '#0E0C0A' }}
                            aria-hidden
                          >
                            ↗
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-span-9 grid grid-cols-3 gap-6">
                  {MEGA_PILLARS.map((c) => (
                    <div key={c.title} className="min-w-0">
                      <Link to={c.href} className="block group">
                        <div className="flex items-baseline gap-3">
                          <span className="mono-eyebrow opacity-50" style={{ color: 'var(--color-text-muted)' }}>{c.num}</span>
                          <span className="font-serif italic text-2xl font-light" style={{ color: 'var(--color-text)' }}>
                            {c.title}
                          </span>
                        </div>
                        <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{c.desc}</p>
                      </Link>
                      <ul className="mt-3 space-y-1.5">
                        {c.sub.map((s) => {
                          const hot = 'hot' in s && (s as { hot?: boolean }).hot;
                          return (
                            <li key={s.name}>
                              <Link
                                to={s.href}
                                className="flex items-center justify-between py-1.5 group/sub"
                                style={{ color: 'var(--color-text-secondary)' }}
                              >
                                <span className="text-sm inline-flex items-center gap-1.5">
                                  {hot && (
                                    <motion.span
                                      animate={{ scale: [1, 1.18, 1] }}
                                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                                      className="inline-flex"
                                    >
                                      <Flame size={12} style={{ color: '#FF6B2B' }} fill="#FF8A3D" />
                                    </motion.span>
                                  )}
                                  {s.name}
                                  {hot && (
                                    <span
                                      className="mono-eyebrow text-[8px] px-1.5 py-0.5 rounded-full font-semibold"
                                      style={{ backgroundColor: 'rgba(255,107,43,0.14)', color: '#FF6B2B' }}
                                    >
                                      NEW
                                    </span>
                                  )}
                                </span>
                                <span className="text-[10px] opacity-0 group-hover/sub:opacity-70 transition-opacity" aria-hidden>↗</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ backgroundColor: 'var(--color-bg)' }}
          >
            <div className="pt-24 px-6 pb-8 h-full overflow-y-auto">
              <div className="space-y-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link to={item.href} className="block py-3 display-serif text-4xl" style={{ color: 'var(--color-text)' }}>
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="pl-4 space-y-1 mb-2">
                        {item.children.map((child) => (
                          <Link key={child.label} to={child.href} className="block py-2 text-base" style={{ color: 'var(--color-text-muted)' }}>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="mt-10">
                <Link
                  to="/contact"
                  className="block w-full text-center py-4 text-base font-semibold rounded-full"
                  style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
                >
                  Book Audit ↗
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
