export interface PolicyItem {
  id: string;
  title: string;
  summary: string;
  details: string[];
  relatedPricingId?: string;
}

export const policies: PolicyItem[] = [
  {
    id: 'policy-billing',
    title: 'Billing',
    summary: 'Monthly services are paid in advance. One-time audit work is paid before it starts.',
    details: [
      'Monthly management and creative services are billed and paid monthly in advance.',
      'One-time audits or setup projects require payment prior to commencement.',
      'Invoices are issued digitally with clear scope items.',
    ],
    relatedPricingId: 'pricing-audit',
  },
  {
    id: 'policy-start',
    title: 'Start',
    summary: 'Work begins after payment, the brief and required access are received.',
    details: [
      'Work commences once invoice payment is confirmed.',
      'Completed brief and all required account delegated access must be received before kickoff.',
    ],
    relatedPricingId: 'pricing-core-management',
  },
  {
    id: 'policy-term-cancellation',
    title: 'Term and cancellation',
    summary: 'Month-to-month. Written cancellation before the next billing date stops the next renewal; work continues through the paid period.',
    details: [
      'Agreements operate on a month-to-month basis with no long-term lock-in.',
      'Written cancellation notice received before the next billing date prevents renewal.',
      'Work continues normally through the conclusion of the currently paid billing period.',
    ],
    relatedPricingId: 'pricing-core-management',
  },
  {
    id: 'policy-approvals',
    title: 'Approvals',
    summary: 'You approve all ads before launch. Extra work needs a written quote and approval first.',
    details: [
      'No ad or copy launches without prior client review and approval.',
      'Any work outside agreed scope requires a written quote and client confirmation before beginning.',
    ],
    relatedPricingId: 'pricing-creative-pack',
  },
  {
    id: 'policy-ad-spend',
    title: 'Ad spend and ownership',
    summary: 'You pay the platform directly. You own your ad accounts and data. We use delegated access, not shared passwords.',
    details: [
      'Ad spend is paid by the client directly to the advertising platform (Meta, Google, etc.).',
      'The client retains 100% ownership of all ad accounts, pixels, and campaign data.',
      'Access is managed strictly via standard partner or delegated permissions, never shared account passwords.',
    ],
    relatedPricingId: 'pricing-core-management',
  },
  {
    id: 'policy-scope',
    title: 'Scope',
    summary: 'Higher spend or complexity may need a revised scope.',
    details: [
      'Standard management covers the specified number of accounts and campaigns.',
      'Significant increases in ad budget, account complexity, or multi-market requirements may require an updated scope and quote.',
    ],
    relatedPricingId: 'pricing-second-platform',
  },
  {
    id: 'policy-results',
    title: 'Results',
    summary: 'No guaranteed sales, leads, ROAS, rankings or AI-search citations.',
    details: [
      'Performance marketing involves external platform algorithms, competition, and market factors.',
      'We work toward agreed targets and report findings objectively, with no guaranteed sales, leads, ROAS, search rankings, or AI-search citations.',
    ],
    relatedPricingId: 'pricing-core-management',
  },
  {
    id: 'policy-exclusions',
    title: 'Exclusions',
    summary: 'Not part of the standard offer unless quoted: original shoots, influencer sourcing, website development, landing-page builds, CRM implementation, video generation, extra creative concepts or resizes.',
    details: [
      'Original photography or video shoots and actors.',
      'Influencer outreach, sourcing, or negotiations.',
      'Website development, CMS changes, or landing page building.',
      'CRM integration or sales pipeline configuration.',
      'Video generation or animation.',
      'Extra creative concepts or additional resize formats beyond the monthly allocation.',
    ],
    relatedPricingId: 'pricing-creative-pack',
  },
  {
    id: 'policy-taxes-refunds',
    title: 'Taxes, refunds and payment methods',
    // TODO owner: fill in exact tax registration, allowed payment methods, and formal terms when quoting
    summary: 'Confirmed when we quote.',
    details: [
      'Applicable taxes and payment methods are confirmed in writing when we provide your quote.',
      'Terms are outlined clearly in the quotation prior to project start.',
    ],
    relatedPricingId: 'pricing-audit',
  },
];
