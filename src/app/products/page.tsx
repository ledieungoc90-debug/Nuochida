import { redirect } from "next/navigation";
import { staticProductCategories } from "@/lib/productCatalog";

export const revalidate = 60;

export default function ProductsPage() {
  redirect(`/products/${staticProductCategories[0].slug}`);
}
