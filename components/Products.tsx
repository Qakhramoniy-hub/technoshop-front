// components/Products.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, ShoppingCart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  toggleLike,
  isLiked,
  addToCart,
  LikedProduct,
} from "@/utils/localStorage";

type Product = LikedProduct;

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isLiked(product.id));
  }, [product.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(product);
    setIsFavorite((prev) => !prev);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      },
      1
    );
    router.push("/cart");
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 transition-all hover:shadow-2xl hover:border-gray-300 hover:-translate-y-1 duration-300">
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-contain p-6 transition-transform group-hover:scale-110 duration-500"
          />
          
          {/* Like Button */}
          <button
            onClick={toggleFavorite}
            className="absolute right-3 top-3 rounded-full bg-white/95 backdrop-blur-sm p-2.5 shadow-lg transition-all hover:scale-110 hover:bg-white z-10"
          >
            <HeartIcon
              className={`h-5 w-5 transition-all ${
                isFavorite ? "fill-red-500 text-red-500 scale-110" : "text-gray-600 hover:text-red-500"
              }`}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-3 line-clamp-2 text-base font-bold text-gray-900 group-hover:text-black min-h-[48px]">
            {product.title}
          </h3>
          
          <div className="mt-auto space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">${product.price}</span>
              {product.rating && (
                <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-amber-700">{product.rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-bold text-white transition-all hover:bg-gray-800 hover:shadow-lg active:scale-95"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Products = () => {
  const [activeTab, setActiveTab] = useState<"new_arrival" | "bestseller" | "featured">("new_arrival");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const PRODUCT_COUNT = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://dummyjson.com/products?limit=${PRODUCT_COUNT}`);
        setAllProducts(res.data.products);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const currentProducts = useMemo((): Product[] => {
    const products = [...allProducts];
    switch (activeTab) {
      case "bestseller":
        return products.sort((a, b) => b.rating - a.rating);
      case "featured":
        return products.sort((a, b) => b.price - a.price);
      case "new_arrival":
      default:
        return products.sort((a, b) => b.id - a.id);
    }
  }, [activeTab, allProducts]);

  if (loading) {
    return (
      <section className="w-full px-4 lg:px-8 xl:px-[160px] py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
          <p className="text-sm font-medium text-gray-600">Loading amazing products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full px-4 lg:px-8 xl:px-[160px] py-16">
        <div className="text-center">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      </section>
    );
  }

  const tabs = [
    { key: "new_arrival" as const, label: "New Arrival" },
    { key: "bestseller" as const, label: "Bestseller" },
    { key: "featured" as const, label: "Featured Products" },
  ];

  return (
    <section className="w-full px-4 lg:px-8 xl:px-[160px] py-16">
      {/* Tabs */}
      <div className="mb-10 flex items-center gap-8 overflow-x-auto border-b-2 border-gray-200 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative whitespace-nowrap pb-4 text-lg md:text-2xl font-bold transition-all ${
              activeTab === tab.key
                ? "text-black"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
