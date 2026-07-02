import { productCategories } from "@/data/nuochida";
import { slugifyProductTitle } from "./productSlug";

const directusUrl = process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || "";
const directusStaticToken = process.env.DIRECTUS_STATIC_TOKEN || "";
const directusTimeoutMs = 8000;
const directusRevalidateSeconds = 60;

export type ProductCategory = {
  title: string;
  slug: string;
  summary: string;
  specs: string[];
  image: string;
  inquiryLabel: string;
  featured?: boolean;
};

export type CatalogProduct = {
  slug: string;
  title: string;
  categorySlug: string;
  image: string;
  excerpt: string;
  description: string;
  specs: Array<[string, string]>;
  detailSections: Array<{
    title: string;
    body: string;
  }>;
};

type DirectusFileValue =
  | string
  | {
      id?: string | null;
    }
  | null
  | undefined;

type DirectusProduct = Record<string, unknown> & {
  id?: string | number | null;
  title?: string | null;
  slug?: string | null;
  category?: string | DirectusCategory | null;
  category_slug?: string | null;
  summary?: string | null;
  excerpt?: string | null;
  description?: string | null;
  main_image?: DirectusFileValue;
  image?: DirectusFileValue;
  visible?: boolean | null;
};

type DirectusCategory = Record<string, unknown> & {
  id?: string | number | null;
  title?: string | null;
  slug?: string | null;
  summary?: string | null;
  description?: string | null;
  seo_description?: string | null;
  seo_body?: string | null;
  visible?: boolean | null;
};

type DirectusListResponse<T> = {
  data: T[];
};

export const staticProductCategories = productCategories as ProductCategory[];

function fileUrl(file: DirectusFileValue) {
  const fileId = typeof file === "string" ? file : file?.id;

  if (!fileId) {
    return null;
  }

  return `/api/directus-assets/${encodeURIComponent(fileId)}?width=1600&quality=78&format=webp`;
}

function productDescription(category: ProductCategory) {
  return `${category.summary} Nuochida supports logo method, material, color, closure, size, packaging, sample approval, and bulk production for B2B buyers.`;
}

export const staticCatalogProducts: CatalogProduct[] = staticProductCategories.map((category) => ({
  slug: category.slug,
  title: category.title,
  categorySlug: category.slug,
  image: category.image,
  excerpt: category.summary,
  description: productDescription(category),
  specs: [
    ["Category", category.title],
    ["Logo Options", "Embroidery, patch, woven label, printed label"],
    ["Customization", "Material, color, closure, packaging, carton marks"],
    ["Order Support", "Sample approval and bulk production"],
  ],
  detailSections: [
    {
      title: "Product Detail",
      body: productDescription(category),
    },
    {
      title: "OEM & ODM Support",
      body: "Send your logo file, reference hat shape, target quantity, delivery country, and packaging requirements. Nuochida will help organize a sample plan and production quotation.",
    },
  ],
}));

function mapDirectusCategory(category: DirectusCategory): ProductCategory | null {
  if (category.visible === false || !category.title) {
    return null;
  }

  const slug = category.slug || slugifyProductTitle(category.title, category.id);
  const fallback = staticProductCategories.find((item) => item.slug === slug);
  const summary = category.summary || category.seo_description || category.seo_body || fallback?.summary || `${category.title} from Nuochida.`;

  return {
    title: category.title,
    slug,
    summary: String(summary),
    specs: fallback?.specs || ["OEM/ODM customization", "Logo and packaging support", "Bulk production"],
    image: fallback?.image || staticProductCategories[0]?.image || "",
    inquiryLabel: fallback?.inquiryLabel || `Ask about ${category.title}`,
    featured: fallback?.featured,
  };
}

function categorySlugFromValue(
  value?: string | DirectusCategory | null,
  title?: string | null,
  categories: ProductCategory[] = staticProductCategories,
) {
  if (typeof value === "object" && value?.slug) {
    return value.slug;
  }

  if (typeof value === "object" && value?.title) {
    const directSlug = slugifyProductTitle(value.title, value.id);
    const matchedByTitle = categories.find((category) => category.slug === directSlug || category.title === value.title);

    return matchedByTitle?.slug || directSlug;
  }

  const normalized = `${value || ""} ${title || ""}`.toLowerCase();
  const matchedCategory = categories.find(
    (category) => normalized.includes(category.slug) || normalized.includes(category.title.toLowerCase()),
  );

  return matchedCategory?.slug || "custom-logo-hats";
}

function fallbackCategoryImage(categorySlug: string, categories: ProductCategory[] = staticProductCategories) {
  return categories.find((category) => category.slug === categorySlug)?.image || staticProductCategories[0]?.image || "";
}

function mapDirectusProduct(product: DirectusProduct, categories: ProductCategory[] = staticProductCategories): CatalogProduct | null {
  if (product.visible === false || !product.title) {
    return null;
  }

  const categorySlug = categorySlugFromValue(product.category_slug || product.category, product.title, categories);
  const categoryTitle = categories.find((category) => category.slug === categorySlug)?.title || "Custom Hats";
  const image = fileUrl(product.main_image || product.image) || fallbackCategoryImage(categorySlug, categories);
  const excerpt = product.excerpt || product.summary || product.description || `${product.title} for custom hat programs.`;
  const description = product.description || excerpt;

  return {
    slug: product.slug || slugifyProductTitle(product.title, product.id),
    title: product.title,
    categorySlug,
    image,
    excerpt: String(excerpt),
    description: String(description),
    specs: [
      ["Category", categoryTitle],
      ["Logo Options", "Embroidery, patch, woven label, printed label"],
      ["Customization", "Material, color, closure, packaging, carton marks"],
      ["Order Support", "Sample approval and bulk production"],
    ],
    detailSections: [
      {
        title: "Product Detail",
        body: String(description),
      },
      {
        title: "OEM & ODM Support",
        body: "Nuochida can help confirm sample requirements, product specifications, logo method, private label packaging, and bulk production details before quotation.",
      },
    ],
  };
}

async function directusFetch<T>(path: string) {
  if (!directusUrl) {
    return null;
  }

  const response = await fetch(`${directusUrl.replace(/\/$/, "")}${path}`, {
    signal: AbortSignal.timeout(directusTimeoutMs),
    headers: directusStaticToken
      ? {
          Authorization: `Bearer ${directusStaticToken}`,
        }
      : undefined,
    next: {
      revalidate: directusRevalidateSeconds,
    },
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}

export async function loadCatalogProducts() {
  const categories = await loadCatalogCategories();
  const response = await directusFetch<DirectusListResponse<DirectusProduct>>("/items/products?limit=100&sort=sort_order");
  const products = (response?.data || [])
    .map((product) => mapDirectusProduct(product, categories))
    .filter((product): product is CatalogProduct => Boolean(product));

  return products.length ? products : staticCatalogProducts;
}

export async function loadCatalogCategories() {
  const response = await directusFetch<DirectusListResponse<DirectusCategory>>("/items/product_categories?limit=100&sort=sort_order");
  const categories = (response?.data || []).map(mapDirectusCategory).filter((category): category is ProductCategory => Boolean(category));

  return categories.length ? categories : staticProductCategories;
}

export function getCategoryBySlug(slug?: string, categories: ProductCategory[] = staticProductCategories) {
  if (!slug) {
    return categories[0];
  }

  return categories.find((category) => category.slug === slug) || null;
}

export function getProductsForCategory(products: CatalogProduct[], categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getRelatedProducts(products: CatalogProduct[], product: CatalogProduct) {
  return products
    .filter((item) => item.slug !== product.slug)
    .filter((item) => item.categorySlug === product.categorySlug)
    .slice(0, 4);
}
