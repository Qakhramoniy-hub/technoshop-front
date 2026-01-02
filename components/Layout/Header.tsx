"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, SearchIcon, ShoppingCart, UserIcon, Menu, X, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "@/assets/icons/Logo.svg";
import { getLikedProducts, getCartProducts } from "@/utils/localStorage";
import { isAuthenticated, getUserInfo, logout } from "@/utils/auth";

const Header = () => {
  const router = useRouter();
  const [likeCount, setLikeCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<any>(null);

  const updateCounts = () => {
    setLikeCount(getLikedProducts().length);
    setCartCount(getCartProducts().reduce((sum, item) => sum + item.quantity, 0));
  };

  const updateAuthState = () => {
    setIsAuth(isAuthenticated());
    if (isAuthenticated()) {
      setUser(getUserInfo());
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    updateCounts();
    updateAuthState();
    
    const handleStorageChange = () => {
      updateCounts();
      updateAuthState();
    };
    
    window.addEventListener("localStorageChange", handleStorageChange);
    return () => window.removeEventListener("localStorageChange", handleStorageChange);
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuth(false);
    setUser(null);
    setIsMenuOpen(false);
    router.push("/login");
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
          <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
            <Image src={Logo} alt="TechnoShop" width={110} height={32} className="h-8 w-auto" priority />
          </Link>

          <div className="hidden xl:flex flex-1 max-w-2xl">
            <form onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                setSearchQuery("");
              }
            }} className="relative w-full group">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full h-12 pl-12 pr-4 rounded-lg border border-gray-200 bg-gray-50/50 text-sm outline-none transition-all focus:border-gray-400 focus:bg-white"
              />
            </form>
          </div>

          <nav className="hidden xl:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-gray-700 transition-colors hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/likes" className="relative group p-2.5 hover:bg-gray-100 rounded-lg transition-all">
              <HeartIcon className="h-5 w-5 text-gray-700 group-hover:text-red-500 transition-colors" />
              {likeCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {likeCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative group p-2.5 hover:bg-gray-100 rounded-lg transition-all">
              <ShoppingCart className="h-5 w-5 text-gray-700 group-hover:text-black transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuth ? (
              <>
                <Link href="/user" className="hidden lg:flex group p-2.5 hover:bg-gray-100 rounded-lg transition-all">
                  <UserIcon className="h-5 w-5 text-gray-700 group-hover:text-black transition-colors" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden lg:flex group p-2.5 hover:bg-gray-100 rounded-lg transition-all"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5 text-gray-700 group-hover:text-red-500 transition-colors" />
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="hidden lg:flex px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
              >
                Kirish
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden p-2.5 hover:bg-gray-100 rounded-lg transition-all"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-20 bg-black/20 xl:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed left-0 right-0 top-20 border-b bg-white shadow-xl xl:hidden">
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  {link.label}
                </Link>
              ))}
              {isAuth ? (
                <>
                  <Link
                    href="/user"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <UserIcon className="h-5 w-5" />
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 text-center"
                >
                  Kirish
                </Link>
              )}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
