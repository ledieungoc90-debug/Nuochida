"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { mergeRecentProducts, readRecentProducts, rememberRecentProduct } from "@/lib/recentProducts";

type InquiryStatus =
  | {
      type: "idle";
      message: "";
    }
  | {
      type: "loading" | "success" | "error";
      message: string;
    };

type InquiryFormProps = {
  products: Array<{
    title: string;
    slug: string;
  }>;
  selectedProduct?: string;
};

export function InquiryForm({ products, selectedProduct }: InquiryFormProps) {
  const firstProduct = selectedProduct || products[0]?.title || "";
  const [currentProduct, setCurrentProduct] = useState(firstProduct);
  const [recentProducts, setRecentProducts] = useState<string[]>([]);
  const [checkedProducts, setCheckedProducts] = useState<string[]>(firstProduct ? [firstProduct] : []);
  const [status, setStatus] = useState<InquiryStatus>({ type: "idle", message: "" });

  useEffect(() => {
    setRecentProducts(readRecentProducts());
  }, []);

  useEffect(() => {
    setCurrentProduct(firstProduct);
  }, [firstProduct]);

  const inquiryProducts = useMemo(
    () => mergeRecentProducts(currentProduct, recentProducts),
    [currentProduct, recentProducts],
  );

  useEffect(() => {
    setCheckedProducts((current) => {
      const currentSet = new Set(current);
      const preserved = inquiryProducts.filter((product) => currentSet.has(product));

      return preserved.length ? preserved : inquiryProducts.slice(0, 1);
    });
  }, [inquiryProducts]);

  function chooseProduct(productTitle: string) {
    const nextRecentProducts = rememberRecentProduct(productTitle, recentProducts);

    setCurrentProduct(productTitle);
    setRecentProducts(nextRecentProducts);
  }

  function toggleProduct(productTitle: string) {
    setCheckedProducts((current) => {
      if (current.includes(productTitle)) {
        const nextProducts = current.filter((item) => item !== productTitle);

        return nextProducts.length ? nextProducts : [productTitle];
      }

      return mergeRecentProducts(productTitle, current);
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending your inquiry..." });

    const formData = new FormData(event.currentTarget);
    const submittedProducts = checkedProducts.length ? checkedProducts : currentProduct ? [currentProduct] : [];
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      company: String(formData.get("company") || ""),
      product: submittedProducts[0] || currentProduct,
      visited_products: submittedProducts,
      message: String(formData.get("message") || ""),
      page_url: window.location.href,
    };

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Inquiry submission failed.");
      }

      event.currentTarget.reset();
      setStatus({ type: "success", message: "Inquiry sent. Nuochida will contact you soon." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Inquiry submission failed. Please try again.",
      });
    }
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      {inquiryProducts.length > 0 && (
        <div className="inquiry-products wide">
          <p>Inquiry Products</p>
          <div>
            {inquiryProducts.map((product) => (
              <label key={product} className="inquiry-product-choice">
                <input
                  checked={checkedProducts.includes(product)}
                  onChange={() => toggleProduct(product)}
                  type="checkbox"
                />
                <span>{product}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      <label>
        Name
        <input name="name" placeholder="Your name" required />
      </label>
      <label>
        Email
        <input name="email" placeholder="you@company.com" required type="email" />
      </label>
      <label>
        Phone / WhatsApp
        <input name="phone" placeholder="+1 314 600 2491" />
      </label>
      <label>
        Company
        <input name="company" placeholder="Company / brand" />
      </label>
      <label>
        Product Interest
        <select name="product" onChange={(event) => chooseProduct(event.target.value)} value={currentProduct}>
          {products.map((product) => (
            <option key={product.slug} value={product.title}>
              {product.title}
            </option>
          ))}
        </select>
      </label>
      <label className="wide">
        Message
        <textarea
          name="message"
          placeholder="Tell us quantity, logo method, material, delivery country, and sample needs."
          required
        />
      </label>
      {status.type !== "idle" && (
        <p className={`form-status wide ${status.type}`}>{status.message}</p>
      )}
      <button className="storied-pill submit-button" disabled={status.type === "loading"} type="submit">
        {status.type === "loading" ? "Sending..." : "Submit Inquiry"} <ArrowRight size={16} />
      </button>
    </form>
  );
}
