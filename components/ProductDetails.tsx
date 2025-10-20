// components/ProductDetails.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HeartIcon,
  CheckCircle,
  Home,
  Shield,
  Monitor,
  Cpu,
  BatteryCharging,
  Star,
  Truck,
} from "lucide-react";
import axios from "axios";
import {
  toggleLike,
  isLiked,
  addToCart,
  LikedProduct,
} from "@/utils/localStorage";

interface ApiProduct extends LikedProduct {
  description: string;
  discountPercentage: number;
  stock: number;
  brand: string;
  category: string;
  images: string[];
}

interface ProductDetails {
  id: number;
  name: string;
  currentPrice: number;
  oldPrice: number;
  description: string;
  thumbnail: string;
  images: string[];
  colors: { name: string; hex: string; border?: boolean }[];
  storage: string[];
  specs: { label: string; value: string | number; icon: React.ComponentType<{ className?: string }> }[];
  stock: number;
  rating: number;
  discountPercentage: number;
}

const DUMMY_DATA = {
  colors: [
    { name: "Deep Purple", hex: "#4B4453" },
    { name: "Red", hex: "#FF0000" },
    { name: "Black", hex: "#000000" },
    { name: "Yellow", hex: "#FFD700" },
    { name: "White", hex: "#FFFFFF", border: true },
  ],
  storage: ["128GB", "256GB", "512GB", "1TB"],
};

const InfoBlock = ({ 
  icon: Icon, 
  title, 
  detail, 
  detailClasses 
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  title: string; 
  detail: string; 
  detailClasses?: string;
}) => (
  <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-all">
    <div className="rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 p-3">
      <Icon className="h-5 w-5 text-gray-700" />
    </div>
    <div className="text-sm">
      <p className="text-gray-500 text-xs">{title}</p>
      <p className={`font-bold ${detailClasses}`}>{detail}</p>
    </div>
  </div>
);

const ProductDetailPage = () => {
  const pathname = usePathname();
  const productId = useMemo(() => {
    const segments = pathname.split("/");
    const id = segments[segments.length - 1];
    return Number(id);
  }, [pathname]);

  const [productData, setProductData] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(DUMMY_DATA.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(DUMMY_DATA.storage[3]);
  const [isWishlistAdded, setIsWishlistAdded] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [cartMessage, setCartMessage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (productData) {
      setIsWishlistAdded(isLiked(productData.id));
      const cart = JSON.parse(localStorage.getItem("cartProducts") || "[]");
      setIsInCart(cart.some((item: { id: number }) => item.id === productData.id));
      setSelectedImage(productData.thumbnail);
    }
  }, [productData]);

  useEffect(() => {
    const handleStorageChange = () => {
      if (productData) {
        setIsWishlistAdded(isLiked(productData.id));
        const cart = JSON.parse(localStorage.getItem("cartProducts") || "[]");
        setIsInCart(cart.some((item: { id: number }) => item.id === productData.id));
      }
    };

    window.addEventListener("localStorageChange", handleStorageChange);
    return () => window.removeEventListener("localStorageChange", handleStorageChange);
  }, [productData]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId || isNaN(productId)) {
        setError("Invalid product ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`https://dummyjson.com/products/${productId}`);
        setProductData(res.data);
        setError(null);
      } catch (err) {
        console.error("Error loading product:", err);
        setError(`Failed to load product (ID: ${productId})`);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToWishlist = () => {
    if (!productData) return;
    toggleLike({
      id: productData.id,
      title: productData.title,
      price: productData.price,
      thumbnail: productData.thumbnail,
      rating: productData.rating,
    });
    setIsWishlistAdded(!isWishlistAdded);
  };

  const handleAddToCart = () => {
    if (!productData) return;
    const cartItem = {
      id: productData.id,
      title: productData.title,
      price: productData.price,
      thumbnail: productData.thumbnail,
      selectedColor: selectedColor.name,
      selectedStorage: selectedStorage,
    };
    addToCart(cartItem, 1);
    setCartMessage(isInCart ? "Quantity updated!" : "Added to cart!");
    setIsInCart(true);
    setTimeout(() => setCartMessage(null), 3000);
  };

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  const product: ProductDetails | null = useMemo(() => {
    if (!productData) return null;

    const finalPrice = productData.price;
    const originalPrice = Math.round(finalPrice / (1 - productData.discountPercentage / 100));

    const specs = [
      { label: "Brand", value: productData.brand, icon: Home },
      { label: "Rating", value: `${productData.rating}/5`, icon: CheckCircle },
      { label: "Stock", value: productData.stock, icon: Shield },
      { label: "Category", value: productData.category, icon: Cpu },
      { label: "Screen", value: '6.7"', icon: Monitor },
      { label: "Battery", value: "4323 mAh", icon: BatteryCharging },
    ];

    return {
      id: productData.id,
      name: productData.title,
      currentPrice: finalPrice,
      oldPrice: originalPrice,
      description: productData.description,
      thumbnail: productData.thumbnail,
      images: productData.images,
      colors: DUMMY_DATA.colors,
      storage: DUMMY_DATA.storage,
      specs,
      stock: productData.stock,
      rating: productData.rating,
      discountPercentage: productData.discountPercentage,
    };
  }, [productData]);

  if (loading) {
    return (
      <div className="w-full px-4 lg:px-8 xl:px-[160px] min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
        <p className="text-lg font-semibold text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-full px-4 lg:px-8 xl:px-[160px] min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-red-600 font-semibold">{error || "Product not found"}</p>
        <Link href="/">
          <button className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all">
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full px-4 lg:px-8 xl:px-[160px] py-12">
      {/* Success Message */}
      {cartMessage && (
        <div className="fixed right-4 top-24 z-50 rounded-xl bg-green-500 px-6 py-4 text-white shadow-2xl animate-in slide-in-from-right">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold">{cartMessage}</span>
          </div>
        </div>
      )}

      <div className="grid gap-8 lg:gap-12 xl:grid-cols-2">
        {/* Images Section */}
        <div className="flex gap-4">
          {/* Thumbnails - Desktop only */}
          <div className="hidden xl:flex flex-col gap-3">
            {product.images.slice(0, 4).map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(image)}
                className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-all ${
                  selectedImage === image 
                    ? "border-black shadow-lg scale-105" 
                    : "border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-400"
                }`}
              >
                <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-contain p-1" />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl">
              <div className="relative aspect-square">
                <Image
                  src={selectedImage || product.thumbnail}
                  alt={product.name}
                  fill
                  className="object-contain p-8 lg:p-12"
                  priority
                />
              </div>
            </div>

            {/* Mobile Thumbnails */}
            <div className="flex xl:hidden gap-3 mt-4 overflow-x-auto pb-2">
              {product.images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(image)}
                  className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === image ? "border-black" : "border-gray-200 opacity-60"
                  }`}
                >
                  <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-contain p-1" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-8">
          {/* Title & Price */}
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">${product.currentPrice}</span>
                {product.oldPrice > product.currentPrice && (
                  <span className="text-xl text-gray-400 line-through">${product.oldPrice}</span>
                )}
              </div>
              {product.discountPercentage > 0 && (
                <div className="rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 shadow-lg">
                  <span className="text-sm font-bold text-white">-{Math.round(product.discountPercentage)}%</span>
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-semibold text-gray-600">
                {product.rating.toFixed(1)} / 5
              </span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed border-l-4 border-gray-200 pl-4">{product.description}</p>

          {/* Color Selection */}
          <div className="space-y-4">
            <p className="font-bold text-gray-900">Select Color</p>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setSelectedColor(color)}
                  className={`group relative h-12 w-12 rounded-full transition-all hover:scale-110 ${
                    color.border ? "border-2 border-gray-300" : ""
                  } ${selectedColor.hex === color.hex ? "ring-4 ring-black ring-offset-2" : ""}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColor.hex === color.hex && (
                    <CheckCircle className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-black text-white p-0.5" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500">Selected: <span className="font-semibold text-gray-900">{selectedColor.name}</span></p>
          </div>

          {/* Storage Selection */}
          <div className="space-y-4">
            <p className="font-bold text-gray-900">Storage Capacity</p>
            <div className="grid grid-cols-2 sm:flex gap-3">
              {product.storage.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedStorage(size)}
                  className={`rounded-xl border-2 px-6 py-3 font-bold transition-all hover:scale-105 ${
                    selectedStorage === size
                      ? "border-black bg-black text-white shadow-lg"
                      : "border-gray-200 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {product.specs.map((spec) => (
              <div key={spec.label} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-3 hover:shadow-md transition-all">
                <spec.icon className="h-5 w-5 text-gray-600" />
                <div className="text-xs">
                  <p className="text-gray-500">{spec.label}</p>
                  <p className="font-bold text-gray-900">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToWishlist}
              className={`flex-1 rounded-xl border-2 py-4 font-bold transition-all hover:scale-105 hover:shadow-lg ${
                isWishlistAdded
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-gray-200 text-gray-900 hover:border-red-500 hover:text-red-500"
              }`}
            >
              <HeartIcon className={`mx-auto h-6 w-6 ${isWishlistAdded ? "fill-white" : ""}`} />
            </button>
            <button
              onClick={handleAddToCart}
              className={`flex-[3] rounded-xl py-4 font-bold text-white transition-all hover:scale-105 hover:shadow-xl ${
                isInCart
                  ? "bg-gray-600"
                  : "bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black"
              }`}
            >
              {isInCart ? "✓ Added to Cart" : "Add to Cart"}
            </button>
          </div>

          {/* Info Blocks */}
          <div className="grid grid-cols-3 gap-3">
            <InfoBlock icon={Truck} title="Delivery" detail="1-2 days" detailClasses="text-green-600" />
            <InfoBlock icon={Home} title="In Stock" detail={product.stock > 0 ? "Available" : "Out"} detailClasses={product.stock > 0 ? "text-green-600" : "text-red-600"} />
            <InfoBlock icon={Shield} title="Warranty" detail="1 year" detailClasses="text-gray-900" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
