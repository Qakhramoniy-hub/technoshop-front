import React from "react";
import FirstGrid from "@/assets/images/Wide Square.png";
import SecondGrid from "@/assets/images/Square Banner.png";
import ThirdGrid from "@/assets/images/Square Banner (3).png";
import FourthGrid from "@/assets/images/Big Banner.png";
import Image from "next/image";

const HeroGrid = () => {
  return (
    <div className="w-full flex items-center justify-center py-8">
      <div className="grid grid-cols-4 grid-rows-2 gap-4 w-full">
        <div className="col-span-2">
          <Image
            src={FirstGrid}
            alt="Wide promotional banner"
            width={770}
            height={328}
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
        <div className="col-span-2 row-span-2 col-start-3">
          <Image
            src={FourthGrid}
            alt="Large promotional banner"
            width={770}
            height={600}
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
        <div className="row-start-2">
          <Image
            src={ThirdGrid}
            alt="Square promotional banner 1"
            width={380}
            height={270}
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
        <div className="row-start-2">
          <Image
            src={SecondGrid}
            alt="Square promotional banner 2"
            width={380}
            height={270}
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroGrid;
