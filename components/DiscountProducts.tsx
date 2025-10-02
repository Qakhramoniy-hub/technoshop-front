"use client";

import React, { useState } from "react";
import Image from "next/image";
import Iphone from "@/assets/icons/Iphone 14 pro.svg";
import Applewatch from "@/assets/icons/Applewatch.svg";
import Headphone from "@/assets/icons/Headphone.svg";
import Samsung from "@/assets/icons/Samsung.svg";
import { HeartIcon } from "lucide-react";

const productsData = [
  {
    name: "Apple iPhone 14 Pro Max 128GB Deep Purple",
    price: "$900",
    image: Iphone,
    alt: "iPhone 14 Pro Max",
    width: 160,
    height: 160,
  },

  {
    name: "Apple Watch Series 9 GPS 41mm Starlight Aluminium",
    price: "$399",
    image: Applewatch,
    alt: "Apple Watch Series 9",
    width: 160,
    height: 160,
  },
  {
    name: "AirPods Max Silver Starlight Aluminium",
    price: "549",
    image: Headphone,
    alt: "AirPods Max",
    width: 160,
    height: 160,
  },

  {
    name: "Galaxy Z Fold5 Unlocked | 256GB | Phantom Black",
    price: "$1799",
    image: Samsung,
    alt: "Galaxy Z Fold5",
    width: 160,
    height: 160,
  },
];

// ProductCard komponenti alohida qoldi
const ProductCard = ({ product }) => {
  // Yurak holatini boshqarish uchun useState ishlatiladi
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    // Barcha mahsulot kartalari uchun bir xil UI
    <div
      className="
      bg-white
      rounded-xl
      shadow-lg
      hover:shadow-xl
      transition-shadow duration-300
      w-full
      p-4
      flex flex-col
      items-center
      gap-3
      relative
      group
    "
    >
      {/* Rasmlar bloki */}
      <div
        className="
        bg-[#F4F4F4]
        rounded-lg
        w-full
        h-64
        flex
        items-center
        justify-center
        relative
        mb-2
      "
      >
        <HeartIcon
          onClick={toggleFavorite} // Klik funksiyasi qo'shildi
          // isFavorite holatiga qarab sinflar o'zgartirildi
          className={`
            absolute top-4 right-4
            w-6 h-6
            cursor-pointer
            transition-all duration-200
            ${
              isFavorite
                ? "text-red-500 fill-red-500" // Bosilgan: Ichi to'liq qizil
                : "text-gray-400 hover:text-red-500 hover:fill-red-200" // Bosilmagan: Kontur kulrang, hoverda och-qizil
            }
          `}
        />
        <Image
          src={product.image}
          alt={product.alt}
          width={product.width}
          height={product.height}
          className="object-contain max-h-48"
        />
      </div>

      {/* Mahsulot nomi va narxi */}
      <h2 className="text-base font-semibold text-center h-12 overflow-hidden px-2">
        {product.name}
      </h2>
      <h1 className="text-xl font-bold text-black mt-2">{product.price}</h1>

      {/* "Buy Now" button */}
      <button
        className="
        w-full
        py-3
        bg-black
        text-white
        rounded-lg
        font-medium
        hover:bg-gray-800
        transition-all duration-200
        transform
        scale-100 group-hover:scale-[1.02]
      "
      >
        Buy Now
      </button>
    </div>
  );
};

// Asosiy Products komponenti
const DiscountProducts = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Kategoriya navigatsiyasi */}
      <h1 className="text-[24px] font-semibold">Discounts up to -50%</h1>
      {/* Mahsulotlar to'ri */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {productsData.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default DiscountProducts;
