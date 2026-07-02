"use client";

import { useEffect } from "react";
import { rememberRecentProduct, readRecentProducts } from "@/lib/recentProducts";

export function ProductInterestTracker({ productTitle }: { productTitle: string }) {
  useEffect(() => {
    rememberRecentProduct(productTitle, readRecentProducts());
  }, [productTitle]);

  return null;
}
