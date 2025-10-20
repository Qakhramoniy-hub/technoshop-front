import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Top5Image from "@/assets/images/Smartfones.webp";
import LaptopImage from "@/assets/images/best-laptop-brands.webp";
import EarphoneImage from "@/assets/images/AirPods.jpg";
import Ps5andXbox from "@/assets/images/Gear-Xbox-vs-PS5.webp";

// Oddiy blog post ma'lumotlari
const blogPosts = [
  {
    title: "Eng yaxshi 5 ta Smartfon 2024-yil",
    summary:
      "Bu yil bozorga chiqqan va eng ko'p baholangan smartfonlar ro'yxati.",
    date: "2024-09-28",
    image: Top5Image, // Loyihangizdagi rasm yo'lini o'zgartiring
  },
  {
    title: "Noutbuk tanlash bo'yicha qo'llanma",
    summary:
      "Ish, o'qish yoki o'yinlar uchun mos noutbukni qanday tanlash kerak.",
    date: "2024-09-20",
    image: LaptopImage,
  },
  {
    title: "Simsiz quloqchinlar: Afzallik va kamchiliklar",
    summary: "AirPods va shunga o'xshash gadjetlarning imkoniyatlari tahlili.",
    date: "2024-09-15",
    image: EarphoneImage,
  },
  {
    title: "Yangi avlod konsollari: PS5 vs Xbox Series X",
    summary: "O'yin dunyosining ikki giganti o'rtasidagi to'qnashuv.",
    date: "2024-09-10",
    image: Ps5andXbox,
  },
];

const BlogPage = () => {
  return (
    <div className="container mx-auto py-16 px-4 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900">TechShop Blog</h1>
        <p className="mt-4 text-xl text-gray-600">
          Texnologiya dunyosidagi eng so&apos;nggi yangiliklar.
        </p>
      </div>

      {/* Blog postlari ro'yxati (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-gray-100"
          >
            {/* Rasm */}
            <div className="relative h-48 w-full bg-gray-200">
              {/* Image uchun namuna. E'tibor bering, /public/dagi rasm yo'li ishlatildi */}
              <Image
                src={post.image}
                alt={post.title}
                layout="fill"
                objectFit="cover"
              />
            </div>

            {/* Kontent */}
            <div className="p-6 space-y-3">
              <p className="text-sm text-gray-500">{post.date}</p>
              <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-600 line-clamp-3">{post.summary}</p>
              <a
                href={`/blog/${index}`}
                className="flex items-center text-black font-semibold hover:text-gray-700 transition-colors pt-2"
              >
                O&apos;qish <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
