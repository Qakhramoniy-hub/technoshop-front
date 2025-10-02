import Image from "next/image";
import React from "react";
import Logo from "@/assets/icons/Logo.svg";
import { HeartIcon, SearchIcon, ShoppingCart, UserIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-[160px] py-[24px]">
      <Image src={Logo} alt="logo" width={100} height={100} />
      <div className="background-[#F5F5F5] border border-[#D9D9D9] rounded-[10px] w-[372px] h-[56px] flex items-center px-4 ">
        <SearchIcon className="text-gray-400" />
        <input
          className="w-[372px] h-[56px] justify-center pl-[16px] text-[16px] focus:outline-none"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center justify-center gap-[52px] text-[16px] font-semibold text-gray-500">
        <h2 className="hover:text-black">Home</h2>
        <h2 className="hover:text-black">About</h2>
        <h2 className="hover:text-black">Contact Us</h2>
        <h2 className="hover:text-black">Blog</h2>
      </div>
      <div className="flex items-center justify-center gap-6">
        <HeartIcon />
        <ShoppingCart />
        <UserIcon />
      </div>
    </div>
  );
};

export default Header;
