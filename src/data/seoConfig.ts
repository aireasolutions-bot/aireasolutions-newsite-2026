import type { SEOConfig } from '../hooks/useSEO';

const ORG_REF = { '@id': 'https://aireasolutions.com/#organization' };

const BRAND_KEYWORDS = [
  'AIREA Solutions',
  'performance marketing agency',
  'AI creative studio',
  'AI marketing agency',
  'Fractional CMO',
  'Fractional Growth Department',
];

function servicePageJsonLd(params: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  additionalTypes?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    serviceType: params.serviceType,
    description: params.description,
    url: params.url,
    provider: ORG_REF,
    areaServed: ['United States', 'North America', 'Europe', 'Latin America'],
    audience: { '@type': 'BusinessAudience', audienceType: 'Upscale hospitality and retail brands' },
    ...(params.additionalTypes ? { additionalType: params.additionalTypes } : {}),
  };
}

export const seoHome: SEOConfig = {
  title: 'AIREA Solutions — Performance Marketing & AI Creative Studio',
  description:
    'AIREA Solutions is a performance marketing and AI creative studio. We blend proprietary AI workflows, NOVA (our AI creative engine), and human expertise to grow upscale hospitality and retail brands. Home of the Andromeda Protocol and the Fractional Growth Department model.',
  path: '/',
  keywords: [
    ...BRAND_KEYWORDS,
    'NOVA AI creative engine',
    'Andromeda Protocol',
    'AI content production',
    'hospitality marketing',
    'luxury retail marketing',
    'Meta Ads agency',
    'Google Ads agency',
    'Miami marketing agency',
  ],
  type: 'website',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What does AIREA Solutions do?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'AIREA Solutions is a performance marketing and AI creative studio. We combine proprietary AI workflows, the NOVA AI creative engine, and human expertise to grow upscale hospitality and retail brands. We operate as a Fractional Growth Department — owning strategy, paid media, creative, lifecycle, and analytics as one integrated system.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is NOVA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'NOVA is AIREA\'s proprietary AI creative engine — a ten-stage production pipeline that turns brand DNA into editorial-grade photography, cinematic video, UGC, voice, and avatars. NOVA delivers 80–150 brand-locked assets per month at $40–$120 per asset with a 5–7 day UGC turnaround.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Andromeda Protocol?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Andromeda Protocol is AIREA\'s four-phase Meta Ads performance framework — Launch, Learn, Scale, Compound — combining full-funnel testing with NOVA creative at volume. It delivers an average of 4.5x ROAS for our hospitality and retail clients.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who does AIREA work with?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'AIREA partners with upscale hospitality brands (rooftops, fine dining, nightlife, hotels) and luxury retail brands (fashion, beauty, lifestyle) that need a performance partner who can own both growth engineering and brand craft.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where is AIREA based?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'AIREA Solutions is headquartered in Miami, Florida, with active clients across New York, Los Angeles, Europe, and Latin America.',
          },
        },
      ],
    },
  ],
};

export const seoAbout: SEOConfig = {
  title: 'About AIREA Solutions — The Story Behind the System',
  description:
    'AIREA Solutions was built to replace fragmented agencies with one embedded growth team. Learn about our values, our Fractional Growth Department model, and how we pair proprietary AI with human taste to move revenue for upscale hospitality and retail brands.',
  path: '/about',
  keywords: [
    ...BRAND_KEYWORDS,
    'about AIREA',
    'Nicolas Santos AIREA',
    'ethical AI agency',
    'human-first AI marketing',
  ],
  type: 'website',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ],
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About AIREA Solutions',
    url: 'https://aireasolutions.com/about',
    mainEntity: ORG_REF,
  },
};

export const seoServices: SEOConfig = {
  title: 'Services — One Partner, Every Pillar | AIREA Solutions',
  description:
    'Full-stack performance marketing and AI creative services: Meta Ads, Google Ads, NOVA AI creative, SEO & AI indexation, email & CRM, web development, analytics, and brand systems — all operated inside one integrated growth team.',
  path: '/services',
  keywords: [
    ...BRAND_KEYWORDS,
    'marketing services',
    'Meta Ads',
    'Google Ads',
    'AI creative services',
    'email marketing',
    'CRM automation',
    'Webflow agency',
    'Shopify agency',
  ],
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ],
  jsonLd: servicePageJsonLd({
    name: 'AIREA Solutions — Full-Stack Marketing & AI Creative Services',
    description:
      'Performance marketing, AI creative production (NOVA), lifecycle marketing, web development, and analytics — operated as one Fractional Growth Department.',
    url: 'https://aireasolutions.com/services',
    serviceType: 'Integrated Marketing & AI Creative',
  }),
};

export const seoWork: SEOConfig = {
  title: 'Work — Case Studies in Performance & AI Creative | AIREA',
  description:
    'Proof. Real results from AIREA client partnerships: rooftops, fine dining, nightlife, and luxury retail brands. 4x–24x ROAS, +120% conversions, and AI-produced creative at scale.',
  path: '/work',
  keywords: [
    ...BRAND_KEYWORDS,
    'marketing case studies',
    'hospitality marketing case studies',
    'luxury retail case studies',
    'AI creative case studies',
  ],
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Work', url: '/work' },
  ],
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AIREA Solutions — Case Studies',
    url: 'https://aireasolutions.com/work',
    isPartOf: { '@id': 'https://aireasolutions.com/#website' },
    about: 'Performance marketing and AI creative case studies for upscale hospitality and retail brands.',
  },
};

export const seoPackages: SEOConfig = {
  title: 'Packages & Pricing — Fractional Growth Department | AIREA',
  description:
    'Retainer-based Fractional Growth Department packages. Dedicated strategy, paid media, NOVA AI creative, lifecycle, analytics, and direct access to our Fractional CMO. Transparent tiers for upscale hospitality and retail brands.',
  path: '/packages',
  keywords: [
    ...BRAND_KEYWORDS,
    'marketing retainer pricing',
    'Fractional CMO pricing',
    'AI creative retainer',
    'hospitality marketing packages',
  ],
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Packages', url: '/packages' },
  ],
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'AIREA Solutions — Retainer Packages',
    url: 'https://aireasolutions.com/packages',
    provider: ORG_REF,
  },
};

export const seoContact: SEOConfig = {
  title: 'Contact AIREA — 30 Minutes. No Pitch Deck. Just Strategy.',
  description:
    'Book a strategy call with AIREA Solutions. 30 minutes with our Fractional CMO — audit, recommendations, and a growth thesis tailored to your brand. No pitch deck.',
  path: '/contact',
  keywords: [
    ...BRAND_KEYWORDS,
    'marketing strategy call',
    'book Fractional CMO',
    'AIREA contact',
    'marketing audit',
  ],
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ],
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact AIREA Solutions',
    url: 'https://aireasolutions.com/contact',
    mainEntity: ORG_REF,
  },
};

export const seoNova: SEOConfig = {
  title: 'NOVA — AI Creative Engine by AIREA Solutions',
  description:
    'NOVA is AIREA\'s proprietary AI creative engine: a ten-stage brand-locked production pipeline for editorial photography, cinematic video, UGC, voice, and avatars. 80–150 assets per month at $40–$120 per asset. 5–7 day UGC batches. Built for brands obsessed with creative volume that compounds.',
  path: '/nova',
  keywords: [
    'NOVA',
    'AI creative engine',
    'AI content production',
    'AI UGC at scale',
    'AI video production',
    'AI avatar creation',
    'brand-locked AI',
    'AI photo shoot',
    'generative creative',
  ],
  type: 'website',
  image: 'https://aireasolutions.com/og/nova-og.jpg',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'NOVA', url: '/nova' },
  ],
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'NOVA — AI Creative Engine',
      brand: ORG_REF,
      description:
        'NOVA is AIREA\'s proprietary ten-stage AI creative production pipeline. Brand DNA extraction, campaign framing, ICP modeling, reference training, avatar creation, prompt engineering, model orchestration, voice cloning, workflow graph, and editorial QC.',
      category: 'AI Creative Production',
      image: 'https://aireasolutions.com/og/nova-og.jpg',
      url: 'https://aireasolutions.com/nova',
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '40',
        highPrice: '120',
        offerCount: '8',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2027-12-31',
      },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Assets per month', value: '80–150' },
        { '@type': 'PropertyValue', name: 'UGC batch turnaround', value: '5–7 days' },
        { '@type': 'PropertyValue', name: 'Pipeline stages', value: '10' },
        { '@type': 'PropertyValue', name: 'Output formats', value: 'Photography, Video, UGC, Voice, Avatars, Motion, 3D, Ad Sets' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is NOVA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'NOVA is AIREA\'s AI creative engine — a ten-stage production pipeline that turns brand DNA into editorial photography, cinematic video, UGC, voice, and avatars, with human editorial direction on every final frame.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is NOVA different from just using ChatGPT or Midjourney?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'NOVA orchestrates multiple best-in-class models (Flux, Veo, Runway, Midjourney, Sora, ElevenLabs) inside a brand-locked workflow. We extract brand DNA, tune models to your references, and run every asset through editorial QC — so outputs are unmistakably yours, not generic AI content.',
          },
        },
        {
          '@type': 'Question',
          name: 'How fast can NOVA produce creative?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'First creative sample within 72 hours of a Brand DNA intake. Ongoing UGC batches in 5–7 days. Monthly output range: 80–150 brand-locked assets.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does NOVA cost per asset?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'NOVA assets range from $40 to $120 per asset depending on format and complexity — a 5–30x cost reduction versus traditional production.',
          },
        },
      ],
    },
  ],
};

export const seoAmplify: SEOConfig = {
  title: 'Amplify — Performance Marketing: Meta, Google, PMAX | AIREA',
  description:
    'Performance media operated as a growth engine. Meta Ads (Andromeda Protocol), Google Ads, PMAX, YouTube/Streaming, and paid social — engineered for 4x–24x ROAS across hospitality and retail.',
  path: '/amplify',
  keywords: [
    ...BRAND_KEYWORDS,
    'Andromeda Protocol',
    'Meta Ads management',
    'Google Ads management',
    'Performance Max',
    'paid social agency',
    'hospitality paid media',
  ],
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Amplify', url: '/amplify' },
  ],
  jsonLd: servicePageJsonLd({
    name: 'Amplify — Performance Marketing',
    description:
      'Meta Ads, Google Ads, PMAX, YouTube/Streaming and paid social engineered for full-funnel ROAS.',
    url: 'https://aireasolutions.com/amplify',
    serviceType: 'Performance Marketing',
  }),
};

export const seoIntelligence: SEOConfig = {
  title: 'Intelligence — AI Workflows & Operational Automation | AIREA',
  description:
    'AI that actually runs your business. We build proprietary AI workflows, agents, and automations that remove operational drag across marketing, ops, and revenue — not dashboards for the sake of dashboards.',
  path: '/intelligence',
  keywords: [
    ...BRAND_KEYWORDS,
    'AI workflows',
    'AI automation agency',
    'AI agents for marketing',
    'marketing ops automation',
  ],
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Intelligence', url: '/intelligence' },
  ],
  jsonLd: servicePageJsonLd({
    name: 'Intelligence — AI Workflows & Automation',
    description: 'Custom AI workflows, agents and automations for marketing and revenue operations.',
    url: 'https://aireasolutions.com/intelligence',
    serviceType: 'AI Workflow Automation',
  }),
};

export const seoReach: SEOConfig = {
  title: 'Reach — Email, SMS, CRM & Lifecycle Marketing | AIREA',
  description:
    'Owned-channel growth: email, SMS, CRM, and lifecycle orchestration built for retention and LTV. Klaviyo, HubSpot, Attentive — engineered as a revenue channel, not a newsletter.',
  path: '/reach',
  keywords: [
    ...BRAND_KEYWORDS,
    'Klaviyo agency',
    'email marketing agency',
    'SMS marketing',
    'lifecycle marketing',
    'CRM marketing',
    'retention marketing',
  ],
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Reach', url: '/reach' },
  ],
  jsonLd: servicePageJsonLd({
    name: 'Reach — Lifecycle & CRM Marketing',
    description: 'Email, SMS, CRM and lifecycle marketing engineered for retention and LTV.',
    url: 'https://aireasolutions.com/reach',
    serviceType: 'Lifecycle Marketing',
  }),
};

export const seoEngage: SEOConfig = {
  title: 'Engage — Social, Video, Creative & Brand Identity | AIREA',
  description:
    'Editorial social, cinematic video, AI photoshoots, and brand identity systems. Fuel the feed with work that actually feels like your brand — produced at performance volume.',
  path: '/engage',
  keywords: [
    ...BRAND_KEYWORDS,
    'social media agency',
    'editorial social content',
    'AI photoshoot',
    'brand identity agency',
    'video production agency',
  ],
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Engage', url: '/engage' },
  ],
  jsonLd: servicePageJsonLd({
    name: 'Engage — Social, Video & Brand Creative',
    description: 'Editorial social, cinematic video, AI photoshoots and brand identity systems.',
    url: 'https://aireasolutions.com/engage',
    serviceType: 'Brand Creative & Social',
  }),
};

export const seoAnalyze: SEOConfig = {
  title: 'Analyze — Dashboards, Forecasting & Attribution | AIREA',
  description:
    'Real-time dashboards, forecasting, multi-touch attribution, and quarterly revenue reviews. See the full picture — so decisions get made on data, not gut.',
  path: '/analyze',
  keywords: [
    ...BRAND_KEYWORDS,
    'marketing analytics agency',
    'multi-touch attribution',
    'marketing forecasting',
    'BI dashboards marketing',
  ],
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Analyze', url: '/analyze' },
  ],
  jsonLd: servicePageJsonLd({
    name: 'Analyze — Marketing Analytics',
    description: 'Real-time dashboards, forecasting, multi-touch attribution and quarterly reviews.',
    url: 'https://aireasolutions.com/analyze',
    serviceType: 'Marketing Analytics',
  }),
};

export const seoBuild: SEOConfig = {
  title: 'Build — Web, Shopify, Webflow & Technical SEO | AIREA',
  description:
    'Websites built to convert humans and be understood by AI. React, Next.js, Webflow, Shopify — with technical SEO, JSON-LD schema, and LLM indexation engineered in from the start.',
  path: '/build',
  keywords: [
    ...BRAND_KEYWORDS,
    'Webflow development',
    'Shopify development',
    'React website agency',
    'technical SEO',
    'LLM indexation',
    'AI-ready website',
  ],
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Build', url: '/build' },
  ],
  jsonLd: servicePageJsonLd({
    name: 'Build — Web Development & Technical SEO',
    description: 'Conversion-focused, AI-indexable web development on React, Webflow, and Shopify.',
    url: 'https://aireasolutions.com/build',
    serviceType: 'Web Development & Technical SEO',
  }),
};

export const seoMetaAds: SEOConfig = {
  title: 'Meta Ads Agency — The Andromeda Protocol | AIREA Solutions',
  description:
    'Meta Ads engineered for scale. The Andromeda Protocol — our four-phase Meta framework (Launch, Learn, Scale, Compound) — pairs full-funnel testing with NOVA creative at volume to deliver an average 4.5x ROAS.',
  path: '/services/meta-ads',
  keywords: [
    ...BRAND_KEYWORDS,
    'Meta Ads agency',
    'Facebook Ads agency',
    'Instagram Ads agency',
    'Andromeda Protocol',
    'DCO testing',
    'creative at scale',
  ],
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Meta Ads', url: '/services/meta-ads' },
  ],
  jsonLd: servicePageJsonLd({
    name: 'Meta Ads Management — Andromeda Protocol',
    description:
      'Meta Ads management using the Andromeda Protocol: Launch, Learn, Scale, Compound. Full-funnel testing with NOVA creative at volume.',
    url: 'https://aireasolutions.com/services/meta-ads',
    serviceType: 'Meta Ads Management',
  }),
};

export const seoGoogleAds: SEOConfig = {
  title: 'Google Ads Agency — Search, PMAX, YouTube | AIREA Solutions',
  description:
    'Google Ads operated like a revenue system. Search, Performance Max, Local, YouTube, Demand Gen, and Shopping — structured around the AIREA performance framework to compound over time.',
  path: '/services/google-ads',
  keywords: [
    ...BRAND_KEYWORDS,
    'Google Ads agency',
    'Performance Max agency',
    'YouTube Ads agency',
    'search ads management',
    'Demand Gen ads',
    'shopping ads agency',
  ],
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Google Ads', url: '/services/google-ads' },
  ],
  jsonLd: servicePageJsonLd({
    name: 'Google Ads Management',
    description:
      'Search, Performance Max, Local, YouTube, Demand Gen and Shopping campaigns engineered for compounding ROI.',
    url: 'https://aireasolutions.com/services/google-ads',
    serviceType: 'Google Ads Management',
  }),
};
