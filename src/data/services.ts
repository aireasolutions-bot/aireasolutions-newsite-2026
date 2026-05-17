import {
  Megaphone,
  Brain,
  Mail,
  Users,
  BarChart3,
  Globe,
  type LucideIcon,
} from 'lucide-react';

export interface Pillar {
  key: string;
  letter: string;
  title: string;
  tagline: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
  services: string[];
}

export const PILLARS: Pillar[] = [
  {
    key: 'amplify',
    letter: 'A',
    title: 'Amplify',
    tagline: 'Performance marketing that fills seats and drives reservations.',
    description:
      'Meta Ads, Google Search, PMAX, Streaming Ads, geo-targeting, creative testing, and ROAS optimization built around hospitality and retail demand cycles.',
    href: '/amplify',
    icon: Megaphone,
    color: '#0F4C3A',
    services: [
      'Meta Ads',
      'Google Search & PMAX',
      'Streaming Ads',
      'Geo-Targeting & Conquesting',
      'The Andromeda Protocol',
      'Creative Testing',
    ],
  },
  {
    key: 'intelligence',
    letter: 'I',
    title: 'Intelligence',
    tagline: 'AI workflows, automation, and proprietary tools.',
    description:
      'We build AI systems that solve specific, real problems inside your operations. Not demonstrations. Not dashboards. Systems that save time, cut cost, and scale output.',
    href: '/intelligence',
    icon: Brain,
    color: '#8B6914',
    services: [
      'AI Workflow Design',
      'AI Creative Suite',
      'Tech Stack Optimization',
      'Internal Tool Development',
      'Process Automation',
      'AI Education & Training',
    ],
  },
  {
    key: 'reach',
    letter: 'R',
    title: 'Reach',
    tagline: 'Email, SMS, CRM, and retention systems.',
    description:
      'Paid media brings new guests through the door. Owned media keeps them coming back. We build the infrastructure that turns a great first experience into a loyal repeat guest.',
    href: '/reach',
    icon: Mail,
    color: '#C87E5F',
    services: [
      'Email Marketing',
      'SMS Marketing',
      'CRM Foundations',
      'Retention Flows',
      'Lifecycle Marketing',
    ],
  },
  {
    key: 'engage',
    letter: 'E',
    title: 'Engage',
    tagline: 'Social media, content, video, and AI-powered creative.',
    description:
      'Great social media happens when someone understands what your brand stands for, who your guests are, and what makes your space unlike anything else in the city.',
    href: '/engage',
    icon: Users,
    color: '#6BA5C8',
    services: [
      'Social Media Strategy',
      'AIREA Studio',
      'AI-Powered Creatives',
      'Video Production',
      'Brand Identity',
      'Event Collateral',
    ],
  },
  {
    key: 'analyze',
    letter: 'A',
    title: 'Analyze',
    tagline: 'Real-time reporting, forecasting, and transparent insights.',
    description:
      'No black-box reporting. No vanity decks. Real-time dashboards, actionable forecasts, and strategic recommendations tied directly to your P&L.',
    href: '/analyze',
    icon: BarChart3,
    color: '#4A5759',
    services: [
      'Real-Time Dashboards',
      'Revenue Forecasting',
      'AI Smart Recommendations',
      'Quarterly Strategic Reviews',
      'Full Channel Attribution',
    ],
  },
  {
    key: 'build',
    letter: 'B',
    title: 'Build',
    tagline: 'Your website is your most important marketing asset.',
    description:
      'Most websites are beautiful brochures that don\'t convert. We design and build websites that are architecturally sound, visually stunning, and structurally built to turn visitors into customers.',
    href: '/build',
    icon: Globe,
    color: '#8B4513',
    services: [
      'Website Design & Development',
      'Webflow & Shopify',
      'Custom Development',
      'Landing Pages',
      'App Development',
      'Technical SEO',
    ],
  },
];

export interface Package {
  name: string;
  price: string;
  period: string;
  description: string;
  popular: boolean;
  features: string[];
}

export const PACKAGES: Package[] = [
  {
    name: 'Core Growth Engine',
    price: '$3.8K',
    period: '/ month',
    description: 'For brands ready to stop running tactics and start running a system.',
    popular: true,
    features: [
      'Fractional CMO leadership',
      'Paid media management (Meta + Google)',
      'Creative direction & optimization',
      'Social media coordination',
      'Email & CRM foundations',
      'Reporting & insights',
    ],
  },
  {
    name: 'Growth Engine + AI',
    price: '$5.5K',
    period: '/ month',
    description: 'For brands that want to move faster and operate smarter.',
    popular: false,
    features: [
      'Everything in Core Growth',
      'AI creative workflows',
      'AI automations & integrations',
      'Advanced analytics & forecasting',
      'Priority strategy access',
    ],
  },
  {
    name: 'Custom Partnership',
    price: 'Custom',
    period: '/ month',
    description: 'For multi-venue groups and complex operations.',
    popular: false,
    features: [
      'Fully tailored scope',
      'Dedicated team structure',
      'Custom AI systems',
      'Executive-level strategy sessions',
      'Multi-venue rollout capability',
    ],
  },
];
