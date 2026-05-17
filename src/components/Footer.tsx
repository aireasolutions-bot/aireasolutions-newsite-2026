import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const FOOTER_LINKS = [
  {
    title: 'Pillars',
    links: [
      { label: 'Amplify', href: '/amplify' },
      { label: 'Intelligence', href: '/intelligence' },
      { label: 'Reach', href: '/reach' },
      { label: 'Engage', href: '/engage' },
      { label: 'Analyze', href: '/analyze' },
      { label: 'Build', href: '/build' },
      { label: 'Meta Ads', href: '/services/meta-ads' },
      { label: 'Google Ads', href: '/services/google-ads' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Work', href: '/work' },
      { label: 'Packages', href: '/packages' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'nicolas@aireasolutions.com', href: 'mailto:nicolas@aireasolutions.com' },
      { label: '+1 (407) 443-4607', href: 'tel:+14074434607' },
      { label: 'NYC & Miami', href: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative border-t"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}
    >
      <div className="section-padding py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-1.5 mb-6">
              <span className="text-xl font-bold tracking-tightest" style={{ color: 'var(--color-text)' }}>
                AIREA
              </span>
              <span className="text-xl font-serif italic" style={{ color: 'var(--color-gold)' }}>
                Solutions
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
              The Fractional Growth Department for upscale hospitality and retail brands.
            </p>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold group"
                style={{ color: 'var(--color-gold)' }}
              >
                Book Strategy Call
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-barlow font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--color-text-muted)' }}>
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('mailto:') || link.href.startsWith('tel:') ? (
                      <a
                        href={link.href}
                        className="text-sm transition-colors duration-200 hover:opacity-80"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm transition-colors duration-200 hover:opacity-80"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="glow-line mt-16 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            &copy; {new Date().getFullYear()} AIREA Solutions. All rights reserved.
          </p>
          <p className="text-xs font-serif italic" style={{ color: 'var(--color-text-muted)' }}>
            "Marketing should be both innovative and human. AI just makes it infinitely smarter."
          </p>
        </div>
      </div>
    </footer>
  );
}
