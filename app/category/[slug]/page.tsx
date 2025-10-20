"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, ShoppingCart, Star, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toggleLike, isLiked, addToCart, LikedProduct } from "@/utils/localStorage";

type Product = LikedProduct & {
  brand?: string;
  category?: string;
};

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
    addToCart({ id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail }, 1);
    router.push("/cart");
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 transition-all hover:shadow-2xl hover:border-gray-300 hover:-translate-y-1 duration-300">
        <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <Image src={product.thumbnail} alt={product.title} fill className="object-contain p-6 transition-transform group-hover:scale-110 duration-500" />
          <button onClick={toggleFavorite} className="absolute right-3 top-3 rounded-full bg-white/95 backdrop-blur-sm p-2.5 shadow-lg transition-all hover:scale-110 hover:bg-white z-10">
            <HeartIcon className={`h-5 w-5 transition-all ${isFavorite ? "fill-red-500 text-red-500 scale-110" : "text-gray-600 hover:text-red-500"}`} />
          </button>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-3 line-clamp-2 text-base font-bold text-gray-900 group-hover:text-black min-h-[48px]">{product.title}</h3>
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
            <button onClick={handleAddToCart} className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-bold text-white transition-all hover:bg-gray-800 hover:shadow-lg active:scale-95">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function CategoryPage() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "rating">("default");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://dummyjson.com/products/category/${slug}`);
        setProducts(res.data.products);
        setError(null);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  const sortedProducts = React.useMemo(() => {
    const productsCopy = [...products];
    switch (sortBy) {
      case "price-asc":
        return productsCopy.sort((a, b) => a.price - b.price);
      case "price-desc":
        return productsCopy.sort((a, b) => b.price - a.price);
      case "rating":
        return productsCopy.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return productsCopy;
    }
  }, [products, sortBy]);

  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
        <p className="text-sm font-medium text-gray-600">Loading {categoryName}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-red-600 font-semibold text-lg">{error}</p>
        <Link href="/">
          <button className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all">
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full px-4 lg:px-8 xl:px-[160px] py-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{categoryName}</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-gray-600">
            Showing <span className="font-bold text-black">{products.length}</span> product{products.length !== 1 ? 's' : ''}
          </p>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 outline-none transition-all hover:border-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="rounded-full bg-gray-100 p-6 mb-6">
            <Filter className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No products in this category</h3>
          <Link href="/">
            <button className="mt-4 px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all">
              Back to Home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
