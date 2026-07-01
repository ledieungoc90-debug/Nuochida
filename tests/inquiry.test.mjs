import assert from "node:assert/strict";
import test from "node:test";

import {
  buildWhatsappUrl,
  createInquiryPayload,
  mergeRecentProducts,
} from "../src/lib/inquiry.js";

test("mergeRecentProducts keeps selected product first and removes duplicates", () => {
  const merged = mergeRecentProducts("baseball-caps", [
    "bucket-hats",
    "baseball-caps",
    "beanies",
    "bucket-hats",
  ]);

  assert.deepEqual(merged, ["baseball-caps", "bucket-hats", "beanies"]);
});

test("createInquiryPayload includes product context and page url", () => {
  const payload = createInquiryPayload({
    name: "Alex",
    email: "alex@example.com",
    company: "Peak Retail",
    message: "Need logo caps",
    selectedProduct: "trucker-hats",
    recentProducts: ["bucket-hats"],
    pageUrl: "https://www.nuochida.com/products/trucker-hats",
  });

  assert.equal(payload.status, "new");
  assert.equal(payload.product, "trucker-hats");
  assert.deepEqual(payload.visited_products, ["trucker-hats", "bucket-hats"]);
  assert.equal(payload.page_url, "https://www.nuochida.com/products/trucker-hats");
});

test("buildWhatsappUrl encodes brand and product interest", () => {
  const url = buildWhatsappUrl({
    number: "13146002491",
    brandName: "Nuochida",
    product: "custom logo hats",
  });

  assert.equal(
    url,
    "https://wa.me/13146002491?text=Hello%20Nuochida%2C%20I%20would%20like%20to%20ask%20about%20custom%20logo%20hats."
  );
});
