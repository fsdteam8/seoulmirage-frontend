import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-[#F5E6D3] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-2xl font-bold mb-4">
          Your payment has been <span className="text-green-500">received</span> !
        </h1>

        <p className="text-gray-600 mb-8">Please check your email for a payment confirmation & invoice.</p>

        <Link href="/products">
          <Button className="bg-black text-white hover:bg-gray-800 px-8">Continue Shopping →</Button>
        </Link>
      </div>

    </div>
  )
}
