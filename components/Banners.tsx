import Image from "next/image";
import React from "react";
// Rasmlar import qilingan
import PopularProductsImage from "@/assets/images/PopularProducts.png";
import IpadImage from "@/assets/images/Ipad.png";
import SamsungImage from "@/assets/images/Samsung.png";
import MacbookImage from "@/assets/images/Macbook.png";

const bannerData = [
  {
    title: "Popular Products",
    description:
      "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
    image: PopularProductsImage,
    alt: "Popular Products",
    bgColor: "bg-gray-100",
    textColor: "text-gray-900",
    buttonClasses: "border-black text-black hover:bg-black hover:text-white",
  },
  {
    title: "Ipad Pro",
    description:
      "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
    image: IpadImage,
    alt: "iPad Pro",
    bgColor: "bg-gray-100",
    textColor: "text-gray-900",
    buttonClasses: "border-black text-black hover:bg-black hover:text-white",
  },
  {
    title: "Samsung Galaxy",
    description:
      "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
    image: SamsungImage,
    alt: "Samsung Galaxy",
    bgColor: "bg-gray-100",
    textColor: "text-gray-900",
    buttonClasses: "border-black text-black hover:bg-black hover:text-white",
  },
  {
    title: "Macbook Pro",
    description:
      "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
    image: MacbookImage,
    alt: "Macbook Pro",
    bgColor: "bg-gray-800",
    textColor: "text-white",
    buttonClasses: "border-white text-white hover:bg-white hover:text-gray-800",
  },
];

const BannerItem = ({ data }) => {
  return (
    // Har bir bannerni rasmdagi kabi uslublash
    <div
      className={`
        ${data.bgColor}
        h-full
        p-8
        flex flex-col
        justify-end
        items-center
        text-center
        ${data.textColor}
      `}
    >
      {/* Rasm */}
      <div className="flex justify-center items-end h-[240px] w-full mb-6">
        <Image
          src={data.image}
          alt={data.alt}
          width={data.alt.includes("Popular") ? 250 : 300}
          height={data.alt.includes("Popular") ? 250 : 300}
          className="object-contain"
        />
      </div>

      {/* Kontent */}
      <div className="flex flex-col gap-4 w-full px-4">
        <h1 className="text-3xl font-semibold">{data.title}</h1>
        <span className="text-sm leading-relaxed">{data.description}</span>

        {/* Tugma */}
        <button
          className={`
            mt-4
            px-8 py-3
            border-2
            rounded-md
            text-sm font-medium
            transition-colors duration-200
            w-40
            mx-auto
            ${data.buttonClasses}
          `}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

const Banners = () => {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12">
      {/* Asosiy konteynerni 4 ustunli grid qildim */}
      <div className="grid grid-cols-4 gap-0 h-[500px]">
        {bannerData.map((data, index) => (
          <BannerItem key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Banners;
