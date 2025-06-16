import AllProduct from "@/components/Product/AllProduct";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <AllProduct />
        </Suspense>
      </div>
    </div>
  );
}
