"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import type { Product } from "@/store/cart-store";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

// const products: Product[] = [
//   {
//     id: "1",
//     category: "Serums",
//     name: "Hydra Glow Serum",
//     price: 72,
//     rating: 4.7,
//     reviews: 142,
//     image: "/asset/p1.png",
//     images: [
//       "/asset/p2.png",
//       "/asset/p3.png",
//       "/asset/p4.png",
//       "/asset/p1.png",
//     ],
//   },
//   {
//     id: "2",
//     category: "Serums",
//     name: "Vitamin C Radiance Boost",
//     price: 58,
//     rating: 4.8,
//     reviews: 95,
//     image: "/asset/p2.png",
//     images: [
//       "/asset/p2.png",
//       "/asset/p3.png",
//       "/asset/p4.png",
//       "/asset/p1.png",
//     ],
//   },
//   {
//     id: "3",
//     category: "Face",
//     name: "Overnight Repair Drops",
//     price: 69,
//     rating: 4.6,
//     reviews: 110,
//     image: "/asset/p3.png",
//     images: [
//       "/asset/p2.png",
//       "/asset/p3.png",
//       "/asset/p4.png",
//       "/asset/p1.png",
//     ],
//   },
//   {
//     id: "4",
//     category: "Eye",
//     name: "Age Defense Elixir",
//     price: 75,
//     rating: 4.9,
//     reviews: 165,
//     image: "/asset/p4.png",
//     images: [
//       "/asset/p2.png",
//       "/asset/p3.png",
//       "/asset/p4.png",
//       "/asset/p1.png",
//     ],
//   },
//   {
//     id: "5",
//     category: "Lip",
//     name: "Nourishing Lip Treatment",
//     price: 45,
//     rating: 4.5,
//     reviews: 89,
//     image: "/asset/p1.png",
//     images: [
//       "/asset/p2.png",
//       "/asset/p3.png",
//       "/asset/p4.png",
//       "/asset/p1.png",
//     ],
//   },
//   {
//     id: "6",
//     category: "Sets",
//     name: "Complete Skincare Set",
//     price: 120,
//     rating: 4.8,
//     reviews: 203,
//     image: "/asset/p2.png",
//     images: [
//       "/asset/p2.png",
//       "/asset/p3.png",
//       "/asset/p4.png",
//       "/asset/p1.png",
//     ],
//   },
// ];

const categories = [
  "All Product",
  "Face",
  "Brow",
  "Eye",
  "Lip",
  "Sets",
  "Serums",
];

export default function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState("All Product");
  const [sortBy, setSortBy] = useState("Featured");

  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryFromQuery = searchParams.get("category");
    if (categoryFromQuery && categories.includes(categoryFromQuery)) {
      setSelectedCategory(categoryFromQuery);
    }
  }, [searchParams]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`
      ); // replace with your actual endpoint
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      return res.json();
    },
  });

  if (isLoading) return <p className="text-center ">Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  console.log(data?.data?.data);
  const products = data?.data?.data || [];

  interface Product {
    id: string;
    category: {
      id: string;
      name: string;
    };
    name: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
    images: string[];
  }

  const filteredProducts = (products as Product[]).filter(
    (product: Product) =>
      selectedCategory === "All Product" ||
      product.category.name === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High":
        return a.price - b.price;
      case "Price: High to Low":
        return b.price - a.price;
      case "Rating":
        return b.rating - a.rating;
      case "Name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen">
      {/* Category Navigation */}
      <div className="bg-[#F5E6D3] border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex space-x-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "text-black border-b-2 border-black pb-1"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Sort:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Featured">Featured</SelectItem>
                  <SelectItem value="Price: Low to High">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="Price: High to Low">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="Rating">Rating</SelectItem>
                  <SelectItem value="Name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
