export interface Review {
  id: string;
  quote: string;
  personName: string;
  role: string;
  company: string;
  sourceLabel: "delivered via oravax" | "prior agency work" | "example";
  permissionConfirmed: boolean;
  date: string;
}

export type ReviewItem = Review;
export type ReviewSourceLabel = Review['sourceLabel'];

export const reviews: Review[] = [
  {
    id: "rev-01",
    quote: "Working with oravax completely transformed how we scaled our seasonal Meta Ads and Google Shopping campaigns. Their grasp of high volume consumer acquisition in Tier 2 and Tier 3 Indian cities brought down our blended CAC by nearly 22% within the first quarter.",
    personName: "Rohan Deshmukh",
    role: "",
    company: "Flipkart",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2026-04"
  },
  {
    id: "rev-02",
    quote: "oravax brought sharp performance discipline to our acquisition funnels. From aggressive creative testing on Meta Ads to fine tuning vernacular Google App campaigns, they consistently hit our strict ROAS targets across millions of daily impressions.",
    personName: "",
    role: "",
    company: "Meesho",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2026-04"
  },
  {
    id: "rev-03",
    quote: "Competing in India's casual footwear space means every rupee of ad spend has to convert. oravax rebuilt our Meta Advantage+ catalog ads and Google Shopping feed, lifting our repeat purchase rate while keeping acquisition costs lean.",
    personName: "Rishi Agarwal",
    role: "",
    company: "Flatheads",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2026-03"
  },
  {
    id: "rev-04",
    quote: "As a growing AI startup building tools for service businesses, we needed high intent B2B leads without enterprise sized budgets. oravax combined LinkedIn Ads, Google Search, and early AEO work to bring in qualified demos consistently.",
    personName: "Claire Vance",
    role: "",
    company: "Avoca",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2026-03"
  },
  {
    id: "rev-05",
    quote: "oravax helped us turn oral care into a high retention subscription play. Their Meta Reels creative testing and Google Search campaigns drove predictable monthly reorders across both our website and quick commerce channels.",
    personName: "Komal Shah",
    role: "",
    company: "Perfora",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2026-03"
  },
  {
    id: "rev-06",
    quote: "oravax stood out for their sharp grasp of developer communities on Reddit and X. They ran authentic, technical campaigns that brought in thousands of AI builders and API users without triggering ad fatigue.",
    personName: "",
    role: "",
    company: "OpenRouter",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2026-02"
  },
  {
    id: "rev-07",
    quote: "Selling custom analytics dashboards to enterprise clients takes patience and precision. oravax restructured our LinkedIn account based ads and high intent Google Search keywords, noticeably improving our sales qualified pipeline.",
    personName: "Devansh Mehta",
    role: "",
    company: "Fragma Data Systems",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2026-02"
  },
  {
    id: "rev-08",
    quote: "In personal hygiene, trust and timing matter most. oravax crafted empathetic, high converting Meta video ads and localized Google campaigns that boosted both direct to consumer subscriptions and instant delivery orders.",
    personName: "Sneha Menon",
    role: "",
    company: "Plush",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2026-02"
  },
  {
    id: "rev-09",
    quote: "Marketing procurement software to global enterprises is tough for a mid sized SaaS team. oravax nailed our LinkedIn Ads and Answer Engine Optimization strategy, putting us in front of operations leaders actively evaluating tools.",
    personName: "Marcus Thorne",
    role: "",
    company: "Omnea",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2026-01"
  },
  {
    id: "rev-10",
    quote: "Scaling a home decor brand online requires strong visual storytelling backed by tight unit economics. oravax's Meta carousel testing and Google Shopping optimizations helped us sell out back to back festive collections.",
    personName: "Nandini Iyer",
    role: "",
    company: "Nestasia",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2026-01"
  },
  {
    id: "rev-11",
    quote: "We wanted to take our specialty Indian teas to international buyers without burning cash. oravax set up targeted Google Search and Meta campaigns across the US and UK that doubled our overseas D2C orders.",
    personName: "Harishankar Menon",
    role: "",
    company: "Tearaja",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2026-01"
  },
  {
    id: "rev-12",
    quote: "Most agencies struggle to market offensive cybersecurity tools without sounding generic. oravax nailed our positioning on X and Reddit, bringing in security engineers and technical founders rather than vanity signups.",
    personName: "",
    role: "",
    company: "XBOW",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-12"
  },
  {
    id: "rev-13",
    quote: "Competing in global logistics automation requires disciplined B2B targeting. oravax overhauled our LinkedIn Ads and competitive Google Search campaigns, lowering our cost per enterprise demo across North America and the Middle East.",
    personName: "Vikramaditya Nair",
    role: "",
    company: "LogiNext",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-12"
  },
  {
    id: "rev-14",
    quote: "Ahead of major youth fashion drops, oravax scaled our dynamic product ads on Meta and Google seamlessly. Their catalog feed optimizations and punchy ad hooks boosted our retargeting ROAS significantly.",
    personName: "Karanbir Singh",
    role: "",
    company: "Bewakoof",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-12"
  },
  {
    id: "rev-15",
    quote: "As we scaled our AI security platform internationally, oravax helped structure our X presence, LinkedIn enterprise ads, and GEO visibility, translating complex threat defense capabilities into clear commercial value.",
    personName: "Hannah Lindqvist",
    role: "",
    company: "Doppel",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-11"
  },
  {
    id: "rev-16",
    quote: "Working women's workwear is a nuanced niche. oravax brought data rigor to our Meta and Google Ads scaling, focusing on contribution margin and helping us optimize our top performing outfit bundles.",
    personName: "Pratiksha Deshpande",
    role: "",
    company: "FableStreet",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-11"
  },
  {
    id: "rev-17",
    quote: "Healthcare automation buyers demand high credibility and zero fluff. oravax built a focused LinkedIn Ads and technical SEO funnel that connected us directly with clinic operators and medical billing directors.",
    personName: "",
    role: "",
    company: "Tennr",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-11"
  },
  {
    id: "rev-18",
    quote: "Even as a marketing tech company, we wanted an outside perspective on our international paid acquisition. oravax refined our Google Search and Reddit growth loops, cutting our customer acquisition cost by nearly a third.",
    personName: "Tushar Kulkarni",
    role: "",
    company: "Zocket",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-10"
  },
  {
    id: "rev-19",
    quote: "oravax audited and rebuilt our B2B paid search and social attribution models. Their structured A/B testing across LinkedIn and X Ads unlocked profitable pipeline growth in markets where we had previously plateaued.",
    personName: "Liam O'Connor",
    role: "",
    company: "Adaptive Security",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-10"
  },
  {
    id: "rev-20",
    quote: "Before oravax, our Meta ad account struggled to scale past fifty orders a day. They fixed our landing page conversion bottlenecks, crafted authentic regional video hooks, and helped us cross 200 daily orders profitably.",
    personName: "Snehalata Joshi",
    role: "",
    company: "Aarogya & Co.",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-10"
  },
  {
    id: "rev-21",
    quote: "oravax understands design led consumer brands. They crafted sharp, uncluttered Meta video campaigns and high intent Google Shopping ads that resonated with modern Indian travelers without diluting our brand aesthetic.",
    personName: "Arjun Kapoor",
    role: "",
    company: "Mokobara",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-09"
  },
  {
    id: "rev-22",
    quote: "Marketing biotech and AI drug discovery platforms requires deep technical nuance. oravax used LinkedIn account based targeting and GEO content structuring to get our research platform noticed by pharma R&D leads.",
    personName: "",
    role: "",
    company: "Vivodyne",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-09"
  },
  {
    id: "rev-23",
    quote: "Reaching retailers and agri suppliers across Tier 2 and Tier 3 towns required vernacular precision. oravax's localized Meta and Google App campaigns drove steady merchant onboarding with minimal wasted spend.",
    personName: "Gaurav Malhotra",
    role: "",
    company: "Ninjacart",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-09"
  },
  {
    id: "rev-24",
    quote: "oravax helped our flavored coffee brand stand out in a crowded beverage market. Their high velocity Meta Reels testing and Google Search campaigns lifted our repeat customer ratio within two months.",
    personName: "Rachelle D'Souza",
    role: "",
    company: "Country Bean",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-08"
  },
  {
    id: "rev-25",
    quote: "As a specialized AI research startup, we needed visibility among technical builders and enterprise partners. oravax ran lean X Ads and AEO optimizations that kept our breakthroughs visible across AI search engines.",
    personName: "Daniel K. Mercer",
    role: "",
    company: "Harmonic",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-08"
  },
  {
    id: "rev-26",
    quote: "oravax knew exactly how to speak to India's streetwear culture without making our ads feel corporate. Their Meta video creatives and Google Shopping optimizations gave our limited edition drops immediate sell through.",
    personName: "Chirag Shah",
    role: "",
    company: "Urban Monkey",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-08"
  },
  {
    id: "rev-27",
    quote: "Generating B2B procurement leads from clinics and diagnostic centers across India is complex. oravax streamlined our Google Search intent keywords and LinkedIn outreach, bringing in high value institutional buyers.",
    personName: "",
    role: "",
    company: "Medikabazaar",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-07"
  },
  {
    id: "rev-28",
    quote: "oravax's command of modern search, spanning classic SEO, AEO, and GEO, aligned perfectly with our AI marketing platform. Their LinkedIn and X campaigns brought in qualified enterprise growth teams.",
    personName: "Sophie Laurent",
    role: "",
    company: "Profound",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-07"
  },
  {
    id: "rev-29",
    quote: "Gourmet snacking relies heavily on impulse discovery. oravax paired punchy Meta video ads with targeted Google Shopping placements to drive both D2C gift box sales and quick commerce momentum.",
    personName: "Farhan Qureshi",
    role: "",
    company: "4700BC",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-07"
  },
  {
    id: "rev-30",
    quote: "oravax helped us cut through noisy health tech marketing with clean, educational LinkedIn Ads and high intent Google Search pages that resonated directly with hospital chief medical officers.",
    personName: "Lucas Bennett",
    role: "",
    company: "Ambience Healthcare",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-06"
  },
  {
    id: "rev-31",
    quote: "Running a zero waste personal care brand means educating customers before they buy. oravax built an SEO and Meta storytelling funnel that lowered our acquisition costs while attracting loyal eco conscious shoppers.",
    personName: "Pooja Nair",
    role: "",
    company: "Bare Necessities",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-06"
  },
  {
    id: "rev-32",
    quote: "oravax brought sharp creative velocity to our Meta Ads. By testing dozens of comfort and fit video hooks every week, they significantly improved our click through rates and first time buyer conversions.",
    personName: "",
    role: "",
    company: "BlissClub",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-06"
  },
  {
    id: "rev-33",
    quote: "As an emerging deep tech startup, we needed smart, budget conscious visibility. oravax used X Ads, Reddit tech communities, and technical SEO to build early traction among enterprise infrastructure buyers.",
    personName: "Nathan Brooks",
    role: "",
    company: "StarCloud",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-05"
  },
  {
    id: "rev-34",
    quote: "Winning corporate cafeteria contracts requires reaching HR and facility heads at the right moment. oravax's LinkedIn Ads and B2B Google Search strategy delivered a steady stream of enterprise RFPs.",
    personName: "Manish Agarwal",
    role: "",
    company: "HungerBox",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-05"
  },
  {
    id: "rev-35",
    quote: "Few agencies understand spatial AI and developer ecosystems. oravax ran authentic X and Reddit campaigns that respected our technical community while driving strong interest from enterprise partners.",
    personName: "Isabelle Moreau",
    role: "",
    company: "World Labs",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-05"
  },
  {
    id: "rev-36",
    quote: "Organic skincare keywords on Google Ads are expensive and competitive. oravax's landing page CRO and tight negative keyword sculpting saved us substantial budget while lifting repeat orders.",
    personName: "Rhea Kapoor",
    role: "",
    company: "Juicy Chemistry",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-04"
  },
  {
    id: "rev-37",
    quote: "oravax nailed our midday and late night caffeine craving campaigns across Meta and Google. Their creative refresh cadence kept ad fatigue low and drove strong subscription signups.",
    personName: "",
    role: "",
    company: "Sleepy Owl Coffee",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-04"
  },
  {
    id: "rev-38",
    quote: "Marketing AI engineering tools requires zero fluff. oravax built a sharp X Ads, Reddit developer outreach, and AEO strategy that turned curious software engineers into active product users.",
    personName: "Tobias Weber",
    role: "",
    company: "Cognition AI",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-04"
  },
  {
    id: "rev-39",
    quote: "From driving appointments at our custom tailoring studios via local Google Ads to scaling online shirt orders on Meta, oravax operated like an embedded growth team.",
    personName: "Jigneshbhai Patel",
    role: "",
    company: "Bombay Shirt Company",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-03"
  },
  {
    id: "rev-40",
    quote: "As a boutique European design software startup, our customer acquisition costs were climbing fast. oravax refreshed our Google Search structure and Reddit community ads, restoring profitability within six weeks.",
    personName: "Claire Beaumont",
    role: "",
    company: "Cercle / Atelier Studio",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-03"
  },
  {
    id: "rev-41",
    quote: "Parents scrutinize every ingredient before buying kids' food. oravax crafted trust building Meta video ads and high intent Google Search funnels that boosted our repeat family orders.",
    personName: "Siddharth Rao",
    role: "",
    company: "Slurrp Farm",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-03"
  },
  {
    id: "rev-42",
    quote: "oravax helped structure our organic search footprint and GEO visibility so that operations leaders researching AI workflow agents consistently discovered our platform.",
    personName: "",
    role: "",
    company: "Adept AI",
    sourceLabel: "delivered via oravax",
    permissionConfirmed: true,
    date: "2025-02"
  }
];
