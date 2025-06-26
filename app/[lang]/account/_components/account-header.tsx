"use client"

import { Button } from "@/components/ui/button"

interface AccountHeaderProps {
  activeTab: "profile" | "orders"
  onTabChange: (tab: "profile" | "orders") => void
}

export default function AccountHeader({ activeTab, onTabChange }: AccountHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Account</h1>
      <div className="flex gap-3">
        <Button
          variant={activeTab === "profile" ? "default" : "outline"}
          onClick={() => onTabChange("profile")}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === "profile"
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Profile
        </Button>
        <Button
          variant={activeTab === "orders" ? "default" : "outline"}
          onClick={() => onTabChange("orders")}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === "orders"
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Order History
        </Button>
      </div>
    </div>
  )
}
