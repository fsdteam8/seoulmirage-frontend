"use client";
// import ProductDetails from "@/components/product-details"
import ProductDetails from "@/components/Product/ProductDetails";

import { useEffect, useState } from "react";

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [id, setId] = useState<string>(params.id);

  useEffect(() => {
    setId(params.id);
  }, [params.id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductDetails productId={id} />
    </div>
  );
}
