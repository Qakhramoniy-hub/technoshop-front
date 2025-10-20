// components/Banners.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { ArrowRight } from "lucide-react";

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
}

interface BannerData {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  bgColor: string;
  textColor: string;
  buttonClasses: string;
  link: string;
}

const BannerItem = ({ data }: { data: BannerData }) => {
  return (
    <Link href={data.link}>
      <div className={`group ${data.bgColor} w-full h-full p-8 flex flex-col justify-between relative overflow-hidden min-h-[400px] rounded-2xl xl:rounded-none transition-all hover:shadow-2xl border border-gray-200 xl:border-0`}>
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Image */}
        <div className="relative w-full h-[220px] flex justify-center items-center mb-6">
          <Image
            src={data.image}
            alt={data.alt}
            fill
            className="object-contain max-h-[200px] group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        
        {/* Content */}
        <div className={`relative z-10 flex flex-col gap-4 ${data.textColor}`}>
          <h1 className="text-3xl font-bold leading-tight group-hover:translate-x-1 transition-transform duration-300">{data.title}</h1>
          <p className="text-sm leading-relaxed opacity-80 line-clamp-2">
            {data.description}
          </p>
          
          <button className={`group/btn flex items-center gap-2 px-8 py-3 border-2 rounded-xl text-sm font-bold transition-all w-full sm:w-auto ${data.buttonClasses} hover:shadow-lg active:scale-95`}>
            <span>Shop Now</span>
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </Link>
  );
};

const Banners = () => {
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://dummyjson.com/products?limit=4");
        const products: Product[] = res.data.products;

        const mappedBanners: BannerData[] = products.map((product, index) => ({
          id: product.id.toString(),
          title: product.title,
          description: product.description,
          image: product.thumbnail,
          alt: product.title,
          bgColor: index === 3 ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-gray-50 to-gray-100",
          textColor: index === 3 ? "text-white" : "text-gray-900",
          buttonClasses:
            index === 3
              ? "border-white text-white hover:bg-white hover:text-gray-900"
              : "border-black text-black hover:bg-black hover:text-white",
          link: `/products/${product.id}`,
        }));

        setBanners(mappedBanners);
        setError(null);
      } catch (err) {
        console.error("Error loading banners:", err);
        setError("Failed to load banners");
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  if (loading) {
    return (
      <section className="w-full px-4 lg:px-8 xl:px-[160px] py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
          <p className="text-sm font-medium text-gray-600">Loading offers...</p>
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
    <section className="mx-auto max-w-[1500px] px-4 lg:px-8 xl:px-[160px] py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-0 h-auto">
        {banners.length > 0 ? (
          banners.map((data) => <BannerItem key={data.id} data={data} />)
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">No banners found</p>
        )}
      </div>
    </section>
  );
};

export default Banners;
