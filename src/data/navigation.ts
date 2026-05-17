export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Pillars',
    href: '/services',
    children: [
      { label: 'Amplify', href: '/amplify' },
      { label: 'Intelligence', href: '/intelligence' },
      { label: 'Reach', href: '/reach' },
      { label: 'Engage', href: '/engage' },
      { label: 'Analyze', href: '/analyze' },
      { label: 'Build', href: '/build' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Meta Ads', href: '/services/meta-ads' },
      { label: 'Google Ads & PMAX', href: '/services/google-ads' },
      { label: 'AI Workflows', href: '/intelligence' },
      { label: 'Email & SMS', href: '/reach' },
      { label: 'Social Media', href: '/engage' },
      { label: 'NOVA — AI Creative Engine', href: '/nova' },
      { label: 'AIREA Studio', href: '/engage' },
      { label: 'Web Design & Dev', href: '/build' },
      { label: 'Analytics & Reporting', href: '/analyze' },
    ],
  },
  { label: 'NOVA', href: '/nova' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Packages', href: '/packages' },
  { label: 'Contact', href: '/contact' },
];
