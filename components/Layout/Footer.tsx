import React from "react";
import { Twitter, Facebook, Instagram, Youtube, Mail } from "lucide-react";
import Logo from "@/assets/icons/Logo white.svg";
import Image from "next/image";

const Footer = () => {
  const links = [
    {
      title: "Services",
      items: [
        "Bonus program",
        "Gift cards",
        "Credit and payment",
        "Service contracts",
        "Non-cash account",
        "Payment",
      ],
    },
    {
      title: "Assistance to the buyer",
      items: [
        "Find an order",
        "Terms of delivery",
        "Exchange and return of goods",
        "Guarantee",
        "Frequently asked questions",
        "Terms of use of the site",
      ],
    },
  ];

  const SocialIcon = ({ Icon, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition-colors"
    >
      <Icon size={20} />
    </a>
  );

  return (
    <footer className="bg-black text-white py-16 px-4">
      {/* Asosiy kontent konteyneri */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* 1. Kompaniya ma'lumotlari / Logotip qismi */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Logo joyi */}
          <div className="text-4xl font-extrabold tracking-tight">
            <Image src={Logo} alt="Logo" width={70} height={23} />
          </div>

          <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
            We are a residential interior design firm located in Portland. Our
            boutique-studio offers more than
          </p>
        </div>

        {/* 2. Va 3. Havolalar qismlari (Services va Assistance) */}
        {links.map((section, index) => (
          <div key={index} className="flex flex-col gap-5">
            <h3 className="text-lg font-bold mb-1">{section.title}</h3>
            <ul className="space-y-3">
              {section.items.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Ijtimoiy tarmoqlar va pastki chiziq */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800">
        <div className="flex space-x-6">
          <SocialIcon Icon={Twitter} href="#" />
          <SocialIcon Icon={Facebook} href="#" />
          <SocialIcon Icon={Instagram} href="#" />
          <SocialIcon Icon={Youtube} href="#" />

          <SocialIcon Icon={Mail} href="#" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
