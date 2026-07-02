import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/ProductPages";
import { getCategoryBySlug, loadCatalogCategories, loadCatalogProducts, staticCatalogProducts } from "@/lib/productCatalog";

export const revalidate = 60;

type ProductPageProps = {
  params: Promise<{
    category: string;
    product: string;
  }>;
};

export function generateStaticParams() {
  return staticCatalogProducts.map((product) => ({
    category: product.categorySlug,
    product: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { product: productSlug } = await params;
  const products = await loadCatalogProducts();
  const product = products.find((item) => item.slug === productSlug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.title} | Nuochida`,
    description: product.excerpt,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category: categorySlug, product: productSlug } = await params;
  const categories = await loadCatalogCategories();
  const category = getCategoryBySlug(categorySlug, categories);
  const products = await loadCatalogProducts();
  const product = products.find((item) => item.slug === productSlug);

  if (!category || !product) {
    notFound();
  }

  return <ProductDetailPage product={product} category={category} categories={categories} allProducts={products} />;
}
