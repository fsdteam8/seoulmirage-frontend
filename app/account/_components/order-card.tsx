import Link from "next/link";
import React from "react";

const OrderCard = () => {
  return (
    <div className="w-full  mx-auto border rounded-xl shadow-sm p-4 space-y-4 text-sm sm:text-base">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="space-y-1">
          <p className="font-medium">Order ORD-12345</p>
          <p className="text-gray-500 text-sm">May 15, 2023</p>
        </div>
        <div className="flex flex-col sm:items-end sm:text-right mt-2 sm:mt-0">
          <p className="font-medium text-green-600">Delivered</p>
          <p className="text-gray-800 font-semibold text-sm mt-1">$59.97</p>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-1">
        <div className="flex justify-between text-gray-700">
          <span>Hydrating Cleanser x 1</span>
          <span>$10.00</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Moisturizing Cream x 3</span>
          <span>$49.00</span>
        </div>
      </div>

      {/* Button */}
      <div>
        <Link href={"/order/details/id"}>
          <button className="w-full border rounded-md py-2 text-center text-gray-700 hover:bg-gray-100 transition">
            View Order Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
