"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";
import Image from "next/image";

// Zod schema
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// API call
const subscribeToNewsletter = async (formData: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/newsletter`, {
    method: "POST",
    body: formData, // no need to stringify
  });

  if (!res.ok) {
    throw new Error("Failed to subscribe. Please try again.");
  }

  return res.json();
};

export default function Footer() {
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: () => {
      toast.success("Subscribed successfully!");
      setEmail("");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const handleSubscribe = () => {
    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      toast.warning(result.error.errors[0].message);
      return;
    }
    const fromdata = new FormData();

    fromdata.append("email", email);
    mutation.mutate(fromdata);
  };

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {/* Newsletter Section */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold text-[#000000CC] mb-3 md:mb-4">
            Join Our Community
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#000000CC] mb-8 md:mb-12 lg:mb-[60px] max-w-xs sm:max-w-md md:max-w-lg lg:max-w-[650px] mx-auto font-medium px-4 sm:px-0">
            Subscribe to our newsletter for exclusive offers, skincare tips, and
            new product announcements.
          </p>

          {/* Email Form */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-xs sm:max-w-md md:max-w-lg mx-auto items-stretch sm:items-center px-4 sm:px-0">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="text-[#1E2A38] text-sm sm:text-base flex-1 rounded-full border border-[#00000033] placeholder:text-[#1E2A38] px-[32px] py-[16px]"
            />
            <Button
              onClick={handleSubscribe}
              disabled={mutation.isPending}
              className="bg-[#F092B0] hover:bg-[#F092B0]/90 text-[#000000] text-sm px-[32px] py-[16px] whitespace-nowrap rounded-full"
            >
              {mutation.isPending ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
            <div className="mb-4 md:mb-6">
              <div className="mb-4 ">
                <Image
                  src="/asset/logo.png"
                  width={100}
                  height={100}
                  alt="logo"
                  className="w-auto h-full object-contain"
                />
              </div>
              <p className="text-base sm:text-lg lg:text-[18px] text-[#000000CC] font-medium leading-relaxed max-w-sm mx-auto sm:mx-0">
               Nurturing your skin with nature’s finest ingredients for a radiant, healthy glow every day.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-2 justify-center sm:justify-start">
              <Link
                href="#"
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-[#F092B0] hover:bg-pink-50 transition-colors shadow-sm"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-[#F092B0] hover:bg-pink-50 transition-colors shadow-sm"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-[#F092B0] hover:bg-pink-50 transition-colors shadow-sm"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>

          {/* Shop Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-medium text-xl sm:text-2xl md:text-3xl lg:text-[32px] text-[#000000CC] mb-3 md:mb-4">
              Shop
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-sm sm:text-base lg:text-base text-[#000000CC] font-normal hover:text-[#F092B0] transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="#best"
                  className="text-sm sm:text-base lg:text-base text-[#000000CC] font-normal hover:text-[#F092B0] transition-colors"
                >
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link
                  href="#new"
                  className="text-sm sm:text-base lg:text-base text-[#000000CC] font-normal hover:text-[#F092B0] transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* About Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-medium text-xl sm:text-2xl md:text-3xl lg:text-[32px] text-[#000000CC] mb-3 md:mb-4">
              About
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm sm:text-base lg:text-base text-[#000000CC] font-normal hover:text-[#F092B0] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm sm:text-base lg:text-base text-[#000000CC] font-normal hover:text-[#F092B0] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/coming"
                  className="text-sm sm:text-base lg:text-base text-[#000000CC] font-normal hover:text-[#F092B0] transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/coming"
                  className="text-sm sm:text-base lg:text-base text-[#000000CC] font-normal hover:text-[#F092B0] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#00000033] mt-6 sm:mt-8 md:mt-10 lg:mt-12 pt-4 sm:pt-6">
          <p className="text-xs sm:text-sm text-[#000000CC] font-medium text-center">
            © 2024, Sensei Mirage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
