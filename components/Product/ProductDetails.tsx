"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
// import BestSellers from "../BestSellers"; // Fixed typo
import ProductReviews from "./ProductReviews";
import { useQuery } from "@tanstack/react-query";
import BestSellers from "../BestSerllers";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart-store";

// Define the API response types
export interface Media {
  id: number;
  product_id: number;
  file_path: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  type: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  image: string | null;
  role: string;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  product_id: number;
  user_id: number;
  comment: string;
  rating: number;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string | null;
  price: string;
  category_id: number;
  status: string;
  cost_price: string;
  stock_quantity: number;
  sales: number;
  created_at: string;
  updated_at: string;
  category: Category;
  media: Media[];
  reviews: Review[];
}

export interface ProductDetailsResponse {
  success: boolean;
  message: string;
  data: Product;
}

interface ProductDetailsProps {
  productId: string;
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const { data, error, isLoading } = useQuery<ProductDetailsResponse>({
    queryKey: ["productDetails", productId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch product details");
      }

      const data = await res.json();
      return data as ProductDetailsResponse;
    },
  });

  const productDetails = data?.data;

  // Handle loading and error states
  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error || !productDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        Error loading product details. Please try again later.
      </div>
    );
  }

  // Map API data to the expected structure
  const product = {
    id: productDetails.id.toString(),
    name: productDetails.name,
    category: productDetails.category.name,
    price: parseFloat(productDetails.price),
    originalPrice:
      parseFloat(productDetails.cost_price) ||
      parseFloat(productDetails.price) * 1.5, // Fallback: assume original price is 1.5x if not provided
    rating: 4.5, // Fallback: API doesn't provide rating
    reviews: productDetails?.reviews?.length, // Fallback: API doesn't provide reviews
    discount:
      Math.round(
        ((parseFloat(productDetails.cost_price || productDetails.price) -
          parseFloat(productDetails.price)) /
          parseFloat(productDetails.cost_price || productDetails.price)) *
          100
      ) || 0, // Calculate discount if possible, else 0
    images: productDetails.media.map(
      (media) => `${process.env.NEXT_PUBLIC_API_URL}/${media.file_path}`
    ), // Prepend API URL to image paths
    description: productDetails.description || "No description available.",
    details: {
      "STRAIGHT UP": "A high-quality product designed for your needs.", // Fallback
      "THE LOWDOWN": [
        "Premium quality materials.",
        "Suitable for various uses.",
        "Crafted with care.", // Fallback details
      ],
    },
    additionalInfo: `Part of our ${productDetails.category.name} collection.`, // Fallback
    stock_quantity: productDetails.stock_quantity, // Additional field from API
    status: productDetails.status, // Additional field from API
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // prevent link navigation when clicking button inside Link

    addItem({
      ...productDetails,
      status:
        productDetails.status === "active" ||
        productDetails.status === "inactive"
          ? productDetails.status
          : "inactive",
    });
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
    <section>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Thumbnail Images - Mobile: Horizontal scroll */}
            <div className="lg:hidden">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? "border-gray-900"
                        : "border-gray-200"
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
                      selectedImageIndex === index
                        ? "border-gray-900"
                        : "border-gray-200"
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
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-black text-black"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.reviews} Reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">
                <span className="text-[16px]">AED</span>{" "}
                {product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  <span className="text-[16px]">AED</span>{" "}
                  {product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.discount > 0 && (
                <span className="text-sm text-green-600 font-medium">
                  Save {product.discount}% right now
                </span>
              )}
            </div>

            {/* Stock Status */}
            {/* <div>
              <span
                className={`text-sm font-medium ${
                  product.status === "available"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {product?.status?.toLowerCase() === "low stock"
                  ? "available"
                  : "Out of Stock"}{" "}
                ({product.stock_quantity} available)
              </span>
            </div> */}

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

              {/* <div>
                <h4 className="font-semibold mb-2">What else?!</h4>
                <p className="text-sm text-gray-700">
                  {product.additionalInfo}
                </p>
              </div> */}
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    className="px-3"
                    disabled={product.stock_quantity <= quantity}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-black text-white hover:bg-gray-800 py-3 text-lg font-medium"
                disabled={product.stock_quantity === 0}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ProductReviews */}
      <div className="bg-[#F5D2A899] py-8">
        <ProductReviews productId={productId} />
      </div>

      {/* Best Seller products */}
      <BestSellers />
    </section>
  );
}
