import assert from "node:assert/strict";
import test from "node:test";

import { productCategories, siteSettings } from "../src/data/nuochida.js";

test("Nuochida content exposes six unique product categories", () => {
  assert.equal(siteSettings.brandName, "Nuochida");
  assert.equal(productCategories.length, 6);

  const slugs = productCategories.map((category) => category.slug);
  assert.deepEqual(new Set(slugs).size, productCategories.length);
  assert.deepEqual(slugs, [
    "baseball-caps",
    "trucker-hats",
    "bucket-hats",
    "beanies",
    "outdoor-hats",
    "custom-logo-hats",
  ]);
});

test("featured categories include an inquiry label and manufacturing specs", () => {
  for (const category of productCategories) {
    assert.ok(category.title.length > 3);
    assert.ok(category.summary.includes("OEM") || category.summary.includes("custom"));
    assert.ok(category.specs.length >= 3);
    assert.ok(category.inquiryLabel.startsWith("Ask about"));
  }
});
