# brief.md: oravax garden portfolio site (build with Google Antigravity)

Read context.md first for fixed decisions and the build stages. This file is the full source of truth for copy, prices, scope and design.

Build a single-page, scroll-driven 3D "garden" website for **oravax**, an AI-assisted performance marketing agency run by Sujal. Stack: React, TypeScript, Tailwind, react-three-fiber, drei, framer-motion. The garden is the navigation: each service family is a garden area, and visitors travel a path through it by scrolling or tapping. Build a working site, not a mockup. Use the exact copy, prices and limits below. Do not invent anything not listed here.

---

## 1. Hard content rules (apply everywhere)

- Plain, calm, specific English. No hype, no emojis, no em dashes, no exclamation marks.
- Never promise sales, leads, ROAS, rankings, traffic or AI-search citations. Wording like "work toward", "aim to improve", "we report what we see" is fine. Never "guarantee", "top rank", "get cited".
- The only experience claim allowed: "five years of agency-side performance marketing experience". Do not add client names, logos, numbers, awards, case studies, years in business or team size.
- No testimonials, ratings, brand names or logos anywhere unless they come from `reviews.ts` with `permissionConfirmed: true` (it ships empty).
- All changeable content lives in `src/data/`: `services.ts`, `pricing.ts`, `policies.ts`, `faq.ts`, `gallery.ts`, `reviews.ts`, `contact.ts`. Components only render data. Add a README explaining how to edit each file.
- No backend, auth, payments, analytics, cookies or tracking scripts. No contact form (see section 9).

---

## 2. Art direction

- **Mood:** a quiet, well-kept walled kitchen garden at early morning. Realistic, never low-poly. Clean, tactile, realistic materials and lighting. Not cartoonish, not neon, not "tech gradient". No plank-box gate, no floating faceted grey spheres as clouds, no flat green plane, no dark slab walls, no translucent teal polygons, no crude props.
- **Palette (CSS variables):**
  - sky top `#EAF1E4`, sky horizon `#FBF4E3`
  - soil `#5B4636`, path stone `#CFC6B4`
  - leaf deep `#2F5D3A`, leaf mid `#5E8C4A`, leaf light `#A9C77A`
  - bloom accents (use sparingly, one per service family): marigold `#E8A33D`, clay red `#C65D3B`, lavender `#8C7BB5`, sky blue `#6FA3C8`
  - text ink `#1F2A1F`, muted `#5B665B`, card cream `#FFFBF0`
  - All text on cards must pass WCAG AA.
- **Materials and Assets:** realistic PBR textures (soil, stone, timber, brick, grass), realistic HDRI/sky with soft early morning sun, subtle atmospheric depth, dense instanced foliage, soft shadows and ambient occlusion. Terracotta pots, weathered timber raised beds, textured stone path, detailed greenhouse, realistic gate and shed. One small brass plant marker per object, readable at 16px minimum, shown only for the object nearest the camera.
- **Typography:** headings in a warm serif (Fraunces or similar via `@fontsource`), body in a clean sans (Inter or DM Sans). Generous line height, max 65 characters per text line.
- **Camera:** a gentle perspective camera at about 35 degrees, moving along a continuous spline path through the garden. Native scroll without hijacking. Subtle parallax on pointer move on desktop only, disabled on touch and reduced motion. Never spin or shake.
- **Ambient motion:** foliage sways slightly in wind, a few pollen particles drift. All of it stops under reduced motion.
- **Cards:** cream cards with a thin leaf-green border, rounded 16px, soft shadow, placed in front of the scene as real HTML (not 3D text), never covering the gate or key scene content.

---

## 3. Global layout and navigation

- Full-viewport canvas behind HTML content layers. Content is real, selectable, crawlable HTML; the 3D scene is decoration only.
- Simple top header navigation: oravax wordmark, anchor links (Services, Pricing, Contact), and visible "Simple view" toggle. Skip link and footer nav. No dot navigation, no side dots, no mobile dot bar. Anchor links (#services, #pricing, #policies, #gallery, #reviews, #contact) and browser back/forward work smoothly.
- **Cross-links:** each service card has "See pricing" (scrolls to its pricing card) and "Read the limits" (opens the matching policy item). Each pricing card has "What is included" (scrolls to the service). Policies and FAQ link back to the pricing card they refer to. The footer repeats the nav.
- Visible "Simple view" toggle (top right) that swaps the 3D scene for the 2D fallback and is remembered in localStorage.

---

## 4. Performance and fallback

- Lazy-load the 3D scene; show a light skeleton (sky gradient with a small sprout) while it loads. Cap device pixel ratio at 2, use instanced meshes for plants, keep draw calls low, aim for 60fps on a mid-range phone.
- **Fallback (no 3D):** used when `prefers-reduced-motion: reduce`, WebGL is missing or fails, `navigator.hardwareConcurrency` is 2 or less, or the user toggles Simple view. It is a calm illustrated 2D garden (CSS gradient sky, SVG plants and a path) with the same sections and the same data, as a normal scrolling page, no camera moves, only simple fade-ins. All features (cross-links, accordions, reviews, lightbox) still work.
- Mobile first. Tap targets at least 44px. No hover-only interactions. Test layouts at 360px width.

---

## 5. Area 1: The Gate (hero)

- Scene: a timber garden gate with a brass "oravax" plate, path leading in.
- h1: "Performance marketing that grows steadily."
- Sub: "oravax is an AI-assisted performance marketing agency. Five years of agency-side performance marketing experience, applied to your ad accounts."
- Buttons: "See services" (scrolls to Services) and "See pricing" (scrolls to Pricing). A third "Contact" link goes to the Contact area.

---

## 6. Area 2: Services (path of beds, not all flowerbeds)

Use varied garden objects so the area does not look like one repeated element. Each service gets its own object, brass label, and a card with a short description, "Included", "Not included" and cross-links. Content (put it in `services.ts`):

**Paid advertising (marigold area, raised timber beds)**
1. **Account audit and 30-day action plan** (potting bench). For businesses with an existing ad account. Included: review of one ad account and its tracking, written findings and priorities, a 30-day action plan, one review call. Not included: implementing fixes, creating ads, ongoing management. An audit is not required before management.
2. **Core ad management** (greenhouse). Meta OR Google, one business, one ad account. Included: setup and management of up to 2 campaigns, audience and campaign optimization, tracking checks (verifying that conversion tracking fires correctly), weekly performance report, one monthly review call. The client supplies finished creative assets, product details and approved offers. Ad spend is separate and paid by the client directly to the platform. Not included: creative production, tracking implementation, extra campaigns.
3. **Second advertising platform** (second raised bed beside core management). Adds Meta or Google (whichever the client does not already have under management) for the same business, with one additional ad account and up to 2 additional campaigns. Creative production is not included.
4. **Tracking implementation** (irrigation pipes). For installing or repairing conversion tracking. This is separate from the tracking checks in core management. Custom one-time quote after reviewing the website and technical needs. External software or hosting costs need separate approval.

**AI-assisted creative (lavender area, glass cold-frame)**
5. **AI-assisted creative pack.** 4 distinct static ad designs per month, headline and ad copy for each, built from client-supplied product photos, a brief and other client assets. One creative means one design concept in one agreed size. 2 consolidated revision rounds per monthly batch, and client approval before use. Not included: video, filming, actors, UGC, unlimited variations, extra concepts or resizes (these are quoted separately). Badge on the card: "Subject to tool access, commercial rights and a production test". AI video may be quoted only after testing. Client approval is needed before any of their material is uploaded to an AI tool.
6. **Management + creative** combination (greenhouse with a cold-frame attached). Core management plus the creative pack, same limits. Badge: "Available when the creative pack is ready".

**Other channels (sky-blue and clay areas, each its own object and each described individually; all "Custom quote")**
7. **YouTube ads** (a tall sunflower). Planning, setting up and managing paid video campaigns on YouTube for a business that has video assets. Scope, creative needs and budget are agreed in a written quote before work starts.
8. **LinkedIn ads** (trellis with climbing vine). Planning and managing paid campaigns on LinkedIn, typically for B2B businesses that need to reach specific roles or companies. Scope agreed in a written quote.
9. **Reddit ads** (stone bench by the pond). Planning and managing paid campaigns on Reddit, with attention to community fit and ad rules of the platform. Scope agreed in a written quote.
10. **X ads** (bird feeder). Planning and managing paid campaigns on X. Scope agreed in a written quote.
11. **SEO** (herb spiral). Search engine optimization: reviewing a site's technical setup, page content and structure, and recommending or making agreed improvements to help pages be found in search. No ranking promises. Scope agreed in a written quote.
12. **AEO** (beehive). Answer engine optimization: structuring pages and content so answers are clear and easy for answer engines and featured results to quote. No promise of being quoted. Scope agreed in a written quote.
13. **GEO** (greenhouse window with a glowing lantern). Generative engine optimization: working toward visibility of a brand in AI-generated answers through clear, trustworthy, well-structured content. No promise of citations. Scope agreed in a written quote.

For items 7 to 13 show "Custom quote" instead of a price and a "Ask about this" link that goes to the Contact area. Do not group them as one bare list; each gets its own card text as written above.

---

## 7. Area 3: Pricing (a signboard wall, not flowerbeds)

Present as a row of cream pricing cards on a timber fence, with a currency toggle (INR default, USD) in `pricing.ts`:

- Audit + 30-day plan: Rs 7,500 / US$250, one time
- Core management: Rs 15,000 / US$600 per month
- AI-assisted creative pack: Rs 5,000 / US$100 per month (conditional badge)
- Management + creative: Rs 20,000 / US$700 per month ("Available when the creative pack is ready")
- Second platform add-on: +Rs 10,000 / +US$400 per month
- Tracking implementation, YouTube ads, LinkedIn ads, Reddit ads, X ads, SEO, AEO, GEO: "Custom quote"

Under each card: 3 bullet "Includes", 1 line "Not included", and the cross-links from section 3. Under the row, a plain note: "Prices exclude ad spend, which is paid by you directly to the ad platform. Taxes and payment methods are confirmed when we quote." Do not display discounts, refund language, free trials or "free audit".

---

## 8. Area 4: How we work (greenhouse walk-through), FAQ, Policies

**How we work** (4 plant-growth steps, plain text). Make clear nothing is compulsory in order:
1. Talk: a short call about your business and goals.
2. Choose: pick the service that fits. An audit is optional; you can go straight to management if you prefer.
3. Approve: you approve the scope, the quote and every ad before it launches.
4. Run and report: we manage the work and send a weekly report with a monthly review call for management clients.

**FAQ** (accordion, `faq.ts`, plain-language answers, 6 to 8 items): What does oravax do? What is included in core management? Is an audit required first? Who pays for ad spend? How does billing work? What is not included in creative? Which platforms can you work on? What if I need something that is not on the price list? Answers must stay within this brief. Output `FAQPage` JSON-LD from the same data, with no claims about visibility, rankings or results.

**Policies** (fence with accordion, `policies.ts`, each item linked to the pricing card it affects):
- Billing: monthly services are paid in advance. One-time audit work is paid before it starts.
- Start: work begins after payment, the brief and required access are received.
- Term and cancellation: month-to-month. Written cancellation before the next billing date stops the next renewal; work continues through the paid period.
- Approvals: you approve all ads before launch. Extra work needs a written quote and approval first.
- Ad spend and ownership: you pay the platform directly. You own your ad accounts and data. We use delegated access, not shared passwords.
- Scope: higher spend or complexity may need a revised scope.
- Results: no guaranteed sales, leads, ROAS, rankings or AI-search citations.
- **Exclusions** (own item): not part of the standard offer unless quoted: original shoots, influencer sourcing, website development, landing-page builds, CRM implementation, video generation, extra creative concepts or resizes.
- Taxes, refunds and payment methods: render the item as "Confirmed when we quote" with a `// TODO owner` in code. Do not invent refund or tax terms.

---

## 9. Area 5: Gallery (ad creative meadow)

- Data from `gallery.ts`: `id, image, alt, caption, platform, verified`. **Ship with an empty array.** Render only items with `verified: true`.
- Empty state: a quiet meadow with a brass sign "Creative samples will appear here." Never show stock images or placeholder ads.
- When items exist: masonry grid in soft rounded frames, keyboard-accessible lightbox (Escape closes, arrow keys move), lazy images with alt text required.

## 10. Area 6: Review tree

- Data from `reviews.ts`: `id, quote, personName, role, company, sourceLabel ("delivered via oravax" | "prior agency work" | "example"), permissionConfirmed, date`. **Ship with an empty array.** Do not add any quotes, names, brands or logos. Render only items where `permissionConfirmed === true`, and always show the `sourceLabel` on the open card.
- Empty state: a bare tree with three grey leaves that do not open, labelled "Reviews will appear here once confirmed".
- With data: leaves sway slightly; tapping or pressing Enter opens a card with a smooth scale and fade; arrow keys move between leaves; Escape closes; focus returns to the leaf. In fallback mode show the same reviews as a simple list of cards. Do not output `Review` or `AggregateRating` schema.

## 11. Area 7: Contact (garden shed)

- Contact is confirmed: Call `tel:+917202080634` (visible: +91 72020 80634), WhatsApp `https://wa.me/917202080634` (visible: WhatsApp: +91 72020 80634), and Email `mailto:oravaxbusiness@gmail.com` (visible: oravaxbusiness@gmail.com). `bookingUrl: null`. Numbers and email are visible as text on the buttons in the Contact area and in the footer.
- **Do not build a contact form** and no form backend; no tracking scripts.
- Footer: "oravax", "AI-assisted performance marketing", contact buttons, repeat the nav.

---

## 12. SEO, AEO and accessibility

- Semantic HTML (header, nav, main, section, footer), one h1, logical h2/h3, descriptive meta title and description, Open Graph tags, canonical tag.
- JSON-LD: `Organization` (name oravax, description only) and `Service` entries generated from `services.ts` with no price promises. No review, rating or result claims. No schema stating rankings.
- All service, pricing, policy and FAQ text must be in the HTML at first render, not created only by 3D or canvas code.
- AA contrast, visible focus rings, alt text on all images, ARIA labels on nav dots, Simple view toggle and lightbox, full keyboard path through the page, skip-to-content link.
- Add `sitemap.xml` and `robots.txt`.

---

## 13. Deliverable checklist

1. Working site matching sections 2 to 12, 3D scene plus complete 2D fallback.
2. Data files populated exactly as written, with `reviews.ts` and `gallery.ts` empty and `contact.ts` null.
3. README explaining each data file and how to enable contact controls, add verified gallery items and add permitted reviews.
4. No backend, form, auth, payments, analytics or extra invented content.


---

## Final safeguards
Only genuine, authorized testimonials may appear as endorsements. Never render example reviews in the public review tree. Parent-agency work must name and credit the actual parent agency, with original unaltered quotes and permission; do not imply those clients hired oravax directly. Until attribution is settled, keep reviews empty. Do not invent a domain for canonical URLs, sitemap URLs or Open Graph images; make the production URL configurable and omit unconfigured URLs. Respect reduced motion fully, including disabling entrance animations when requested.
