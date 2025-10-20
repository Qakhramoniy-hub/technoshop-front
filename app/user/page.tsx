"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User, ShoppingBag, Heart, LogOut, Settings } from "lucide-react";
import {
  getLikedProducts,
  getCartProducts,
  CartProduct,
} from "@/utils/localStorage";

// InputField Component
interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
}: InputFieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-black focus:border-black transition duration-200"
      aria-required="true"
    />
  </div>
);

// ProfileDetails Component
const ProfileDetails = () => {
  const [formData, setFormData] = useState({
    fullName: "Alijon Valiyev",
    email: "alijon@example.com",
    phone: "+998 90 123 45 67",
    address: "Toshkent, Chilonzor 5-uy",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic email validation
    if (!formData.email.includes("@")) {
      setError("Iltimos, to&apos;g&apos;ri email kiriting.");
      return;
    }
    if (!formData.fullName || !formData.phone || !formData.address) {
      setError("Iltimos, barcha maydonlarni to&apos;ldiring.");
      return;
    }
    // Save to localStorage (or API in a real app)
    localStorage.setItem("userProfile", JSON.stringify(formData));
    setError(null);
    alert("Ma&apos;lumotlar saqlandi!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold border-b pb-3 mb-4">
        Shaxsiy Ma&apos;lumotlar
      </h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <form className="space-y-6 max-w-lg" onSubmit={handleSubmit}>
        <InputField
          id="fullName"
          label="To&apos;liq Ism"
          value={formData.fullName}
          onChange={handleChange}
        />
        <InputField
          id="email"
          label="Email Manzil"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          id="phone"
          label="Telefon Raqam"
          value={formData.phone}
          onChange={handleChange}
        />
        <InputField
          id="address"
          label="Asosiy Manzil"
          value={formData.address}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300"
        >
          Ma&apos;lumotlarni Saqlash
        </button>
      </form>
    </div>
  );
};

// OrdersHistory Component
const OrdersHistory = () => {
  const orders = getCartProducts(); // Use cartProducts as a proxy for orders

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold border-b pb-3 mb-4">
        Buyurtmalar Tarixi
      </h2>
      {orders.length > 0 ? (
        orders.map((order: CartProduct, index: number) => (
          <div
            key={order.id}
            className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200"
          >
            <p className="font-semibold text-lg">
              Buyurtma #{order.id}
              {index + 1}
            </p>
            <p className="text-sm text-gray-600">
              Mahsulot: {order.title} | Umumiy Summa: $
              {(order.price * order.quantity).toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">
              Rang: {order.selectedColor || "N/A"} | Xotira:{" "}
              {order.selectedStorage || "N/A"}
            </p>
            <p className="mt-2 text-sm text-green-600 font-medium">
              Holati: Yetkazib Berildi
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Hozircha buyurtmalar mavjud emas.</p>
      )}
    </div>
  );
};

// Wishlist Component
const Wishlist = () => {
  const wishlist = getLikedProducts();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold border-b pb-3 mb-4">
        Sevimlilar Ro&apos;yxati
      </h2>
      {wishlist.length > 0 ? (
        wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200"
          >
            <p className="font-semibold text-lg">{item.title}</p>
            <p className="text-sm text-gray-600">
              Narx: ${item.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">Reyting: {item.rating}/5</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Sevimlilar ro&apos;yxatida mahsulotlar yo&apos;q.</p>
      )}
    </div>
  );
};

// SettingsTab Component
const SettingsTab = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold border-b pb-3 mb-4">Hisob Sozlamalari</h2>
    <p className="text-gray-600">
      Parolni o&apos;zgartirish, xabarnomalar va boshqa sozlamalar.
    </p>
    {/* Add settings form or options here in the future */}
  </div>
);

// LogoutAction Component
const LogoutAction = () => {
  const router = useRouter();

  const handleLogout = useCallback(() => {
    // Clear user-related localStorage (e.g., profile, cart, wishlist)
    localStorage.removeItem("userProfile");
    localStorage.removeItem("likedProducts");
    localStorage.removeItem("cartProducts");
    router.push("/login");
  }, [router]);

  return (
    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
      <button
        onClick={handleLogout}
        className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-300"
      >
        Tizimdan Chiqish
      </button>
    </div>
  );
};

// Navigation Items
const profileNavItems = [
  {
    id: "profile",
    label: "Mening Profilim",
    icon: User,
    component: ProfileDetails,
  },
  {
    id: "orders",
    label: "Buyurtmalarim",
    icon: ShoppingBag,
    component: OrdersHistory,
  },
  { id: "wishlist", label: "Sevimlilar", icon: Heart, component: Wishlist },
  {
    id: "settings",
    label: "Sozlamalar",
    icon: Settings,
    component: SettingsTab,
  },
  {
    id: "logout",
    label: "Chiqish",
    icon: LogOut,
    component: LogoutAction,
    isAction: true,
  },
];

// Main ProfilePage Component
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  return (
    <div className="w-full px-4 py-16 bg-white">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 border-b pb-4">
        Foydalanuvchi Kabineti
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-2 bg-gray-50 p-6 rounded-xl shadow-lg h-min">
          {profileNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`
                flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 w-full text-left
                ${
                  activeTab === item.id
                    ? "bg-black text-white font-semibold shadow-md"
                    : item.isAction
                    ? "text-red-500 hover:bg-red-50"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
              aria-label={item.label}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          {React.createElement(
            profileNavItems.find((item) => item.id === activeTab)?.component ||
              ProfileDetails
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
