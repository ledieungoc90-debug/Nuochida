export function mergeRecentProducts(selectedProduct, recentProducts = []) {
  const products = [selectedProduct, ...recentProducts].filter(Boolean);
  return Array.from(new Set(products));
}

export function createInquiryPayload({
  name,
  email,
  phone = "",
  company = "",
  message,
  selectedProduct = "",
  recentProducts = [],
  pageUrl = "",
}) {
  return {
    name,
    email,
    phone,
    company,
    product: selectedProduct,
    visited_products: mergeRecentProducts(selectedProduct, recentProducts),
    message,
    page_url: pageUrl,
    status: "new",
  };
}

export function buildWhatsappUrl({ number, brandName, product }) {
  if (!number) return "#contact";

  const text = `Hello ${brandName}, I would like to ask about ${product}.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
