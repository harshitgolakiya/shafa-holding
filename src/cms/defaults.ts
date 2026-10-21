// Built-in content for every CMS document. Used as the seed for new databases and as the
// fallback whenever a document (or a field inside it) has not been saved in the CMS yet.
// Line breaks ("\n") inside headings are rendered as <br />.

export const defaultContent = {
  settings: {
    name: "Shafa Holding",
    legalName: "SHAFA Holding Group LLC",
    established: "1982",
    tagline: "Building a Legacy of Resilience and Progress",
    address: [
      "Dubai Maritime City FZE (DMC MBC-1 Building)",
      "Floor #10, Office B3 & B4",
      "Dubai, UAE",
    ],
    phone: "+971 4 345 5843",
    email: "info@shafa.com",
    workingHours: "Monday – Saturday, 8:00 AM – 6:00 PM (GST)",
    footerText:
      "Established in 1982, Shafa Holding brings together marine and infrastructure construction with sustainable agriculture. Across its businesses, the group is guided by resilience, long-term thinking and a commitment to sustainable progress.",
    mobileMenuText: "Building a Legacy of Resilience and Progress since 1982.",
    seoTitle: "Shafa Holding | Building a Legacy of Resilience and Progress",
    seoDescription:
      "Established in 1982, Shafa Holding operates across construction, specialist services and sustainable agricultural businesses.",
    notificationEmails: [] as string[],
  },

  home: {
    hero: {
      eyebrow: "Shafa Holding — Est. 1982",
      title: "We Make\nThings Happen.",
      text: "Built on more than four decades of experience, Shafa Holding operates across essential industries with a focus on resilience, sustainable growth and long-term value.",
      linkLabel: "Discover Shafa",
      image: "/images/home/hero-holding.webp",
      imageAlt: "Marine infrastructure and industrial operations on a UAE coastline",
    },
    legacy: {
      year: "1982",
      eyebrow: "Our legacy",
      title: "Building a Legacy of Resilience and Progress",
      text: "Established as a construction company in 1982, Shafa has evolved into a diversified group with operations spanning construction, specialist services and sustainable agricultural businesses.",
    },
    endure: {
      eyebrow: "Shafa Holding",
      title: "Built to endure.",
      titleAccent: "Designed to progress.",
      paragraphs: [
        "Shafa began with construction—developing the operational knowledge, specialist capability and decisive leadership required to deliver in demanding environments.",
        "That foundation now supports a diversified group focused on essential industries, sustainable agriculture and resilient growth measured across generations.",
      ],
    },
    businesses: {
      eyebrow: "Our businesses",
      title: "Rise of New\nPossibilities",
      text: "A diversified portfolio built around operational expertise, essential industries and long-term resilience.",
      investment: {
        image: "/images/home/business-investment.webp",
        imageAlt: "Agricultural fields, livestock, irrigation and food-production infrastructure",
        themes: ["Agriculture", "Food Production", "Food Security", "Sustainable Supply"],
      },
      construction: {
        image: "/images/home/business-construction.webp",
        imageAlt: "Marine construction, concrete works and heavy engineering equipment",
        themes: ["Design & Build", "Infrastructure", "Ready Mix", "Specialist Works"],
      },
    },
    purpose: {
      eyebrow: "Why we move forward",
      mission:
        "To become a leading name in essential industries and enhance the quality of life globally.",
      vision:
        "To ensure sustainable and profitable business operations in the face of unprecedented challenges to the global economy.",
      purpose: "To inspire a resilient and sustainable future for all.",
    },
    values: {
      eyebrow: "Our core values",
      title: "How We Work",
      items: [
        { title: "We Take Initiative", description: "We proactively identify opportunities for growth." },
        {
          title: "We Show The Way",
          description:
            "As leaders, it is our responsibility to set the direction and build our vision along with our team.",
        },
        { title: "We Act Decisively", description: "We quickly and effectively find solutions to tough challenges." },
        {
          title: "We Think Long-Term",
          description: "We understand that our actions and decisions will impact us in the future.",
        },
      ],
    },
    presence: {
      eyebrow: "Global presence",
      title: "Rooted in Dubai.\nOperating internationally.",
      text: "Shafa is headquartered in Dubai, UAE, with verified business operations extending to the United Kingdom and Tanzania.",
      locations: [
        { place: "Dubai", country: "United Arab Emirates", role: "Headquarters" },
        { place: "Warwickshire", country: "United Kingdom", role: "Shafa Farms" },
        { place: "Iringa", country: "Tanzania", role: "Shafa Agro" },
      ],
      note: "Only locations confirmed in the supplied company content are shown.",
    },
    stories: {
      eyebrow: "Across the group",
      title: "Built through action",
      items: [
        {
          image: "/images/home/featured-shafa-farms.webp",
          imageAlt: "Shafa Farms food production",
          category: "Investment — United Kingdom",
          title: "An integrated approach to halal food production.",
          description:
            "Shafa Farms operates an upgraded halal poultry processing facility in Warwickshire, bringing processing, portioning and added-value packing together at one location.",
          href: "/businesses/investment#shafa-farms",
        },
        {
          image: "/images/home/featured-construction.webp",
          imageAlt: "Shafa construction operations",
          category: "Construction — UAE",
          title: "Capability built through more than four decades.",
          description:
            "From its construction origins in 1982, Shafa developed design-and-build, infrastructure, concrete and specialist production capabilities.",
          href: "/businesses/construction#shafa-construction",
        },
      ],
    },
    cta: {
      eyebrow: "What comes next",
      title: "Building resilience\nfor what comes next.",
      text: "Across industries, markets and generations, Shafa continues to pursue sustainable growth through decisive action and long-term thinking.",
      linkLabel: "Discover Our Businesses",
    },
  },

  about: {
    seoTitle: "About Shafa Holding | Our Legacy",
    seoDescription:
      "Discover Shafa Holding’s progression from its construction origins in 1982 to a diversified international group focused on essential industries.",
    hero: {
      eyebrow: "About Shafa",
      title: "Four decades of resilience,",
      titleAccent: "progress and purposeful growth.",
      text: "From construction heritage to a diversified group operating across essential industries.",
      image: "/images/about/hero-heritage.webp",
      imageAlt: "Shafa Holding corporate heritage in Dubai",
    },
    story: {
      eyebrow: "Our story",
      title: "Built from experience.",
      lead: "Established as a construction company in 1982, Shafa developed the specialist capability and operational discipline that continue to shape the group today.",
      paragraphs: [
        "Its foundation in design-and-build, marine and infrastructure work created a practical culture focused on delivery, resilience and decisive action.",
        "Since 2015, the group has diversified into sustainable agricultural businesses while maintaining a long-term view of essential industries.",
      ],
    },
    milestones: {
      eyebrow: "Our progression",
      title: "A legacy still in motion.",
      items: [
        {
          year: "1982",
          title: "A foundation in construction",
          text: "Shafa is established as a construction company and develops specialist design-and-build, marine and infrastructure capability.",
        },
        {
          year: "2003",
          title: "Ready-mix operations begin",
          text: "Shafa begins operating as a high-quality concrete supplier, supporting high-capacity projects and developing on-site batching expertise.",
        },
        {
          year: "2015+",
          title: "Sustainable diversification",
          text: "The group expands into sustainable agricultural businesses, with a focus on resilience, food supply and long-term operating value.",
        },
        {
          year: "Today",
          title: "A diversified international group",
          text: "Shafa operates across construction, specialist services and agricultural businesses while retaining its long-term approach to decision-making.",
        },
      ],
    },
    promise: {
      eyebrow: "Our promise",
      title: "To make things happen.",
      text: "We have a track record of getting things done. Our model is based on resilience, we make level-headed decisions. We always deliver what we promise.",
    },
    leadership: {
      eyebrow: "Leadership",
      title: "Guided by experience.",
      chairman: {
        image: "/images/leadership/Abdoshamak.webp",
        name: "Mr Abdoshamakh Nasser Al Shebani",
        title: "Founder / Chairman",
        company: "Shafa Holding Ltd.",
        bio: "Under his leadership, Shafa has grown from its construction beginnings in 1982 into a diversified international group built on integrity, precision and a long-term commitment to responsible growth.",
      },
      teamEyebrow: "Executive leadership",
      teamTitle: "The team behind the group.",
      team: [
        {
          image: "/images/leadership/Mohammed.webp",
          name: "Mr Mohammed Abdoshamak Nasser",
          title: "Managing Director",
          company: "Shafa Holding",
        },
        {
          image: "/images/leadership/Momen.webp",
          name: "Mr Momen Abdoshamak Nasser",
          title: "Managing Director",
          company: "Shafa Agro — Tanzania",
        },
        {
          image: "/images/leadership/Munthir.webp",
          name: "Mr Munthir Abdoshamak Nasser",
          title: "Associate Director",
          company: "Business & Commercial Strategy",
        },
      ],
    },
  },

  businessesPage: {
    seoTitle: "Our Businesses",
    seoDescription:
      "Explore Shafa Holding’s portfolio across investment, agriculture, food production, construction, concrete and specialist works.",
    eyebrow: "Shafa Holding",
    title: "Our Businesses",
    text: "A diversified portfolio built around essential industries, operational expertise and long-term resilience.",
    investment: {
      image: "/images/home/business-investment.webp",
      label: "Agriculture and food systems",
      description:
        "Long-term agricultural and food-production businesses focused on resilient supply and operational efficiency.",
    },
    construction: {
      image: "/images/home/business-construction.webp",
      label: "Construction and infrastructure",
      description:
        "Construction, infrastructure, ready-mix concrete and specialist carpentry capabilities developed from Shafa’s operating heritage.",
    },
  },

  investment: {
    seoTitle: "Investment",
    seoDescription:
      "Explore Shafa Holding’s agricultural and food-production businesses: Shafa Farms in the United Kingdom and Shafa Agro in Tanzania.",
    eyebrow: "Our Businesses",
    title: "Investment",
    text: "Agriculture and food-production businesses developed around sustainable supply, operational efficiency and long-term resilience.",
    image: "/images/investment/Investment-page-hero.webp",
    imageAlt: "Investment in agriculture and food systems",
    businesses: [
      {
        id: "shafa-farms",
        name: "Shafa Farms",
        region: "United Kingdom",
        introduction:
          "Shafa Holding acquired an established 100% halal poultry facility in Warwickshire and upgraded it with new processing lines and integrated production capability.",
        capabilities: [
          "High-quality halal poultry",
          "Upgraded processing lines",
          "Integrated portioning",
          "Added-value packing",
          "HMC-certified products",
          "Non-stun, non-gas processing",
        ],
        note: "Bringing processing and packing together at one facility reduces unnecessary transport and supports operational efficiency and carbon-footprint reduction.",
        website: "https://shafafarm.co.uk",
        image: "/images/home/featured-shafa-farms.webp",
        imageAlt: "Shafa Farms poultry production",
      },
      {
        id: "shafa-agro",
        name: "Shafa Agro",
        region: "Tanzania",
        introduction:
          "Established in the northern highlands of Iringa, Shafa Agro represents the group’s commitment to sustainable agriculture and self-sufficient food supply in Africa.",
        capabilities: ["Sustainable agriculture", "Water security", "Feed security", "Poultry", "Dairy and livestock", "Animal feed"],
        note: "The business aims to support an efficient supply chain for Tanzanian farmers and contribute to regional food security and socioeconomic growth.",
        website: "https://shafaagro.com",
        image: "/images/home/business-investment.webp",
        imageAlt: "Shafa Agro farming operations in Tanzania",
      },
    ],
  },

  construction: {
    seoTitle: "Construction",
    seoDescription:
      "Explore Shafa Holding’s construction, infrastructure, ready-mix concrete and specialist carpentry businesses.",
    eyebrow: "Our Businesses",
    title: "Construction",
    text: "Construction, infrastructure, materials and specialist production capability grounded in Shafa’s operating heritage since 1982.",
    image: "/images/home/featured-construction.webp",
    imageAlt: "Construction and infrastructure operations",
    businesses: [
      {
        id: "shafa-construction",
        name: "Shafa Al Nahdah Building Contracting LLC",
        region: "Dubai, UAE",
        introduction:
          "Established in 1982, Shafa developed from a small subcontractor with fewer than 20 employees into a major international construction operator headquartered in Dubai.",
        capabilities: [
          "Design and build",
          "Marine construction",
          "Infrastructure",
          "International operations",
          "Operational expertise",
          "Large-scale delivery",
        ],
        note: "The supplied company content describes a workforce of more than one thousand employees and operations across seven countries and three continents.",
        website: "https://shafaconstruction.com",
        image: "/images/home/business-construction.webp",
        imageAlt: "Shafa construction and infrastructure operations",
      },
      {
        id: "shafa-ready-mix",
        name: "Shafa Ready Mix",
        region: "Dubai, UAE",
        introduction:
          "Operating since 2003, Shafa Ready Mix supplies high-quality concrete for high-capacity projects and has established on-site batching plants in multiple international locations.",
        capabilities: [
          "Concrete supply",
          "On-site batching plants",
          "High-capacity projects",
          "In-house laboratories",
          "Quality control",
          "International experience",
        ],
        note: "Operations include dust and noise controls, water recycling, and responsible reuse or disposal of concrete waste. The main commercial plant is stated as Dubai Maritime City.",
        website: "https://shafaconstruction.com/services/ready-mix-concrete/",
        image: "/images/construction/shafa-ready-mix.webp",
        imageAlt: "Shafa Ready Mix concrete production",
      },
      {
        id: "plane-wood",
        name: "Plane Wood Carpentry by Shafa",
        region: "Specialist Works",
        introduction:
          "Carpentry and wood works developed as an in-house Shafa capability, building specialist knowledge through the group’s own projects and established client relationships.",
        capabilities: [
          "Bespoke carpentry",
          "Specialized wood works",
          "In-house knowledge",
          "Direct end-user service",
          "Custom production",
          "Commercial workshop",
        ],
        note: "Growing demand for bespoke and specialist work led the workshop to evolve into a separate commercial entity serving end users directly.",
        website: "https://planewoodshafa.com",
        image: "/images/construction/plane-wood.webp",
        imageAlt: "Plane Wood specialist carpentry workshop",
      },
    ],
  },

  contact: {
    seoTitle: "Contact",
    seoDescription: "Contact Shafa Holding at its headquarters in Dubai Maritime City, UAE.",
    eyebrow: "Contact Shafa",
    title: "Start a conversation.",
    officeLabel: "Dubai headquarters",
    inquiryTypes: ["General inquiry", "Investment", "Construction", "Partnership"],
    formNote: "",
    successMessage: "Thank you. Your inquiry has been received and our team will be in touch.",
  },

  privacy: {
    title: "Privacy",
    sections: [
      {
        heading: "Contact form submissions",
        body: "When you submit the contact form, the details you provide (name, company, email, phone, inquiry type and message) are stored securely and used only to respond to your inquiry.",
      },
      {
        heading: "Before launch",
        body: "[CLIENT TO PROVIDE AND APPROVE THE FINAL PRIVACY POLICY BEFORE PUBLIC LAUNCH.] The final policy must describe the approved hosting, analytics, cookie, contact-form, retention and data-subject request practices actually used in production.",
      },
    ],
  },
};

export type ContentMap = typeof defaultContent;
export type ContentKey = keyof ContentMap;
export type BusinessCategory = "investment" | "construction";
export type BusinessItem = ContentMap["investment"]["businesses"][number];
