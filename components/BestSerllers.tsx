import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./Product/ProductCard";
// import ProductCard from "./ProductCard"

const products = [
  {
    id: "1",
    category: { id: "serums", name: "Serums" },
    name: "Hydra Glow Serum",
    price: 72,
    rating: 4.7,
    reviews: 142,
    image: "/asset/p1.png",
    images: [
      "/asset/p2.png",
      "/asset/p3.png",
      "/asset/p4.png",
      "/asset/p1.png",
    ],
  },
  {
    id: "2",
    category: { id: "serums", name: "Serums" },
    name: "Vitamin C Radiance Boost",
    price: 58,
    rating: 4.8,
    reviews: 95,
    image: "/asset/p2.png",
    images: [
      "/asset/p2.png",
      "/asset/p3.png",
      "/asset/p4.png",
      "/asset/p1.png",
    ],
  },
  {
    id: "3",
    category: { id: "serums", name: "Serums" },
    name: "Overnight Repair Drops",
    price: 69,
    rating: 4.6,
    reviews: 110,
    image: "/asset/p3.png",
    images: [
      "/asset/p2.png",
      "/asset/p3.png",
      "/asset/p4.png",
      "/asset/p1.png",
    ],
  },
  {
    id: "4",
    category: { id: "serums", name: "Serums" },
    name: "Age Defense Elixir",
    price: 75,
    rating: 4.9,
    reviews: 165,
    image: "/asset/p4.png",
    images: [
      "/asset/p2.png",
      "/asset/p3.png",
      "/asset/p4.png",
      "/asset/p1.png",
    ],
  },
  {
    id: "5",
    category: { id: "serums", name: "Serums" },
    name: "Age Defense Elixir",
    price: 75,
    rating: 4.9,
    reviews: 165,
    image: "/asset/p4.png",
    images: [
      "/asset/p2.png",
      "/asset/p3.png",
      "/asset/p4.png",
      "/asset/p1.png",
    ],
  },
];

export default function BestSellers() {
  // Show only first 4 products for bestsellers section
  const bestSellerProducts = products.slice(0, 4);

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
          {bestSellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
