// Describes how each CMS document is edited. Field keys mirror the shapes in ./defaults.ts.
import type { ContentKey } from "./defaults";

type BaseField = { key: string; label: string; help?: string };

export type Field =
  | (BaseField & { type: "text" | "textarea" | "image" | "url" })
  | (BaseField & { type: "strings"; itemLabel: string })
  | (BaseField & { type: "group"; fields: Field[] })
  | (BaseField & { type: "list"; itemLabel: string; titleKey: string; fields: Field[] });

export type DocumentSchema = {
  key: ContentKey;
  title: string;
  description: string;
  path?: string;
  fields: Field[];
};

const text = (key: string, label: string, help?: string): Field => ({ key, label, help, type: "text" });
const textarea = (key: string, label: string, help?: string): Field => ({ key, label, help, type: "textarea" });
const image = (key: string, label = "Image"): Field => ({ key, label, type: "image" });
const url = (key: string, label: string, help?: string): Field => ({ key, label, help, type: "url" });
const strings = (key: string, label: string, itemLabel: string, help?: string): Field => ({ key, label, itemLabel, help, type: "strings" });
const group = (key: string, label: string, fields: Field[], help?: string): Field => ({ key, label, fields, help, type: "group" });
const list = (key: string, label: string, itemLabel: string, titleKey: string, fields: Field[], help?: string): Field => ({
  key,
  label,
  itemLabel,
  titleKey,
  fields,
  help,
  type: "list",
});

const lineBreakHelp = "Press Enter to start a new line in the heading.";
const seo = [
  text("seoTitle", "SEO title", "Shown in browser tabs and search results."),
  textarea("seoDescription", "SEO description", "One or two sentences shown in search results."),
];

const businessFields: Field[] = [
  text("name", "Business name"),
  text("id", "Anchor ID", "Lowercase, no spaces (e.g. shafa-farms). Used in links like /businesses/investment#shafa-farms."),
  text("region", "Region / label"),
  textarea("introduction", "Introduction"),
  strings("capabilities", "Capabilities", "Capability"),
  textarea("note", "Highlighted note"),
  url("website", "Website URL"),
  image("image"),
  text("imageAlt", "Image description (alt text)"),
];

export const documents: DocumentSchema[] = [
  {
    key: "settings",
    title: "Site settings",
    description: "Company details, contact information, footer text and default SEO.",
    fields: [
      text("name", "Company name"),
      text("legalName", "Legal name"),
      text("established", "Year established"),
      text("tagline", "Tagline"),
      strings("address", "Address", "Address line"),
      text("phone", "Phone number"),
      text("email", "Email address"),
      text("workingHours", "Working hours"),
      textarea("footerText", "Footer text"),
      text("mobileMenuText", "Mobile menu text"),
      text("seoTitle", "Default SEO title", "Used for the home page and any page without its own title."),
      textarea("seoDescription", "Default SEO description"),
      strings(
        "notificationEmails",
        "Contact form notification emails",
        "Email",
        "New contact form submissions are emailed to these addresses (requires SMTP to be configured on the server).",
      ),
    ],
  },
  {
    key: "home",
    title: "Home page",
    description: "Hero, legacy, businesses, mission, values, presence, stories and closing section.",
    path: "/",
    fields: [
      group("hero", "Hero", [
        text("eyebrow", "Eyebrow"),
        textarea("title", "Heading", lineBreakHelp),
        textarea("text", "Introduction"),
        text("linkLabel", "Link label"),
        image("image", "Background image"),
        text("imageAlt", "Image description (alt text)"),
      ]),
      group("legacy", "Our legacy", [
        text("year", "Large year"),
        text("eyebrow", "Eyebrow"),
        textarea("title", "Heading", lineBreakHelp),
        textarea("text", "Text"),
      ]),
      group("endure", "Built to endure", [
        text("eyebrow", "Eyebrow"),
        text("title", "Heading"),
        text("titleAccent", "Heading (gold line)"),
        strings("paragraphs", "Paragraphs", "Paragraph"),
      ]),
      group("businesses", "Our businesses", [
        text("eyebrow", "Eyebrow"),
        textarea("title", "Heading", lineBreakHelp),
        textarea("text", "Text"),
        group("investment", "Investment panel", [image("image"), text("imageAlt", "Image description (alt text)"), strings("themes", "Themes", "Theme")]),
        group("construction", "Construction panel", [image("image"), text("imageAlt", "Image description (alt text)"), strings("themes", "Themes", "Theme")]),
      ]),
      group("purpose", "Mission, vision and purpose", [
        text("eyebrow", "Eyebrow"),
        textarea("mission", "Mission"),
        textarea("vision", "Vision"),
        textarea("purpose", "Purpose"),
      ]),
      group("values", "Core values", [
        text("eyebrow", "Eyebrow"),
        text("title", "Heading"),
        list("items", "Values", "Value", "title", [text("title", "Title"), textarea("description", "Description")]),
      ]),
      group("presence", "Global presence", [
        text("eyebrow", "Eyebrow"),
        textarea("title", "Heading", lineBreakHelp),
        textarea("text", "Text"),
        list("locations", "Locations", "Location", "place", [text("place", "City / place"), text("country", "Country"), text("role", "Role")]),
        text("note", "Footnote"),
      ]),
      group("stories", "Featured stories", [
        text("eyebrow", "Eyebrow"),
        text("title", "Heading"),
        list("items", "Stories", "Story", "title", [
          text("category", "Category label"),
          text("title", "Title"),
          textarea("description", "Description"),
          url("href", "Link", "A page on this site (e.g. /businesses/investment#shafa-farms) or a full URL."),
          image("image"),
          text("imageAlt", "Image description (alt text)"),
        ]),
      ]),
      group("cta", "Closing section", [
        text("eyebrow", "Eyebrow"),
        textarea("title", "Heading", lineBreakHelp),
        textarea("text", "Text"),
        text("linkLabel", "Link label"),
      ]),
    ],
  },
  {
    key: "about",
    title: "About page",
    description: "Story, milestones, promise and leadership team.",
    path: "/about",
    fields: [
      ...seo,
      group("hero", "Hero", [
        text("eyebrow", "Eyebrow"),
        text("title", "Heading"),
        text("titleAccent", "Heading (gold line)"),
        textarea("text", "Introduction"),
        image("image"),
        text("imageAlt", "Image description (alt text)"),
      ]),
      group("story", "Our story", [
        text("eyebrow", "Eyebrow"),
        text("title", "Heading"),
        textarea("lead", "Lead paragraph"),
        strings("paragraphs", "Paragraphs", "Paragraph"),
      ]),
      group("milestones", "Milestones", [
        text("eyebrow", "Eyebrow"),
        text("title", "Heading"),
        list("items", "Milestones", "Milestone", "year", [text("year", "Year"), text("title", "Title"), textarea("text", "Text")]),
      ]),
      group("promise", "Our promise", [text("eyebrow", "Eyebrow"), text("title", "Heading"), textarea("text", "Text")]),
      group("leadership", "Leadership", [
        text("eyebrow", "Eyebrow"),
        text("title", "Heading"),
        group("chairman", "Chairman", [
          text("name", "Name"),
          text("title", "Title"),
          text("company", "Company"),
          textarea("bio", "Biography"),
          image("image", "Portrait"),
        ]),
        text("teamEyebrow", "Team eyebrow"),
        text("teamTitle", "Team heading"),
        list("team", "Executive team", "Leader", "name", [
          text("name", "Name"),
          text("title", "Title"),
          text("company", "Company / area"),
          image("image", "Portrait"),
        ]),
      ]),
    ],
  },
  {
    key: "businessesPage",
    title: "Our Businesses page",
    description: "Overview page introducing the two business categories.",
    path: "/businesses",
    fields: [
      ...seo,
      text("eyebrow", "Eyebrow"),
      text("title", "Heading"),
      textarea("text", "Introduction"),
      group("investment", "Investment", [text("label", "Label"), textarea("description", "Description"), image("image")]),
      group("construction", "Construction", [text("label", "Label"), textarea("description", "Description"), image("image")]),
    ],
  },
  {
    key: "investment",
    title: "Investment businesses",
    description: "Investment page and the businesses listed under it (also used in menus and footer).",
    path: "/businesses/investment",
    fields: [
      ...seo,
      text("eyebrow", "Eyebrow"),
      text("title", "Heading"),
      textarea("text", "Introduction"),
      image("image", "Hero image"),
      text("imageAlt", "Hero image description (alt text)"),
      list("businesses", "Businesses", "Business", "name", businessFields),
    ],
  },
  {
    key: "construction",
    title: "Construction businesses",
    description: "Construction page and the businesses listed under it (also used in menus and footer).",
    path: "/businesses/construction",
    fields: [
      ...seo,
      text("eyebrow", "Eyebrow"),
      text("title", "Heading"),
      textarea("text", "Introduction"),
      image("image", "Hero image"),
      text("imageAlt", "Hero image description (alt text)"),
      list("businesses", "Businesses", "Business", "name", businessFields),
    ],
  },
  {
    key: "contact",
    title: "Contact page",
    description: "Contact page text and contact form options.",
    path: "/contact",
    fields: [
      ...seo,
      text("eyebrow", "Eyebrow"),
      text("title", "Heading"),
      text("officeLabel", "Office label"),
      strings("inquiryTypes", "Inquiry types", "Inquiry type", "Options in the form’s “Inquiry type” dropdown."),
      textarea("formNote", "Note below the form", "Optional small print shown under the form."),
      textarea("successMessage", "Success message", "Shown after a visitor submits the form."),
    ],
  },
  {
    key: "privacy",
    title: "Privacy page",
    description: "Privacy policy content.",
    path: "/privacy",
    fields: [
      text("title", "Heading"),
      list("sections", "Sections", "Section", "heading", [text("heading", "Heading"), textarea("body", "Text", "Leave a blank line between paragraphs.")]),
    ],
  },
];

export function getDocumentSchema(key: string) {
  return documents.find((document) => document.key === key);
}
