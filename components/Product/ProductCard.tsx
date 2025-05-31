"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Product {
  id: string
  category: string
  name: string
  price: number
  rating: number
  reviews: number
  image: string
  images: string[]
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Add to cart logic here
    console.log("Added to cart:", product.name)
  }

  return (
    <Link href={`/product/${product.id}`}>
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
              className="bg-white text-black hover:bg-gray-100 font-medium px-6 py-2 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-600 mb-1">{product.category}</p>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-2xl font-bold mb-2">${product.price}</p>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-sm font-medium">{product.rating}</span>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 ml-1" />
            </div>
            <span className="text-sm text-gray-600">({product.reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
