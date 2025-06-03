"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCartStore, type Product } from "@/store/cart-store";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
// import { useRouter } from 'next/navigation';
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token || "";
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  // const router = useRouter()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please log in to add items to your cart.", {
        duration: 2000,
        position: "top-center",
        style: {
          backgroundColor: "#f8d7da",
          color: "black",
          fontSize: "16px",
        },
      });
      return;
    }
    e.stopPropagation();
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
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
        <div
          className="relative aspect-square overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Add to Cart Button Overlay */}
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
          <p className="text-sm text-gray-600 mb-1">{product.category}</p>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-2xl font-bold mb-2">${product.price}</p>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-sm font-medium">{product.rating}</span>
              <Star className="w-4 h-4 fill-black text-black ml-1" />
            </div>
            <span className="text-sm text-gray-600">({product.reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
