"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart-store";
import { useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const subtotal = getTotalPrice();
  const [promocode, setPromocode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
 console.log(items)
  const total = Math.max(0, subtotal - discount);

  const handelSubmited = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/promocodes?search=${promocode}`
      );
      const json = await res.json();
      const promo = json?.data?.data?.[0];

      if (!promo) {
        alert("Promo code not found.");
        return;
      }

      if (promo.status.toLowerCase() !== "active") {
        alert("Promo code is not active.");
        return;
      }

      let calcDiscount = 0;

      if (promo.type.toLowerCase() === "percentage") {
        calcDiscount = (subtotal * parseFloat(promo.amount)) / 100;
      } else {
        calcDiscount = parseFloat(promo.amount);
      }

      setDiscount(calcDiscount);
      setPromoApplied(true);

      alert(`Promo applied! You saved $${calcDiscount.toFixed(2)}.`);
    } catch (error) {
      console.error("Error applying promo:", error);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 border-b pb-6"
              >
                <Image
                  src={
                    `${process.env.NEXT_PUBLIC_API_URL}/${item.image}` ||
                    "/placeholder.svg"
                  }
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>

                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold">${item.price}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Link href="/products" className="mt-6 inline-block">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="bg-[#F5E6D3] p-6 rounded-lg h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Promo Discount</span>
                  <span>- ${discount.toFixed(2)}</span>
                </div>
              )}
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-4">
              <Input
                placeholder="Promo Code"
                onChange={(e) => setPromocode(e.target.value)}
                className="mb-2"
              />
              <Button
                onClick={handelSubmited}
                variant="outline"
                className="w-full"
              >
                Apply
              </Button>
            </div>

            <Link href="/checkout">
              <Button className="w-full bg-black text-white hover:bg-gray-800">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
