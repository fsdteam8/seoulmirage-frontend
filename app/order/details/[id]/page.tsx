"use client";
import React, { useState } from "react";
import OrderHeader from "./_components/order-header";
import { useRouter } from "next/navigation";
import OrderItems from "./_components/order-items";
import ShippingInformation from "./_components/shipping-information";
import ShippingDetails from "./_components/shipping-details";

const Page = () => {
  const [activeTab, setActiveTab] = useState<"summary" | "shipping">("summary");
  const router = useRouter();
  const orderData = {
    orderNumber: "Order ORD-12345",
    orderDate: "Placed on May 15, 2023",
    status: "Shipped",
    items: [
      {
        id: "1",
        name: "Hydrating Essence",
        image: "/placeholder.svg?height=64&width=64",
        quantity: 1,
        price: 48,
      },
      {
        id: "2",
        name: "Nourishing Cream",
        image: "/placeholder.svg?height=64&width=64",
        quantity: 1,
        price: 48,
      },
    ],
    pricing: {
      subtotal: 152.0,
      discount: 5.99,
      shipping: 5.99,
      tax: 15.99,
      total: 157.99,
    },
    shippingAddress: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      apartment: "Apt 4B",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    shippingMethod: "Standard Shipping (5-7 business days)",
    trackingNumber: "1Z999AA10123456784",
    estimatedDelivery: "May 27-29, 2023",
  };
  const handleBackToAccount = () => {
    router.push("/account");
  };

  return (
    <div>
      <div className="min-h-screen bg-[#f5e6d3] py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <OrderHeader
              orderNumber={orderData.orderNumber}
              orderDate={orderData.orderDate}
              status={orderData.status}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onBackToAccount={handleBackToAccount}
            />

            {activeTab === "summary" && (
              <>
                <OrderItems items={orderData.items} />
                <ShippingInformation
                  subtotal={orderData.pricing.subtotal}
                  discount={orderData.pricing.discount}
                  shipping={orderData.pricing.shipping}
                  tax={orderData.pricing.tax}
                  total={orderData.pricing.total}
                />
              </>
            )}

            {activeTab === "shipping" && (
              <ShippingDetails
                address={orderData.shippingAddress}
                shippingMethod={orderData.shippingMethod}
                trackingNumber={orderData.trackingNumber}
                estimatedDelivery={orderData.estimatedDelivery}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
