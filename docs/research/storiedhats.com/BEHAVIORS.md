# Storied Hats Behaviors

## Scroll Sweep

Source: `docs/research/storiedhats.com/scroll-sweep.json`.

- At `scrollY=0`, header class is `shopify-section-header-sticky`.
- At about `scrollY=120`, header gains `scrolled-past-header`.
- Header remains sticky for the full page.
- Lazy-loaded images and fade-in content become fully visible only after scrolling through the page once.
- No scroll-snap behavior was detected.
- No tabbed content, accordion content, or scroll-driven section switching was detected.
- No videos were detected.

## Click/Link Model

- Announcement bar links to `/collections/all-storied-hats`.
- Primary nav links point to collection pages: Shop All, Activewear, Patterns, On Sale, Custom.
- Hero CTA links to Activewear.
- Popular cards link to category pages.
- Custom CTA links to custom wholesale page.
- Newsletter field accepts email and has arrow submit affordance.

## Hover States

Original hover behavior is subtle:
- Buttons use dark fill, rounded pill shape, and slight shadow.
- Links use text color/opacity changes.
- Product cards imply clickability via image/card hover. The clone implements a light image scale and shadow lift.

## Responsive Behavior

The original desktop layout uses a wide header and a two-column/mosaic content grid. Mobile was not separately captured through Chrome viewport control in this run, so clone responsive behavior is implemented from visible structure:

- Header collapses into stacked/wrapped navigation below 760px.
- Hero height reduces on mobile.
- Trust cards wrap from 4 columns to 2 columns and then 1 column.
- Popular mosaic stacks to a single column below 760px.
- Why rows and custom CTA stack to single-column cards below 760px.
