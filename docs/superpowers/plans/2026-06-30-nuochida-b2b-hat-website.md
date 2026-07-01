# Nuochida B2B Hat Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the current Storied Hats clone into a Nuochida B2B hat manufacturer website with Vercel frontend and Directus-ready content/inquiry structure.

**Architecture:** Keep the app as a Next.js frontend with static fallback content in code. Separate Nuochida content and inquiry helpers from UI components so Directus server-side fetching can replace fallback data later.

**Tech Stack:** Next.js 16, React 19, Tailwind v4 CSS, Node built-in test runner for pure helper tests, Directus-ready content model.

---

## File Structure

- Create `src/data/nuochida.js`: Nuochida site settings, product categories, OEM capabilities, factory stats, and Directus collection notes.
- Create `src/lib/inquiry.js`: product-aware inquiry helpers for recent products and WhatsApp URLs.
- Create `tests/nuochida-content.test.mjs`: Node tests for product category structure.
- Create `tests/inquiry.test.mjs`: Node tests for inquiry helper behavior.
- Modify `package.json`: add `test` script using Node's built-in test runner.
- Modify `src/app/layout.tsx`: update metadata to Nuochida.
- Modify `src/app/page.tsx`: assemble the Nuochida page.
- Replace existing clone components with Nuochida-specific components:
  - `src/components/SiteHeader.tsx`
  - `src/components/HeroSection.tsx`
  - `src/components/TrustAndPopular.tsx`
  - `src/components/WhySection.tsx`
  - `src/components/CustomAndFooter.tsx`
- Modify `src/app/globals.css`: retune the visual system from retail clone to B2B manufacturer site.

## Tasks

### Task 1: Add Content And Inquiry Tests

- [ ] Add `npm test` script: `node --test tests/*.test.mjs`.
- [ ] Create tests that verify Nuochida has exactly six product categories with unique slugs.
- [ ] Create tests that verify inquiry helpers dedupe recent products and build a WhatsApp URL with encoded product text.
- [ ] Run `npm test` and confirm it fails because data/helper modules do not exist yet.

### Task 2: Add Data And Inquiry Helpers

- [ ] Create `src/data/nuochida.js` exporting site content and Directus collection notes.
- [ ] Create `src/lib/inquiry.js` exporting `mergeRecentProducts`, `createInquiryPayload`, and `buildWhatsappUrl`.
- [ ] Run `npm test` and confirm it passes.

### Task 3: Convert Metadata And Header/Hero

- [ ] Update `src/app/layout.tsx` metadata to Nuochida.
- [ ] Rewrite `SiteHeader` to show Nuochida navigation and quote CTA.
- [ ] Rewrite `HeroSection` to use manufacturer copy and B2B inquiry CTAs.
- [ ] Run `npm run typecheck`.

### Task 4: Convert Product, OEM, Factory, And Inquiry Sections

- [ ] Rewrite `TrustAndPopular` as trust cards plus six product category cards.
- [ ] Rewrite `WhySection` as OEM/ODM capability plus factory proof.
- [ ] Rewrite `CustomAndFooter` as custom CTA, inquiry form, Directus model summary, and footer.
- [ ] Rewrite `src/app/page.tsx` to assemble Nuochida sections.
- [ ] Run `npm run typecheck`.

### Task 5: Visual Polish And Verification

- [ ] Retune CSS in `src/app/globals.css` for Nuochida's B2B layout while preserving the reference site's image-led structure.
- [ ] Run `npm test`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run build`.
- [ ] Capture or inspect local preview at `http://localhost:3000`.
