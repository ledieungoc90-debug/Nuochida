export const recentProductsStorageKey = "nuochida-recent-products";
const maxRecentProducts = 8;

export function normalizeProductList(products: unknown, limit = maxRecentProducts) {
  if (!Array.isArray(products)) {
    return [];
  }

  const normalized: string[] = [];

  for (const product of products) {
    if (typeof product !== "string") {
      continue;
    }

    const cleanProduct = product.trim();

    if (cleanProduct && !normalized.includes(cleanProduct)) {
      normalized.push(cleanProduct);
    }
  }

  return normalized.slice(0, limit);
}

export function mergeRecentProducts(selectedProduct?: string, recentProducts: string[] = []) {
  return normalizeProductList([selectedProduct, ...recentProducts].filter(Boolean));
}

export function readRecentProducts(storage: Pick<Storage, "getItem"> = window.localStorage) {
  try {
    return normalizeProductList(JSON.parse(storage.getItem(recentProductsStorageKey) || "[]"));
  } catch {
    return [];
  }
}

export function writeRecentProducts(products: string[], storage: Pick<Storage, "setItem"> = window.localStorage) {
  try {
    storage.setItem(recentProductsStorageKey, JSON.stringify(normalizeProductList(products)));
  } catch {
    // Recent products are only an inquiry convenience. Submission still works without localStorage.
  }
}

export function rememberRecentProduct(productTitle: string, currentProducts: string[] = []) {
  const nextProducts = normalizeProductList([productTitle, ...currentProducts]);

  writeRecentProducts(nextProducts);

  return nextProducts;
}
