# Nuochida B2B Hat Website Design

## Goal

Build Nuochida as a B2B hat manufacturer website for overseas buyers. The site should borrow the reference site's clean visual rhythm, image-led sections, trust cards, product mosaic, and custom CTA structure, but convert the business logic from retail shopping to OEM/ODM inquiry.

## Architecture

- Frontend: Next.js deployed on Vercel.
- Backend CMS: Directus deployed on Alibaba Cloud ECS with Postgres.
- Integration pattern: static fallback content in the repository first; later server-side Directus reads replace or enrich fallback content.
- Inquiry workflow: product-aware inquiry form submits to a server route, which can later write to Directus `inquiries`.
- Payment: out of scope for this phase; Nuochida is inquiry-first.

## Brand And Positioning

- Brand name: Nuochida.
- Positioning: OEM/ODM custom hat manufacturer for brands, distributors, wholesalers, teams, and promotional buyers.
- Tone: practical, export-oriented, capable, reliable. Avoid retail jokes and avoid copying Storied Hats wording.
- First viewport signal: Nuochida is a custom hat manufacturer, not a lifestyle hat shop.

## Product Structure

Primary categories:

- Baseball Caps
- Trucker Hats
- Bucket Hats
- Beanies
- Outdoor Hats
- Custom Logo Hats

These categories appear in the homepage product grid and become the initial Directus `product_categories` seed model.

## Homepage Structure

1. Announcement bar
   - Message: `OEM/ODM Hat Manufacturer | Low MOQ | Fast Sampling | Global Delivery`

2. Header
   - Logo text: `Nuochida`
   - Navigation: Products, OEM & ODM, Factory, About, Contact
   - CTA: `Get Quote`

3. Hero
   - Inspired by the reference site's full-width image hero.
   - Copy focuses on B2B production:
     - `Custom Hats Built for Your Brand`
     - `OEM/ODM baseball caps, trucker hats, bucket hats, beanies, and outdoor headwear from sample to bulk delivery.`
   - CTAs: `Send Inquiry`, `View Products`

4. Trust cards
   - `Low MOQ`
   - `7-10 Day Samples`
   - `Logo & Packaging`
   - `QC Before Shipment`

5. Product category mosaic
   - Use the reference site's large-left/two-right visual pattern, expanded for six categories.
   - Product cards navigate to product/category URLs and carry product context for inquiry.

6. OEM/ODM capability
   - Replaces Storied Hats' retail value section.
   - Highlights logo methods, materials, color/shape, private label packaging, sample approval, and bulk production.

7. Factory proof
   - Stats and process: capacity, production steps, QC, export packing.

8. Custom brand CTA
   - Similar visual structure to reference custom CTA.
   - Copy: invite brand owners/distributors to request a quote.

9. Inquiry form
   - Minimum fields: name, email, company, product interest, message.
   - Stores page URL and selected/recent product context.
   - WhatsApp fallback uses `NEXT_PUBLIC_WHATSAPP_NUMBER` when configured.

10. Footer
   - Product links, services, contact placeholders, deployment/admin notes.

## Directus Data Model

Collections:

- `site_settings`: brand, tagline, email, WhatsApp, nav items, footer links.
- `home_banners`: hero slides or hero image/copy.
- `home_page`: OEM copy, factory stats, CTA content.
- `product_categories`: title, slug, sort order, visible, SEO fields.
- `products`: title, slug, category, summary, specs, images, featured, visible.
- `inquiries`: name, email, phone, company, product, visited_products, message, page_url, status, created_at.

Frontend must keep fallback content so the site remains renderable before Directus is live.

## Deployment

- Frontend goes to Vercel.
- Directus + Postgres run on Alibaba Cloud ECS.
- Recommended domains:
  - `www.nuochida.com` for public website.
  - `admin.nuochida.com` for Directus.
- Directus tokens stay server-only and must not use `NEXT_PUBLIC_`.

## Success Criteria

- Homepage builds and clearly presents Nuochida as a B2B hat manufacturer.
- Product categories are real and visible.
- Inquiry CTA is present above the fold and near product/custom sections.
- Build, lint, and typecheck pass.
- The code separates content/data from UI components enough to connect Directus later.
