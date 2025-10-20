// components/Category.tsx
"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import axios from "axios";
import {
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Laptop,
  Shirt,
  Car,
  SofaIcon,
  Utensils,
  SoapDispenserDroplet,
  PaintRollerIcon,
  ChefHat,
  MessageCircleHeart,
  Footprints,
  WatchIcon,
  Headset,
  Bike,
  Dumbbell,
  Glasses,
  TabletSmartphone,
  Award,
  Handbag,
  Gem,
} from "lucide-react";
import Link from "next/link";

interface Category {
  slug: string;
  name: string;
}

const categoryIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  beauty: MessageCircleHeart,
  smartphones: Smartphone,
  laptops: Laptop,
  fragrances: SoapDispenserDroplet,
  vehicle: Car,
  furniture: SofaIcon,
  groceries: Utensils,
  "home-decoration": PaintRollerIcon,
  "kitchen-accessories": ChefHat,
  "mens-shirts": Shirt,
  "womens-shirts": Shirt,
  "mens-shoes": Footprints,
  "mens-watches": WatchIcon,
  "mobile-accessories": Headset,
  motorcycle: Bike,
  "skin-care": SoapDispenserDroplet,
  "sports-accessories": Dumbbell,
  sunglasses: Glasses,
  tablets: TabletSmartphone,
  tops: Award,
  "womens-bags": Handbag,
  "womens-dresses": Shirt,
  "womens-jewellery": Gem,
  "womens-shoes": Footprints,
  "womens-watches": WatchIcon,
};

const CategoryCarousel = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: "start",
    dragFree: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://dummyjson.com/products/category-list");
        setCategories(
          res.data.map((slug: string) => ({
            slug,
            name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
          }))
        );
        setError(null);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  if (loading) {
    return (
      <section className="w-full px-4 lg:px-8 xl:px-[160px] py-12">
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"></path>
          </svg>
          <span className="text-sm font-medium">Loading categories...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full px-4 lg:px-8 xl:px-[160px] py-12">
        <p className="text-center text-sm text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-[160px] py-12">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-900">Browse By Category</h2>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 border border-gray-200 transition-all hover:bg-black hover:text-white hover:border-black hover:shadow-lg"
            aria-label="Previous categories"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 border border-gray-200 transition-all hover:bg-black hover:text-white hover:border-black hover:shadow-lg"
            aria-label="Next categories"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="embla__viewport overflow-hidden" ref={emblaRef} style={{ height: "140px" }}>
        <div className="embla__container flex gap-4">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.slug] || Smartphone;
            return (
              <div
                key={cat.slug}
                className="embla__slide min-w-[150px] sm:min-w-[170px]"
              >
                <Link href={`/category/${cat.slug}`}>
                  <div className="group flex h-[140px] flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 transition-all hover:from-black hover:to-gray-800 hover:shadow-xl hover:scale-105 border border-gray-200 hover:border-black">
                    <div className="rounded-xl bg-white p-3 group-hover:bg-white/10 transition-all">
                      <Icon className="h-10 w-10 text-gray-700 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-center text-sm font-semibold text-gray-800 group-hover:text-white line-clamp-2 transition-colors">
                      {cat.name}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
