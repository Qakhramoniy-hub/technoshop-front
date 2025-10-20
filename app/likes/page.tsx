"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "lucide-react";
import {
  getLikedProducts,
  toggleLike,
  LikedProduct,
} from "@/utils/localStorage";

// --- ProductCard komponenti (Likes sahifasi uchun moslashtirilgan) ---
// Bu Products.tsx dagi kabi ProductCard komponentiga o'xshash
const LikedProductCard = ({
  product,
  onRemove,
}: {
  product: LikedProduct;
  onRemove: () => void;
}) => {
  // Bu yerda isFavorite har doim true bo'ladi, lekin bizga uni o'chirish kerak

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toggleLike(product);
    // O'chirilgandan so'ng, ro'yxatni yangilash uchun callback chaqiramiz
    onRemove();
  };

  const productLink = `/products/${product.id}`;

  return (
    <Link href={productLink} passHref>
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
                    cursor-pointer
                "
      >
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
          {/* O'chirish ikonasi (doimo qizil/to'liq) */}
          <HeartIcon
            onClick={toggleFavorite}
            className={`
                            absolute top-4 right-4
                            w-6 h-6
                            cursor-pointer
                            transition-all duration-200
                            text-red-500 fill-red-500 hover:text-red-700 hover:fill-red-700
                        `}
          />
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={160}
            height={160}
            className="object-contain max-h-48"
          />
        </div>

        <h2 className="text-base font-semibold text-center h-12 overflow-hidden px-2">
          {product.title}
        </h2>
        <h1 className="text-xl font-bold text-black mt-2">
          ${Math.round(product.price)}
        </h1>

        <div
          className="
                        w-full
                        py-3
                        bg-black
                        text-white
                        rounded-lg
                        font-medium
                        text-center
                        hover:bg-gray-800
                        transition-all duration-200
                        transform
                        scale-100 group-hover:scale-[1.02]
                    "
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            alert(`${product.title} savatga qo'shildi!`);
          }}
        >
          Buy Now
        </div>
      </div>
    </Link>
  );
};

// --- Asosiy Likes sahifasi komponenti ---
const LikesPage = () => {
  const [likedProducts, setLikedProducts] = useState<LikedProduct[]>([]);

  // Yoqtirilgan mahsulotlarni yuklash
  const loadLikedProducts = () => {
    setLikedProducts(getLikedProducts());
  };

  useEffect(() => {
    loadLikedProducts();

    // Agar boshqa sahifada like bosilsa, bu sahifa ham yangilanadi
    window.addEventListener("localStorageChange", loadLikedProducts);

    return () => {
      window.removeEventListener("localStorageChange", loadLikedProducts);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-10 border-b pb-4">
        Yoqtirilgan Mahsulotlar ({likedProducts.length})
      </h1>

      {likedProducts.length === 0 ? (
        <div className="text-center py-20">
          <HeartIcon size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600">
            Hozircha yoqtirilgan mahsulotlar yo&apos;q. Bosh sahifadan mahsulot
            tanlang!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {likedProducts.map((product) => (
            <LikedProductCard
              key={product.id}
              product={product}
              onRemove={loadLikedProducts} // O'chirilgandan keyin ro'yxatni qayta yuklash
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikesPage;
