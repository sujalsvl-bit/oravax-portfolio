import { policies } from '../data/policies';

interface PoliciesSectionProps {
  expandedPolicyId: string | null;
  onTogglePolicy: (id: string) => void;
}

export function PoliciesSection({
  expandedPolicyId,
  onTogglePolicy,
}: PoliciesSectionProps) {
  return (
    <section id="policies" aria-labelledby="policies-heading" className="py-20 space-y-12">
      <div className="max-w-3xl mx-auto text-center space-y-3 p-6 sm:p-8 bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-sm">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-leaf-light/30 text-leaf-deep border border-leaf-mid/30">
          Garden Fence: Limits & Terms
        </div>
        <h2 id="policies-heading" className="text-3xl sm:text-4xl font-serif text-leaf-deep">
          Policies and Exclusions
        </h2>
        <p className="text-base text-muted">
          Quiet boundaries keep partnerships healthy. Here are our exact policies on billing, account ownership, and explicit exclusions.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {policies.map((policy) => {
          const isOpen = expandedPolicyId === policy.id;
          const isExclusions = policy.id === 'policy-exclusions';
          const isResults = policy.id === 'policy-results';

          return (
            <div
              key={policy.id}
              id={policy.id}
              className={`bg-[#FFFBF0] rounded-[16px] border shadow-xs overflow-hidden transition-colors ${
                isExclusions || isResults
                  ? 'border-leaf-mid/50'
                  : 'border-leaf-mid/30'
              }`}
            >
              <h3>
                <button
                  type="button"
                  id={`policy-btn-${policy.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`policy-panel-${policy.id}`}
                  onClick={() => onTogglePolicy(policy.id)}
                  className="w-full min-h-[44px] px-6 py-4 text-left flex items-center justify-between gap-4 font-serif text-lg text-leaf-deep font-semibold hover:text-leaf-mid transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded-[16px]"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-leaf-mid/60" aria-hidden="true" />
                    <span>{policy.title}</span>
                  </div>
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full border border-leaf-mid/40 flex items-center justify-center text-xs font-sans text-leaf-deep transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-leaf-light/30' : 'bg-transparent'
                    }`}
                    aria-hidden="true"
                  >
                    ↓
                  </span>
                </button>
              </h3>

              {isOpen && (
                <div
                  id={`policy-panel-${policy.id}`}
                  role="region"
                  aria-labelledby={`policy-btn-${policy.id}`}
                  className="px-6 pb-6 pt-2 text-sm text-muted leading-relaxed space-y-4 border-t border-leaf-mid/10"
                >
                  <p className="font-medium text-ink">{policy.summary}</p>

                  <ul className="space-y-1.5 text-xs text-muted pl-1">
                    {policy.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-leaf-mid" aria-hidden="true">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {policy.relatedPricingId && (
                    <div className="pt-2 border-t border-leaf-mid/10">
                      <a
                        href={`#${policy.relatedPricingId}`}
                        className="min-h-[44px] inline-flex items-center text-xs font-medium text-leaf-deep underline underline-offset-4 hover:text-leaf-mid transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded"
                      >
                        See affected pricing card
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
