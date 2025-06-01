"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, Plus, Minus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import BestSellers from "../BestSerllers"

// Mock product data - in a real app, this would come from an API
const getProduct = (id: string) => {
const products = {
    "1": {
      id: "1",
      category: "Serums",
      name: "111111111Radiance Boost Serum",
      price: 65,
      originalPrice: 99,
      rating: 4.9,
      reviews: 157,
      discount: 50,
      images: [
        "/asset/p2.png",
        "/asset/p3.png",
        "/asset/p4.png",
        "/asset/p1.png",
      ],
      description: "Unleash your natural glow with this lightweight serum packed with Vitamin C and botanical extracts.",
      details: {
        "STRAIGHT UP:": "Designed to boost skin's natural brightness and improve texture over time.",
        "THE LOWDOWN:": [
          "Targets dullness and uneven tone.",
          "Enriched with Vitamin C and Licorice Root Extract.",
          "Hydrates and protects with Hyaluronic Acid.",
          "Non-greasy, fast-absorbing formula.",
          "Ideal for daily use, morning or night.",
        ],
      },
      additionalInfo: "Dermatologist-tested. Suitable for all skin types including sensitive skin.",
    },
    "2": {
      id: "2",
      category: "Serums",
      name: "Hydra Plump Elixir",
      price: 59,
      originalPrice: 89,
      rating: 4.8,
      reviews: 132,
      discount: 45,
      images: [
        "/asset/p2.png",
        "/asset/p3.png",
        "/asset/p4.png",
        "/asset/p1.png",
      ],
      description: "Intensely hydrating serum that plumps skin and smooths fine lines with every drop.",
      details: {
        "STRAIGHT UP:": "Formulated to deliver long-lasting hydration and promote youthful elasticity.",
        "THE LOWDOWN:": [
          "Locks in moisture for 24 hours.",
          "Reduces signs of dehydration instantly.",
          "Infused with Squalane and Hyaluronic Acid.",
          "Fragrance-free and hypoallergenic.",
        ],
      },
      additionalInfo: "Vegan and cruelty-free. Use under moisturizer or alone.",
    },
    "3": {
      id: "3",
      category: "Serums",
      name: "333Overnight Repair Drops",
      price: 72,
      originalPrice: 105,
      rating: 4.7,
      reviews: 98,
      discount: 30,
      images: [
        "/asset/p2.png",
        "/asset/p3.png",
        "/asset/p4.png",
        "/asset/p1.png",
      ],
      description: "Wake up to smoother, revitalized skin with this intensive nighttime serum.",
      details: {
        "STRAIGHT UP:": "Deeply restorative formula targets tired, stressed skin overnight.",
        "THE LOWDOWN:": [
          "Supports overnight cell renewal.",
          "Powered by Retinol and Peptides.",
          "Minimizes pores and evens texture.",
          "Encourages smoother, firmer skin tone.",
        ],
      },
      additionalInfo: "For PM use only. Follow with moisturizer. Avoid direct sunlight after use.",
    },
    "4": {
      id: "4",
      category: "Serums",
      name: "Youth Shield Concentrate",
      price: 68,
      originalPrice: 102,
      rating: 4.9,
      reviews: 165,
      discount: 33,
      images: [
        "/asset/p2.png",
        "/asset/p3.png",
        "/asset/p4.png",
        "/asset/p1.png",
      ],
      description: "A protective serum that fights environmental damage and signs of aging.",
      details: {
        "STRAIGHT UP:": "Boosts skin's natural defenses while reducing fine lines and dullness.",
        "THE LOWDOWN:": [
          "Contains antioxidants like Green Tea and Vitamin E.",
          "Shields skin from pollution and UV stress.",
          "Improves firmness and resilience over time.",
          "Lightweight formula absorbs quickly into skin.",
        ],
      },
      additionalInfo: "Perfect for city living. Wear under SPF during the day.",
    },
  };


  return products[id as keyof typeof products] || products["1"]
}

interface ProductDetailsProps {
  productId: string
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
  const product = getProduct(productId)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleAddToCart = () => {
    console.log("Added to cart:", product.name, "Quantity:", quantity)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Thumbnail Images - Mobile: Horizontal scroll, Desktop: Vertical */}
          <div className="lg:hidden">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index ? "border-gray-900" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Thumbnail Layout */}
          <div className="hidden lg:flex gap-4">
            <div className="flex flex-col gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index ? "border-gray-900" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 aspect-square rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.images[selectedImageIndex] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Mobile Main Image */}
          <div className="lg:hidden aspect-square rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={product.images[selectedImageIndex] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">{product.reviews} Reviews</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">${product.price}</span>
            <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
            <span className="text-sm text-green-600 font-medium">Save {product.discount}% right now</span>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Details</h3>
            <p className="text-gray-700">{product.description}</p>

            {Object.entries(product.details).map(([key, value]) => (
              <div key={key}>
                <h4 className="font-semibold mb-2">{key}</h4>
                {Array.isArray(value) ? (
                  <ul className="space-y-1 text-sm text-gray-700">
                    {value.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-700">{value}</p>
                )}
              </div>
            ))}

            <div>
              <h4 className="font-semibold mb-2">What else?!</h4>
              <p className="text-sm text-gray-700">{product.additionalInfo}</p>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="px-3"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(1)} className="px-3">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full bg-black text-white hover:bg-gray-800 py-3 text-lg font-medium"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>



{/* Best Seller products */}
       <BestSellers/>
    </div>
  )
}
