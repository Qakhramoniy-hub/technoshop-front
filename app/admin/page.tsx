'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAdmin, getUserInfo, logout } from '@/utils/auth';

const AdminPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    products: 250,
    categories: 15,
    orders: 120,
    users: 450,
  });

  useEffect(() => {
    const userInfo = getUserInfo();
    
    if (!userInfo || !isAdmin()) {
      router.push('/login');
      return;
    }

    setUser(userInfo);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Yuklanyapti...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">
              {user.firstName} {user.lastName}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Chiqish
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Xush kelibsiz, {user.firstName}!</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Mahsulotlar</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.products}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Kategoriyalar</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.categories}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Buyurtmalar</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.orders}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Foydalanuvchilar</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.users}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Tezkor Havolalar</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link href="/" className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-center">
              <p className="font-semibold text-gray-900">Asosiy</p>
            </Link>
            <div className="bg-green-50 p-4 rounded-lg text-center cursor-pointer">
              <p className="font-semibold text-gray-900">Mahsulotlar</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center cursor-pointer">
              <p className="font-semibold text-gray-900">Kategoriyalar</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center cursor-pointer">
              <p className="font-semibold text-gray-900">Foydalanuvchilar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
