# MIDTS DOCUMENT SYSTEM & BRAND STANDARD

Version: 1.0

Status: Approved

Owner: MIDTS

Purpose:

This document defines the visual, structural, and behavioural rules governing all MIDTS documents, templates, and client-facing communications.

This document is the source of truth.

If a future implementation conflicts with this document, this document takes precedence.

---

# 1. DESIGN PHILOSOPHY

MIDTS is not a marketing company.

MIDTS is not a SaaS company.

MIDTS is not an agency.

MIDTS is an engineering overflow partner.

Every document must communicate:

* control
* structure
* precision
* responsiveness
* engineering credibility

The document system should feel like:

* aerospace supplier documentation
* Formula 1 operations documentation
* engineering release packs
* controlled technical documentation

The document system must not feel like:

* marketing brochures
* sales decks
* startup landing pages
* generic corporate templates
* accounting software exports

---

# 2. VISUAL PRINCIPLES

Typography carries the design.

Whitespace carries the design.

Structure carries the design.

Visual decoration is secondary.

Avoid visual noise.

Avoid unnecessary graphics.

Avoid decorative icons.

Avoid illustrations.

Avoid stock imagery.

Avoid generic cards.

Avoid dashboard aesthetics.

---

# 3. BRAND PALETTE

Primary:

Black

White

Engineering Gold Accent

Gold is used only for:

* descriptors
* metadata labels
* section dividers
* status indicators where appropriate

Gold must never dominate a page.

---

# 4. TYPOGRAPHY

Hierarchy must be obvious.

Large titles.

Restrained supporting text.

Generous spacing.

Readable line lengths.

No decorative typography.

No trendy typography.

Typography should feel operational and controlled.

---

# 5. DOCUMENT RHYTHM

Preferred rhythm:

Black
White
Black

Example:

Page 1
Cover

Page 2
Content

Page 3
Closing

Not every document requires three pages.

However every document should preserve strong rhythm and hierarchy.

---

# 6. DOCUMENT CONTROL

Every document should include appropriate control metadata.

Examples:

Prepared For

Prepared By

Reference

Revision

Issue Date

Validity

Project Reference

Document Status

Metadata is functional.

Metadata is not decoration.

---

# 7. SYSTEM ARCHITECTURE

Template = Fixed

Data = Variable

Templates must not contain client-specific information.

Client information belongs in:

*-data.ts

Future integrations may source data from:

* Google Sheets
* APIs
* Automation workflows

Templates should remain unchanged.

---

# 8. COMPONENT POLICY

Before creating a component:

Check whether an existing component can be reused.

Reuse is preferred.

Component proliferation is prohibited.

Create new components only when there is a clear system-level benefit.

---

# 9. MIDTS DOCUMENT SUITE

Approved document family:

Capability Statement

Quote

Statement of Work

Requirement Sheet

Technical Review

Completion Report

Handover Pack

Invoice

Email Templates

All documents must feel like members of the same family.

---

# 10. VISUAL QUALITY GATE

Before any document is considered complete:

Ask:

Does this feel like a MIDTS document?

Would this look at home beside the Capability Statement?

Does this feel like engineering documentation?

Has whitespace been respected?

Is typography doing the work?

Has visual noise been removed?

If the answer is no:

Refine before proceeding.

No document should advance the suite until it passes the visual quality gate.

---

# 11. DEPLOYMENT RULES

GitHub is the source of truth.

All frontend work occurs in Git.

All backend work occurs in Git.

Do not modify production hosting directly.

Do not modify existing Apps Script code unless explicitly instructed.

Apps Script is downstream from Git.

Hosting deployment occurs only after approval.

---

# 12. SUCCESS DEFINITION

The objective is not to create documents.

The objective is to create a controlled engineering documentation system.

Every output should reinforce the MIDTS identity.

Consistency is more important than novelty.

System integrity is more important than individual document creativity.
