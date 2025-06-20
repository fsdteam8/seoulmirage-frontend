"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

// StarRating component to show full, half, empty stars based on rating
function StarRating({
  rating,
  maxStars = 5,
}: {
  rating: number;
  maxStars?: number;
}) {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (rating >= i) {
      // full star
      stars.push(
        <Star key={i} className="w-4 h-4 fill-black " />
      );
    } else if (rating >= i - 0.5) {
      // half star
      stars.push(
        <StarHalf key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
      );
    } else {
      // empty star
      stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
    }
  }

  return <div className="flex items-center gap-1">{stars}</div>;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    addItem(product);
    toast.success(`${product.name} has been added to your cart!`, {
      duration: 2000,
      position: "top-center",
      style: {
        backgroundColor: "#f5fff3",
        color: "black",
        fontSize: "16px",
      },
    });
  };

  return (
    <Link href={`/products/${product.id}`} className="block">
      <div
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          {product?.media && (
            <Image
              src={
                product?.media[0]?.file_path
                  ? `${process.env.NEXT_PUBLIC_API_URL}/${product?.media[0]?.file_path}`
                  : "/asset/no-image.jpg"
              }
              alt={product.name || "Product Image"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          )}

          <div
            className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              onClick={handleAddToCart}
              className="bg-white text-black hover:bg-gray-100 font-medium px-6 py-2 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-600 mb-1">
            {product.category?.name ?? "Uncategorized"}
          </p>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-2xl font-bold mb-2">${product.price}</p>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <StarRating rating={Number(product?.reviews_avg_rating) || 0}  />
              <span className="text-sm font-medium">
                {product?.reviews_avg_rating !== undefined &&
                product?.reviews_avg_rating !== null
                  ? String(product.reviews_avg_rating).slice(0, 3)
                  : ""}
              </span>
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviews_count ?? 0})
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
