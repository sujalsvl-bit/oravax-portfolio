# oravax Garden Portfolio Site

oravax is an AI-assisted performance marketing agency run by Sujal. This project is a single-page, scroll-driven realistic 3D garden website with a complete 2D fallback.

Stack:
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Three.js
- @react-three/fiber
- @react-three/drei
- Framer Motion

## Data Files in src/data/

All changeable content lives in `src/data/`. Components only render data.

### 1. services.ts
Defines all 13 service items across Paid Advertising, AI-assisted creative, and Other channels (YouTube, LinkedIn, Reddit, X, SEO, AEO, GEO).
Each service includes:
- `id`: Unique identifier
- `name`: Service title
- `gardenObject`: Visual 3D model representation in the garden
- `brassLabel`: Text for the brass garden marker
- `area`: Garden color zone ('marigold', 'lavender', 'skyblue', 'clay')
- `description`: Scope summary
- `included`: List of included deliverables
- `notIncluded`: Explicit list of non-included scope
- `pricingId`: Link to related pricing card
- `policyId`: Link to related policy accordion item
- `customQuote`: Boolean indicating custom quotation

### 2. pricing.ts
Defines pricing tiers and plans with INR and USD currency support:
- Audit + 30-day plan (7,500 INR / 250 USD, one time)
- Core management (15,000 INR / 600 USD per month)
- AI-assisted creative pack (5,000 INR / 100 USD per month)
- Management + creative (20,000 INR / 700 USD per month)
- Second platform add-on (+10,000 INR / +400 USD per month)
- Custom quote services (Tracking, YouTube, LinkedIn, Reddit, X, SEO, AEO, GEO)
Includes the required pricing note stating that ad spend is paid directly to platforms by the client and taxes are confirmed when quoted.

### 3. policies.ts
Defines operating policies and terms:
- Billing: paid in advance
- Start: begins after payment, brief, and access
- Term and cancellation: month-to-month with written notice
- Approvals: client approves all ads before launch
- Ad spend and ownership: client pays platform directly and owns accounts
- Scope: adjustments for volume or complexity
- Results: no guaranteed sales, leads, ROAS, rankings or AI-search citations
- Exclusions: explicit list of non-standard items
- Taxes, refunds and payment methods: confirmed when quoted

### 4. faq.ts
Defines standard questions and plain-language answers covering agency scope, ad spend, billing, creative boundaries, and custom requests.

### 5. gallery.ts
Stores ad creative samples. Ships with an empty array by design (`[]`).
To add verified items:
- Add an object with `id`, `image`, `alt`, `caption`, `platform`, and set `verified: true`.
- Items with `verified: false` will not be rendered.
- Never use placeholder or unverified images.

### 6. reviews.ts
Stores client reviews. Ships with an empty array by design (`[]`).
To add permitted reviews:
- Only genuine, authorized, original-wording testimonials may be added.
- Each entry must include `id`, `quote`, `personName`, `role`, `company`, `sourceLabel` ('delivered via oravax', 'prior agency work', or 'example'), `date`, and `permissionConfirmed: true`.
- Only items where `permissionConfirmed === true` are rendered.
- If referencing prior agency work, the actual parent agency must be credited.

### 7. contact.ts
Holds confirmed direct contact channels:
- `phone`: `+917202080634` (Call button: `tel:+917202080634`)
- `whatsapp`: `https://wa.me/917202080634` (WhatsApp button with visible number)
- `email`: `oravaxbusiness@gmail.com` (Email button with visible address)
- `bookingUrl`: `null`
There is no contact form and no form backend.

## Production URL and Configuration

Configuration lives in `src/config.ts`:
- Set `VITE_SITE_URL` in your environment when ready for production deployment.
- Unconfigured URLs are omitted from canonical metadata, `robots.txt`, and `sitemap.xml`.
- Do not invent a domain.

## Realistic 3D Garden Architecture & Assets

The 3D scene renders one continuous, realistic walled kitchen garden at early morning seen through a gentle scroll-linked camera that walks a coherent stone path from the entrance gate to the garden shed:
- **Art Direction:** Realistic, never low-poly. Organic uneven ground with dark loam soil, beveled stone flagstone path with cobblestone edgings, weathered brick walls with stone coping, and background orchard silhouettes.
- **Atmosphere & Sky:** Real procedural early-morning HDRI sky dome with smooth dawn gradient and low-angle rising sun glow, soft morning mist (`FogExp2`), and golden sunlight with soft shadows and ambient occlusion. No polygon clouds.
- **Foliage:** Dense instanced grass blades (`InstancedMesh`) and botanical plantings (sunflower, English lavender, climbing grapevine, herbs) with subtle natural wind sway.
- **Labels:** Proximity-based single nearest brass plant marker label, readable at 16px minimum with high contrast. The label only appears for the single object closest to the camera, eliminating all label overlap.
- **Navigation:** Simple top header (`oravax`, `Services`, `Pricing`, `Contact`, `Simple view toggle`), skip-to-content link, and footer navigation. All dot navigation, side dots, and mobile dot bars are removed.
- **2D Fallback:** Available via the header toggle, automatically active when `prefers-reduced-motion` is detected, or when WebGL is unavailable or on low-power devices.

### 3D Asset Sources and Licences
- **Early Morning HDRI Sky:** Procedural panoramic equirectangular sky shader based on CC0 early morning sky references from [Poly Haven](https://polyhaven.com/hdris/skies) (CC0 license).
- **PBR Soil, Brick, Stone, Slate, and Timber Textures:** Procedural PBR materials based on CC0 material references from [ambientCG](https://ambientcg.com) and [Poly Haven](https://polyhaven.com/textures) (CC0 license).
- **Botanical and Architectural Procedural Models:** Custom procedural geometries matching real-world architectural dimensions (Victorian glasshouse, oak gate with wrought iron pintles, carpenter's potting bench, British National cedar beehive, limestone bench, stone herb spiral, cedar bird feeder, and gardener's potting shed) under CC0 open license.

## Safeguards and Ground Rules

1. **No guaranteed results:** Never promise sales, leads, ROAS, rankings, traffic, or AI-search citations.
2. **Ad spend is separate:** Clients pay platforms directly.
3. **No invented content:** No fabricated testimonials, client logos, awards, or team sizes.
4. **Punctuation:** No em dash characters in user-facing copy.
5. **Audits are never free:** Audits are paid at Rs 7,500 / US$250.
6. **No invented domains:** Do not use placeholder production domains.
