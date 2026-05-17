import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Compass,
  Search,
  Sparkles,
  Home,
  Briefcase,
  Package,
  Mail,
  Zap,
  Brain,
  type LucideIcon,
} from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { supabase } from '../lib/supabase';

type Destination = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
  tint: string;
};

const DESTINATIONS: Destination[] = [
  {
    label: 'Home',
    href: '/',
    description: 'Start with the full AIREA overview and featured work.',
    icon: Home,
    tint: '#8B6914',
  },
  {
    label: 'NOVA — AI Creative Studio',
    href: '/nova',
    description: 'Our flagship AI creative engine.',
    icon: Sparkles,
    tint: '#C87E5F',
  },
  {
    label: 'Case Studies',
    href: '/work',
    description: 'Measurable results across hospitality, retail & lifestyle.',
    icon: Briefcase,
    tint: '#0F4C3A',
  },
  {
    label: 'Services',
    href: '/services',
    description: 'The six pillars of the AIREA growth system.',
    icon: Compass,
    tint: '#8B6914',
  },
  {
    label: 'Amplify — Paid Media',
    href: '/amplify',
    description: 'Meta, Google, YouTube, TikTok run algorithmically.',
    icon: Zap,
    tint: '#0F4C3A',
  },
  {
    label: 'Intelligence — AI Workflows',
    href: '/intelligence',
    description: 'Custom AI workflows, automation & proprietary tools.',
    icon: Brain,
    tint: '#8B6914',
  },
  {
    label: 'Packages',
    href: '/packages',
    description: 'Transparent monthly retainers. No hidden fees.',
    icon: Package,
    tint: '#C87E5F',
  },
  {
    label: 'Contact',
    href: '/contact',
    description: '30 minutes with Nicolas Santos. No pitch deck.',
    icon: Mail,
    tint: '#0F4C3A',
  },
];

const LEGACY_REDIRECTS: Record<string, string> = {
  '/home': '/',
  '/index': '/',
  '/team': '/about',
  '/company': '/about',
  '/our-work': '/work',
  '/portfolio': '/work',
  '/case-studies': '/work',
  '/pricing': '/packages',
  '/plans': '/packages',
  '/get-started': '/contact',
  '/book': '/contact',
  '/book-a-call': '/contact',
  '/schedule': '/contact',
  '/ai': '/intelligence',
  '/ai-workflows': '/intelligence',
  '/automation': '/intelligence',
  '/paid-media': '/amplify',
  '/ads': '/amplify',
  '/meta': '/services/meta-ads',
  '/facebook-ads': '/services/meta-ads',
  '/instagram-ads': '/services/meta-ads',
  '/google': '/services/google-ads',
  '/pmax': '/services/google-ads',
  '/email': '/reach',
  '/sms': '/reach',
  '/crm': '/reach',
  '/social': '/engage',
  '/content': '/engage',
  '/creative': '/engage',
  '/analytics': '/analyze',
  '/reporting': '/analyze',
  '/web': '/build',
  '/websites': '/build',
  '/web-design': '/build',
  '/development': '/build',
  '/nova-ai': '/nova',
  '/creative-studio': '/nova',
};

function tokenize(path: string): string[] {
  return path
    .toLowerCase()
    .replace(/[^a-z0-9/\s-]/g, '')
    .split(/[/\s-]+/)
    .filter((t) => t.length > 1);
}

function scoreMatch(query: string, target: string, description: string): number {
  const tokens = tokenize(query);
  if (!tokens.length) return 0;
  const hay = `${target} ${description}`.toLowerCase();
  let score = 0;
  for (const t of tokens) {
    if (target.toLowerCase().includes(t)) score += 3;
    else if (hay.includes(t)) score += 1;
  }
  return score;
}

export default function NotFoundPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useSEO({
    title: 'Page Not Found (404) | AIREA Solutions',
    description:
      'The page you are looking for no longer exists. Explore AIREA Solutions — a Performance & AI Creative Studio.',
    path: '/404',
    noindex: true,
  });

  useEffect(() => {
    const legacyPath = location.pathname.toLowerCase().replace(/\/+$/, '');
    const redirect = LEGACY_REDIRECTS[legacyPath] || LEGACY_REDIRECTS[legacyPath + '/'];
    if (redirect) {
      navigate(redirect, { replace: true });
      return;
    }

    supabase
      .from('not_found_log')
      .insert({
        path: location.pathname + location.search,
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      })
      .then(() => void 0);
  }, [location.pathname, location.search, navigate]);

  const suggestions = useMemo(() => {
    const q = (query || location.pathname).replace(/^\//, '');
    if (!q) return DESTINATIONS.slice(0, 4);
    const ranked = DESTINATIONS
      .map((d) => ({ d, s: scoreMatch(q, d.label, d.description) }))
      .sort((a, b) => b.s - a.s);
    const top = ranked.filter((r) => r.s > 0).slice(0, 4).map((r) => r.d);
    return top.length ? top : DESTINATIONS.slice(0, 4);
  }, [query, location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const first = suggestions[0];
    if (first) navigate(first.href);
  };

  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center section-padding pt-32 pb-24"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[12%] -left-20 w-[520px] h-[520px] rounded-full blur-[180px]"
        style={{ backgroundColor: '#8B6914' }}
      />
      <motion.div
        aria-hidden
        animate={{ scale: [1.05, 1, 1.05], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-10%] right-[-5%] w-[560px] h-[560px] rounded-full blur-[200px]"
        style={{ backgroundColor: '#0F4C3A' }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
              style={{
                borderColor: 'var(--color-border-strong)',
                backgroundColor: 'var(--color-surface)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--color-gold)' }}
              />
              <span
                className="text-[10px] font-barlow font-semibold uppercase tracking-[0.25em]"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Error 404 · Page Not Found
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative mt-8"
            >
              <span
                aria-hidden
                className="absolute -top-6 -left-2 text-[200px] md:text-[260px] lg:text-[300px] font-bold leading-none tracking-tightest select-none pointer-events-none"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--color-border-strong)',
                  opacity: 0.6,
                }}
              >
                404
              </span>
              <h1
                className="relative text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.05]"
                style={{ color: 'var(--color-text)' }}
              >
                This page{' '}
                <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>
                  moved on.
                </span>
                <br />
                We didn't.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-6 text-base md:text-lg leading-[1.7] max-w-xl"
              style={{ color: 'var(--color-text-muted)' }}
            >
              The page at{' '}
              <code
                className="px-2 py-0.5 rounded-md text-sm"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-gold)',
                  borderWidth: 1,
                  borderColor: 'var(--color-border)',
                }}
              >
                {location.pathname}
              </code>{' '}
              isn't part of our new site. AIREA has evolved — same obsession with
              results, sharper systems. Here's where to go next.
            </motion.p>

            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 flex items-center gap-2 p-1.5 rounded-full border"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border-strong)',
              }}
            >
              <div className="flex items-center gap-2 pl-4">
                <Search size={16} style={{ color: 'var(--color-text-muted)' }} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What were you looking for? (e.g. NOVA, pricing, case studies)"
                className="flex-1 bg-transparent outline-none text-sm py-2.5 placeholder:opacity-60"
                style={{ color: 'var(--color-text)' }}
              />
              <button
                type="submit"
                className="group inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-full transition-all duration-300 hover:scale-[1.03]"
                style={{ backgroundColor: 'var(--color-accent)', color: '#F5F1E8' }}
              >
                Go
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link
                to="/"
                className="group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.02]"
                style={{ backgroundColor: 'var(--color-accent)', color: '#F5F1E8' }}
              >
                <Home size={14} />
                Take me home
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-full border transition-all duration-300 hover:scale-[1.02]"
                style={{
                  borderColor: 'var(--color-border-strong)',
                  color: 'var(--color-text)',
                }}
              >
                Book a strategy call
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-5 flex items-center gap-2"
            >
              <span
                className="text-[10px] font-barlow font-semibold uppercase tracking-[0.25em]"
                style={{ color: 'var(--color-gold)' }}
              >
                {query ? 'Best matches' : 'Where you probably meant to go'}
              </span>
              <span
                className="flex-1 h-px"
                style={{ backgroundColor: 'var(--color-border)' }}
              />
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-3">
              {suggestions.map((d, i) => (
                <motion.div
                  key={d.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                >
                  <Link
                    to={d.href}
                    className="group block rounded-2xl p-5 border card-hover h-full"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${d.tint}1A` }}
                      >
                        <d.icon size={18} style={{ color: d.tint }} />
                      </div>
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1 mt-2"
                        style={{ color: 'var(--color-text-muted)' }}
                      />
                    </div>
                    <h3
                      className="mt-4 text-sm font-bold"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {d.label}
                    </h3>
                    <p
                      className="mt-1.5 text-xs leading-relaxed"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {d.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-6 rounded-2xl p-5 border"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <p
                className="text-[10px] font-barlow uppercase tracking-[0.25em] mb-2"
                style={{ color: 'var(--color-gold)' }}
              >
                Direct line
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Still lost? Nicolas Santos will point you in the right direction.
              </p>
              <a
                href="mailto:nicolas@aireasolutions.com"
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
                style={{ color: 'var(--color-text)' }}
              >
                nicolas@aireasolutions.com
                <ArrowRight size={14} style={{ color: 'var(--color-gold)' }} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
