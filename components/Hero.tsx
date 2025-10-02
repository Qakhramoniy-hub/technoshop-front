import React from "react";
import IphoneImage from "@/assets/images/Iphone Image.png";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex items-center justify-center gap-[64px] bg-black">
      <div>
        <h2 className="text-gray-400 text-[25px]">Pro.Beyond.</h2>
        <h1 className="text-[96px] text-[#FFFFFF]">IPhone 14 Pro</h1>
        <h3 className="text-[#909090] text-[18px]">
          Created to change everything for the better. For everyone
        </h3>
        <button className="px-[56px] py-[16px] border border-[#FFFFFF] text-[#FFFFFF] rounded-[6px] mt-5">
          Shop Now
        </button>
      </div>
      <Image src={IphoneImage} alt="iphone" width={406} height={632} />
    </div>
  );
};

export default Hero;
