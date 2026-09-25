export type BusinessCategory = "investment" | "construction";

export type Business = {
  id: string;
  name: string;
  region?: string;
  category: BusinessCategory;
  website: string;
  image: string;
};

export const businesses: Business[] = [
  {
    id: "shafa-farms",
    name: "Shafa Farms",
    region: "United Kingdom",
    category: "investment",
    website: "https://shafafarm.co.uk",
    image: "/images/businesses/shafa-farms.jpg",
  },
  {
    id: "shafa-agro",
    name: "Shafa Agro",
    region: "Tanzania",
    category: "investment",
    website: "https://shafaagro.com",
    image: "/images/businesses/shafa-agro.jpg",
  },
  {
    id: "shafa-construction",
    name: "Shafa Al Nahdah Building Contracting LLC",
    category: "construction",
    website: "https://shafaconstruction.com",
    image: "/images/businesses/shafa-construction.jpg",
  },
  {
    id: "shafa-ready-mix",
    name: "Shafa Ready Mix",
    category: "construction",
    website: "https://shafaconstruction.com/services/ready-mix-concrete/",
    image: "/images/businesses/shafa-ready-mix.jpg",
  },
  {
    id: "plane-wood",
    name: "Plane Wood Carpentry by Shafa",
    category: "construction",
    website: "https://planewoodshafa.com",
    image: "/images/businesses/plane-wood.jpg",
  },
];
