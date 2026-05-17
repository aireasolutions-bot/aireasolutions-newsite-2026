import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { ArrowRight, TrendingUp, Zap, Target } from 'lucide-react';

const INSIGHTS = [
  {
    icon: TrendingUp,
    category: 'Performance',
    title: 'Why 80% of Restaurant Ad Spend is Wasted',
    excerpt: 'Most brands spray budget across platforms without understanding attribution. We break down the exact framework that turns ad spend into trackable revenue.',
    readTime: '5 min read',
    color: '#0F4C3A',
  },
  {
    icon: Zap,
    category: 'AI & Automation',
    title: 'The AI Systems That Cut Our Clients\' Costs by 40%',
    excerpt: 'From automated content calendars to predictive reservation modeling, here are the proprietary AI workflows we deploy inside every engagement.',
    readTime: '7 min read',
    color: '#8B6914',
  },
  {
    icon: Target,
    category: 'Strategy',
    title: 'Fractional CMO vs. Agency: The Real Cost Comparison',
    excerpt: 'A full-time CMO costs $250K+. A traditional agency charges retainer plus hidden fees. Here\'s what a fractional growth department actually delivers per dollar.',
    readTime: '4 min read',
    color: '#C87E5F',
  },
];

export default function InsightsSection() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 section-padding"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
              Thought Leadership
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
              Insights That{' '}
              <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>
                Move Needles.
              </span>
            </h2>
            <p className="mt-4 text-base max-w-lg" style={{ color: 'var(--color-text-muted)' }}>
              We don't gate-keep knowledge. Here's what we're seeing across the brands
              we serve -- and what it means for yours.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {INSIGHTS.map((insight, i) => {
            const Icon = insight.icon;
            return (
              <motion.article
                key={insight.title}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="group rounded-2xl border overflow-hidden card-hover cursor-pointer"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="p-7 pb-0">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: insight.color }}
                    >
                      <Icon size={16} color="#F5F1E8" />
                    </div>
                    <span className="text-[10px] font-barlow font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
                      {insight.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold leading-snug mb-3" style={{ color: 'var(--color-text)' }}>
                    {insight.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {insight.excerpt}
                  </p>
                </div>

                <div className="px-7 py-5 mt-4 flex items-center justify-between border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <span className="text-[10px] font-barlow uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                    {insight.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--color-gold)' }}>
                    Read
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
