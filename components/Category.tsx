import React from "react";
import PhoneIcon from "@/assets/icons/Phones.svg";
import SmartwatchIcon from "@/assets/icons/Smart Watches.svg";
import CameraIcon from "@/assets/icons/Cameras.svg";
import HeadphoneIcon from "@/assets/icons/Headphones.svg";
import ComputerIcon from "@/assets/icons/Computers.svg";
import GamingIcon from "@/assets/icons/Gaming.svg";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Category = () => {
  return (
    <div className="container pt-[80px] pb-[80px] bg-[#FAFAFA]">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-semibold">Browse By Category</h1>
        <div className="flex items-center gap-4">
          <ArrowLeft className="cursor-pointer hover:text-gray-600" />
          <ArrowRight className="cursor-pointer hover:text-gray-600" />
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 gap-8">
        {[
          { icon: PhoneIcon, label: "Phones" },
          { icon: SmartwatchIcon, label: "Smart Watches" },
          { icon: CameraIcon, label: "Cameras" },
          { icon: HeadphoneIcon, label: "Headphones" },
          { icon: ComputerIcon, label: "Computers" },
          { icon: GamingIcon, label: "Gaming" },
          { icon: PhoneIcon, label: "Phones" },
        ].map((category, index) => (
          <div
            key={index}
            className="bg-[#D9D9D9] rounded-[10px] w-[160px] h-[128px] flex flex-col items-center justify-center gap-2 transform transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-105 cursor-pointer"
          >
            <Image
              src={category.icon}
              alt={category.label}
              width={48}
              height={48}
            />
            <span className="text-sm font-medium">{category.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
