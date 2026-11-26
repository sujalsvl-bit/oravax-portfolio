import { useState } from 'react';
import { pricingPlans, pricingNote, type PricingPlan } from '../data/pricing';

export function PricingSection() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const formatPrice = (plan: PricingPlan) => {
    if (plan.customQuote) {
      return 'Custom quote';
    }
    if (currency === 'INR' && plan.priceINR !== null) {
      const formatted = plan.priceINR.toLocaleString('en-IN');
      const prefix = plan.isAddon ? '+Rs ' : 'Rs ';
      const period = plan.billingFrequency === 'one time' ? ' one time' : ' per month';
      return `${prefix}${formatted}${period}`;
    }
    if (currency === 'USD' && plan.priceUSD !== null) {
      const formatted = plan.priceUSD.toLocaleString('en-US');
      const prefix = plan.isAddon ? '+US$' : 'US$';
      const period = plan.billingFrequency === 'one time' ? ' one time' : ' per month';
      return `${prefix}${formatted}${period}`;
    }
    return 'Custom quote';
  };

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-20 space-y-12">
      <div className="max-w-3xl mx-auto text-center space-y-4 p-6 sm:p-8 bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-sm">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-leaf-light/30 text-leaf-deep border border-leaf-mid/30">
          Signboard Wall
        </div>
        <h2 id="pricing-heading" className="text-3xl sm:text-4xl font-serif text-leaf-deep">
          Pricing
        </h2>
        <p className="text-base text-muted">
          Transparent pricing with no hidden fees, no discounts, no refund ambiguity, and no long-term contracts.
        </p>

        {/* Currency Toggle */}
        <div className="pt-2 flex items-center justify-center">
          <div
            role="radiogroup"
            aria-label="Currency selector"
            className="inline-flex p-1 bg-[#F5EEDC] rounded-full border border-leaf-mid/30 shadow-xs"
          >
            <button
              type="button"
              role="radio"
              aria-checked={currency === 'INR'}
              onClick={() => setCurrency('INR')}
              className={`min-h-[44px] px-5 rounded-full text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid ${
                currency === 'INR'
                  ? 'bg-leaf-deep text-cream shadow-xs'
                  : 'text-muted hover:text-leaf-deep'
              }`}
            >
              INR (Rs)
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={currency === 'USD'}
              onClick={() => setCurrency('USD')}
              className={`min-h-[44px] px-5 rounded-full text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid ${
                currency === 'USD'
                  ? 'bg-leaf-deep text-cream shadow-xs'
                  : 'text-muted hover:text-leaf-deep'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid (Signboard Wall on timber fence) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            id={plan.id}
            className="bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-sm p-6 flex flex-col justify-between hover:border-leaf-mid/60 transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-serif text-xl font-bold text-leaf-deep">
                  {plan.name}
                </h3>
              </div>

              {plan.badge && (
                <div className="inline-block px-2.5 py-1 rounded text-[11px] font-sans font-medium bg-bloom-lavender/15 text-[#544374] border border-bloom-lavender/30">
                  {plan.badge}
                </div>
              )}

              <div className="text-2xl font-serif text-leaf-deep font-semibold">
                {formatPrice(plan)}
              </div>

              {/* 3 bullet Inclusions */}
              <div className="pt-2 space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-leaf-deep">
                  Includes
                </h4>
                <ul className="text-xs text-muted space-y-1.5">
                  {plan.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-leaf-mid mt-0.5" aria-hidden="true">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 1 line Not included */}
              <div className="pt-2 space-y-1">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-leaf-deep">
                  Not included
                </h4>
                <p className="text-xs text-muted">
                  {plan.notIncluded}
                </p>
              </div>
            </div>

            {/* Cross-link: What is included */}
            <div className="pt-6 mt-4 border-t border-leaf-mid/20">
              <a
                href={`#${plan.serviceId}`}
                className="min-h-[44px] inline-flex items-center text-xs font-medium text-leaf-deep underline underline-offset-4 hover:text-leaf-mid transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded"
              >
                What is included
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Note under row */}
      <div className="max-w-3xl mx-auto p-4 bg-[#FFFBF0] rounded-card border border-leaf-mid/20 text-center text-xs text-muted leading-relaxed shadow-xs">
        {pricingNote}
      </div>
    </section>
  );
}
