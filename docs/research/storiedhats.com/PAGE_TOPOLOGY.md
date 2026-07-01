# Storied Hats Page Topology

Target: https://www.storiedhats.com/

Reference screenshots:
- `docs/design-references/storiedhats.com/home-fullpage-desktop.png`
- `docs/design-references/storiedhats.com/home-fullpage-after-scroll.png`

## Global Structure

The site is a Shopify homepage with a narrow dark promotion bar, a sticky white header, then flow content on a warm off-white background. The page uses Ubuntu as the primary font, rounded product media, and large centered headings. Overall feel: outdoor lifestyle retail, sustainable materials, no-logo brand stance.

## Sections Top To Bottom

1. Announcement bar
   - Height about 41px.
   - Dark charcoal background, centered sale copy.
   - Link target: all hats collection.
   - Interaction model: static link.

2. Header navigation
   - Height about 60px.
   - Sticky under announcement bar; gains `scrolled-past-header` after about 120px.
   - Logo left, small navigation links, utility icons right.
   - Interaction model: sticky scroll state plus hover links.

3. Hero
   - Full-width background image, height about 712px.
   - Centered white headline, subtitle, pill CTA.
   - Image: `/storiedhats/13-background-naturecollection-log-a8f5e341-7f82-4416-b341-2a884231554f.jpg`.
   - Interaction model: static hero with CTA hover.

4. Trust badges
   - Four light cards in a row.
   - Icons are small image badges for stars, quality, sustainability, no-logo promise.
   - Interaction model: static.

5. Centered slogan CTA
   - Heading: "Your Forehead is About to Look Awesome".
   - Small black pill button: "Shop All Hats".
   - Interaction model: static link.

6. Popular category mosaic
   - Heading: "Our Most Popular".
   - Large left tile for Wool Hats, two smaller stacked tiles for Activewear and Simple.
   - Interaction model: image/card link hover.

7. Why heading
   - Standalone centered heading: "Why Storied Hats".

8. Why content matrix
   - Three alternating image/text rows:
     - Exceptional Quality
     - Variety
     - Values
   - Cards sit in a centered max-width grid with rounded corners.
   - Interaction model: mostly static; Values includes CTA.

9. Custom brand CTA
   - Split panel: hats image left, teal content block right.
   - Heading: "Customize Sustainable Hats for Your Brand".
   - Interaction model: static CTA.

10. Newsletter
   - Dark charcoal band with large white heading and email input.
   - Interaction model: input field and submit arrow.

11. Footer
   - Two columns on off-white background.
   - Quick links and short brand statement.
   - Interaction model: hover links.

## Implementation Mapping

- `src/components/SiteHeader.tsx`: announcement + sticky header.
- `src/components/HeroSection.tsx`: background hero.
- `src/components/TrustAndPopular.tsx`: trust badges, slogan, popular category mosaic.
- `src/components/WhySection.tsx`: why heading and three content rows.
- `src/components/CustomAndFooter.tsx`: custom CTA, newsletter, footer.
- `src/app/page.tsx`: page assembly.
