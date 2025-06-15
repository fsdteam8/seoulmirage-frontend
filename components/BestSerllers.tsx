"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./Product/ProductCard";
import { Product } from "@/store/cart-store";
// import { useQuery } from "@tanstack/react-query";
// import { ApiResponse } from "@/types/BestSellersDataType";
// import ProductCard from "./ProductCard"

export const products: Product[] = [
  {
    id: 1,
    category: { id: 1, name: "Serums" },
    name: "Hydra Glow Serum",
    price: "72",
    rating: 4.7,
    reviews: 142,
    image: "/asset/p1.png",
    images: [
      "/asset/p2.png",
      "/asset/p3.png",
      "/asset/p4.png",
      "/asset/p1.png",
    ],
    media: [],
  },
  {
    id: 2,
    category: { id: 2, name: "Serums" },
    name: "Vitamin C Radiance Boost",
    price: "58",
    rating: 4.8,
    reviews: 95,
    image: "/asset/p2.png",
    images: [
      "/asset/p2.png",
      "/asset/p3.png",
      "/asset/p4.png",
      "/asset/p1.png",
    ],
    media: [],
  },
  {
    id: 3,
    category: { id: 3, name: "Serums" },
    name: "Overnight Repair Drops",
    price: "69",
    rating: 4.6,
    reviews: 110,
    image: "/asset/p3.png",
    images: [
      "/asset/p2.png",
      "/asset/p3.png",
      "/asset/p4.png",
      "/asset/p1.png",
    ],
    media: [],
  },
  {
    id: 4,
    category: { id: 4, name: "Serums" },
    name: "Age Defense Elixir",
    price: "75",
    rating: 4.9,
    reviews: 165,
    image: "/asset/p4.png",
    images: [
      "/asset/p2.png",
      "/asset/p3.png",
      "/asset/p4.png",
      "/asset/p1.png",
    ],
    media: [],
  },
  {
    id: 5,
    category: { id: 5, name: "Serums" },
    name: "Age Defense Elixir",
    price: "75",
    rating: 4.9,
    reviews: 165,
    image: "/asset/p4.png",
    images: [
      "/asset/p2.png",
      "/asset/p3.png",
      "/asset/p4.png",
      "/asset/p1.png",
    ],
    media: [
      { id: 1, product_id: 5, file_path: "/asset/p4.png" },
      { id: 2, product_id: 5, file_path: "/asset/p2.png" },
      { id: 3, product_id: 5, file_path: "/asset/p3.png" },
      { id: 4, product_id: 5, file_path: "/asset/p1.png" },
    ],
  },
];

export default function BestSellers() {
  // Show only first 4 products for bestsellers section
  const bestSellerProducts = products.slice(0, 4);

  // const { data, error, isLoading } = useQuery<ApiResponse>({
  //   queryKey: ["bestSellers"],
  //   queryFn: async () => {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/best-selling-products`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           // Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (!res.ok) {
  //       throw new Error("Failed to fetch best-selling products");
  //     }

  //     const data: ApiResponse = await res.json();
  //     return data;
  //   },
  //   // enabled: !!token, // only runs if token is available
  // });

  // const bestSellerProducts = data?.data.data;
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with title and view all link */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-medium text-gray-900">
            Bestsellers
          </h2>
          <Link
            href="/products"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
          >
            <span className="text-sm md:text-base">View all products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellerProducts &&
            bestSellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
}
