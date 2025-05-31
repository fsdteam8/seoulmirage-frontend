"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderHeaderProps {
  orderNumber: string;
  orderDate: string;
  status: string;
  activeTab: "summary" | "shipping";
  onTabChange: (tab: "summary" | "shipping") => void;
  onBackToAccount: () => void;
}

export default function OrderHeader({
  orderNumber,
  orderDate,
  status,
  activeTab,
  onTabChange,
  onBackToAccount,
}: OrderHeaderProps) {
  return (
    <div className="mb-6">
      {/* Back to Account Link */}
      <button
        onClick={onBackToAccount}
        className="flex items-center text-gray-700 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Account
      </button>

      {/* Order Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{orderNumber}</h1>
          <p className="text-sm text-gray-600">{orderDate}</p>
        </div>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          {status}
        </span>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-3">
        <Button
          variant={activeTab === "summary" ? "default" : "outline"}
          onClick={() => onTabChange("summary")}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === "summary"
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Summary
        </Button>
        <Button
          variant={activeTab === "shipping" ? "default" : "outline"}
          onClick={() => onTabChange("shipping")}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === "shipping"
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Shipping
        </Button>
      </div>
    </div>
  );
}
