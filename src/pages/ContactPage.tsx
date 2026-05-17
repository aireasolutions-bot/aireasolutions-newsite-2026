import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useSEO } from '../hooks/useSEO';
import { seoContact } from '../data/seoConfig';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  useSEO(seoContact);
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: formRef, isInView: formVisible } = useInView();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-surface)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text)',
  };

  return (
    <>
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center section-padding pt-32 pb-16">
        <div className="absolute inset-0 grain-overlay" style={{ backgroundColor: 'var(--color-bg)' }} />
        <div className="relative z-10 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]"
            style={{ color: 'var(--color-gold)' }}
          >
            Let's Talk
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.05]"
            style={{ color: 'var(--color-text)' }}
          >
            30 Minutes. No Pitch Deck.{' '}
            <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Just Strategy.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Every conversation starts the same way: we listen. We want to understand your business,
            your seasonality, your challenges, and where you want to be in 12 months.
          </motion.p>
        </div>
      </section>

      <section ref={formRef} className="relative py-16 md:py-24 section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={formVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold tracking-tightest mb-8" style={{ color: 'var(--color-text)' }}>
              Reach{' '}
              <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Out</span>
            </h2>

            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'nicolas@aireasolutions.com', href: 'mailto:nicolas@aireasolutions.com' },
                { icon: Phone, label: 'Phone', value: '+1 (407) 443-4607', href: 'tel:+14074434607' },
                { icon: MapPin, label: 'Locations', value: 'New York City & Miami', href: '' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={formVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--color-border)' }}>
                    <item.icon size={18} style={{ color: 'var(--color-gold)' }} />
                  </div>
                  <div>
                    <p className="text-xs font-barlow uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-semibold hover:opacity-80 transition-opacity" style={{ color: 'var(--color-text)' }}>
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 p-6 rounded-xl border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Nicolas Santos on every call.</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                No sales reps. No junior team members. The person who will be leading your strategy is the person you'll speak with on day one.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={formVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl p-8 md:p-10 border"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--color-accent)' }}>
                  <Send size={24} color="#F5F1E8" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Message Sent</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  We'll be in touch within 24 hours to schedule your strategy call.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-barlow uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors focus:ring-1"
                      style={{ ...inputStyle, '--tw-ring-color': 'var(--color-gold)' } as React.CSSProperties}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-barlow uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors focus:ring-1"
                      style={{ ...inputStyle, '--tw-ring-color': 'var(--color-gold)' } as React.CSSProperties}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-barlow uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    Business Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors focus:ring-1"
                    style={{ ...inputStyle, '--tw-ring-color': 'var(--color-gold)' } as React.CSSProperties}
                    placeholder="Your restaurant or brand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-barlow uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    What are you looking for?
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors focus:ring-1"
                    style={{ ...inputStyle, '--tw-ring-color': 'var(--color-gold)' } as React.CSSProperties}
                  >
                    <option value="">Select one</option>
                    <option value="full">Full Growth Partnership</option>
                    <option value="paid">Paid Media Management</option>
                    <option value="ai">AI & Automation</option>
                    <option value="content">Content & Social</option>
                    <option value="web">Website Design & Dev</option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-barlow uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors resize-none focus:ring-1"
                    style={{ ...inputStyle, '--tw-ring-color': 'var(--color-gold)' } as React.CSSProperties}
                    placeholder="Tell us about your business and goals..."
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-2 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.02]"
                  style={{ backgroundColor: 'var(--color-accent)', color: '#F5F1E8' }}
                >
                  Send Message
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
