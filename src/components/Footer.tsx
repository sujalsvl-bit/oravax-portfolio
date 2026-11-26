import { contactConfig } from '../data/contact';

export function Footer() {
  const navLinks = [
    { href: '#gate', label: 'Gate' },
    { href: '#services', label: 'Services' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#how-we-work', label: 'How we work' },
    { href: '#policies', label: 'Policies' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="border-t border-leaf-mid/20 bg-[#FFFBF0] py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <a
              href="#gate"
              className="font-serif text-2xl font-bold tracking-tight text-leaf-deep hover:text-leaf-mid transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded"
            >
              oravax
            </a>
            <p className="text-xs text-muted font-sans">
              AI-assisted performance marketing
            </p>
          </div>

          {/* Direct Contact Buttons with visible numbers & email */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            {contactConfig.phone && (
              <a
                href={`tel:${contactConfig.phone}`}
                className="min-h-[44px] inline-flex items-center px-3.5 py-2 rounded-full bg-[#FFFBF0] text-leaf-deep border border-leaf-mid/30 hover:border-leaf-mid transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid"
              >
                <span>Call: +91 72020 80634</span>
              </a>
            )}
            {contactConfig.whatsapp && (
              <a
                href={contactConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center px-3.5 py-2 rounded-full bg-[#FFFBF0] text-leaf-deep border border-leaf-mid/30 hover:border-leaf-mid transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid"
              >
                <span>WhatsApp: +91 72020 80634</span>
              </a>
            )}
            {contactConfig.email && (
              <a
                href={`mailto:${contactConfig.email}`}
                className="min-h-[44px] inline-flex items-center px-3.5 py-2 rounded-full bg-[#FFFBF0] text-leaf-deep border border-leaf-mid/30 hover:border-leaf-mid transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid font-mono text-[11px]"
              >
                <span>{contactConfig.email}</span>
              </a>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <nav aria-label="Footer navigation" className="pt-4 border-t border-leaf-mid/10">
          <ul className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs text-muted">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="hover:text-leaf-deep transition-colors underline-offset-4 hover:underline py-2 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="pt-4 border-t border-leaf-mid/10 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-3">
          <p>
            Five years of agency-side performance marketing experience, applied to your ad accounts.
          </p>
          <a
            href="#gate"
            className="text-leaf-deep hover:text-leaf-mid underline underline-offset-4 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
