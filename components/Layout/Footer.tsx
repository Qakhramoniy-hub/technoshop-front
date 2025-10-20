// components/Layout/Footer.tsx
import React from "react";
import { Twitter, Facebook, Instagram, Youtube, Mail } from "lucide-react";
import Logo from "@/assets/icons/Logo white.svg";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const links = [
    {
      title: "Services",
      items: [
        { label: "Bonus Program", href: "#" },
        { label: "Gift Cards", href: "#" },
        { label: "Credit and Payment", href: "#" },
        { label: "Service Contracts", href: "#" },
        { label: "Non-cash Account", href: "#" },
        { label: "Payment", href: "#" },
      ],
    },
    {
      title: "Assistance to the Buyer",
      items: [
        { label: "Find an Order", href: "#" },
        { label: "Terms of Delivery", href: "#" },
        { label: "Exchange and Return of Goods", href: "#" },
        { label: "Guarantee", href: "#" },
        { label: "Frequently Asked Questions", href: "#" },
        { label: "Terms of Use of the Site", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16 lg:py-18 xl:py-20 px-4 lg:px-8 xl:px-[160px] border-t border-white/5">
      {/* Main Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-12 xl:gap-16">
        {/* Brand Section */}
        <div className="xl:col-span-2 space-y-6">
          <Link href="/" className="inline-block group">
            <div className="transition-transform group-hover:scale-105">
              <Image src={Logo} alt="TechnoShop" width={90} height={30} className="h-8 w-auto" />
            </div>
          </Link>
          <p className="max-w-md text-sm leading-relaxed text-gray-400">
            We are a residential interior design firm located in Portland. Our boutique-studio offers more than just design services.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 transition-all hover:bg-white hover:text-black hover:scale-110 hover:border-white"
                  aria-label={social.label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Link Columns */}
        {links.map((section) => (
          <div key={section.title} className="space-y-4">
            <h3 className="text-lg font-bold text-white">{section.title}</h3>
            <ul className="space-y-3">
              {section.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-all hover:text-white hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} TechnoShop. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
