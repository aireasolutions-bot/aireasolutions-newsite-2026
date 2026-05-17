import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { Shield, Layers, Brain, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DIFFERENTIATORS = [
  {
    icon: Shield,
    title: 'Fractional CMO Leadership',
    description: 'A senior strategist who owns your marketing like a co-founder — not a junior account manager reading a playbook.',
    accent: '#0F4C3A',
  },
  {
    icon: Layers,
    title: 'Six Pillars, One System',
    description: 'Ads, AI, email, social, analytics, and web — integrated under one roof so nothing falls through the cracks.',
    accent: '#8B6914',
  },
  {
    icon: Brain,
    title: 'AI Built Into Everything',
    description: 'Proprietary workflows that automate reporting, optimize creative, and surface insights your competitors miss.',
    accent: '#C87E5F',
  },
  {
    icon: TrendingUp,
    title: 'Tied to Your Revenue',
    description: 'We measure what matters to your P&L — not impressions, not vanity metrics. Revenue, retention, and real growth.',
    accent: '#4A5759',
  },
];

function DifferentiatorCard({
  item,
  index,
  isInView,
}: {
  item: (typeof DIFFERENTIATORS)[number];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="group relative rounded-2xl p-7 md:p-8 border transition-all duration-500 hover:-translate-y-1"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700"
        style={{ backgroundColor: item.accent }}
      />

      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundColor: item.accent }}
      >
        <item.icon size={20} color="#F5F1E8" />
      </div>

      <h3
        className="text-base font-bold mb-2 tracking-tight"
        style={{ color: 'var(--color-text)' }}
      >
        {item.title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {item.description}
      </p>
    </motion.div>
  );
}

export default function ProblemSection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative pt-12 md:pt-16 pb-24 md:pb-36 section-padding overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[200px] opacity-[0.06]"
        style={{ backgroundColor: 'var(--color-accent)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <span
            className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]"
            style={{ color: 'var(--color-gold)' }}
          >
            Why AIREA
          </span>
          <h2
            className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tightest"
            style={{ color: 'var(--color-text)' }}
          >
            One Partner. Every Pillar.
            <br />
            <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>
              Full Ownership.
            </span>
          </h2>
          <p
            className="mt-6 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            We replace the patchwork of agencies, freelancers, and disconnected tools with
            a single integrated system — built for premium hospitality and retail brands
            that demand more from their marketing.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {DIFFERENTIATORS.map((item, i) => (
            <DifferentiatorCard
              key={item.title}
              item={item}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group"
            style={{ color: 'var(--color-gold)' }}
          >
            Learn more about our approach
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
