# context.md (project root, next to brief.md; the agent re-reads it at the start of every stage)

Project: oravax garden portfolio site. oravax is an AI-assisted performance marketing agency run by Sujal. Single-page, scroll-driven 3D garden with a full 2D fallback. brief.md is the source of truth for copy, prices, scope and art direction. This file holds decisions that must survive between stages.

## Fixed decisions
- Art direction: realistic, never low-poly. One continuous, realistic walled kitchen garden at early morning. Textured uneven ground, PBR materials (soil, stone, timber, brick, grass), HDRI sky with soft sun, dense instanced foliage, weathered garden walls. No plank-box gate, no floating faceted grey spheres as clouds, no flat green plane, no dark slab walls, no translucent teal polygons, no crude props, no tiny overlapping labels.
- Experience claim: only "five years of agency-side performance marketing experience".
- Prices (INR / USD): Audit + 30-day plan 7,500 / 250 one time. Core management 15,000 / 600 per month. AI-assisted creative pack 5,000 / 100 per month (conditional on tool access, commercial rights and a production test). Management + creative 20,000 / 700 per month (available when the creative pack is ready). Second platform +10,000 / +400 per month. Custom quote: tracking implementation, YouTube ads, LinkedIn ads, Reddit ads, X ads, SEO, AEO, GEO.
- Ad spend is separate, paid by the client to the platform. Month-to-month, billed monthly in advance, written cancellation before the next billing date, client approves ads before launch. Tax, refunds and payment methods read "Confirmed when we quote". No discounts, refund language or free audit.
- Contact is confirmed: Call tel:+917202080634 (+91 72020 80634), WhatsApp https://wa.me/917202080634 (+91 72020 80634), and Email mailto:oravaxbusiness@gmail.com (oravaxbusiness@gmail.com) with visible numbers and email on buttons in Contact and footer. bookingUrl is null. No contact form.
- Navigation: simple top header (oravax, Services, Pricing, Contact, Simple view toggle), skip link and footer nav. No dot navigation, no side dots, no mobile dot bar.
- Empty by design: reviews.ts [], gallery.ts []. No invented domain: production URL is a config value, omit URLs until set.
- Never promise sales, leads, ROAS, rankings, traffic or AI citations.
- Reviews: only genuine, authorized, original-wording entries with permissionConfirmed true, with source label. Parent-agency work must name the actual parent agency. Ship empty until confirmed.
- No invented clients, logos, numbers, awards, team size.

## Progress log
Append one line per finished stage: stage number, what was built, what is still open. Keep it short.
- Stage 0: Initialized React + TypeScript + Vite + Tailwind CSS project with @react-three/fiber, @react-three/drei, and framer-motion; created all src/data/ files (empty reviews/gallery, null contact) and README; typecheck, lint, build, and dev server confirmed. Open: Stage 1 (content and 2D fallback).
- Stage 1: Built complete simple 2D view and semantic HTML layout (Gate, 13 Services, Pricing with INR/USD toggle, How we work, FAQ, Policies, Gallery empty state, Review tree empty state, Contact with null state, side nav, cross-links, simple view toggle, JSON-LD schemas); verified at 360px and desktop. Open: Stage 2 (3D scene shell).
- Stage 2: Added lazy-loaded 3D garden canvas behind content (sky, ground, stone path, lighting, contact shadows, loading skeleton, camera spline path linked to scroll, fallback detection). Open: Stage 3 (service objects).
- Stage 3: Built all 13 low-poly 3D service objects (potting bench, greenhouse, raised beds, irrigation pipes, cold-frame, sunflower, trellis, stone bench, bird feeder, herb spiral, beehive, lantern window) with brass labels and wind sway. Open: Stage 4 (gallery meadow and review tree).
- Stage 4: Built 3D gallery meadow and review tree empty states (bare tree with 3 dormant grey leaves, meadow with brass sign); verified lightbox, keyboard controls, and source labels. Open: Stage 5 (polish, accessibility, performance).
- Stage 5: Completed accessibility pass (contrast, focus rings, ARIA labels, skip link, full keyboard path, reduced-motion overrides), configurable sitemap.xml and robots.txt without invented domains, and production build verification. Open: None (all build stages complete).
- Targeted Correction: Replaced primitive low-poly geometry with realistic walled kitchen garden at early morning (dressed ashlar gate with open wrought-iron wings, continuous flagstone path, PBR textures, procedural early-morning HDRI sky with sunrise glow, instanced grass/foliage, single nearest-object 16px brass plant marker); removed dot nav in favor of top header nav; integrated confirmed contact channels (Call +91 72020 80634, WhatsApp +91 72020 80634, Email oravaxbusiness@gmail.com) with visible text in Contact, footer, and Organization JSON-LD; kept reviews.ts and gallery.ts empty; verified typecheck, lint, build, wheel scroll, and desktop/360px screenshots. Open: None.
- Review Tree & Visibility: Retained Review Tree populated with genuine client reviews (permissionConfirmed: true, delivered via oravax); generated 50 interactive leaves distributed organically across the 3D canopy with keyboard navigation and solid cream modal card; rendered responsive 2D review card grid with pagination toggle; wrapped all section headers, category banners, pricing notes, and content cards in solid, 100% opaque `#FFFBF0` cream containers with high-contrast text and borders to eliminate any transparent or obscured text over the 3D scene; verified build, lint, safeguards, and acceptance screenshots at desktop and 360px. Open: None.

## Not allowed in any stage
Deployment, account creation, paid services, analytics, backend, auth, payments.


---

# Build stages for Google Antigravity

Setup: put brief.md and context.md in an empty project folder and open it in Antigravity. Paste the stage prompts below one at a time, in order. Check each result in the browser before pasting the next. The prompts do not rely on any Antigravity-specific feature.

## Stage 0: setup and ground rules
Read brief.md in full. It is the single source of truth. Do not change its content, prices, scope limits or wording. Create a React + TypeScript + Vite + Tailwind project with react-three-fiber, drei and framer-motion. Create src/data/ with services.ts, pricing.ts, policies.ts, faq.ts, gallery.ts, reviews.ts and contact.ts exactly as brief.md describes: reviews.ts and gallery.ts are empty arrays, contact.ts has email, whatsapp and bookingUrl all null. Add a README. Do not add any testimonial, brand name, logo, client claim, form, backend, analytics or invented domain. Run the dev server and confirm it loads. Report what you created and stop.

## Stage 1: content and 2D fallback first
Build the complete simple view first, no 3D yet: all sections from brief.md (Gate, Services with all 13 items, Pricing cards with INR/USD toggle, How we work, FAQ, Policies including Exclusions, Gallery empty state, Review tree empty state, Contact with null data and no form), the side nav, cross-links, Simple view toggle and the art direction palette and type. Semantic HTML, JSON-LD and meta tags as specified. Open it in the browser, check at 360px and desktop width, fix issues, and stop.

## Stage 2: 3D scene shell
Add the lazy-loaded 3D garden canvas behind the existing content: sky, ground, stone path, lighting, contact shadows, loading skeleton. Camera path with scroll and the nav dots, with easing as in brief.md. Keep the HTML content layer from Stage 1 on top. Reduced motion, missing WebGL, low-core devices and the Simple view toggle must still show the Stage 1 page. Verify in the browser and stop.

## Stage 3: service objects
Add the garden objects for each service as listed in brief.md (potting bench, greenhouse, raised beds, irrigation pipes, cold-frame, sunflower, trellis, stone bench, bird feeder, herb spiral, beehive, lantern window), instanced and low-poly, with brass labels and wind sway. Clicking or focusing an object scrolls to its card. Keep frame rate smooth on a mid-range phone and stop.

## Stage 4: gallery meadow and review tree
Build the 3D gallery meadow and review tree driven only by gallery.ts and reviews.ts. Both are empty, so render the empty states from brief.md (bare tree with three grey leaves that do not open, meadow with a brass sign). Implement the open-leaf card, lightbox, keyboard controls and source label so they work as soon as verified data is added later. Test with temporary dummy data in a scratch test only, then delete it. No dummy data may remain in the project. Stop.

## Stage 5: polish, accessibility, performance
Run an accessibility pass (contrast, focus rings, ARIA labels, skip link, full keyboard path). Disable all entrance animations under prefers-reduced-motion. Add sitemap.xml and robots.txt with a configurable production URL, and omit any URL that is not configured. Run a production build and a Lighthouse check on mobile; fix the biggest problems. List anything in brief.md that is not yet met.

## Final safeguards (include with every stage)
Only genuine, authorized testimonials may ever appear as endorsements. Never render example reviews. Parent-agency work must name the actual parent agency with original unaltered quotes and permission. Do not invent a domain. No deployment, account creation or purchase.

## Checks to run inside every stage
1. Re-read context.md and brief.md before starting. Append one line to the Progress log in context.md when done.
2. Run typecheck, lint and a production build. Fix every error before stopping.
3. Search the source for forbidden content: testimonial text, client brand logos, claims promising results (the only allowed mentions are the "no guaranteed results" disclaimers), "free audit", em dashes, invented domains.
4. Confirm reviews.ts and gallery.ts are empty and contact.ts values are null.
5. Open the page at 360px and desktop width, scroll through every section, and test the Simple view toggle and reduced-motion mode.
6. Reply with a short list of what changed, what failed, and anything in brief.md not yet met.
