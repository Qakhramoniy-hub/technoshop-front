// components/Hero.tsx
import Image from "next/image";
import React from "react";
import Link from "next/link";
import HeroIphone from "@/assets/images/Iphone Image.png";
import Playstation from "@/assets/images/Playstation.png";
import appleAirPods from "@/assets/images/Headphone.png";
import AppleVisionPro from "@/assets/images/WR.png";
import MackBookAir from "@/assets/images/MacBook Pro 14.png";

const Hero = () => {
  const mainHero = [
    {
      author: "Pro.Beyond.",
      title: "iPhone 14",
      SpanTitle: "Pro",
      description: "Created to change everything for the better. For everyone",
      link: "/products/1",
      img: HeroIphone,
    },
  ];

  const HeroGrid = [
    {
      id: 1,
      title: "PlayStation",
      SpanTitle: "5",
      description: "Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.",
      img: Playstation,
      link: "/products/2",
    },
    {
      id: 2,
      title: "Apple AirPods",
      SpanTitle: "Max",
      description: "Computational audio. Listen, it's powerful",
      img: appleAirPods,
      link: "/products/3",
    },
    {
      id: 3,
      title: "Apple Vision",
      SpanTitle: "Pro",
      description: "An immersive way to experience entertainment",
      img: AppleVisionPro,
      link: "/products/4",
    },
    {
      id: 4,
      title: "MacBook",
      SpanTitle: "Air",
      description: "The new 15-inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display",
      img: MackBookAir,
      link: "/products/5",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#211C24] via-[#2a2530] to-[#211C24] w-full mb-10">
      {/* Main Hero Banner */}
      <div className="flex gap-5 items-center justify-center xl:flex-row flex-col px-4 xl:px-0 py-12 xl:py-0 xl:min-h-[632px]">
        <div className="xl:px-[160px] w-full xl:w-auto space-y-6 xl:space-y-8">
          <div className="space-y-4">
            <p className="text-white/60 font-semibold text-base xl:text-[25px] tracking-wider uppercase">
              {mainHero[0].author}
            </p>
            <h1 className="text-5xl xl:text-[95px] text-white leading-tight xl:leading-[1.1] font-bold">
              {mainHero[0].title}{" "}
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {mainHero[0].SpanTitle}
              </span>
            </h1>
            <p className="text-gray-400 text-base xl:text-lg max-w-md">
              {mainHero[0].description}
            </p>
          </div>
          <Link href={mainHero[0].link}>
            <button className="group relative overflow-hidden bg-white text-black px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl hover:shadow-white/20 w-full xl:w-auto">
              <span className="relative z-10">Shop Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </Link>
        </div>
        <div className="w-full xl:w-auto flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl" />
            <Image
              src={mainHero[0].img}
              height={632}
              width={406}
              alt="iPhone 14 Pro"
              className="relative object-contain max-w-[280px] xl:max-w-none h-auto xl:h-[632px] xl:w-[406px] drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="w-full h-auto px-4 xl:px-0 pb-6 xl:pb-0">
        {/* Desktop Grid (xl: 1280px+) */}
        <div className="hidden xl:grid xl:grid-cols-4 xl:grid-rows-2 gap-0 w-full h-[600px]">
          {HeroGrid.map((item) => {
            if (item.id === 1) {
              return (
                <div key={item.id} className="group col-span-2 bg-gray-100 flex overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <Image src={item.img} alt={item.title} width={500} height={400} className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="relative flex flex-col justify-center px-10 z-10">
                    <h2 className="text-3xl font-bold group-hover:translate-x-2 transition-transform duration-300">
                      {item.title} <span className="font-extrabold">{item.SpanTitle}</span>
                    </h2>
                    <p className="text-gray-600 mt-3 text-sm leading-relaxed">{item.description}</p>
                    <Link href={item.link}>
                      <button className="mt-6 border-2 border-black px-8 py-3 rounded-xl font-semibold hover:bg-black hover:text-white transition-all w-[191px] hover:shadow-lg">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </div>
              );
            }
            if (item.id === 2) {
              return (
                <div key={item.id} className="group relative col-start-1 row-start-2 bg-[#EDEDED] p-6 flex items-center overflow-hidden">
                  <Image src={item.img} alt={item.title} width={200} height={200} className="absolute left-[-200px] h-full w-full top-1/2 -translate-y-1/2 object-contain group-hover:scale-110 transition-transform duration-700" />
                  <div className="ml-[140px] relative z-10">
                    <h2 className="text-[29px] leading-tight font-bold">
                      {item.title.split(" ").map((word, i) => (
                        <span key={i} className="block">{word}</span>
                      ))}
                      <span className="font-extrabold block bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">{item.SpanTitle}</span>
                    </h2>
                    <p className="text-gray-600 mt-3 text-sm">{item.description}</p>
                    <Link href={item.link}>
                      <button className="mt-6 border-2 border-black px-8 py-3 rounded-xl font-semibold hover:bg-black hover:text-white transition-all w-[191px] hover:shadow-lg">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </div>
              );
            }
            if (item.id === 3) {
              return (
                <div key={item.id} className="group col-start-2 row-start-2 bg-gradient-to-br from-[#353535] to-[#2a2a2a] p-6 flex relative overflow-hidden justify-center items-center">
                  <Image src={item.img} alt={item.title} width={200} height={200} className="absolute left-[-200px] h-full w-full top-1/2 -translate-y-1/2 object-contain scale-x-[-1] group-hover:scale-110 transition-transform duration-700" />
                  <div className="flex flex-col ml-[170px] relative z-10">
                    <h2 className="text-[29px] text-white whitespace-pre-line leading-tight font-bold">
                      {item.title.split(" ").join("\n")}
                      <span className="font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{item.SpanTitle}</span>
                    </h2>
                    <p className="text-gray-300 mt-3 text-sm">{item.description}</p>
                    <Link href={item.link}>
                      <button className="mt-6 border-2 border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition-all w-[191px] hover:shadow-lg hover:shadow-white/20">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </div>
              );
            }
            if (item.id === 4) {
              return (
                <div key={item.id} className="group col-span-2 row-span-2 col-start-3 row-start-1 bg-[#EDEDED] p-6 flex relative overflow-hidden items-center justify-center">
                  <div className="z-10 w-[372px] mr-[230px]">
                    <h2 className="text-3xl font-bold">
                      {item.title} <span className="font-extrabold">{item.SpanTitle}</span>
                    </h2>
                    <p className="text-gray-600 mt-3 leading-relaxed">{item.description}</p>
                    <Link href={item.link}>
                      <button className="mt-6 border-2 border-black px-8 py-3 rounded-xl font-semibold hover:bg-black hover:text-white transition-all w-[191px] hover:shadow-lg">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                  <Image src={item.img} alt={item.title} width={10000} height={10000} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 object-contain group-hover:scale-105 transition-transform duration-700" />
                </div>
              );
            }
          })}
        </div>

        {/* Tablet Grid (lg-xl: 1024-1279px) */}
        <div className="hidden lg:grid xl:hidden grid-cols-2 gap-4 max-w-5xl mx-auto py-6">
          {HeroGrid.map((item) => (
            <div key={item.id} className={`group ${item.id === 3 ? "bg-gradient-to-br from-[#353535] to-[#2a2a2a]" : "bg-gray-100"} rounded-2xl overflow-hidden p-6 flex flex-col justify-between relative min-h-[280px] hover:shadow-2xl transition-all duration-500`}>
              <div className="absolute inset-0 flex items-center justify-end opacity-20 pr-4 group-hover:opacity-30 transition-opacity">
                <Image src={item.img} alt={item.title} width={180} height={180} className="object-contain group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="relative z-10 w-full space-y-3">
                <h2 className={`text-2xl font-bold ${item.id === 3 ? "text-white" : "text-gray-900"}`}>
                  {item.title} <span className="font-extrabold">{item.SpanTitle}</span>
                </h2>
                <p className={`text-sm line-clamp-2 ${item.id === 3 ? "text-gray-300" : "text-gray-600"}`}>
                  {item.description}
                </p>
              </div>
              <Link href={item.link} className="relative z-10 mt-4">
                <button className={`border-2 px-6 py-2.5 rounded-xl font-semibold transition-all w-full hover:shadow-lg ${item.id === 3 ? "border-white text-white hover:bg-white hover:text-gray-900" : "border-black text-black hover:bg-black hover:text-white"}`}>
                  Shop Now
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Grid */}
        <div className="grid lg:hidden grid-cols-1 gap-4">
          {HeroGrid.map((item) => (
            <div key={item.id} className={`group ${item.id === 3 ? "bg-gradient-to-br from-[#353535] to-[#2a2a2a]" : "bg-gray-100"} rounded-2xl overflow-hidden p-6 flex flex-col items-center relative min-h-[320px] hover:shadow-xl transition-all duration-500`}>
              <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                <Image src={item.img} alt={item.title} width={200} height={200} className="object-contain group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="relative z-10 text-center w-full space-y-4">
                <h2 className={`text-2xl font-bold ${item.id === 3 ? "text-white" : "text-gray-900"}`}>
                  {item.title} <span className="font-extrabold">{item.SpanTitle}</span>
                </h2>
                <p className={`text-sm ${item.id === 3 ? "text-gray-300" : "text-gray-600"}`}>
                  {item.description}
                </p>
                <Link href={item.link} className="block mt-6">
                  <button className={`border-2 px-8 py-3 rounded-xl font-semibold transition-all w-full hover:shadow-lg ${item.id === 3 ? "border-white text-white hover:bg-white hover:text-gray-900" : "border-black text-black hover:bg-black hover:text-white"}`}>
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
