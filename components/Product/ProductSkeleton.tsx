import { Skeleton } from "../ui/skeleton";

export function ProductPageSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Category Navigation */}
      <div className="bg-[#F5E6D3] border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Category buttons skeleton */}
            <div className="flex space-x-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-20 rounded" />
              ))}
            </div>

            {/* Sort dropdown skeleton */}
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-10 w-40 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 bg-white shadow-sm space-y-3"
            >
              <Skeleton className="h-60 w-full rounded-md" />
              {/* <Skeleton className="h-4 w-3/4" /> */}
              {/* <Skeleton className="h-4 w-1/2" /> */}
              <Skeleton className="h-2 w-1/3" />
              <div className="flex space-x-2">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
