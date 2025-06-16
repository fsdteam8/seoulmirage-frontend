"use client";

import { Category, PaginatedCategoryResponse } from "@/types/CategoryTypeData";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Category Card Component
function CategoryCard({ name, image, id }: Category) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products?category=${encodeURIComponent(id)}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative aspect-[3/4] w-full rounded-lg overflow-hidden group cursor-pointer shadow hover:shadow-lg transition-shadow"
    >
      <Image
        src={
          image
            ? `${process.env.NEXT_PUBLIC_API_URL}/${image}`
            : "/placeholder.svg"
        }
        alt={name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-colors duration-300 flex items-center justify-center">
        <h3 className="text-white text-xl md:text-2xl font-semibold text-center px-2">
          {name}
        </h3>
      </div>
    </div>
  );
}

// Main Component
export default function ShopByCategory() {
  const { data, error, isLoading } = useQuery<PaginatedCategoryResponse>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }

      return await res.json();
    },
  });

  const categoryData = data?.data?.data;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#ebcad04d]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-black mb-8">Shop by Category</h2>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-72 bg-gray-300 rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-600 bg-red-100 p-4 rounded-md shadow">
            <p className="font-medium">Error loading categories:</p>
            <p className="text-sm">{error.message}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryData && categoryData?.length > 0 ? (
              categoryData.map((category) => (
                <CategoryCard key={category.id} {...category} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No categories found.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
