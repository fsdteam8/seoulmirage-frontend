import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-[32px] font-bold text-[#000000CC] mb-4">Join Our Community</h2>
          <p className="text-sm md:text-[18px] text-[#000000CC] mb-[60px] w-[650px] mx-auto font-medium">
            Subscribe to our newsletter for exclusive offers, skincare tips, and new product announcements.
          </p>

          {/* Email Signup Form */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto items-center">
            <Input type="email" placeholder="Your email address" className="flex-1 h-10 md:h-[51px] rounded-[100px] border border-[#00000033]" />
            <Button className="bg-[#F092B0] hover:bg-[#F092B0]/90 text-[#000000] text-bae font-medium px-6 h-10 md:h-[51px] whitespace-nowra rounded-[100px]">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <div className="w-[50px] h-12 rounded-lg flex items-center justify-center mb-4">
               <Image src="/asset/logo.png" width={100} height={100} alt={"logo"}/>
              </div>
              <p className="text-[18px] text-[#000000CC] font-medium leading-relaxed max-w-sm">
                Lorem ipsum dolor sit amet consectetur. Scelerisque mauris lectus habitasse adipiscing elit.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-1">
              <Link
                href="#"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#F092B0] hover:bg-pink-50 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#F092B0] hover:bg-pink-50 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#F092B0] hover:bg-pink-50 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-medium text-[32px] text-[#000000CC] mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-base text-[#000000CC] font-normal">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-[#000000CC] font-normal">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-[#000000CC] font-normal">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-medium text-[32px] text-[#000000CC] mb-4">About</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-base text-[#000000CC] font-normal">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-[#000000CC] font-normal">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-[#000000CC] font-normal">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-[#000000CC] font-normal">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#00000033] mt-8 pt-6">
          <p className="text-sm text-[#000000CC] font-medium text-center md:text-left">© 2024, Sensei Mirage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
