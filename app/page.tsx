import Banners from "@/components/Banners";
import Category from "@/components/Category";
import DiscountProducts from "@/components/DiscountProducts";
import FooterBanner from "@/components/FooterBanner";
import Hero from "@/components/Hero";
import Products from "@/components/Products";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Category />
      <Products />
      <Banners />
      <DiscountProducts />
      <FooterBanner />
    </main>
  );
};

export default HomePage;
