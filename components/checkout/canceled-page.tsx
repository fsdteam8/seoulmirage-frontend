import Link from "next/link"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentCanceledPage() {
  return (
    <div className="min-h-screen bg-[#F5E6D3] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-2xl font-bold mb-4">
          Oops! Your Payment Wasn&apos;t <span className="text-red-500">Completed</span> !
        </h1>

        <p className="text-gray-600 mb-8">
          It looks like your transaction was canceled—please double-check your details and try again.
        </p>

        <Link href="/products">
          <Button className="bg-black text-white hover:bg-gray-800 px-8">Continue Shopping →</Button>
        </Link>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-pink-200 rounded"></div>
                <span className="font-semibold">Seoul Mirage</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Lorem ipsum dolor sit amet consectetur.
                <br />
                Scelerisque lectus habitasse adipiscing.
              </p>
              <div className="flex space-x-4">
                <div className="w-6 h-6 bg-pink-200 rounded"></div>
                <div className="w-6 h-6 bg-pink-200 rounded"></div>
                <div className="w-6 h-6 bg-pink-200 rounded"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Shop</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>All Products</li>
                  <li>Bestsellers</li>
                  <li>New Arrivals</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">About</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>About Us</li>
                  <li>Contact Us</li>
                  <li>Shipping & Returns</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-4 text-center text-sm text-gray-600">
            © 2025 Seoul Mirage. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}
