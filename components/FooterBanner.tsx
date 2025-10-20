// components/FooterBanner.tsx
import React from "react";
import Banner from "@/assets/images/FooterBanner.png";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

const FooterBanner = () => {
  return (
    <section className="w-full px-4 lg:px-8 xl:px-0 py-8 xl:py-0">
      <div className="relative w-full rounded-3xl xl:rounded-none overflow-hidden shadow-2xl xl:shadow-none">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10" />
        
        {/* Image */}
        <div className="relative w-full aspect-[16/9] xl:aspect-auto xl:h-auto">
          <Image
            src={Banner}
            alt="Big Summer Sale"
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 p-6 text-center z-20 xl:p-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-6 py-2 border border-white/20">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            <span className="text-sm font-semibold text-white">Limited Time Offer</span>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[80px] font-black text-white drop-shadow-2xl leading-tight tracking-tight">
              Big Summer <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Sale</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base lg:text-lg xl:text-xl text-white/90 drop-shadow-lg font-medium">
              Commodo fames vitae vitae leo mauris in. Eu consequat.
            </p>
          </div>

          {/* CTA Button */}
          <Link href="/products">
            <button className="group relative overflow-hidden bg-white text-black px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/20 flex items-center gap-3">
              <span className="relative z-10">Shop Now</span>
              <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FooterBanner;
