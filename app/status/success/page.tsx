// app/status/success/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, ListOrdered } from "lucide-react";
import Link from "next/link";
import React from "react";

// Mock buyurtma ma'lumotlari
const MOCK_ORDER_ID = "ORD-75630982";
const MOCK_TOTAL_AMOUNT = "217 9.50";

const SuccessPage = () => {
  return (
    <div className="container mx-auto max-w-4xl py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 md:p-16 rounded-xl shadow-2xl w-full text-center border border-green-100">
        {/* Status Ikoni */}
        <div className="flex justify-center mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 stroke-1" />
        </div>

        {/* Sarlavha va Xabar */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Order Successful!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your order has been placed and confirmed.
        </p>

        {/* Buyurtma Ma'lumotlari */}
        <div className="bg-green-50 p-6 rounded-lg mb-10 border border-green-200">
          <div className="flex justify-between items-center py-2 border-b border-green-200">
            <span className="text-lg font-semibold text-gray-700">
              Order Number:
            </span>
            <span className="text-xl font-bold text-green-600">
              {MOCK_ORDER_ID}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-lg font-semibold text-gray-700">
              Total Paid:
            </span>
            <span className="text-2xl font-extrabold text-gray-900">
              ${MOCK_TOTAL_AMOUNT}
            </span>
          </div>
        </div>

        <p className="text-md text-gray-500 mb-12">
          You will receive an email confirmation with delivery details shortly.
        </p>

        {/* Harakat Tugmalari */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/">
            <Button className="w-full sm:w-auto px-8 py-3 text-lg bg-black-600 hover:bg-black-700 transition-all shadow-md flex items-center gap-2">
              <Home className="w-5 h-5" />
              Continue Shopping
            </Button>
          </Link>

          <Link href="/account/orders">
            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 py-3 text-lg border-gray-300 text-gray-700 hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              <ListOrdered className="w-5 h-5" />
              View Order History
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
