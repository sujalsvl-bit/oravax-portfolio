export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  relatedPricingId?: string;
}

export const faqs: FAQItem[] = [
  {
    id: 'faq-what-oravax-does',
    question: 'What does oravax do?',
    answer: 'oravax is an AI-assisted performance marketing agency run by Sujal. We bring five years of agency-side performance marketing experience to audit, set up, manage, and optimize your ad accounts.',
    relatedPricingId: 'pricing-core-management',
  },
  {
    id: 'faq-core-management-scope',
    question: 'What is included in core management?',
    answer: 'Core management covers one business on either Meta or Google for one ad account. It includes setup and optimization of up to 2 campaigns, audience tuning, tracking verification, weekly performance reports, and one monthly review call. Creative assets and approved offers are supplied by the client.',
    relatedPricingId: 'pricing-core-management',
  },
  {
    id: 'faq-audit-required',
    question: 'Is an audit required first?',
    answer: 'No. An audit is an optional stand-alone service for businesses that want an objective review and action plan. If you are ready for ongoing campaign management, you can start directly with core management.',
    relatedPricingId: 'pricing-audit',
  },
  {
    id: 'faq-who-pays-ad-spend',
    question: 'Who pays for ad spend?',
    answer: 'You pay ad spend directly to the advertising platform (such as Meta or Google) using your own payment method. Management fees paid to oravax are completely separate from ad spend.',
    relatedPricingId: 'pricing-core-management',
  },
  {
    id: 'faq-how-billing-works',
    question: 'How does billing work?',
    answer: 'Monthly management and creative services are billed and paid monthly in advance on a month-to-month basis. One-time audit or setup work is paid before work begins. Cancellation requires written notice before your next billing date.',
    relatedPricingId: 'pricing-core-management',
  },
  {
    id: 'faq-creative-exclusions',
    question: 'What is not included in creative?',
    answer: 'The creative pack does not include video production, filming, actors, UGC, unlimited variations, or additional formats and resizes. Those require separate quotes. In addition, client approval is required before any client asset is uploaded to an AI tool.',
    relatedPricingId: 'pricing-creative-pack',
  },
  {
    id: 'faq-supported-platforms',
    question: 'Which platforms can you work on?',
    answer: 'Core management focuses on Meta and Google Ads. We also handle YouTube ads, LinkedIn ads, Reddit ads, and X ads under custom quotes.',
    relatedPricingId: 'pricing-second-platform',
  },
  {
    id: 'faq-custom-needs',
    question: 'What if I need something that is not on the price list?',
    answer: 'Services like tracking implementation, additional channels, SEO, AEO, and GEO are assessed individually. We review your requirements and provide a clear written quote before any work starts.',
    relatedPricingId: 'pricing-custom-quote',
  },
];
