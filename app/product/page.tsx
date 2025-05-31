

import ProductGrid from "@/components/Product/ProductGrid";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Beauty Products</h1>
        <ProductGrid />
      </div>
    </div>
  )
}
