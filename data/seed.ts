/**
 * Built-in sample content = the approved copy. The site shows this until the same
 * document exists in Sanity; anything you publish in Sanity overrides it field by field.
 */
export const seed: Record<string, any> = {
  settings: {
    brand: "Élané",
    brandSuffix: "Villas",
    siteName: "Élané Villas",
    reservationsEmail: "reservations@elanevillas.com",
    conciergeEmail: "concierge@elanevillas.com",
    nav: [
      { label: "Villas", href: "/villas" },
      { label: "Experiences", href: "/experiences" },
      { label: "Hospitality", href: "/hospitality" },
      { label: "Gallery", href: "/gallery" },
      { label: "Journal", href: "/journal" },
      { label: "Our Story", href: "/about" },
    ],
    navCta: { label: "Plan Your Stay", href: "/contact" },
    finderTitle: "Find your villa",
    footer: {
      chip: { label: "Plan Your Stay", href: "/contact" },
      headline: ["Private villas.", "Bespoke experiences.", "Exceptional hospitality."],
      newsletterTitle: "Newsletter",
      newsletterText: "Occasional stories, destinations, and invitations.",
      columns: [
        {
          title: "Explore",
          links: [
            { label: "Villas", href: "/villas" },
            { label: "Experiences", href: "/experiences" },
            { label: "Dining", href: "/experiences#dining" },
            { label: "Our Story", href: "/about" },
          ],
        },
        {
          title: "Stay",
          links: [
            { label: "Reservations", href: "/contact" },
            { label: "Enquiries", href: "/contact" },
            { label: "Contact", href: "/contact" },
          ],
        },
      ],
      social: [
        { platform: "instagram", url: "#" },
        { platform: "pinterest", url: "#" },
      ],
      copyright: "© 2026 Élané Villas",
      legal: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
      ],
    },
    cta: {
      eyebrow: "Élané Villas",
      title: "Your Next Escape",
      titleEm: "Begins Here.",
      lead: "Leave the ordinary behind.",
      text: "Come for the setting. Stay for the feeling. Return for everything in between.",
      primary: { label: "Plan Your Stay", href: "/contact" },
      secondary: { label: "Make an Enquiry", href: "/contact" },
    },
  },

  home: {
    seoTitle: "Élané Villas — Private Villas, Bespoke Experiences",
    seoDescription:
      "Exceptional villas, unhurried days, and unforgettable stays. Discover beautifully designed private residences where architecture, nature, and impeccable hospitality come together.",
    hero: {
      title: "Your Private Escape,",
      titleEm: "Elevated.",
      sub: "Exceptional villas, unhurried days, and unforgettable stays.",
      text: "Discover beautifully designed private residences where architecture, nature, and impeccable hospitality come together.",
      primary: { label: "Explore Villas", href: "/villas" },
      secondary: { label: "Plan Your Stay", href: "/contact" },
    },
    intro: {
      eyebrow: "Introduction",
      title: "A Place to",
      titleEm: "Slow Down.",
      paragraphs: [
        "There are places you visit. And there are places you remember.",
        "Our villas are designed for the latter — private worlds of refined comfort, thoughtful design, and effortless service, created for mornings without plans and evenings worth lingering over.",
      ],
      cta: { label: "Discover Our Story", href: "/about" },
    },
    villas: {
      eyebrow: "Villas",
      title: "Stay Somewhere",
      titleEm: "Extraordinary.",
      text: "From secluded retreats to expansive private residences, every villa is designed around the art of living well.",
      cta: { label: "Explore All Villas", href: "/villas" },
    },
    hospitality: {
      eyebrow: "Hospitality",
      title: "Service, Without",
      titleEm: "the Show.",
      lead: "Luxury is not about excess. It is about everything being exactly as it should be.",
      text: "From arrival to departure, our dedicated host team takes care of every detail, allowing you to simply settle in and enjoy the moment.",
      items: [
        { icon: "car", title: "Private Transfers" },
        { icon: "key", title: "Personal Villa Host" },
        { icon: "chef", title: "Private Dining" },
        { icon: "concierge", title: "Bespoke Concierge" },
      ],
    },
    experiences: {
      eyebrow: "Experiences",
      title: "Live the",
      titleEm: "Destination.",
      text: "A stay with us extends beyond the villa. Discover hidden places, local flavours, beautiful landscapes, and unforgettable moments — all thoughtfully arranged around your pace.",
      items: [
        { title: "Sailing" },
        { title: "Wellness" },
        { title: "Local Culture" },
        { title: "Adventure" },
        { title: "Private Dining" },
      ],
      cta: { label: "Explore Experiences", href: "/experiences" },
    },
    dining: {
      eyebrow: "Dining",
      title: "The Art of",
      titleEm: "Gathering.",
      lead: "Food tastes different when there is nowhere else you need to be.",
      text: "From slow breakfasts to candlelit dinners beneath the stars, our private dining experiences celebrate exceptional local ingredients, talented chefs, and the simple pleasure of gathering together.",
      cta: { label: "Discover Dining", href: "/experiences#dining" },
    },
    design: {
      eyebrow: "Design",
      title: "Designed to",
      titleEm: "Belong.",
      text: "Every villa is rooted in its surroundings. Natural materials, soft light, open spaces, and quiet details come together to create interiors that feel timeless, intimate, and effortlessly connected to nature.",
    },
    destination: {
      eyebrow: "Destination",
      title: "Somewhere Worth",
      titleEm: "Getting Away To.",
      lead: "Hidden among remarkable landscapes, our villas offer privacy without isolation.",
      text: "Close enough to discover the character of the destination. Far enough to feel completely removed from the everyday.",
      cta: { label: "Discover the Destination", href: "/experiences" },
    },
    testimonials: { eyebrow: "Testimonials", title: "Guests, in Their", titleEm: "Own Words." },
    journal: {
      eyebrow: "Journal",
      title: "Stories From",
      titleEm: "Somewhere Beautiful.",
      text: "Explore stories, guides, inspirations, and behind-the-scenes moments from our villas and the places that surround them.",
      cta: { label: "Read Our Journal", href: "/journal" },
    },
  },

  pages: {
    villas: {
      eyebrow: "The Collection",
      title: "Our",
      titleEm: "Villas",
      sub: "Private spaces. Exceptional places.",
      text: "Explore our collection of distinctive villas, each thoughtfully designed to offer complete privacy, extraordinary comfort and an authentic sense of place.",
      seoDescription:
        "Explore our collection of distinctive villas, each thoughtfully designed to offer complete privacy, extraordinary comfort and an authentic sense of place.",
    },
    experiences: {
      eyebrow: "Experiences",
      title: "Experiences",
      titleEm: "Beyond the Villa",
      sub: "Make your stay uniquely yours.",
      text: "Every journey is different. Our concierge team creates experiences around your interests, your pace and the moments you want to remember.",
      seoDescription:
        "Every journey is different. Our concierge team creates experiences around your interests, your pace and the moments you want to remember.",
    },
    hospitality: {
      eyebrow: "Hospitality",
      title: "Hospitality,",
      titleEm: "Perfected",
      sub: "Quietly attentive. Naturally personal.",
      text: "Luxury is not about excess. It’s about knowing exactly what you need—sometimes before you ask.",
      seoDescription: "Quietly attentive. Naturally personal. Luxury is not about excess.",
      introEyebrow: "Our Philosophy",
      introTitle: "At Élané, hospitality",
      introTitleEm: "begins with listening.",
      introParagraphs: [
        "We take the time to understand how you like to travel, what matters to you and how you want your stay to feel.",
        "From your preferred breakfast to the temperature of your room, from arranging a last-minute dinner reservation to planning an entire day around you, our team is here to make everything effortless.",
      ],
      secondaryEyebrow: "Services",
      secondaryTitle: "Every detail,",
      secondaryTitleEm: "quietly handled",
    },
    about: {
      eyebrow: "About Us",
      title: "The Élané",
      titleEm: "Story",
      sub: "Created for those who believe luxury should feel personal.",
      text: "",
      seoDescription:
        "Created for those who believe luxury should feel personal. We curate exceptional villas in remarkable destinations and pair them with warm, intuitive hospitality.",
      introEyebrow: "Where it began",
      introLead: "Élané was born from a simple idea:",
      introTitle: "What if a luxury stay could feel as effortless as",
      introTitleEm: "coming home",
      introTitleAfter: "—only somewhere extraordinary?",
      introParagraphs: [
        "We curate exceptional villas in remarkable destinations and pair them with warm, intuitive hospitality.",
        "Every property is selected for its sense of place, architectural character and ability to create meaningful moments.",
      ],
      secondaryEyebrow: "What guides us",
      secondaryTitle: "Our",
      secondaryTitleEm: "Values",
    },
    gallery: {
      eyebrow: "Gallery",
      title: "A Glimpse Into",
      titleEm: "Élané",
      sub: "Architecture. Nature. Details. Moments.",
      text: "Explore the world of Élané through the spaces, landscapes and experiences that define our collection.",
      seoDescription:
        "Architecture. Nature. Details. Moments. Explore the world of Élané through the spaces, landscapes and experiences that define our collection.",
    },
    journal: {
      eyebrow: "The Journal",
      title: "Stories From",
      titleEm: "Somewhere Beautiful.",
      sub: "",
      text: "Explore stories, guides, inspirations, and behind-the-scenes moments from our villas and the places that surround them.",
      seoDescription:
        "Explore stories, guides, inspirations, and behind-the-scenes moments from our villas and the places that surround them.",
    },
    contact: {
      eyebrow: "Contact & Booking",
      title: "Let’s Begin Your",
      titleEm: "Journey",
      sub: "Tell us what you’re dreaming of, and we’ll take care of the details.",
      text: "",
      seoDescription:
        "Tell us what you’re dreaming of, and we’ll take care of the details. Enquire about a stay at Élané Villas.",
      introEyebrow: "Alternative Contact",
      introTitle: "Prefer to speak",
      introTitleEm: "with us?",
      introParagraphs: [
        "Our reservations team is available to help you choose the right villa and create your perfect stay.",
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently Asked",
      titleEm: "Questions",
      sub: "",
      text: "",
      seoDescription:
        "Answers to common questions about villa stays, private chefs, transfers, celebrations, children, pets and booking.",
    },
  },

  villas: [
    {
      slug: "azure",
      name: "Villa Azure",
      type: "Oceanfront residence",
      guests: 4,
      pool: "Private Pool",
      tagline: "The Art of Coastal Living",
      description:
        "Wake to endless ocean views, spend afternoons beside your private pool and gather beneath the stars as the evening unfolds.",
      homeDescription:
        "An expansive private residence overlooking the ocean, with sun-drenched terraces, a private pool and spaces designed for effortless entertaining.",
      heroSub: "Where the horizon belongs to you.",
      heroText: "Oceanfront living. Absolute privacy. Unforgettable views.",
      overview: {
        title: "Villa Azure is a celebration of",
        titleEm: "contemporary coastal living.",
        paragraphs: [
          "Set above the sea, this expansive private residence brings together refined interiors, generous outdoor spaces and uninterrupted views of the horizon.",
          "With beautifully appointed interiors, a private pool and dedicated hospitality, Azure offers an effortless setting for families, friends and intimate celebrations.",
        ],
      },
      highlights: [
        { icon: "car", label: "Private transfers" },
        { icon: "guests", label: "Sleeps up to 4 guests" },
        { icon: "pool", label: "Private pool" },
        { icon: "ocean", label: "Ocean views" },
        { icon: "chef", label: "Private chef available" },
        { icon: "clean", label: "Daily housekeeping" },
        { icon: "concierge", label: "Dedicated concierge" },
        { icon: "dining", label: "Outdoor dining" },
        { icon: "sunset", label: "Sunset terrace" },
        { icon: "wifi", label: "High-speed Wi-Fi" },
      ],
      spaces: [
        { title: "Living", description: "Designed for gathering, relaxing and enjoying the view, the main living space opens naturally towards the terrace and ocean." },
        { title: "Bedrooms", description: "Each bedroom has been thoughtfully designed as a private retreat, combining premium linens, generous space and beautiful views." },
        { title: "Kitchen & Dining", description: "A fully equipped kitchen and elegant dining area provide the perfect setting for everything from relaxed breakfasts to private dinners." },
        { title: "Outdoor Living", description: "Move effortlessly between pool, terrace and garden. Spend the afternoon in the sun or gather around the table as the sky changes colour." },
      ],
      includes: ["Welcome arrival", "Daily housekeeping", "Dedicated concierge", "Luxury bathroom amenities", "Premium linens", "Complimentary Wi-Fi", "Daily breakfast (where applicable)"],
      optional: ["Private chef dining", "Spa treatments", "Airport transfers", "Yacht charters", "Excursions", "Yoga", "Wellness experiences", "Celebration planning"],
    },
    {
      slug: "casa-verde",
      name: "Casa Verde",
      type: "Garden estate",
      guests: 8,
      pool: "Private Pool",
      tagline: "Serenity, Reimagined",
      description: "A private sanctuary surrounded by nature, created for slow mornings, long lunches and uninterrupted time together.",
      homeDescription: "A secluded sanctuary surrounded by lush gardens, combining contemporary interiors with the tranquillity of nature.",
      heroSub: "Serenity, Reimagined",
      heroText: "A private sanctuary surrounded by nature, created for slow mornings, long lunches and uninterrupted time together.",
      overview: {
        title: "Serenity, Reimagined",
        titleEm: "",
        paragraphs: [
          "A secluded sanctuary surrounded by lush gardens, combining contemporary interiors with the tranquillity of nature.",
          "A private sanctuary surrounded by nature, created for slow mornings, long lunches and uninterrupted time together.",
        ],
      },
    },
    {
      slug: "reserve",
      name: "The Reserve",
      type: "Private estate",
      guests: 12,
      pool: "Infinity Pool",
      tagline: "Above It All",
      description: "A dramatic architectural residence offering panoramic views, expansive living spaces and absolute privacy.",
      homeDescription: "A sophisticated retreat where indoor and outdoor living come together, offering complete privacy and panoramic views.",
      heroSub: "Above It All",
      heroText: "A dramatic architectural residence offering panoramic views, expansive living spaces and absolute privacy.",
      overview: {
        title: "Above It All",
        titleEm: "",
        paragraphs: [
          "A sophisticated retreat where indoor and outdoor living come together, offering complete privacy and panoramic views.",
          "A dramatic architectural residence offering panoramic views, expansive living spaces and absolute privacy.",
        ],
      },
    },
  ],

  leanServices: [
    { icon: "key", label: "Private arrival" },
    { icon: "concierge", label: "Personal concierge" },
    { icon: "chef", label: "Private chef" },
    { icon: "clean", label: "Housekeeping" },
  ],
  leanHospitality: {
    title: "Quietly attentive,",
    titleEm: "entirely personal",
    text: "From the first welcome to your final goodbye, every Élané villa is supported by our hospitality team. Full details, rates and availability are shared by our reservations team.",
  },

  experiences: [
    {
      slug: "private-dining",
      anchor: "dining",
      label: "01 — Private Dining",
      title: "A Table Set",
      titleEm: "Just for You",
      paragraphs: ["From intimate dinners beneath the stars to relaxed lunches overlooking the sea, let our chefs create a culinary experience designed entirely around you."],
      cta: { label: "Discover Private Dining", href: "/contact" },
    },
    {
      slug: "wellness",
      label: "02 — Wellness",
      title: "Time to",
      titleEm: "Reconnect",
      paragraphs: [
        "Begin your morning with private yoga. Enjoy a restorative massage. Take a quiet afternoon for yourself.",
        "Our wellness experiences are designed to leave you feeling renewed.",
      ],
    },
    {
      slug: "ocean",
      label: "03 — Ocean Experiences",
      title: "Beyond the",
      titleEm: "Shore",
      paragraphs: ["Set sail across crystal-clear waters, discover hidden coves or spend an afternoon exploring the coastline aboard your private boat."],
    },
    {
      slug: "culture",
      label: "04 — Cultural Experiences",
      title: "Discover the Soul of the",
      titleEm: "Destination",
      paragraphs: ["Meet local artisans, explore historic neighbourhoods, discover traditional cuisine and experience the destination through the people who know it best."],
    },
    {
      slug: "celebrations",
      label: "05 — Celebrations",
      title: "Make the Moment",
      titleEm: "Extraordinary",
      paragraphs: [
        "Anniversaries. Birthdays. Proposals. Family reunions.",
        "Whatever you’re celebrating, our team will transform your vision into an unforgettable experience.",
      ],
    },
  ],

  services: [
    { icon: "concierge", title: "Concierge", description: "A dedicated point of contact throughout your stay." },
    { icon: "chef", title: "Private Chef", description: "Cuisine prepared around your preferences and occasion." },
    { icon: "clean", title: "Housekeeping", description: "Discreet, thoughtful service throughout your stay." },
    { icon: "car", title: "Airport Transfers", description: "Arrive and depart in complete comfort." },
    { icon: "lotus", title: "Wellness", description: "Private treatments and experiences designed around your needs." },
    { icon: "compass", title: "Experience Planning", description: "From yacht charters to cultural discoveries, we’ll arrange every detail." },
  ],

  values: [
    { title: "Privacy", description: "Your time is yours. Our service is designed to support your stay without interrupting it." },
    { title: "Authenticity", description: "We believe true luxury should have a sense of place." },
    { title: "Personalisation", description: "No two guests are the same. Every stay is shaped around you." },
    { title: "Excellence", description: "From the smallest detail to the biggest moment, we pursue exceptional standards." },
  ],

  gallery: [
    { category: "Villas", caption: "Villa Azure at dusk", ratio: "4/3" },
    { category: "Villas", caption: "Casa Verde among the gardens", ratio: "3/4" },
    { category: "Villas", caption: "The Reserve above the sea", ratio: "4/5" },
    { category: "Interiors", caption: "A living room that opens to the horizon", ratio: "4/3" },
    { category: "Pools", caption: "The pool, midday", ratio: "4/3" },
    { category: "Pools", caption: "Pool and sunset", ratio: "3/4" },
    { category: "Dining", caption: "Dinner beneath the stars", ratio: "16/10" },
    { category: "Dining", caption: "Sunrise breakfast on the terrace", ratio: "4/5" },
    { category: "Experiences", caption: "Morning wellness", ratio: "3/4" },
    { category: "Experiences", caption: "Under sail", ratio: "4/3" },
    { category: "Experiences", caption: "Lantern-lit streets", ratio: "4/5" },
    { category: "Destinations", caption: "A hidden cove", ratio: "4/3" },
    { category: "Destinations", caption: "The old town at golden hour", ratio: "3/4" },
    { category: "Moments", caption: "A night of lanterns", ratio: "4/3" },
    { category: "Moments", caption: "A golden-hour toast", ratio: "4/5" },
    { category: "Moments", caption: "Evening arrival", ratio: "3/4" },
  ],
  galleryCategories: ["Villas", "Interiors", "Pools", "Dining", "Experiences", "Destinations", "Moments"],

  posts: [
    { slug: "a-week-by-the-sea", title: "A Week by the Sea", kicker: "Featured" },
    { slug: "the-art-of-slow-travel", title: "The Art of Slow Travel", kicker: "Slow Travel" },
    { slug: "meet-the-makers", title: "Meet the Makers", kicker: "Makers" },
    { slug: "a-taste-of-the-region", title: "A Taste of the Region", kicker: "The Region" },
  ],

  testimonials: [
    { quote: "The kind of place that makes you forget what day it is." },
    { quote: "Every detail felt effortless. We arrived as guests and left feeling completely at home." },
    { quote: "More than a villa — an experience we will carry with us for years." },
  ],

  faqs: [
    { question: "What is included with my villa stay?", answer: "Every villa includes the services specified on its individual villa page. Depending on the property, this may include housekeeping, concierge assistance, breakfast and other services." },
    { question: "Can I arrange a private chef?", answer: "Yes. Our concierge team can arrange private dining experiences tailored to your preferences." },
    { question: "Do you arrange airport transfers?", answer: "Yes. Private airport transfers can be arranged before your arrival." },
    { question: "Can I organise a celebration at the villa?", answer: "Absolutely. Our team can help plan birthdays, anniversaries, proposals, weddings and other special occasions." },
    { question: "Are children welcome?", answer: "Many of our villas are family-friendly. Please contact our reservations team to find the most suitable property." },
    { question: "Can I bring a pet?", answer: "Pet policies vary by villa. Please contact us before booking." },
    { question: "How far in advance should I book?", answer: "We recommend booking as early as possible, particularly for peak travel periods and holiday dates." },
  ],
};
