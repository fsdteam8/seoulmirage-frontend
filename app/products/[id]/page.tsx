// import ProductDetails from "@/components/product-details"

import ProductDetails from "@/components/Product/ProductDetails"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductDetails productId={id} />
    </div>
  )
}
