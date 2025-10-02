import React from "react";
import Banner from "@/assets/icons/FooterBanner.svg";
import Image from "next/image";

const FooterBanner = () => {
  return (
    <div>
      <Image
        src={Banner}
        alt="Footer banner"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default FooterBanner;
