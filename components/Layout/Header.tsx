// components/Layout/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, SearchIcon, ShoppingCart, UserIcon, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "@/assets/icons/Logo.svg";
import { getLikedProducts, getCartProducts } from "@/utils/localStorage";

const Header = () => {
  const router = useRouter();
  const [likeCount, setLikeCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const updateCounts = () => {
    setLikeCount(getLikedProducts().length);
    setCartCount(getCartProducts().reduce((sum, item) => sum + item.quantity, 0));
  };

  useEffect(() => {
    updateCounts();
    window.addEventListener("localStorageChange", updateCounts);
    return () => window.removeEventListener("localStorageChange", updateCounts);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md shadow-sm">
      <div className="px-4 lg:px-8 xl:px-[160px]">
        <div className="flex h-20 items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
            <Image src={Logo} alt="TechnoShop" width={110} height={32} className="h-8 w-auto" priority />
          </Link>

          {/* Desktop Search */}
          <div className="hidden xl:flex flex-1 max-w-2xl">
            <form onSubmit={handleSearch} className="relative w-full group">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-gray-600" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full h-12 pl-12 pr-4 rounded-lg border border-gray-200 bg-gray-50/50 text-sm outline-none transition-all focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-gray-700 transition-colors hover:text-black after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all hover:after:w-full after:duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <Link href="/likes" className="relative group p-2.5 hover:bg-gray-100 rounded-lg transition-all">
              <HeartIcon className="h-5 w-5 text-gray-700 group-hover:text-red-500 transition-colors" />
              {likeCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-in zoom-in">
                  {likeCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative group p-2.5 hover:bg-gray-100 rounded-lg transition-all">
              <ShoppingCart className="h-5 w-5 text-gray-700 group-hover:text-black transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link href="/user" className="hidden lg:flex group p-2.5 hover:bg-gray-100 rounded-lg transition-all">
              <UserIcon className="h-5 w-5 text-gray-700 group-hover:text-black transition-colors" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden p-2.5 hover:bg-gray-100 rounded-lg transition-all"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Search */}
        <div className="pb-4 xl:hidden">
          <form onSubmit={handleSearch} className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none transition-all focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
            />
          </form>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-20 bg-black/20 backdrop-blur-sm xl:hidden animate-in fade-in"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed left-0 right-0 top-20 border-b bg-white shadow-xl xl:hidden animate-in slide-in-from-top">
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/user"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:text-black lg:hidden"
              >
                <UserIcon className="h-5 w-5" />
                My Account
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
