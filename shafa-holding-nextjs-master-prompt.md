# Shafa Holding — Master Website Build Prompt

## 1. Project Overview

Build a complete, production-ready **Next.js website for Shafa Holding**, replacing the existing WordPress website.

The website must communicate the stature of an established UAE holding group with a legacy dating back to **1982**, while presenting the company as contemporary, resilient, diversified, international, and future-focused.

The visual direction is:

> **Modern Institutional Heritage — Quiet Authority**

The final experience should feel like a premium UAE holding company, private investment group, and industrial operator rather than a conventional construction website or generic corporate template.

The website should feel:

- Established
- Resilient
- Discreet
- Powerful
- Long-term
- International
- Architectural
- Premium
- Institutional
- Confident
- Sophisticated

Avoid a startup, SaaS, overly futuristic, flashy, generic luxury, or template-driven aesthetic.

---

## 2. Core Brand Narrative

Shafa Holding began as a construction company in **1982** and evolved into a diversified group with businesses across construction, specialist contracting, concrete production, carpentry, agriculture, food production, and sustainable food supply.

The website should tell this story as a progression:

**Construction heritage → operational expertise → diversification → sustainable investment → long-term resilience**

The central narrative themes are:

- Legacy
- Resilience
- Progress
- Long-term thinking
- Sustainability
- Decisive leadership
- Operational capability
- International reach
- Building essential industries
- Making things happen

Important source language that may be used or adapted where appropriate:

- **Building a Legacy of Resilience and Progress**
- **We Make Things Happen**
- **Rise of New Possibilities**
- **To inspire a resilient and sustainable future for all.**
- **We Take Initiative**
- **We Show The Way**
- **We Act Decisively**
- **We Think Long-Term**

Do not invent claims, awards, statistics, certifications, locations, leadership details, or business facts that are not supplied in the source content.

---

# 3. Visual Direction

## 3.1 Design Concept

Create a visual system based on **institutional heritage with contemporary UAE luxury**.

Think:

- A premium family holding company
- A major investment platform
- An established real estate / infrastructure group
- A discreet private capital website
- A global industrial group

The design should communicate confidence through restraint.

Do not rely on excessive gradients, glossy effects, neon colors, oversized rounded cards, glassmorphism, heavy shadows, or trendy SaaS UI patterns.

The sophistication should come from:

- Typography
- Scale
- Composition
- Whitespace
- Photography
- Motion
- Grid structure
- Material-inspired colors
- Fine-line details
- Strong editorial pacing

---

## 3.2 Brand Colors

The main client direction is:

- **Dark Green**
- **Jumeirah Gold**

Use a refined palette similar to the following.

```css
:root {
  --shafa-green-950: #07130D;
  --shafa-green-900: #0B1B12;
  --shafa-green-800: #10271A;
  --shafa-green-700: #183526;

  --shafa-gold: #A98A3D;
  --shafa-gold-light: #C4A85C;
  --shafa-gold-muted: #8C7335;

  --shafa-ivory: #F5F1E8;
  --shafa-sand: #DDD4C3;
  --shafa-stone: #AAA394;

  --shafa-white: #FFFFFF;
  --shafa-black: #050806;
}
```

These values can be fine-tuned after comparing against the supplied logo.

### Usage rule

Dark green should dominate the experience.

Gold should be an accent only.

Use gold for:

- Fine borders
- Eyebrows
- Section numbers
- Selected icons
- Active navigation states
- Hover details
- CTA accents
- Timeline markers
- Dividers
- Key statistics

Do not make entire sections metallic gold.

Use ivory or warm sand for selected light sections to create visual rhythm.

---

# 4. Logo Usage

Use the supplied Shafa Holding logo assets.

Two logo variants are available:

- Dark-background / light-text version
- Light-background / dark-text version

Rules:

- Preserve logo proportions.
- Never redraw or alter the logo.
- Never add effects to the logo.
- Do not place the logo inside a generic pill or card.
- Give the logo generous clear space.
- Use the light logo on dark green sections.
- Use the dark logo on ivory or light sections.
- Mobile logo may be scaled down but must remain legible.

The geometric horizontal lines and curved forms in the symbol may subtly inspire:

- Section dividers
- Motion paths
- Cropping masks
- Decorative line systems
- Navigation hover accents

Do not repeat the logo symbol decoratively to the point of becoming repetitive.

---

# 5. Typography

Use an editorial serif + modern sans-serif combination.

Recommended direction:

### Display / Headings
Use an elegant serif with authority and strong editorial character.

Preferred options:

- Cormorant Garamond
- DM Serif Display
- Libre Baskerville
- Instrument Serif
- Playfair Display only if used carefully

### Body / UI
Use a clean modern sans-serif.

Preferred options:

- Inter
- Manrope
- DM Sans
- Geist
- Plus Jakarta Sans

Recommended pairing:

> **Instrument Serif + Manrope**

or

> **DM Serif Display + Inter**

### Typography rules

- Headlines should be large and spacious.
- Avoid excessive bold weights.
- Use restrained uppercase for eyebrows.
- Use tracking on small labels.
- Body copy should have generous line-height.
- Desktop hero heading may reach 88–120px depending on viewport.
- Use `clamp()` for responsive typography.
- Avoid making every heading gold.
- Gold should remain an accent.

---

# 6. Technology Stack

Build with:

- **Next.js**
- **TypeScript**
- **App Router**
- **Tailwind CSS**
- **Framer Motion**
- **GSAP only if required for advanced scroll interactions**
- **Lucide React** for minimal utility icons
- `next/image`
- `next/font`
- Semantic HTML
- Fully responsive layout

Prefer server components wherever possible.

Use client components only where interaction or animation requires them.

The codebase should be modular, scalable, maintainable, and production-ready.

---

# 7. Suggested Project Architecture

```txt
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── businesses/
│   │   ├── page.tsx
│   │   ├── investment/
│   │   │   └── page.tsx
│   │   └── construction/
│   │       └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── BusinessMegaMenu.tsx
│   │   └── Footer.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── LegacyIntro.tsx
│   │   ├── BusinessSplit.tsx
│   │   ├── PurposeSection.tsx
│   │   ├── ValuesSection.tsx
│   │   ├── LeadershipSection.tsx
│   │   ├── GlobalPresence.tsx
│   │   ├── CTASection.tsx
│   │   └── BusinessFeature.tsx
│   │
│   ├── ui/
│   │   ├── Container.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── GoldLine.tsx
│   │   ├── AnimatedText.tsx
│   │   ├── ImageReveal.tsx
│   │   ├── LinkArrow.tsx
│   │   └── Breadcrumb.tsx
│   │
│   └── motion/
│       ├── FadeIn.tsx
│       ├── TextReveal.tsx
│       └── ParallaxImage.tsx
│
├── data/
│   ├── businesses.ts
│   ├── navigation.ts
│   ├── values.ts
│   └── site.ts
│
├── lib/
│   ├── animations.ts
│   └── utils.ts
│
└── public/
    ├── images/
    ├── logos/
    └── icons/
```

---

# 8. Main Navigation

Desktop navigation:

```txt
Home
About
Our Businesses ▼
Contact
```

`Our Businesses` must have a structured dropdown or mega-menu with **two clearly separated categories**:

```txt
OUR BUSINESSES

INVESTMENT
- Shafa Farms (UK)
- Shafa Agro (Tanzania)

CONSTRUCTION
- Shafa Al Nahdah Building Contracting LLC
- Shafa Ready Mix
- Plane Wood Carpentry by Shafa
```

This grouping is the recommended information architecture based on the supplied company content. Keep the data architecture flexible so categories can be changed easily.

The dropdown must not look like a normal small WordPress menu.

Use:

- Large dark-green panel
- Two-column structure
- Gold category labels
- Elegant typography
- Optional small imagery or business descriptions
- Smooth reveal animation
- Strong keyboard accessibility
- Proper focus states

On mobile, use an accordion structure.

Do not hide business items behind hover-only interaction.

---

# 9. Header Behavior

Initial hero state:

- Transparent header
- Light logo
- White navigation
- Gold micro-accent

After scrolling:

- Dark green solid header
- Subtle bottom border
- Slightly reduced height
- Smooth transition
- Sticky positioning

Avoid strong drop shadows.

Mobile:

- Logo left
- Refined menu trigger right
- Full-screen or large-panel menu
- Businesses accordion inside mobile menu

---

# 10. Homepage

## Section 01 — Cinematic Hero

Full viewport height.

Visual:

- Large architectural, infrastructure, industrial, agricultural, or corporate operation imagery/video.
- Use placeholder media until final approved assets are supplied.
- Add a dark green cinematic overlay.
- The image should feel authentic, international, and high-value.

Content:

Small eyebrow:

```txt
SHAFA HOLDING — EST. 1982
```

Main headline:

```txt
We Make
Things Happen.
```

Supporting copy should remain concise and should be based on the supplied company profile.

Suggested copy:

```txt
Built on more than four decades of experience, Shafa Holding operates across essential industries with a focus on resilience, sustainable growth and long-term value.
```

CTA:

```txt
Discover Shafa
```

Animation:

- Slow image scale from `1.04` to `1`
- Headline reveal by line
- Gold line expands horizontally
- Supporting text fades in
- Subtle scroll indicator
- No dramatic bouncing
- No particles

---

## Section 02 — Legacy Statement

Large editorial transition.

Suggested layout:

Left:
- `1982` as oversized display typography

Right:

```txt
Building a Legacy
of Resilience and Progress
```

Body:

```txt
Established as a construction company in 1982, Shafa has evolved into a diversified group with operations spanning construction, specialist services and sustainable agricultural businesses.
```

Visual style:

- Ivory background
- Dark green text
- Gold divider
- Large whitespace

Optional scroll animation:

The `1982` number remains sticky briefly while text progresses.

---

## Section 03 — Group Introduction

Eyebrow:

```txt
SHAFA HOLDING
```

Headline:

```txt
Built to endure.
Designed to progress.
```

Use source content to explain:

- Origins in construction
- Diversification
- Sustainability
- Resilience
- Long-term decision-making

Do not create unsupported financial claims.

---

# 11. Our Businesses Homepage Feature

This should be one of the website’s strongest visual moments.

Heading:

```txt
Rise of New
Possibilities
```

Eyebrow:

```txt
OUR BUSINESSES
```

Create a split-screen experience.

### Left side

```txt
01
INVESTMENT
```

Supporting themes:

```txt
Agriculture
Food Production
Food Security
Sustainable Supply
```

### Right side

```txt
02
CONSTRUCTION
```

Supporting themes:

```txt
Design & Build
Infrastructure
Ready Mix
Specialist Works
```

Interaction:

- Default 50/50 split
- Hover/focus slightly expands active side on desktop
- Background image transitions
- Gold line animates
- Arrow appears
- Text remains readable
- Mobile becomes vertical stacked panels

Do not create an effect that causes layout instability.

Each side links to its corresponding business category page.

---

# 12. Mission / Vision / Purpose

Create a highly editorial section rather than three generic cards.

Possible interaction:

A vertical list with active state:

```txt
01  Mission
02  Vision
03  Purpose
```

As the user scrolls or clicks, the selected statement is displayed large.

Exact source messaging:

### Mission

```txt
To become a leading name in essential industries and enhance the quality of life globally.
```

### Vision

```txt
To ensure sustainable and profitable business operations in the face of unprecedented challenges to the global economy.
```

### Purpose

```txt
To inspire a resilient and sustainable future for all.
```

Style:

- Deep dark green background
- Gold numbering
- Ivory text
- Minimal fine-line dividers

---

# 13. Core Values

Title:

```txt
How We Work
```

or source-led:

```txt
Our Core Values
```

Values:

### 01 — We Take Initiative

```txt
We proactively identify opportunities for growth.
```

### 02 — We Show The Way

```txt
As leaders, it is our responsibility to set the direction and build our vision along with our team.
```

### 03 — We Act Decisively

```txt
We quickly and effectively find solutions to tough challenges.
```

### 04 — We Think Long-Term

```txt
We understand that our actions and decisions will impact us in the future.
```

Design:

Avoid icon cards.

Use:

- Large number
- Thin gold divider
- Heading
- Description
- Reveal on scroll

Desktop may use a 2×2 editorial grid.

Mobile uses stacked rows.

---

# 14. Global Presence

The supplied content states that Shafa is headquartered in **Dubai, UAE** and operates internationally.

Create a restrained global-presence section.

Do not fabricate country locations that are not supplied.

Confirmed locations from supplied business content include:

- UAE
- United Kingdom
- Tanzania

The company profile also states operation in seven countries across three continents, but does not list all seven countries.

Therefore:

- It is acceptable to display the statement `7 countries / 3 continents` only if retained exactly as source content.
- Do not invent the missing country names.
- If using a map, highlight only verified locations unless additional client data is provided.

Suggested visual:

- Minimal world map
- Gold location markers
- Dark-green background
- No generic glowing map aesthetic

---

# 15. About Page

Route:

```txt
/about
```

## About Hero

Eyebrow:

```txt
ABOUT SHAFA
```

Headline:

```txt
Four decades of resilience,
progress and purposeful growth.
```

Use a strong archival or operational visual.

---

## Company Story

Build an editorial timeline.

Suggested milestones:

```txt
1982
Shafa established as a construction company.

2003
Shafa Ready Mix begins operations as a high-quality concrete supplier.

2015+
Diversification into sustainable agricultural businesses.

Today
A diversified international group operating across essential industries.
```

Only use dates supported by supplied content.

Do not invent additional milestones.

---

# 16. Leadership Section

The client specifically requested that the **CEO be added to the About page**.

Build a premium leadership area capable of presenting:

- Chairman
- CEO
- Other leadership in the future

Confirmed source information:

```txt
Founder and Chairman:
Mr Abdoshamakh Nasser Alshebani
```

The current supplied content does **not** provide a verified CEO name, CEO biography, portrait, or exact title wording.

Therefore:

Use structured placeholder fields such as:

```ts
{
  name: "[CEO NAME]",
  title: "Chief Executive Officer",
  image: "/images/placeholders/ceo.jpg",
  bio: "[CLIENT-PROVIDED CEO BIOGRAPHY]"
}
```

Do not invent the CEO identity or biography.

Leadership design:

- Large portrait
- Name and title
- Short biography
- Optional quote
- Gold rule
- Strong editorial spacing

Avoid a generic team-card grid.

---

# 17. Chairman / Founder Story

Where suitable, include the founder/chairman as part of Shafa’s legacy story.

Confirmed name:

```txt
Mr Abdoshamakh Nasser Alshebani
```

Frame this around:

- Founding leadership
- Growth from a small subcontractor
- Long-term vision
- Expansion into multiple industries

Do not create quotations unless supplied by the client.

---

# 18. Businesses Landing Page

Route:

```txt
/businesses
```

Hero:

```txt
Our Businesses
```

Suggested supporting statement:

```txt
A diversified portfolio built around essential industries, operational expertise and long-term resilience.
```

Create two large category sections:

```txt
01 — Investment
02 — Construction
```

Each category introduces its businesses.

---

# 19. Investment Page

Route:

```txt
/businesses/investment
```

Visual tone:

- More landscape
- Agriculture
- Food systems
- Sustainability
- Long-term asset development

Avoid cliché ESG graphics.

## Shafa Farms (UK)

Source-based narrative:

Shafa Holding acquired an established 100% halal poultry facility in Warwickshire, United Kingdom.

Relevant supplied points:

- High-quality halal poultry
- Upgraded processing facility
- New processing lines
- Increased capacity
- HMC-certified products
- Non-stun, non-gas halal processing
- Integrated portioning and added-value packing
- Reduced unnecessary transport
- Focus on operational efficiency and carbon footprint reduction

External business URL:

```txt
https://shafafarm.co.uk
```

Use an external-link indicator.

---

## Shafa Agro (Tanzania)

Source-based narrative:

Shafa Agro is a subsidiary in the northern highlands of Iringa, Tanzania.

Relevant themes:

- Sustainable agriculture
- Self-sufficient food supply
- Water security
- Feed security
- Poultry
- Dairy
- Livestock
- Animal feed
- Regional food security
- Socioeconomic growth
- Sustainable farming benchmark

External business URL:

```txt
https://shafaagro.com
```

---

# 20. Construction Page

Route:

```txt
/businesses/construction
```

Visual tone:

- Infrastructure
- Marine
- Heavy construction
- Materials
- Specialist production
- Engineering

Use strong geometric imagery.

---

## Shafa Al Nahdah Building Contracting LLC

Source-based points:

- Established in 1982
- Grew from a small subcontractor with fewer than 20 employees
- Expanded into a major international player
- More than one thousand employees stated in supplied content
- Headquartered in Dubai, UAE
- International operations
- Construction expertise
- Design/build and infrastructure heritage

External URL:

```txt
https://shafaconstruction.com
```

---

## Shafa Ready Mix

Source-based points:

- Operations began in 2003
- High-quality concrete supply
- High-capacity projects
- On-site concrete batching plants
- International project experience
- In-house laboratories
- Quality control
- Dust and noise control
- Water recycling
- Responsible handling/reuse of concrete waste
- Main commercial plant stated as Dubai Maritime City

External URL:

```txt
https://shafaconstruction.com/services/ready-mix-concrete/
```

---

## Plane Wood Carpentry by Shafa

Source-based points:

- Carpentry and wood works developed as an in-house capability
- Long-standing specialist knowledge and know-how
- Bespoke and specialized works
- Evolved into a separate commercial entity
- Serves direct end users

External URL:

```txt
https://planewoodshafa.com
```

---

# 21. Business Detail Component Pattern

Each business should use a consistent component system:

```txt
Business Number
Business Name
Category
Large Image
Short Introduction
Key Capabilities
Operational / Sustainability Note
External Website CTA
```

Optional pattern:

```txt
01
SHAFA FARMS
United Kingdom
```

Use oversized numbering as part of the visual identity.

---

# 22. Contact Page

Route:

```txt
/contact
```

Source address:

```txt
Al Manara Tower – ETA Star
23rd Floor
No. 2302–2304
Business Bay
Dubai, UAE
```

Create:

- Address
- Email field if supplied later
- Phone field if supplied later
- Contact form
- Map embed or location link if desired
- Business inquiry selector

Suggested inquiry choices:

```txt
General Inquiry
Investment
Construction
Media
Careers
Other
```

Do not invent phone numbers or email addresses.

---

# 23. Footer

Footer should feel substantial but minimal.

Include:

- Logo
- Short company descriptor
- Navigation
- Business links
- Contact
- Legal links
- Copyright

Example structure:

```txt
SHAFA HOLDING

Building a legacy of resilience and progress.

COMPANY
About
Our Businesses
Contact

BUSINESSES
Investment
Construction

LOCATION
Business Bay
Dubai, UAE

© Shafa Holding
```

Use a dark green or near-black-green background.

Gold top rule.

No huge multi-column clutter.

---

# 24. Image Direction

Until final client photography is supplied, use high-quality **placeholder images** with correct aspect ratios.

Do not generate fake company projects and present them as real Shafa assets.

Placeholder categories may include:

- UAE infrastructure
- Marine construction
- Premium industrial operations
- Concrete batching
- Specialist carpentry
- Agriculture
- Poultry production
- African agricultural landscapes
- Corporate leadership portrait placeholder

Image style:

- Cinematic but realistic
- Architectural
- Editorial
- Natural contrast
- Premium
- Low saturation
- Warm highlights
- Deep green shadow bias
- Subtle gold warmth
- No exaggerated HDR
- No generic handshake imagery
- No cheesy business-stock poses

---

# 25. Motion System

Motion should feel deliberate and expensive.

### Principles

- Slow
- Smooth
- Controlled
- Subtle
- Architectural
- Never playful

### Recommended interactions

#### Text reveals

Use clipped line reveal:

```txt
overflow: hidden
translateY(100%) → translateY(0)
```

#### Image reveals

Use mask or clip-path reveals.

#### Scroll sections

Subtle parallax:

```txt
translateY: 30px → -30px
```

Do not create extreme parallax.

#### Gold lines

Animate:

```txt
scaleX(0) → scaleX(1)
```

Origin from left.

#### Business split

On desktop hover:

```txt
50/50 → 58/42
```

Keep keyboard equivalent.

#### Header

Transparent → solid dark green after scroll threshold.

### Reduced motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Disable nonessential animation.

---

# 26. Page Transitions

Optional.

If implemented:

- 300–500ms
- Dark green overlay or elegant fade
- No complex loader between internal pages
- Do not delay navigation unnecessarily

---

# 27. Grid System

Desktop:

```txt
Max width: 1440px
Content width: 1240–1320px
12-column grid
Side margins: responsive
```

Recommended spacing:

```txt
Section Y padding:
Desktop: 120–180px
Tablet: 90–120px
Mobile: 72–90px
```

Avoid cramped sections.

Use editorial asymmetry when appropriate.

---

# 28. Responsive Design

The website must be designed intentionally for:

- 1440px+
- 1280px
- 1024px
- 768px
- 430px
- 390px
- 360px

Do not simply shrink desktop layouts.

Mobile requirements:

- Large headings remain powerful but readable
- Hero fits naturally in viewport
- No horizontal scrolling
- Business split becomes stacked
- Mega-menu becomes accordion
- Sticky elements become normal flow if necessary
- Touch targets at least 44px
- Images crop intelligently
- No hover-dependent information

---

# 29. Accessibility

Meet WCAG best practices.

Requirements:

- Semantic landmarks
- Proper heading hierarchy
- Keyboard-accessible menus
- Visible focus states
- `aria-expanded` for dropdowns
- `aria-controls` where appropriate
- Meaningful alt text
- Decorative imagery uses empty alt
- Strong contrast
- No critical content communicated only through color
- Motion respects reduced-motion preference

---

# 30. Performance

Target excellent Core Web Vitals.

Requirements:

- Use `next/image`
- Correct `sizes`
- Lazy-load below-the-fold images
- Preload only hero assets when necessary
- Optimize fonts
- Avoid huge JS bundles
- Avoid unnecessary client components
- Dynamically load heavy animation modules
- Compress assets
- Avoid autoplay high-resolution video on mobile if performance suffers
- Include poster images for videos

Targets:

```txt
Lighthouse Performance: 90+
Accessibility: 95+
Best Practices: 95+
SEO: 95+
```

---

# 31. SEO

Every page must include:

- Unique title
- Meta description
- Open Graph metadata
- Canonical URL
- Structured heading hierarchy
- Semantic content

Recommended schema:

- Organization
- WebSite
- BreadcrumbList
- LocalBusiness only if appropriate and validated

Do not create fake review data.

Suggested title patterns:

```txt
Shafa Holding | Building a Legacy of Resilience and Progress

About Shafa Holding | Our Legacy

Our Businesses | Shafa Holding

Investment | Shafa Holding

Construction | Shafa Holding

Contact | Shafa Holding
```

---

# 32. Content Management Structure

Even if no CMS is connected initially, organize content as data rather than hardcoding it across many components.

Example:

```ts
export const businesses = [
  {
    id: "shafa-farms",
    name: "Shafa Farms",
    region: "United Kingdom",
    category: "investment",
    description: "...",
    website: "https://shafafarm.co.uk",
    image: "/images/placeholders/shafa-farms.jpg",
  },
];
```

This allows future integration with:

- Sanity
- Strapi
- Contentful
- Payload
- WordPress headless mode

Do not introduce a CMS unless requested.

---

# 33. Component Design Rules

Avoid generic UI kits.

Do not make every section:

```txt
rounded-3xl
shadow-xl
bg-white
```

Instead use:

- Flat editorial surfaces
- Thin lines
- Strong typography
- Full-bleed imagery
- Controlled borders
- Strategic negative space
- Minimal corner radius

Buttons:

Primary CTA:

- Transparent or gold
- Fine border
- Arrow
- Understated hover animation

Avoid oversized rounded pill buttons unless specifically justified.

---

# 34. Copywriting Rules

Tone:

- Confident
- Concise
- Institutional
- Mature
- Global
- Long-term
- Human but not casual

Avoid:

- Marketing hype
- Empty buzzwords
- “Revolutionary”
- “Game-changing”
- “World-class” unless source wording requires it
- Exaggerated ESG claims
- Unsupported statistics
- Generic AI-generated corporate filler

Do not rewrite factual company history in ways that alter meaning.

Use supplied source content as the authority.

---

# 35. Important Content Accuracy Rules

The supplied content contains historical and operational claims.

Preserve them carefully.

Do not invent:

- Revenue
- Asset value
- Project value
- Number of completed projects
- Exact employee totals beyond supplied wording
- Countries not identified
- Certifications not supplied
- Awards
- CEO information
- New subsidiaries
- Client logos
- Testimonials
- ESG ratings

When information is missing, insert a clearly labelled content placeholder.

Example:

```txt
[CLIENT TO PROVIDE CEO BIOGRAPHY]
```

Do not silently fabricate missing content.

---

# 36. Suggested Homepage Sequence

Final homepage order:

```txt
01 Hero
02 Legacy / 1982
03 Group Introduction
04 Our Businesses Split
05 Mission / Vision / Purpose
06 Core Values
07 Global Presence
08 Featured Business Stories
09 Closing Statement / CTA
10 Footer
```

---

# 37. Closing Homepage CTA

Dark-green full-width section.

Possible copy:

```txt
Building resilience
for what comes next.
```

Supporting text:

```txt
Across industries, markets and generations, Shafa continues to pursue sustainable growth through decisive action and long-term thinking.
```

CTA:

```txt
Discover Our Businesses
```

Use a subtle gold line animation.

---

# 38. Loading Experience

Do not create an unnecessarily long intro loader.

If a loader is used:

- Maximum 800–1200ms on initial load
- Show logo or a single gold line
- Skip if assets are already loaded
- Never replay on every navigation

Preferred approach:

Allow the site to load immediately and animate the hero elegantly.

---

# 39. Hover Details

Desktop hover behavior should be refined.

Examples:

Navigation:

```txt
Gold underline grows from left.
```

Business links:

```txt
Arrow shifts 4–6px.
Image subtly scales to 1.025.
```

Buttons:

```txt
Gold fill or line transition.
```

Do not use exaggerated cursor-following effects.

---

# 40. Custom Cursor

Do not use a custom cursor globally.

If used for a specific image/gallery interaction, it must remain subtle and must not reduce usability.

Default recommendation:

Use the native cursor.

---

# 41. Decorative Graphic Language

Develop a subtle visual motif inspired by Shafa's logo.

Potential system:

```txt
───╮
   └────
```

Use controlled parallel lines, right-angle transitions, and rounded geometric paths.

Applications:

- Business section separators
- Timeline markers
- Footer detail
- Hero framing
- Section labels

Keep it abstract.

Do not literally trace the logo everywhere.

---

# 42. Business Page Hero Pattern

Each business category page may use:

Left:

```txt
02
CONSTRUCTION
```

Right:

Large full-height image.

Bottom:

Short category description.

As the user scrolls, introduce individual companies using alternating image/text layouts.

Avoid cards if a full editorial composition is possible.

---

# 43. Empty / Placeholder Asset Strategy

Where media is missing, create file references such as:

```txt
/public/images/placeholders/hero-holding.jpg
/public/images/placeholders/construction.jpg
/public/images/placeholders/investment.jpg
/public/images/placeholders/shafa-farms.jpg
/public/images/placeholders/shafa-agro.jpg
/public/images/placeholders/shafa-ready-mix.jpg
/public/images/placeholders/plane-wood.jpg
/public/images/placeholders/chairman.jpg
/public/images/placeholders/ceo.jpg
```

Use proper placeholder blocks if those files do not exist.

The app must not break because final assets are missing.

---

# 44. Error Handling

Include:

- Custom 404
- Graceful missing-image fallback
- Form validation
- Error state
- Loading state
- Success state

404 design:

```txt
404
The page you're looking for has moved.
```

CTA:

```txt
Return Home
```

Keep it brand-consistent.

---

# 45. Contact Form

Fields:

```txt
Name
Company
Email
Phone
Inquiry Type
Message
```

Use client-side validation plus server-side validation.

Use a placeholder API route if backend credentials are not supplied.

Do not expose credentials.

Add spam protection architecture, but do not hardcode a paid provider without approval.

---

# 46. Development Standards

Use:

- Clean TypeScript
- Reusable components
- Descriptive naming
- No duplicated layouts
- No massive single-page component
- No inline magic numbers where tokens make sense
- CSS variables for theme values
- Proper linting
- Proper formatting
- Strong typing

Do not overengineer.

---

# 47. Animation Technical Rules

Use Framer Motion for:

- Text reveals
- Fade-up
- Viewport entry
- Menu transitions
- Image reveal
- Business split interaction

Use GSAP only if Framer Motion becomes impractical for:

- Complex pinned storytelling
- Scroll-scrub timelines

Do not load GSAP simply because it is available.

---

# 48. Scroll Behavior

Use native scroll.

Do not force a JavaScript smooth-scroll engine unless there is a clear reason.

If smooth scrolling is introduced:

- It must preserve accessibility
- It must not interfere with browser history
- It must not break anchor links
- It must not degrade mobile performance

---

# 49. Browser Support

Support current versions of:

- Chrome
- Safari
- Edge
- Firefox
- iOS Safari
- Android Chrome

Avoid experimental APIs without fallbacks.

---

# 50. Deployment Readiness

Project must be ready for deployment to a modern Next.js environment.

Compatible with:

- Vercel
- Node-compatible hosting
- Hostinger VPS / Node deployment if required

Include:

```txt
README.md
.env.example
```

Do not include secret values.

---

# 51. README Requirements

README should explain:

```txt
1. Install
2. Run development server
3. Build
4. Start production
5. Asset locations
6. Content data locations
7. Environment variables
8. Contact form integration
9. Deployment notes
```

---

# 52. QA Checklist

Before considering the website complete, verify:

### Visual
- Correct green/gold palette
- Logo variants correct
- Typography consistent
- No generic card-heavy UI
- Images have correct crop
- Spacing consistent

### Navigation
- Business dropdown works
- Investment and Construction clearly separated
- Keyboard accessible
- Mobile accordion works

### About
- CEO section exists
- Missing CEO data remains clearly placeholder content
- Chairman details are accurate

### Responsive
- 360px tested
- 390px tested
- 430px tested
- 768px tested
- 1024px tested
- 1440px tested

### Technical
- No console errors
- No hydration warnings
- Images optimized
- Links valid
- Forms validate
- Metadata added
- Lighthouse reviewed

---

# 53. Source Business Content

Use the following as the factual foundation.

## Company Profile

Shafa was established as a construction company in 1982 and is described as a specialized design-and-build marine and infrastructure construction company.

The group later diversified into sustainable agricultural businesses.

Its positioning emphasizes resilience, sustainability, leadership, decisive action and long-term thinking.

---

## Mission

```txt
To become a leading name in essential industries and enhance the quality of life globally.
```

---

## Vision

```txt
To ensure sustainable and profitable business operations in the face of unprecedented challenges to the global economy.
```

---

## Purpose

```txt
To inspire a resilient and sustainable future for all.
```

---

## Promise

```txt
We have a track record of getting things done. Our model is based on resilience, we make level-headed decisions. We always deliver what we promise.
```

---

## Core Values

```txt
We Take Initiative
We proactively identify opportunities for growth.

We Show The Way
As leaders, it is our responsibility to set the direction and build our vision along with our team.

We Act Decisively
We quickly and effectively find solutions to tough challenges.

We Think Long-Term
We understand that our actions and decisions will impact us in the future.
```

---

# 54. Final Creative Direction

Every page should feel as though it belongs to the same world:

> **An established UAE holding group with industrial roots, global operations and the confidence to think in decades rather than campaigns.**

The design must communicate:

```txt
Heritage without feeling old.
Luxury without feeling flashy.
Industry without feeling crude.
Sustainability without clichés.
Corporate stature without bureaucracy.
Motion without distraction.
```

The final site should feel sophisticated enough for:

- Investors
- Strategic partners
- Government entities
- Corporate clients
- Business leaders
- International stakeholders

---

# 55. Final Instruction to the Coding Agent

Build the complete website rather than producing isolated mockups.

Start by establishing:

1. Design tokens
2. Fonts
3. Global layout
4. Header
5. Business mega-menu
6. Footer
7. Reusable animation components
8. Homepage
9. About
10. Businesses
11. Investment
12. Construction
13. Contact
14. Responsive states
15. SEO
16. Accessibility
17. Performance optimization
18. Final QA

Keep the implementation visually premium and technically restrained.

Do not add sections simply to make pages longer.

Do not invent content.

Do not use generic template styling.

Do not create fake company photography, statistics, leadership information or achievements.

When content or media is missing, use a clearly identified placeholder.

The guiding principle for every decision is:

> **Quiet Authority — Building a Legacy of Resilience and Progress.**
