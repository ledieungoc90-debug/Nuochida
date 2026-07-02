import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, MessageCircle, ShieldCheck } from "lucide-react";
import {
  type CatalogProduct,
  type ProductCategory,
  getRelatedProducts,
  staticCatalogProducts,
} from "@/lib/productCatalog";
import { InquiryForm } from "./InquiryForm";
import { ProductInterestTracker } from "./ProductInterestTracker";
import { SiteHeader } from "./SiteHeader";

function Breadcrumbs({ items }: { items: Array<[string, string]> }) {
  return (
    <nav className="catalog-breadcrumbs storied-page-width" aria-label="Breadcrumb">
      <Link href="/">Nuochida</Link>
      {items.map(([label, href]) => (
        <span key={href}>
          <ChevronRight size={15} />
          <Link href={href}>{label}</Link>
        </span>
      ))}
    </nav>
  );
}

function Sidebar({
  activeSlug,
  categories,
  products,
}: {
  activeSlug: string;
  categories: ProductCategory[];
  products: CatalogProduct[];
}) {
  return (
    <aside className="catalog-sidebar">
      <div className="sidebar-panel">
        <Link className="sidebar-title" href="/products">
          Products
        </Link>
        {categories.map((category) => {
          const categoryProducts = products.filter((product) => product.categorySlug === category.slug);

          return (
            <details key={category.slug} open={activeSlug === category.slug}>
              <summary>
                <Link href={`/products/${category.slug}`}>{category.title}</Link>
                <span>{categoryProducts.length}</span>
              </summary>
              <div className="sidebar-products">
                {categoryProducts.map((product) => (
                  <Link key={product.slug} href={`/products/${category.slug}/${product.slug}`}>
                    {product.title}
                  </Link>
                ))}
              </div>
            </details>
          );
        })}
      </div>
      <div className="sidebar-panel inquiry-panel">
        <h2>Send Inquiry</h2>
        <p>Selected and recently viewed products will be sent with your inquiry.</p>
        <Link className="storied-pill black-pill" href="#product-inquiry">
          <MessageCircle size={15} /> Start Quote
        </Link>
      </div>
    </aside>
  );
}

function ProductCard({ product, categorySlug }: { product: CatalogProduct; categorySlug: string }) {
  return (
    <article className="catalog-product-card">
      <Link href={`/products/${categorySlug}/${product.slug}`}>
        <div className="catalog-product-image">
          <Image src={product.image} alt={product.title} fill sizes="(min-width: 1100px) 25vw, 50vw" />
        </div>
        <h2>{product.title}</h2>
        <p>{product.excerpt}</p>
        <strong>View details <ArrowRight size={15} /></strong>
      </Link>
    </article>
  );
}

export function CategoryProductPage({
  category,
  categories,
  products,
  allProducts,
}: {
  category: ProductCategory;
  categories: ProductCategory[];
  products: CatalogProduct[];
  allProducts: CatalogProduct[];
}) {
  const inquiryProducts = allProducts.length ? allProducts : staticCatalogProducts;

  return (
    <main className="catalog-page">
      <SiteHeader />
      <Breadcrumbs items={[["Products", "/products"], [category.title, `/products/${category.slug}`]]} />
      <section className="catalog-hero storied-page-width">
        <div>
          <p className="section-kicker">Product Category</p>
          <h1>{category.title}</h1>
          <p>{category.summary}</p>
        </div>
        <div className="catalog-hero-media">
          <Image src={category.image} alt={category.title} fill sizes="420px" />
        </div>
      </section>
      <section className="catalog-layout storied-page-width">
        <Sidebar activeSlug={category.slug} categories={categories} products={allProducts} />
        <div>
          <div className="catalog-list-heading">
            <h2>{category.title}</h2>
            <span>{products.length} Products</span>
          </div>
          <div className="catalog-products-grid">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} categorySlug={category.slug} />
            ))}
          </div>
          <section className="catalog-inquiry" id="product-inquiry">
            <div>
              <p className="section-kicker">Inquiry</p>
              <h2>Send Nuochida Your Product List</h2>
              <p>Choose products you are interested in, then send your quantity, logo method, and delivery country.</p>
            </div>
            <InquiryForm products={inquiryProducts.map((product) => ({ title: product.title, slug: product.slug }))} selectedProduct={products[0]?.title} />
          </section>
        </div>
      </section>
    </main>
  );
}

export function ProductDetailPage({
  product,
  category,
  categories,
  allProducts,
}: {
  product: CatalogProduct;
  category: ProductCategory;
  categories: ProductCategory[];
  allProducts: CatalogProduct[];
}) {
  const relatedProducts = getRelatedProducts(allProducts, product);
  const inquiryProducts = allProducts.length ? allProducts : staticCatalogProducts;

  return (
    <main className="catalog-page">
      <ProductInterestTracker productTitle={product.title} />
      <SiteHeader />
      <Breadcrumbs
        items={[
          ["Products", "/products"],
          [category.title, `/products/${category.slug}`],
          [product.title, `/products/${category.slug}/${product.slug}`],
        ]}
      />
      <section className="product-detail-top storied-page-width">
        <div className="product-detail-media">
          <Image src={product.image} alt={product.title} fill priority sizes="(min-width: 1100px) 44vw, 100vw" />
        </div>
        <div className="product-detail-copy">
          <p className="section-kicker">Custom Hat Program</p>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <dl>
            {product.specs.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <Link className="storied-pill black-pill" href="#product-inquiry">
            Send Inquiry <ArrowRight size={16} />
          </Link>
          <div className="product-trust-note">
            <ShieldCheck size={20} />
            <span>Inquiry will include this product and your recently viewed products.</span>
          </div>
        </div>
      </section>
      <section className="catalog-layout storied-page-width">
        <Sidebar activeSlug={category.slug} categories={categories} products={allProducts} />
        <div>
          <div className="product-tabs">
            <a href="#product-detail">Product Detail</a>
            <a href="#product-inquiry">Send Inquiry</a>
          </div>
          <div className="product-detail-sections" id="product-detail">
            {product.detailSections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
          {relatedProducts.length > 0 && (
            <section className="related-products">
              <h2>Related Products</h2>
              <div className="catalog-products-grid compact">
                {relatedProducts.map((item) => (
                  <ProductCard key={item.slug} product={item} categorySlug={category.slug} />
                ))}
              </div>
            </section>
          )}
          <section className="catalog-inquiry" id="product-inquiry">
            <div>
              <p className="section-kicker">Send Inquiry</p>
              <h2>Ask About {product.title}</h2>
              <p>Recently viewed products are automatically included so your sales contact sees your interest list.</p>
            </div>
            <InquiryForm products={inquiryProducts.map((item) => ({ title: item.title, slug: item.slug }))} selectedProduct={product.title} />
          </section>
        </div>
      </section>
    </main>
  );
}
