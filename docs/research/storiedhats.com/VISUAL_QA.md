# Visual QA

## Screenshots

- Original after scroll: `docs/design-references/storiedhats.com/home-fullpage-after-scroll.png`
- Local clone after scroll: `docs/design-references/storiedhats.com/local-clone-fullpage-after-scroll.png`

## Verification

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- Local dev server: `http://localhost:3000`.

## Result

The clone reproduces the visible homepage structure:

- Announcement bar and sticky header.
- Full-width activewear hero with real background image.
- Four trust cards.
- Centered slogan CTA.
- Popular category mosaic.
- Three-row Why Storied Hats content matrix.
- Custom wholesale CTA.
- Newsletter band and footer.

## Known Differences

- The original site uses Shopify theme behavior and lazy-load animation. The clone implements static equivalents plus simple hover states.
- Header utility icons use lucide equivalents rather than Shopify's exact SVG paths.
- Mobile layout is implemented responsively in CSS, but the run only visually captured desktop because the available Chrome automation did not expose viewport resizing.
- The Values image is an animated GIF; screenshot timing can show a different frame than the original reference.
