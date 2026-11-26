import { useState } from 'react';
import { reviews, type Review } from '../data/reviews';

const INITIAL_DISPLAY_COUNT = 9;

export function ReviewTreeSection() {
  const verifiedReviews = reviews.filter((r) => r.permissionConfirmed === true);
  const [displayCount, setDisplayCount] = useState<number>(INITIAL_DISPLAY_COUNT);

  const isExpanded = displayCount >= verifiedReviews.length;

  const toggleShowMore = () => {
    if (isExpanded) {
      setDisplayCount(INITIAL_DISPLAY_COUNT);
      const element = document.getElementById('reviews');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      setDisplayCount(verifiedReviews.length);
    }
  };

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="py-20 space-y-12">
      {/* Opaque Solid Cream Header Container */}
      <div className="max-w-3xl mx-auto text-center space-y-3 p-6 sm:p-8 bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-sm">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-leaf-light/30 text-leaf-deep border border-leaf-mid/30">
          Garden Tree
        </div>
        <h2 id="reviews-heading" className="text-3xl sm:text-4xl font-serif text-leaf-deep">
          Review Tree
        </h2>
        <p className="text-base text-muted">
          Genuine, verified endorsements from client collaborators. All reviews reflect authentic partnerships delivered via oravax.
        </p>
      </div>

      {verifiedReviews.length === 0 ? (
        <div className="max-w-xl mx-auto py-16 px-6 text-center bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-xs space-y-4">
          <h3 className="font-serif text-lg text-leaf-deep font-semibold">
            Reviews will appear here once confirmed
          </h3>
          <p className="text-xs text-muted max-w-sm mx-auto leading-relaxed">
            Only authentic, original-wording reviews with verified written consent are displayed.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Review Grid: First `displayCount` cards are visible */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedReviews.map((review: Review, index: number) => {
              const isHiddenOnMobile = index >= displayCount;

              return (
                <article
                  key={review.id}
                  className={`bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-sm p-6 flex flex-col justify-between hover:border-leaf-mid transition-colors ${
                    isHiddenOnMobile ? 'hidden' : 'flex'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-sans font-medium bg-leaf-light/30 text-leaf-deep border border-leaf-mid/20">
                        {review.sourceLabel}
                      </span>
                      <span className="text-[11px] text-muted font-sans font-medium">
                        {review.date}
                      </span>
                    </div>

                    <blockquote className="text-xs sm:text-sm text-[#1F2A1F] leading-relaxed font-serif italic max-w-[65ch]">
                      "{review.quote}"
                    </blockquote>
                  </div>

                  <div className="pt-4 mt-4 border-t border-leaf-mid/10 text-xs">
                    {review.personName ? (
                      <div className="font-serif font-semibold text-leaf-deep">
                        {review.personName}
                      </div>
                    ) : null}
                    <div className="text-muted text-[11px]">
                      {review.role ? `${review.role}, ` : ''}{review.company}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Toggle Expand / Collapse Button */}
          {verifiedReviews.length > INITIAL_DISPLAY_COUNT && (
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={toggleShowMore}
                className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#FFFBF0] text-leaf-deep border border-leaf-mid/40 hover:border-leaf-mid text-xs font-medium transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid flex items-center gap-2 cursor-pointer"
                aria-expanded={isExpanded}
                aria-controls="reviews"
              >
                <span>{isExpanded ? 'Show fewer reviews' : `Show all ${verifiedReviews.length} reviews`}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
