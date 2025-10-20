"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  getCartProducts,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  CartProduct,
} from "@/utils/localStorage";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // --- Cart ma'lumotlarini olish
  const fetchCartData = () => {
    const data = getCartProducts();
    setCartItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCartData();
    window.addEventListener("localStorageChange", fetchCartData);
    return () => {
      window.removeEventListener("localStorageChange", fetchCartData);
    };
  }, []);

  // --- Jami hisoblash
  const { subtotal, totalItems } = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, totalItems };
  }, [cartItems]);

  const shippingCost = 15;
  const finalTotal = subtotal + shippingCost;

  // --- Miqdorni o‘zgartirish
  const handleQuantityChange = (id: number, change: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    const newQty = item.quantity + change;
    updateCartQuantity(id, newQty);
    fetchCartData();
  };

  // --- Mahsulotni o‘chirish
  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
    fetchCartData();
  };

  // --- Savatni tozalash
  const handleClearCart = () => {
    clearCart();
    fetchCartData();
  };

  // --- Loading holati
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-6 w-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
            ></path>
          </svg>
          <span className="text-lg font-medium text-gray-700">
            Savat yuklanmoqda...
          </span>
        </div>
      </div>
    );
  }

  // --- Bo‘sh savat holati
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Savat bo&apos;sh 😔
        </h1>
        <p className="text-gray-500 mb-8">
          Xaridni davom ettirish uchun mahsulotlarni qo‘shing.
        </p>
        <Link
          href="/"
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Asosiy sahifaga qaytish
        </Link>
      </div>
    );
  }

  // --- Asosiy sahifa
  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Savat ({totalItems} ta mahsulot)
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- Savat mahsulotlari --- */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center sm:items-start py-4 border-b last:border-b-0 gap-4"
              >
                {/* Mahsulot rasmi va info */}
                <div className="flex items-center gap-4 flex-1 w-full">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} / dona
                    </p>

                    {/* Miqdor o‘zgartirish */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        disabled={item.quantity <= 1}
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50 transition"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Narx va o‘chirish tugmasi */}
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                  <div className="text-lg font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 rounded-full hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            ))}

            {/* Savatni tozalash */}
            <div className="mt-6">
              <button
                onClick={handleClearCart}
                className="flex items-center gap-2 text-red-600 font-medium hover:text-red-700 transition"
              >
                <Trash2 className="w-5 h-5" />
                Savatni tozalash
              </button>
            </div>
          </div>
        </div>

        {/* --- Buyurtma tafsilotlari --- */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Buyurtma tafsilotlari
            </h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Jami ({totalItems} ta mahsulot):</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Yetkazib berish:</span>
                <span className="font-medium">${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-800 border-t pt-4 mt-4">
                <span>Umumiy:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="w-full mt-6 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Buyurtmani rasmiylashtirish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
