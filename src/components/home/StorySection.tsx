import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TIMELINE = [
  {
    year: 'The Problem',
    title: 'Fragmented marketing was costing brands millions.',
    text: 'Premium hospitality and retail brands were juggling 3-5 vendors, losing data between platforms, and paying overhead for strategies that never connected to revenue.',
  },
  {
    year: 'The Insight',
    title: 'What if one team owned the entire growth engine?',
    text: 'Not a generalist agency. Not a freelancer. A dedicated, senior-level department that embeds inside your business -- with full accountability to your P&L.',
  },
  {
    year: 'AIREA Today',
    title: 'Six pillars. One system. Total ownership.',
    text: 'We built the A.I.R.E.A.B. methodology: Amplify, Intelligence, Reach, Engage, Analyze, Build. Every pillar connects. Every decision ties back to revenue. No gaps, no excuses.',
  },
];

export default function StorySection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative py-24 md:py-36 section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-border), transparent)' }} />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-32"
          >
            <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
              Why AIREA Exists
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tightest leading-[1.1]" style={{ color: 'var(--color-text)' }}>
              Built from frustration.{' '}
              <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>
                Designed for results.
              </span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              AIREA wasn't born in a boardroom. It was born from watching premium brands
              hemorrhage budget across disconnected agencies, each optimizing for their own
              KPI -- none owning the outcome.
            </p>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold group"
              style={{ color: 'var(--color-gold)' }}
            >
              Read Our Full Story
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-px"
                  style={{ backgroundColor: i === TIMELINE.length - 1 ? 'transparent' : 'var(--color-border)' }}
                />
                <div
                  className="absolute left-0 top-1 w-2 h-2 rounded-full -translate-x-[3.5px]"
                  style={{ backgroundColor: i === TIMELINE.length - 1 ? 'var(--color-gold)' : 'var(--color-border-strong)' }}
                />

                <span
                  className="text-[10px] font-barlow font-semibold uppercase tracking-[0.2em] block mb-2"
                  style={{ color: i === TIMELINE.length - 1 ? 'var(--color-gold)' : 'var(--color-text-muted)' }}
                >
                  {item.year}
                </span>
                <h3 className="text-lg md:text-xl font-bold leading-snug mb-2" style={{ color: 'var(--color-text)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
