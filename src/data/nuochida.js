export const siteSettings = {
  brandName: "Nuochida",
  tagline: "Custom hats built for your brand",
  email: "sales@nuochida.com",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  announcement: "OEM/ODM Hat Manufacturer | Low MOQ | Fast Sampling | Global Delivery",
  navItems: [
    { label: "Products", href: "#products" },
    { label: "OEM & ODM", href: "#oem" },
    { label: "Factory", href: "#factory" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
};

export const productCategories = [
  {
    title: "Baseball Caps",
    slug: "baseball-caps",
    summary: "OEM cotton, twill, denim, and performance baseball caps for brands and teams.",
    specs: ["5/6 panel options", "Embroidery or patch logo", "Adjustable or fitted closure"],
    image: "/storiedhats/06-image-6p-brushedcoffee-feature-4da78ad4-b808-46eb-b33b-b9235078adb6.jpg",
    inquiryLabel: "Ask about Baseball Caps",
    featured: true,
  },
  {
    title: "Trucker Hats",
    slug: "trucker-hats",
    summary: "custom mesh-back trucker hats with foam, cotton, or performance front panels.",
    specs: ["Mesh color matching", "Foam or structured front", "Snapback closure"],
    image: "/storiedhats/07-image-naturecollection-log-4a30678b-8a0c-4460-9785-ffec9f4644bd.jpg",
    inquiryLabel: "Ask about Trucker Hats",
    featured: true,
  },
  {
    title: "Bucket Hats",
    slug: "bucket-hats",
    summary: "OEM bucket hats for streetwear, outdoor, resort, and promotional programs.",
    specs: ["Cotton, nylon, or recycled fabric", "Custom brim width", "Printed or woven label"],
    image: "/storiedhats/08-image-artboard-1-copy.png",
    inquiryLabel: "Ask about Bucket Hats",
    featured: true,
  },
  {
    title: "Beanies",
    slug: "beanies",
    summary: "custom knitted beanies for winter retail, outdoor brands, and corporate gifts.",
    specs: ["Acrylic, wool blend, or recycled yarn", "Jacquard or patch logo", "Cuffed or slouch fit"],
    image: "/storiedhats/10-image-desktop-catalog-grid3.png",
    inquiryLabel: "Ask about Beanies",
    featured: false,
  },
  {
    title: "Outdoor Hats",
    slug: "outdoor-hats",
    summary: "OEM sun hats, running caps, and outdoor hats with lightweight performance materials.",
    specs: ["Quick-dry fabric", "Breathable panels", "UPF and water-repellent options"],
    image: "/storiedhats/13-background-naturecollection-log-a8f5e341-7f82-4416-b341-2a884231554f.jpg",
    inquiryLabel: "Ask about Outdoor Hats",
    featured: false,
  },
  {
    title: "Custom Logo Hats",
    slug: "custom-logo-hats",
    summary: "custom logo programs with embroidery, woven patches, leather patches, and packaging.",
    specs: ["Embroidery digitizing", "Private label packaging", "Hangtags and barcodes"],
    image: "/storiedhats/12-image-custom-stack-2023-teal-mobile.png",
    inquiryLabel: "Ask about Custom Logo Hats",
    featured: false,
  },
];

export const trustCards = [
  { title: "Low MOQ", body: "Flexible starting quantities for new brand tests and repeat wholesale orders." },
  { title: "7-10 Day Samples", body: "Sampling workflow for logo, shape, material, color, and packaging approval." },
  { title: "Logo & Packaging", body: "Embroidery, patches, woven labels, hangtags, polybags, and carton marks." },
  { title: "QC Before Shipment", body: "Inline inspection, final checking, packing review, and photo confirmation." },
];

export const oemCapabilities = [
  "Logo embroidery, rubber patch, woven patch, leather patch, and printed label",
  "Cotton twill, canvas, denim, wool blend, mesh, recycled yarn, and performance fabric",
  "Private label sweatbands, hangtags, packaging bags, carton labels, and barcode support",
  "Sample approval before bulk production with clear production and QC checkpoints",
];

export const factoryStats = [
  { value: "6", label: "Core hat categories" },
  { value: "OEM", label: "Private-label production" },
  { value: "QC", label: "Before shipment" },
  { value: "Global", label: "Export delivery" },
];

export const directusCollections = [
  "site_settings",
  "home_banners",
  "home_page",
  "product_categories",
  "products",
  "inquiries",
];
