import AllProduct from "@/components/Product/AllProduct";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">All  Products</h1>
       <AllProduct/>
      </div>
    </div>
  )
}
