"use client";

import { useState } from "react";
import AccountHeader from "./_components/account-header";
import UserInformation from "./_components/user-information";
import ShippingAddress from "./_components/shipping-address";
import ChangePassword from "./_components/change-password";
import OrderCard from "./_components/order-card";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AccountHeader activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "profile" && (
          <div className="space-y-[60px]">
            <UserInformation />
            <ShippingAddress />
            <ChangePassword />
            {/* <AccountFooter /> */}
          </div>
        )}

        {activeTab === "orders" && (
          <div className=" p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Order History
            </h2>
            <OrderCard />
          </div>
        )}
      </div>
    </div>
  );
}
