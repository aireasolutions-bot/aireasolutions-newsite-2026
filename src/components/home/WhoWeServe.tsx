import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

const VERTICALS = [
  {
    title: 'Fine Dining & Upscale',
    desc: 'Where precision and perception drive every cover.',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  },
  {
    title: 'Rooftops & Lounges',
    desc: 'High-visibility venues that set the tone for a night out.',
    img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80',
  },
  {
    title: 'Nightclubs & Nightlife',
    desc: 'Experience-first concepts that need systems to scale.',
    img: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&q=80',
  },
  {
    title: 'Hotel Restaurants',
    desc: 'Destination F&B that serves both guests and locals.',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  },
  {
    title: 'Multi-Venue Groups',
    desc: 'Operations that need infrastructure, not just tactics.',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
  },
  {
    title: 'Luxury Retail & DTC',
    desc: 'Brands where brand equity is as important as conversion.',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80',
  },
];

export default function WhoWeServe() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative py-24 md:py-36 section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
            Built For Brands That Can't Afford to Be Invisible
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
            We Work Where Experience,
            <br />
            Perception, and Revenue{' '}
            <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Intersect.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {VERTICALS.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden cursor-default aspect-[4/3]"
            >
              <img
                src={v.img}
                alt={v.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: 'rgba(15, 76, 58, 0.3)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-base font-bold text-white mb-1">{v.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
