import { services, type ServiceItem } from '../data/services';

interface ServicesSectionProps {
  onSelectPolicy: (policyId: string) => void;
}

export function ServicesSection({ onSelectPolicy }: ServicesSectionProps) {
  const paidAdvertising = services.filter((s) => s.areaCategory === 'Paid advertising');
  const aiCreative = services.filter((s) => s.areaCategory === 'AI-assisted creative');
  const otherChannels = services.filter((s) => s.areaCategory === 'Other channels');

  const renderServiceCard = (service: ServiceItem) => {
    return (
      <article
        key={service.id}
        id={service.id}
        className="bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-sm p-6 flex flex-col justify-between hover:border-leaf-mid/60 transition-all duration-200"
      >
        <div className="space-y-4">
          {/* Brass Plant Marker Label */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span
              className="inline-block px-2.5 py-1 rounded bg-[#E5D3B3] text-[#3A2A1A] border border-[#B38F4D] text-xs font-serif shadow-xs tracking-wider"
              title={`Garden object: ${service.gardenObject}`}
            >
              {service.brassLabel}
            </span>
            {service.badge && (
              <span className="inline-block px-2.5 py-1 rounded text-[11px] font-sans font-medium bg-bloom-lavender/15 text-[#544374] border border-bloom-lavender/30">
                {service.badge}
              </span>
            )}
          </div>

          <h3 className="font-serif text-xl text-leaf-deep font-semibold">
            {service.name}
          </h3>

          <p className="text-sm text-muted leading-relaxed">
            {service.description}
          </p>

          {/* Inclusions */}
          <div className="space-y-1.5 pt-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-leaf-deep">
              Included
            </h4>
            <ul className="text-xs text-muted space-y-1">
              {service.included.map((inc, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-leaf-mid mt-0.5" aria-hidden="true">•</span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div className="space-y-1.5 pt-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-leaf-deep">
              Not included
            </h4>
            <ul className="text-xs text-muted space-y-1">
              {service.notIncluded.map((notInc, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-soil/70 mt-0.5" aria-hidden="true">–</span>
                  <span>{notInc}</span>
                </li>
              ))}
            </ul>
          </div>

          {service.note && (
            <p className="text-xs italic text-muted pt-1 border-t border-leaf-mid/10">
              {service.note}
            </p>
          )}
        </div>

        {/* Cross-links */}
        <div className="pt-6 mt-4 border-t border-leaf-mid/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          {service.customQuote ? (
            <>
              <span className="font-serif font-semibold text-leaf-deep">
                Custom quote
              </span>
              <a
                href="#contact"
                className="min-h-[44px] px-3 py-2 text-leaf-deep font-medium underline underline-offset-4 hover:text-leaf-mid transition-colors flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded"
              >
                Ask about this
              </a>
            </>
          ) : (
            <>
              <a
                href={`#${service.pricingId}`}
                className="min-h-[44px] px-3 py-2 text-leaf-deep font-medium underline underline-offset-4 hover:text-leaf-mid transition-colors flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded"
              >
                See pricing
              </a>
              <button
                type="button"
                onClick={() => onSelectPolicy(service.policyId)}
                className="min-h-[44px] px-3 py-2 text-muted hover:text-leaf-deep underline underline-offset-4 transition-colors flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded"
              >
                Read the limits
              </button>
            </>
          )}
        </div>
      </article>
    );
  };

  return (
    <section id="services" aria-labelledby="services-heading" className="py-20 space-y-16">
      <div className="max-w-3xl mx-auto text-center space-y-3 p-6 sm:p-8 bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-sm">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-leaf-light/30 text-leaf-deep border border-leaf-mid/30">
          Walled Garden
        </div>
        <h2 id="services-heading" className="text-3xl sm:text-4xl font-serif text-leaf-deep">
          Services and Garden Beds
        </h2>
        <p className="text-base text-muted">
          Each service has its own dedicated garden area and brass plant marker. All work is tailored directly to your ad accounts without hype or unverified claims.
        </p>
      </div>

      {/* Area 1: Paid Advertising (marigold area) */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 p-4 bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-xs flex-wrap sm:flex-nowrap">
          <span className="w-3 h-3 rounded-full bg-bloom-marigold shrink-0" aria-hidden="true" />
          <h3 className="font-serif text-2xl text-leaf-deep font-semibold">
            Paid Advertising
          </h3>
          <span className="text-xs text-muted font-sans sm:ml-auto">
            Marigold area, raised timber beds
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paidAdvertising.map(renderServiceCard)}
        </div>
      </div>

      {/* Area 2: AI-Assisted Creative (lavender area) */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 p-4 bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-xs flex-wrap sm:flex-nowrap">
          <span className="w-3 h-3 rounded-full bg-bloom-lavender shrink-0" aria-hidden="true" />
          <h3 className="font-serif text-2xl text-leaf-deep font-semibold">
            AI-Assisted Creative
          </h3>
          <span className="text-xs text-muted font-sans sm:ml-auto">
            Lavender area, glass cold-frame
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiCreative.map(renderServiceCard)}
        </div>
      </div>

      {/* Area 3: Other Channels (sky-blue and clay areas) */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 p-4 bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-xs flex-wrap sm:flex-nowrap">
          <div className="flex gap-1 shrink-0" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-bloom-skyblue" />
            <span className="w-3 h-3 rounded-full bg-bloom-clay" />
          </div>
          <h3 className="font-serif text-2xl text-leaf-deep font-semibold">
            Other Channels
          </h3>
          <span className="text-xs text-muted font-sans sm:ml-auto">
            Sky-blue and clay areas, custom quotes
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {otherChannels.map(renderServiceCard)}
        </div>
      </div>
    </section>
  );
}
