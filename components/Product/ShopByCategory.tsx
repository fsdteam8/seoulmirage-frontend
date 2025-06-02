"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

interface CategoryCardProps {
  name: string
  imageUrl: string
  query: string
}

const categories: CategoryCardProps[] = [
  {
    name: "Cleansers",
    imageUrl: "/asset/category-1.png",
    query: "Cleansers",
  },
  {
    name: "Serums",
    imageUrl: "/asset/category-2.png",
    query: "Serums",
  },
  {
    name: "Moisturizers",
    imageUrl: "/asset/category-3.png",
    query: "Moisturizers",
  },
  {
    name: "Masks",
    imageUrl:"/asset/category-4.png",
    query: "Masks",
  },
]

function CategoryCard({ name, imageUrl, query }: CategoryCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/products?category=${encodeURIComponent(query)}`)
  }

  return (
    <div onClick={handleClick} className="relative aspect-[3/4] w-full rounded-lg overflow-hidden group cursor-pointer">
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-colors duration-300 flex items-center justify-center">
        <h3 className="text-white text-3xl font-semibold">{name}</h3>
      </div>
    </div>
  )
}

export default function ShopByCategory() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#ebcad04d]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-black mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </div>
    </section>
  )
}
