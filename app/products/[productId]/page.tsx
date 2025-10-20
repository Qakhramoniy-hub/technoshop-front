// app/products/[productId]/page.tsx
import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/ProductDetails";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  if (isNaN(Number(productId))) {
    notFound();
  }

  return <ProductDetailPage />;
}
