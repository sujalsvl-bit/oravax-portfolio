import { useState, useEffect } from 'react';
import { galleryItems } from '../data/gallery';

export function GallerySection() {
  const verifiedItems = galleryItems.filter((item) => item.verified === true);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeItemIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveItemIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveItemIndex((prev) =>
          prev !== null ? (prev + 1) % verifiedItems.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveItemIndex((prev) =>
          prev !== null ? (prev - 1 + verifiedItems.length) % verifiedItems.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItemIndex, verifiedItems.length]);

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="py-20 space-y-12">
      <div className="max-w-3xl mx-auto text-center space-y-3 p-6 sm:p-8 bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-sm">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-leaf-light/30 text-leaf-deep border border-leaf-mid/30">
          Ad Creative Meadow
        </div>
        <h2 id="gallery-heading" className="text-3xl sm:text-4xl font-serif text-leaf-deep">
          Gallery
        </h2>
        <p className="text-base text-muted">
          Real creative designs produced for client accounts. Only verified assets appear in this meadow.
        </p>
      </div>

      {verifiedItems.length === 0 ? (
        /* Empty State: Quiet meadow with brass sign */
        <div className="max-w-xl mx-auto py-16 px-6 text-center bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-xs space-y-6">
          {/* Meadow SVG Illustration */}
          <div className="w-48 h-28 mx-auto" aria-hidden="true">
            <svg viewBox="0 0 200 100" className="w-full h-full" fill="none">
              {/* Soft grassy mound */}
              <ellipse cx="100" cy="85" rx="80" ry="25" fill="#A9C77A" fillOpacity="0.3" />
              <ellipse cx="100" cy="90" rx="95" ry="20" fill="#5E8C4A" fillOpacity="0.2" />

              {/* Timber Post */}
              <rect x="96" y="45" width="8" height="40" rx="1" fill="#5B4636" />

              {/* Brass Signboard */}
              <rect x="45" y="20" width="110" height="32" rx="3" fill="#D4AF37" stroke="#A68019" strokeWidth="1.5" />
              <text
                x="100"
                y="38"
                fill="#2B2109"
                fontSize="7.5"
                fontWeight="600"
                fontFamily="Inter, sans-serif"
                textAnchor="middle"
              >
                Creative samples will appear here.
              </text>
            </svg>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-lg text-leaf-deep font-semibold">
              Creative samples will appear here.
            </h3>
            <p className="text-xs text-muted max-w-sm mx-auto">
              We never display stock mockups, unverified templates, or unauthorized client assets. Genuine samples are published only after formal client consent.
            </p>
          </div>
        </div>
      ) : (
        /* Populated Masonry Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedItems.map((item, index) => (
            <div
              key={item.id}
              className="group cursor-pointer bg-cream rounded-[16px] border border-leaf-mid/30 overflow-hidden shadow-xs hover:border-leaf-mid transition-all"
              onClick={() => setActiveItemIndex(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveItemIndex(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View ad creative: ${item.caption}`}
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="w-full h-48 object-cover group-hover:scale-102 transition-transform duration-300"
              />
              <div className="p-4 space-y-1">
                <span className="text-[11px] font-sans text-leaf-mid uppercase tracking-wider">
                  {item.platform}
                </span>
                <p className="text-xs text-ink font-medium line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeItemIndex !== null && verifiedItems[activeItemIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveItemIndex(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-cream rounded-[16px] p-6 shadow-2xl space-y-4 border border-leaf-mid"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-leaf-deep font-serif font-semibold">
                {verifiedItems[activeItemIndex].platform}
              </span>
              <button
                type="button"
                onClick={() => setActiveItemIndex(null)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-xs text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded"
                aria-label="Close lightbox"
              >
                Close (Esc)
              </button>
            </div>

            <img
              src={verifiedItems[activeItemIndex].image}
              alt={verifiedItems[activeItemIndex].alt}
              className="w-full max-h-[60vh] object-contain rounded-lg bg-soil/10"
            />

            <p className="text-sm text-ink font-sans">
              {verifiedItems[activeItemIndex].caption}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-leaf-mid/20 text-xs text-muted">
              <span>Use arrow keys to navigate</span>
              <span>
                {activeItemIndex + 1} of {verifiedItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
