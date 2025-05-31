// import ProductCard from "./product-card"

import ProductCard from "./ProductCard"

const products = [
  {
    id: "1",
    category: "Serums",
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
    category: "Serums",
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
    category: "Serums",
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
    category: "Serums",
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


export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
