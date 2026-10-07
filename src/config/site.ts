export const siteConfig = {
  name: "Raiyan Faisal",
  initials: "RF",
  role: "Graphic & Branding Designer",
  location: "Riyadh, Saudi Arabia",
  origin: "Originally from Azamgarh, India",
  status: "Available for freelance",
  tagline: "Inspire · Innovate · Impact",
  email: "raiyanfaisal.fr@gmail.com", // edit contact email here
  resumeUrl: "/raiyan-faisal-resume.pdf", // drop the PDF into /public to enable download
  // WhatsApp chat with a prefilled message — used by the contact section button
  whatsappUrl:
    "https://wa.me/917309684032?text=Hi%20Raiyan%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project.",
  hero: {
    lines: ["Brands built to", "be remembered."],
    subline:
      "Graphic & Branding Designer based in Riyadh. Available for freelance.",
  },
  bio: "I am a passionate Graphic & Branding Designer with over 3.5 years of experience in developing brand identities that define and exhibit values. I collaborate closely with clients to create professional visual entities that communicate their tone effectively.",
  socials: {
    behance: "https://www.behance.net/raiyanfaisal23",
    instagram: "http://instagram.com/raiyan.graphics",
    twitter: "http://twitter.com/raiyan_graphics",
    linkedin: "https://www.linkedin.com/in/raiyan-faisal-aa072a304",
  },
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/#services" },
    { label: "Contact", href: "/#contact" },
  ],
  stats: [
    { value: 3.5, suffix: "+", label: "Years of experience", decimals: 1 },
    { value: 3, prefix: "0", suffix: "+", label: "Brand projects", decimals: 0 },
    { value: 100, suffix: "%", label: "Client focus", decimals: 0 },
  ],
  tools: ["Photoshop", "Illustrator", "Firefly"],
  services: [
    {
      title: "Logo Design",
      description:
        "Distinctive marks built on grid logic — legible at favicon size, timeless for years.",
    },
    {
      title: "Brand Identity",
      description:
        "Complete identity systems: logo suite, color, typography and guidelines that keep the brand consistent everywhere.",
    },
    {
      title: "Visual Identity Systems",
      description:
        "Flexible design languages with rules for layout, imagery and motion so a brand can grow without breaking.",
    },
    {
      title: "Social Media Design",
      description:
        "Scroll-stopping campaign visuals, templates and content kits that keep every post on-brand.",
    },
    {
      title: "Packaging Design",
      description:
        "Shelf-ready packaging and label design that turns product surfaces into brand statements.",
    },
  ],
  process: [
    {
      title: "Discover",
      description:
        "We talk. I learn your business, audience and goals before a single sketch exists.",
    },
    {
      title: "Strategy",
      description:
        "Positioning, moodboards and direction — deciding what the brand should say before how it looks.",
    },
    {
      title: "Design",
      description:
        "Exploration and refinement in tight feedback loops until the system feels inevitable.",
    },
    {
      title: "Deliver",
      description:
        "Final files, source assets and guidelines — everything you need to use the brand with confidence.",
    },
  ],
  formOptions: {
    services: [
      "Logo Design",
      "Brand Identity",
      "Packaging",
      "Social Media Design",
      "Something Else",
    ],
    budgets: [
      "Under $250",
      "$250 – $500",
      "$500 – $1,000",
      "$1,000 – $2,500",
      "$2,500+",
      "Not sure yet",
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
