import { useState } from 'react';
import { faqs } from '../data/faq';

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-20 space-y-12">
      <div className="max-w-3xl mx-auto text-center space-y-3 p-6 sm:p-8 bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-sm">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-leaf-light/30 text-leaf-deep border border-leaf-mid/30">
          Garden FAQ
        </div>
        <h2 id="faq-heading" className="text-3xl sm:text-4xl font-serif text-leaf-deep">
          Frequently Asked Questions
        </h2>
        <p className="text-base text-muted">
          Clear, honest answers about scope, billing, and collaboration limits.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-xs overflow-hidden transition-colors"
            >
              <h3>
                <button
                  type="button"
                  id={`faq-btn-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
                  onClick={() => toggleItem(faq.id)}
                  className="w-full min-h-[44px] px-6 py-4 text-left flex items-center justify-between gap-4 font-serif text-lg text-leaf-deep font-medium hover:text-leaf-mid transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded-[16px]"
                >
                  <span>{faq.question}</span>
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
                  id={`faq-panel-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${faq.id}`}
                  className="px-6 pb-6 pt-1 text-sm text-muted leading-relaxed space-y-4 border-t border-leaf-mid/10"
                >
                  <p>{faq.answer}</p>
                  {faq.relatedPricingId && (
                    <div className="pt-2">
                      <a
                        href={`#${faq.relatedPricingId}`}
                        className="min-h-[44px] inline-flex items-center text-xs font-medium text-leaf-deep underline underline-offset-4 hover:text-leaf-mid transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded"
                      >
                        Related pricing details
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
