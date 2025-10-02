import Banners from "@/components/Banners";
import Category from "@/components/Category";
import DiscountProducts from "@/components/DiscountProducts";
import FooterBanner from "@/components/FooterBanner";
import Hero from "@/components/Hero";
import HeroButton from "@/components/HeroButton";
import Products from "@/components/Products";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <HeroButton />
      <Category />
      <Products />
      <Banners />
      <DiscountProducts />
      <FooterBanner />
    </div>
  );
};

export default HomePage;
