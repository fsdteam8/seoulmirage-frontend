"use client";

import React, { useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
// import { useSession } from "next-auth/react";
// import { Product } from "@/types/BestSellersDataType";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // const { data: session } = useSession();
  // const token = (session?.user as { token?: string })?.token || "";

  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // prevent link navigation when clicking button inside Link

    // if (!token) {
    //   toast.error("Please log in to add items to your cart.", {
    //     duration: 2000,
    //     position: "top-center",
    //     style: {
    //       backgroundColor: "#f8d7da",
    //       color: "black",
    //       fontSize: "16px",
    //     },
    //   });
    //   return;
    // }

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
                `${process.env.NEXT_PUBLIC_API_URL}/${product?.media[0]?.file_path}`
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
            <div className="flex items-center">
              {/* <span className="text-sm font-medium">
                {product.rating ?? "-"}
              </span> */}
              <Star className="w-4 h-4 fill-black text-black ml-1" />
            </div>
            {/* <span className="text-sm text-gray-600">
              ({product.reviews ?? 0})
            </span> */}
          </div>
        </div>
      </div>
    </Link>
  );
}
