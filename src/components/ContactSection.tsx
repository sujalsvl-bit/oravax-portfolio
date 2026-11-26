import { contactConfig } from '../data/contact';

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-20 space-y-12">
      <div className="max-w-3xl mx-auto text-center space-y-3 p-6 sm:p-8 bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-sm">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-leaf-light/30 text-leaf-deep border border-leaf-mid/30">
          Garden Shed
        </div>
        <h2 id="contact-heading" className="text-3xl sm:text-4xl font-serif text-leaf-deep">
          Contact
        </h2>
        <p className="text-base text-muted">
          Direct, quiet communication. We do not use intrusive forms, sales tracking, or unsolicited marketing sequences.
        </p>
      </div>

      <div className="max-w-xl mx-auto bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-sm p-8 text-center space-y-6">
        {/* Garden Shed Architectural Illustration */}
        <div className="w-44 h-32 mx-auto" aria-hidden="true">
          <svg viewBox="0 0 200 140" className="w-full h-full" fill="none">
            {/* Ground stone foundation */}
            <rect x="20" y="128" width="160" height="8" rx="2" fill="#7D7569" />
            <line x1="20" y1="132" x2="180" y2="132" stroke="#50483E" strokeWidth="1" />

            {/* Weathered timber shed body */}
            <rect x="50" y="55" width="100" height="73" rx="2" fill="#503E2F" />
            <path d="M50 72H150M50 88H150M50 104H150M50 120H150" stroke="#3A2C21" strokeWidth="1.5" />

            {/* Pitch slate roof */}
            <path d="M40 55L100 18L160 55H40Z" fill="#2E4C26" />
            <line x1="100" y1="18" x2="100" y2="55" stroke="#22381C" strokeWidth="1.5" />

            {/* Timber panel door with brass latch */}
            <rect x="80" y="70" width="40" height="58" rx="1" fill="#5D4837" stroke="#3A2C21" strokeWidth="1.5" />
            <line x1="80" y1="98" x2="120" y2="98" stroke="#3A2C21" strokeWidth="1.5" />
            <circle cx="112" cy="100" r="2.5" fill="#D4AF37" />

            {/* Mullioned window with warm morning light */}
            <rect x="126" y="72" width="18" height="22" rx="1" fill="#FFF2DC" stroke="#3A2C21" strokeWidth="1.5" />
            <path d="M135 72V94M126 83H144" stroke="#3A2C21" strokeWidth="1" />
          </svg>
        </div>

        {/* Confirmed Direct Contact Channels */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl text-leaf-deep font-semibold">
            Get in touch
          </h3>
          <p className="text-xs text-muted max-w-sm mx-auto leading-relaxed">
            Reach out directly by phone, WhatsApp, or email. We review scopes and respond directly.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
            {contactConfig.phone && (
              <a
                href={`tel:${contactConfig.phone}`}
                className="min-h-[44px] px-4 py-2.5 rounded-full bg-leaf-deep text-cream text-xs font-medium hover:bg-leaf-mid transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Call:</span>
                <span className="font-mono tracking-tight">+91 72020 80634</span>
              </a>
            )}

            {contactConfig.whatsapp && (
              <a
                href={contactConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-4 py-2.5 rounded-full bg-[#FFFBF0] text-leaf-deep border border-leaf-mid/40 hover:border-leaf-mid text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid flex items-center justify-center gap-2 shadow-xs"
              >
                <span>WhatsApp:</span>
                <span className="font-mono tracking-tight">+91 72020 80634</span>
              </a>
            )}

            {contactConfig.email && (
              <a
                href={`mailto:${contactConfig.email}`}
                className="min-h-[44px] px-4 py-2.5 rounded-full bg-[#FFFBF0] text-leaf-deep border border-leaf-mid/40 hover:border-leaf-mid text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Email:</span>
                <span className="font-mono tracking-tight text-[11px] sm:text-xs">
                  {contactConfig.email}
                </span>
              </a>
            )}
          </div>

          <p className="text-[11px] text-muted pt-2">
            No contact form. Client approvals and direct communication only.
          </p>
        </div>
      </div>
    </section>
  );
}
