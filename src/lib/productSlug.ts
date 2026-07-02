export function slugifyProductTitle(title: string, fallbackId?: string | number | null) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || (fallbackId ? `product-${fallbackId}` : "product");
}
