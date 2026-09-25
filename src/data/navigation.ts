import { businesses } from "./businesses";

export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Businesses", href: "/businesses" },
  { label: "Contact", href: "/contact" },
] as const;

export const businessNavigation = {
  investment: businesses.filter((business) => business.category === "investment"),
  construction: businesses.filter((business) => business.category === "construction"),
} as const;
