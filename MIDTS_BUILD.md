# MIDTS BUILD SYSTEM

## Project Goal

Build a premium B2B website for MIDTS.

Positioning:
Overflow CAD/CAM engineering partner for design and manufacturing teams.

Automation model:
Step 1 form -> confirmation email -> nurture reminders -> Step 2 form -> qualified lead

---

## Homepage Structure

1. Hero
2. Trust Strip
3. Problem
4. Services
5. Process
6. Proof / Credibility
7. CTA
8. Footer

---

## Stage Progress

### Stage 1 - Structure
Status: Complete

Completed:
- Built Next.js + Tailwind project
- Created homepage section components
- Established GitHub Pages deployment
- Fixed TypeScript and dependency issues blocking the build

---

### Stage 2 - Design System
Status: Complete

Completed:
- Applied consistent typography
- Applied section spacing
- Standardised buttons, cards, grids, and wrappers
- Re-aligned component class names with SYSTEM_CONVENTION.md

---

### Stage 3 - Visual Refinement
Status: Complete

Completed:
- Improved layout balance across problem, proof, and CTA sections
- Improved hierarchy with clearer section pairings and constrained body copy
- Kept the design precise, technical, minimal, and serious

---

### Stage 4 - Motion
Status: Pending

Goal:
- Add subtle animations only

---

### Stage 5 - Conversion
Status: Complete

Completed:
- Added clear CTA links
- Added trust signals
- Added Step 1 enquiry form
- Added Step 1 success message
- Kept the form static for GitHub Pages deployment

---

### Stage 6 - Automation Alignment
Status: Front-end Complete

Completed:
- Reframed hero CTA as Step 1 lead capture
- Reframed CTA section as Step 1 - Initial Project Request
- Updated process to Step 1 capture, Step 2 qualification, quote after Step 2
- Added hidden automation field names for future integration

Pending integration:
- Connect Step 1 form to Brevo or backend capture
- Send confirmation email with Step 2 form link
- Trigger nurture reminders when Step 2 is incomplete
- Mark qualified lead after Step 2 completion

---

## Current Task for Codex

Stage 6 - Automation Integration

Tasks:
- Preserve positioning from CONTENT.md
- Follow SYSTEM_CONVENTION.md
- Keep the deployed build stable
- Do not add a backend without explicit approval

---

## Rules

Do NOT:
- redesign randomly
- change positioning
- add heavy animations
- add backend without explicit approval
- overcomplicate

Focus:
- structure
- clarity
- maintainability
- reliable deployment
- automation accuracy
