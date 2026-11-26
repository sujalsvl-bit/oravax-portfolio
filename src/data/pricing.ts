export interface PricingPlan {
  id: string;
  name: string;
  priceINR: number | null;
  priceUSD: number | null;
  billingFrequency: 'one time' | 'per month' | 'custom';
  isAddon?: boolean;
  badge?: string;
  includes: [string, string, string];
  notIncluded: string;
  serviceId: string;
  customQuote?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'pricing-audit',
    name: 'Audit + 30-day plan',
    priceINR: 7500,
    priceUSD: 250,
    billingFrequency: 'one time',
    includes: [
      'Review of one ad account and tracking',
      'Written findings and priority plan',
      'One review call',
    ],
    notIncluded: 'Implementing fixes, creating ads, or ongoing management',
    serviceId: 'audit-30-day',
  },
  {
    id: 'pricing-core-management',
    name: 'Core management',
    priceINR: 15000,
    priceUSD: 600,
    billingFrequency: 'per month',
    includes: [
      'Up to 2 campaigns on Meta or Google',
      'Audience and campaign optimization',
      'Weekly report and monthly review call',
    ],
    notIncluded: 'Creative production, tracking setup, or extra campaigns',
    serviceId: 'core-ad-management',
  },
  {
    id: 'pricing-creative-pack',
    name: 'AI-assisted creative pack',
    priceINR: 5000,
    priceUSD: 100,
    billingFrequency: 'per month',
    badge: 'Subject to tool access, commercial rights and a production test',
    includes: [
      '4 distinct static ad designs per month',
      'Headline and ad copy for each design',
      '2 consolidated revision rounds per batch',
    ],
    notIncluded: 'Video, filming, actors, UGC, unlimited variations, or resizes',
    serviceId: 'creative-pack',
  },
  {
    id: 'pricing-management-creative',
    name: 'Management + creative',
    priceINR: 20000,
    priceUSD: 700,
    billingFrequency: 'per month',
    badge: 'Available when the creative pack is ready',
    includes: [
      'Complete core ad management scope',
      '4 distinct static ad designs per month with copy',
      'Weekly report and monthly review call',
    ],
    notIncluded: 'Video, filming, actors, UGC, tracking setup, or extra campaigns',
    serviceId: 'management-creative',
  },
  {
    id: 'pricing-second-platform',
    name: 'Second platform add-on',
    priceINR: 10000,
    priceUSD: 400,
    billingFrequency: 'per month',
    isAddon: true,
    includes: [
      'Adds Meta or Google for the same business',
      'One additional ad account and up to 2 campaigns',
      'Integrated optimization and reporting',
    ],
    notIncluded: 'Creative production or third platform management',
    serviceId: 'second-advertising-platform',
  },
  {
    id: 'pricing-custom-quote',
    name: 'Custom quote services',
    priceINR: null,
    priceUSD: null,
    billingFrequency: 'custom',
    customQuote: true,
    includes: [
      'Tracking implementation (review and setup)',
      'YouTube, LinkedIn, Reddit, or X ads management',
      'SEO, AEO, and GEO structural improvements',
    ],
    notIncluded: 'Fixed fee quotes before reviewing requirements',
    serviceId: 'tracking-implementation',
  },
];

export const pricingNote = 'Prices exclude ad spend, which is paid by you directly to the ad platform. Taxes and payment methods are confirmed when we quote.';
