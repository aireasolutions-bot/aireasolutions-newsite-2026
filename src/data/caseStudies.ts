export interface CaseStudyStat {
  label: string;
  value: string;
  before?: string;
  after?: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  vertical: string;
  tagline: string;
  description: string;
  fullDescription: string;
  image: string;
  mediaType?: 'image' | 'video';
  website?: string;
  stats: CaseStudyStat[];
  services: string[];
  highlights?: string[];
  heroSlides?: string[];
  gridImages?: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'one40-rooftop',
    client: 'ONE40 Rooftop',
    vertical: 'Rooftop & Hospitality',
    tagline: 'From fragmented campaigns to a market-dominating growth engine.',
    description:
      'FiDi rooftop venue. Replaced fragmented marketing with a full Fractional Growth Department — infrastructure, Google, Meta, and creative as one system.',
    fullDescription:
      'ONE40 had the venue, the view, and the concept — but the marketing engine behind it was running on fumes. Google campaigns were fragmented with no keyword architecture, CAC was climbing, there were no KPIs tied to revenue, no funnel logic on Meta, and the website wasn\u2019t built to convert or be discovered by AI-driven search. AIREA didn\u2019t come in to support ONE40\u2019s marketing — we replaced it with a full Fractional Growth Department, owning strategy, infrastructure, paid media, and creative as a single integrated system. We rebuilt the digital foundation for humans and machines: LLM indexation, JSON-LD schema, HTML-indexable menus, conversion-focused landing pages, and marketing automations connecting bookings, CRM, and re-engagement flows. On Google, we rebuilt around the AIREA performance framework with PMAX for local dominance, high-volume low-cost keyword targeting, NTM campaigns segmented by category, TM campaigns to protect branded search, and Competitor Conquest to capture neighboring intent — delivering +120% conversions with CAC under $2. On Meta, we deployed the Andromeda creative protocol: a complete TOF/MOF funnel with DCO testing dozens of variations weekly — delivering 5%+ CTR, 4X ROAS, $2.80 CPA at TOF, and overall CAC under $10.',
    image: 'https://i.imgur.com/HOe0C2T.jpeg',
    website: 'https://one40rooftop.com/',
    stats: [
      { label: 'Google Conversions', value: '+120%' },
      { label: 'Meta ROAS', value: '4X' },
      { label: 'CAC', value: '<$10' },
    ],
    services: ['Google PMAX', 'Meta Ads', 'Website Build', 'LLM SEO', 'CRM & Automation', 'Creative Direction'],
    highlights: [
      'Google conversions up 120% with CAC under $2',
      'Meta delivering 4X ROAS at 5%+ CTR',
      '$2.80 CPA at Top of Funnel',
      'Website rebuilt for conversion + LLM/AI discoverability',
      'Andromeda creative protocol deployed on Meta',
      'Competitor Conquest campaigns capturing neighboring intent',
    ],
    heroSlides: [
      'https://i.imgur.com/WpUREFP.jpeg',
      'https://i.imgur.com/dNr6Ww8.jpeg',
      'https://i.imgur.com/QimIvEd.jpeg',
    ],
    gridImages: [
      'https://i.imgur.com/qKMrbr0.jpeg',
      'https://i.imgur.com/ycc9xOM.jpeg',
      'https://i.imgur.com/vw4uGA1.jpeg',
    ],
  },
  {
    slug: 'pogba-mdx',
    client: 'POGBA MDX',
    vertical: 'Luxury Fashion · AI',
    tagline: 'An all-AI luxury fashion brand for Paul Pogba — $180K saved.',
    description:
      'Celebrity brand of soccer icon Paul Pogba. A fully AI-built luxury fashion house — PDPs, digital model creation, ecommerce, product and lifestyle photography, website, and social video.',
    fullDescription:
      'POGBA MDX is the celebrity luxury fashion label of world-class soccer player Paul Pogba. Every pixel was produced through NOVA — our AI creative engine. Digital models, editorial lifestyle imagery, full product photography, ecommerce storefront, brand site, and social video were all AI-generated to an editorial luxury standard, saving the brand over $180K in traditional production costs while launching at a velocity no conventional studio could match.',
    image: 'https://i.imgur.com/LJZRmet.png',
    website: 'https://www.instagram.com/paulpogba/',
    stats: [
      { label: 'Production Saved', value: '$180K+' },
      { label: 'Assets Generated', value: 'All-AI' },
      { label: 'Time to Launch', value: '<30d' },
    ],
    services: ['NOVA Creative Engine', 'AI Models', 'Ecommerce', 'Brand Identity', 'Web Design', 'Social Video'],
    highlights: [
      'All PDP, lifestyle, and product imagery AI-generated',
      'Full ecommerce and brand website built from scratch',
      'Digital model creation trained on brand DNA',
      'Over $180K saved vs traditional production',
      'Editorial-grade luxury output at AI velocity',
    ],
  },
  {
    slug: 'tina-stephens',
    client: 'TINA Stephens',
    vertical: 'Luxury Retail',
    tagline: 'Email reinvented — open rate 14% to 56% and +75% YoY sales.',
    description:
      'Luxury ready-to-wear brand. Rebuilt email program, CRM segmentation, and creative velocity to quadruple open rates and drive record sales.',
    fullDescription:
      'TINA Stephens is an elevated ready-to-wear label known for refined tailoring and considered silhouettes. We rebuilt the entire lifecycle program — flows, segmentation, creative cadence, and merchandising logic — taking email open rates from 14% to 56% and delivering a 75% YoY sales lift.',
    image: 'https://i.imgur.com/3j7TuA7.png',
    website: 'https://shoptinastephens.com/',
    stats: [
      { label: 'Open Rate', value: '14% → 56%', before: '14%', after: '56%' },
      { label: 'Click-Through', value: '2.4%' },
      { label: 'YoY Sales', value: '+75%' },
    ],
    services: ['Email Marketing', 'CRM', 'Lifecycle', 'Creative'],
    highlights: [
      'Open rate climbed from 14% to 56%',
      'Click-through rate reached 2.4%',
      '75% YoY sales increase vs LY',
      'Full CRM segmentation and flow rebuild',
    ],
  },
  {
    slug: 'le-jardin-bistro',
    client: 'Le Jardin Bistro',
    vertical: 'Fine Dining',
    tagline: '#1 Google Ranking with under $4K budget.',
    description:
      'Upscale French bistro reopening in LES. Achieved #1 Google Ranking with a limited <$4k budget in a competitive market.',
    fullDescription:
      'Originally a SoHo staple, this bistro reopened in the Lower East Side, offering classic French dishes in a cozy, romantic setting. Le Jardin Bistro, an upscale French restaurant in the heart of New York City, was reopening after a 10-year hiatus. The market was highly competitive, with numerous options for French dining — especially those featuring rooftop experiences. The client needed strong search engine visibility and immediate traction to fill seats, all while operating under a limited monthly budget of less than $4,000.',
    image: 'https://i.imgur.com/4SZ8ev5.png',
    stats: [
      { label: 'Google Ranking', value: '#1', before: 'Page 3+', after: '#1' },
    ],
    services: ['Google Ads', 'SEO', 'Website Design'],
    highlights: [
      'Top Spot on Google Search',
      'Under $4K monthly budget',
      'Immediate traction after 10-year hiatus',
      'Beat highly competitive French dining market',
    ],
  },
  {
    slug: 'anatomie',
    client: 'Anatomie',
    vertical: 'Luxury Retail',
    tagline: 'Email optimization that drives retention.',
    description:
      'Luxury travel clothing brand. Optimized email flows and digital experience to increase retention and CTR.',
    fullDescription:
      'Anatomie is a luxury travel clothing brand known for its high-performance, stylish designs. We optimized their email marketing flows, refined segmentation strategies, and overhauled their digital experience to dramatically improve open rates, click-through rates, and reduce bounce rates across all campaigns.',
    image: 'https://i.imgur.com/6vqS1rs.mp4',
    mediaType: 'video',
    website: 'https://anatomie.com/',
    stats: [
      { label: 'Open Rate', value: '+29%', before: '42%', after: '54%' },
      { label: 'Click-Through Rate', value: '+85%', before: '1.3%', after: '2.4%' },
      { label: 'Bounce Rate', value: '-29%', before: '62%', after: '44%' },
    ],
    services: ['Email Marketing', 'CRM', 'Analytics'],
    highlights: [
      'Email open rate increased from 42% to 54%',
      'Click-through rate nearly doubled',
      'Bounce rate dropped from 62% to 44%',
      'Refined segmentation and lifecycle flows',
    ],
  },
  {
    slug: 'dl-nyc',
    client: 'The DL-NYC',
    vertical: 'Rooftop & Nightlife',
    tagline: 'From low ticket sales to sold-out weekly staple.',
    description:
      'Rooftop & nightlife venue struggling with low ticket sales. Transformed into a sold-out weekly staple via PMAX and Meta ads.',
    fullDescription:
      'A renowned hotel group struggled with low RSVPs for its rooftop bar events and sluggish ticket sales for nightlife functions. Despite a strong offline reputation, their digital channels failed to convert interested visitors into guests, limiting overall revenue growth.',
    image: 'https://i.imgur.com/32wLyZA.png',
    website: 'https://www.thedl-nyc.com/',
    stats: [
      { label: 'Google Ranking', value: '#1', before: 'Page 3+', after: '#1' },
      { label: 'ROAS', value: '+1100%', before: '2x', after: '24x' },
      { label: 'Weekly Bookings', value: 'Sold Out' },
    ],
    services: ['Meta Ads', 'Google PMAX', 'Creative Direction'],
    highlights: [
      'Google ranking from Page 3+ to #1',
      'ROAS increased from 2x to 24x',
      'Sold out weekly bookings consistently',
      'Transformed digital channel performance',
    ],
  },
  {
    slug: 'loulou-bistro',
    client: 'Loulou Petit Bistro',
    vertical: 'Fine Dining',
    tagline: 'Multi-channel strategy for massive ROAS.',
    description:
      'Chic Chelsea restaurant & speakeasy. Leveraged multi-channel strategy for massive reach and ROAS.',
    fullDescription:
      'Loulou Petit Bistro & Speakeasy is a popular two-level French restaurant located in the heart of Chelsea, Manhattan. Named after the owner\'s rescue dog, the venue is known for its chic, floral-heavy decor and its hidden "speakeasy" lounge accessed through a vintage Coca-Cola machine.',
    image: 'https://i.imgur.com/pKiXJyX.jpeg',
    website: 'https://www.loulounyc.com/',
    stats: [
      { label: 'Meta ROAS', value: '4.5X' },
      { label: 'Google ROAS', value: '9X' },
      { label: 'Social Reach', value: '+120%' },
    ],
    services: ['Meta Ads', 'Google Ads', 'Social Media', 'Email'],
    highlights: [
      '4.5X return on Meta ad spend',
      '9X return on Google Ads',
      '120% increase in social media reach',
      'Multi-channel strategy across paid and organic',
    ],
  },
  {
    slug: 'le-petit-village',
    client: 'Le Petit Village',
    vertical: 'Fine Dining',
    tagline: 'Successful 2025 launch in West Village.',
    description:
      'Cozy French bistro in West Village (2025). Successful launch inspired by 1970s Provence rustic charm.',
    fullDescription:
      'Le Petit Village is a cozy French bistro located in Manhattan\'s West Village that opened in early 2025. Created by the team behind Loulou Petit Bistro, it is inspired by the rustic charm of 1970s Provence.',
    image: 'https://i.imgur.com/GaEQPAp.jpeg',
    website: 'https://www.lepetitvillagenyc.com/',
    stats: [
      { label: 'Status', value: 'Launched' },
      { label: 'Concept', value: 'Provence' },
      { label: 'Reception', value: 'High' },
    ],
    services: ['Full-Stack Launch', 'Brand Identity', 'Social Media'],
    highlights: [
      'Successful 2025 restaurant launch',
      'Full brand identity development',
      'Social media strategy from day one',
      'Inspired by 1970s Provence charm',
    ],
  },
  {
    slug: 'adelaide-salon',
    client: 'Adelaide Salon',
    vertical: 'Lounge & Speakeasy',
    tagline: 'Sold-out events through targeted campaigns.',
    description:
      'Immersive speakeasy & jazz lounge. Sold out special events through targeted campaigns and operational efficiencies.',
    fullDescription:
      'Adelaide\'s Salon is a clandestine immersive speakeasy and jazz lounge located in Chelsea, Manhattan. Hidden beneath its sister restaurant, Loulou Petit Bistro, the venue is accessed through a vintage Coca-Cola machine and is themed around the fictional global travels of Isabella Bird.',
    image: 'https://i.imgur.com/uQzqIdO.jpeg',
    website: 'https://www.adelaide-salon.com/',
    stats: [
      { label: 'Events', value: 'Sold Out' },
      { label: 'Web Design', value: 'Revamped' },
      { label: 'Bookings', value: 'Increased' },
    ],
    services: ['Meta Ads', 'Web Design', 'Creative', 'Operations'],
    highlights: [
      'Increased weekly bookings',
      'Complete website redesign',
      'Operational efficiencies implemented',
      'Collaboration with artists',
      'Sold out special events consistently',
    ],
  },
  {
    slug: 'mission-ceviche',
    client: 'Mission Ceviche',
    vertical: 'Fine Dining',
    tagline: 'From market stall to NYC staple.',
    description:
      'Acclaimed Peruvian destination. Evolved from a market stall to a NYC staple via high-performance Meta & Google funnels.',
    fullDescription:
      'Mission Ceviche is a highly acclaimed Peruvian restaurant in New York City known for its vibrant atmosphere, creative "New Peruvian" cuisine, and signature pisco sours. It evolved from a small market stall in 2015 into a recognized destination for modern seafood and Nikkei-inspired (Peruvian-Japanese fusion) dishes.',
    image: 'https://i.imgur.com/UaNgQxW.jpeg',
    website: 'https://missionceviche.com/',
    stats: [
      { label: 'Reservations', value: '+138%' },
      { label: 'Q4 Revenue', value: 'Best Ever' },
      { label: 'Ad ROAS', value: '5X+' },
    ],
    services: ['Meta Ads', 'Google Ads', 'Social Media'],
    highlights: [
      'Reservations increased 138%',
      'Q4 became best historical month',
      'High performing Meta advertising funnel',
      'Google Ads achieving 5x+ ROAS',
    ],
  },
  {
    slug: 'sub-mission-nyc',
    client: 'Sub-Mission NYC',
    vertical: 'Nightlife',
    tagline: 'Building an underground brand identity.',
    description:
      'Underground cocktail lounge & listening bar. Built a moody, intimate digital brand identity to drive nightlife traffic.',
    fullDescription:
      'An underground cocktail lounge beneath Mission Ceviche Union Square. The space blends craft cocktails, elevated bar bites, and live music into a moody, intimate environment inspired by New York\'s classic jazz lounges and modern cultural nightlife.',
    image: 'https://i.imgur.com/w8fjB5B.jpeg',
    website: 'https://www.sub-mission.nyc/',
    stats: [
      { label: 'Launch', value: 'Success' },
      { label: 'Events', value: 'Booked' },
      { label: 'Atmosphere', value: 'Viral' },
    ],
    services: ['Brand Identity', 'Social Media', 'Web Design'],
    highlights: [
      'Complete brand identity creation',
      'Moody, intimate digital presence',
      'Social media strategy for nightlife audience',
      'Craft cocktail and live music positioning',
    ],
  },
];
