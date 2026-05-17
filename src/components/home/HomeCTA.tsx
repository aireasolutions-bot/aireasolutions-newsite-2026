import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { ArrowRight } from 'lucide-react';
import { TextureButton } from '@/components/ui/texture-button';

export default function HomeCTA() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative py-24 md:py-36 section-padding overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-accent)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ backgroundColor: '#8B6914' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[100px] opacity-10" style={{ backgroundColor: '#F5F1E8' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tightest text-white leading-[1.1]"
            >
              Ready to install a growth engine{' '}
              <span className="font-serif italic opacity-80">inside your brand?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base md:text-lg text-white/70 max-w-lg"
            >
              This isn't about hiring an agency. It's about gaining a full-stack marketing
              department with senior leadership and AI-powered systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10"
            >
              <a
                href="https://aireasolutions.com/book"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-block transition-transform duration-300 hover:scale-[1.02]"
              >
                <TextureButton variant="secondary" size="lg" className="w-auto rounded-full">
                  <span
                    className="inline-flex items-center gap-3 px-6 py-2 text-sm font-semibold"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Book Your Strategy Call
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </TextureButton>
              </a>
              <p className="mt-4 text-xs text-white/50">
                No commitment required. 30-minute call. Nicolas Santos on every call.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 flex items-center gap-8"
            >
              {[
                { val: '93%', lab: 'Retention' },
                { val: '30 min', lab: 'Strategy Call' },
                { val: 'Free', lab: 'No Commitment' },
              ].map((s) => (
                <div key={s.lab}>
                  <span className="text-lg font-bold text-white">{s.val}</span>
                  <p className="text-[10px] font-barlow uppercase tracking-wider text-white/50 mt-0.5">{s.lab}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="AIREA team strategy session"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,76,58,0.4) 0%, transparent 60%)' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
