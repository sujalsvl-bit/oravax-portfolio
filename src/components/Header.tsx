interface HeaderProps {
  isSimpleView: boolean;
  onToggleSimpleView: () => void;
}

export function Header({ isSimpleView, onToggleSimpleView }: HeaderProps) {
  return (
    <header className="border-b border-leaf-mid/20 bg-[#FFFBF0] sticky top-0 z-30 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <a
          href="#gate"
          className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded-sm"
          aria-label="oravax home"
        >
          <span className="font-serif text-2xl font-bold tracking-tight text-leaf-deep group-hover:text-leaf-mid transition-colors">
            oravax
          </span>
          <span className="hidden sm:inline-block text-xs font-sans text-muted border-l border-leaf-mid/30 pl-2">
            AI-assisted performance marketing
          </span>
        </a>

        {/* Clean top header navigation */}
        <div className="flex items-center gap-3 sm:gap-6">
          <nav aria-label="Main navigation" className="flex items-center gap-3 sm:gap-5 text-xs font-medium text-ink">
            <a
              href="#services"
              className="min-h-[44px] flex items-center px-1 text-muted hover:text-leaf-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded"
            >
              Services
            </a>
            <a
              href="#pricing"
              className="min-h-[44px] flex items-center px-1 text-muted hover:text-leaf-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="min-h-[44px] flex items-center px-1 text-muted hover:text-leaf-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded"
            >
              Contact
            </a>
          </nav>

          <button
            type="button"
            onClick={onToggleSimpleView}
            className={`min-h-[44px] px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid ${
              isSimpleView
                ? 'bg-leaf-deep text-cream border-leaf-deep'
                : 'bg-[#FFFBF0] text-ink border-leaf-mid/40 hover:border-leaf-mid'
            }`}
            aria-pressed={isSimpleView}
            aria-label="Toggle simple 2D view"
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isSimpleView ? 'bg-leaf-light' : 'bg-muted'
              }`}
              aria-hidden="true"
            />
            <span className="sm:hidden">Simple: {isSimpleView ? 'On' : 'Off'}</span>
            <span className="hidden sm:inline">Simple view: {isSimpleView ? 'On' : 'Off'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
