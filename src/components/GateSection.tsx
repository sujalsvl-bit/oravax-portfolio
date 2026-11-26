export function GateSection() {
  return (
    <section
      id="gate"
      aria-labelledby="gate-heading"
      className="relative pt-28 sm:pt-40 md:pt-48 pb-16 md:pb-24 flex flex-col items-center justify-end min-h-[92vh] text-center px-4"
    >
      {/* 
        Hero Content Card
        Positioned in the lower portion so the realistic 3D stone gate, path, and morning sky
        remain clearly visible and uncluttered above the card.
        Maintains AA contrast on warm cream background with leaf-green border.
      */}
      <div className="max-w-2xl mx-auto space-y-6 bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 p-6 sm:p-8 md:p-10 shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-leaf-light/30 text-leaf-deep border border-leaf-mid/30">
          <span className="w-1.5 h-1.5 rounded-full bg-leaf-mid" aria-hidden="true" />
          <span>Kitchen garden at early morning</span>
        </div>

        <h1
          id="gate-heading"
          className="text-2xl sm:text-4xl md:text-5xl font-serif text-leaf-deep leading-snug sm:leading-tight tracking-tight px-2 break-words"
        >
          Performance marketing that grows steadily.
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-muted max-w-xl mx-auto leading-relaxed">
          oravax is an AI-assisted performance marketing agency. Five years of agency-side performance marketing experience, applied to your ad accounts.
        </p>

        {/* Primary Call to Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#services"
            className="min-h-[44px] px-6 py-2.5 rounded-full bg-leaf-deep text-cream text-xs font-medium hover:bg-leaf-mid transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid flex items-center justify-center shadow-xs"
          >
            See services
          </a>
          <a
            href="#pricing"
            className="min-h-[44px] px-6 py-2.5 rounded-full bg-cream text-leaf-deep border border-leaf-mid/40 hover:border-leaf-mid text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid flex items-center justify-center shadow-xs"
          >
            See pricing
          </a>
          <a
            href="#contact"
            className="min-h-[44px] px-4 py-2.5 text-xs text-muted hover:text-leaf-deep underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
