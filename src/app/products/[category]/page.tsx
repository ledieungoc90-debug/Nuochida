import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryProductPage } from "@/components/ProductPages";
import {
  getCategoryBySlug,
  getProductsForCategory,
  loadCatalogCategories,
  loadCatalogProducts,
  staticProductCategories,
} from "@/lib/productCatalog";

export const revalidate = 60;

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export function generateStaticParams() {
  return staticProductCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const categories = await loadCatalogCategories();
  const category = getCategoryBySlug(categorySlug, categories);

  if (!category) {
    return {};
  }

  return {
    title: `${category.title} | Nuochida Products`,
    description: category.summary,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const categories = await loadCatalogCategories();
  const category = getCategoryBySlug(categorySlug, categories);
  const allProducts = await loadCatalogProducts();
  const products = category ? getProductsForCategory(allProducts, category.slug) : [];

  if (!category || products.length === 0) {
    notFound();
  }

  return <CategoryProductPage category={category} categories={categories} products={products} allProducts={allProducts} />;
}
