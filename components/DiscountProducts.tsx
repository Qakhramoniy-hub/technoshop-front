// components/DiscountProducts.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, ShoppingCart, Star, Tag } from "lucide-react";
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
        {/* Discount Badge */}
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1.5 shadow-lg">
          <Tag className="h-3.5 w-3.5 text-white" />
          <span className="text-xs font-bold text-white">50% OFF</span>
        </div>

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
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                <span className="text-sm text-gray-400 line-through">${(product.price * 2).toFixed(2)}</span>
              </div>
              {product.rating && (
                <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-amber-700">{product.rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-4 py-3 text-sm font-bold text-white transition-all hover:from-red-600 hover:to-pink-600 hover:shadow-lg active:scale-95"
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

const DiscountProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const PRODUCT_COUNT = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://dummyjson.com/products?limit=${PRODUCT_COUNT}`);
        setProducts(res.data.products);
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

  if (loading) {
    return (
      <section className="w-full px-4 lg:px-8 xl:px-[160px] py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-red-500"></div>
          <p className="text-sm font-medium text-gray-600">Loading deals...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full px-4 lg:px-8 xl:px-[160px] py-16">
        <p className="text-center text-red-600 font-semibold">{error}</p>
      </section>
    );
  }

  return (
    <section className="w-full px-4 lg:px-8 xl:px-[160px] py-16">
      <div className="flex items-center gap-3 mb-10">
        <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 shadow-lg">
          <Tag className="h-5 w-5 text-white" />
          <h1 className="text-xl font-bold text-white">Hot Deals</h1>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Discounts up to -50%</h2>
      </div>
      
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">No discount products found</p>
        )}
      </div>
    </section>
  );
};

export default DiscountProducts;
