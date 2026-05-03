# SYSTEM CONVENTION — MIDTS

## Purpose
Defines how the website is built. All code must follow these rules.

---

## Naming Convention (Finsweet Inspired)

Use structured class naming:

section_[name]
container_large
padding_global
[name]_wrapper
card_[type]
heading_[type]
text_[type]
button_[type]
grid_[type]

Examples:
section_hero
section_services
card_service
heading_hero

---

## Layout Rules

Every section must follow:

<section className="section_[name]">
  <div className="container_large padding_global">
    <div className="[name]_wrapper">
      <!-- content -->
    </div>
  </div>
</section>

---

## Tailwind Rules

Use Tailwind ONLY for styling:

- spacing (mb-6, px-6, py-20)
- typography (text-5xl, font-medium)
- colors (bg-black, text-white)

Do NOT:
- create random CSS classes
- use inline styles
- mix inconsistent spacing

---

## Component Structure (Next.js)

Each section must be a separate component:

components/
- Hero.tsx
- TrustStrip.tsx
- Problem.tsx
- Services.tsx
- Process.tsx
- CTA.tsx
- Footer.tsx

Rules:
- One section = one component
- Keep code clean and readable
- Add comments for easy editing

---

## Spacing System

Section spacing:
py-20 md:py-32

Element spacing:
mb-4 / mb-6 / mb-8

No random values.

---

## Typography

Hero:
text-5xl md:text-6xl font-semibold leading-tight

Section headings:
text-3xl md:text-4xl font-medium

Body:
text-base md:text-lg text-neutral-400

---

## Design Principles

MIDTS must feel:
- precise
- technical
- minimal
- serious
- B2B professional

Avoid:
- bright colors
- heavy imagery
- clutter
- flashy animations

---

## Codex Rules

Codex must:
- follow this file strictly
- not rename classes randomly
- not overcomplicate components

Code must remain:
- simple
- readable
- consistent
