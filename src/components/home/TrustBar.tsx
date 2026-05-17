import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { CLIENT_LOGOS } from '../../data/clients';

export default function TrustBar() {
  const { ref, isInView } = useInView();
  const loop = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section ref={ref} className="relative py-12 md:py-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-4 mb-8 md:mb-10">
          <span className="h-px w-12" style={{ backgroundColor: 'var(--color-border-strong)' }} />
          <p
            className="text-center text-xs font-barlow font-semibold uppercase tracking-[0.25em]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Powering Leading Brands
          </p>
          <span className="h-px w-12" style={{ backgroundColor: 'var(--color-border-strong)' }} />
        </div>

        <div className="overflow-hidden marquee-fade-left">
          <div
            className="flex items-center animate-marquee whitespace-nowrap"
            style={{ animationDuration: '55s', gap: '3.5rem' }}
          >
            {loop.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="shrink-0 flex items-center justify-center h-16 md:h-20 px-2"
                title={client.name}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className={`h-full w-auto max-w-[180px] md:max-w-[220px] object-contain transition-all duration-500 hover:scale-110 ${client.noTint ? 'logo-no-tint' : 'logo-tint'}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
