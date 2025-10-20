import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Biz bilan Bog&apos;laning
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Savollaringiz bormi? Bizga xabar yuboring!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Aloqa ma'lumotlari */}
        <div className="space-y-8 lg:col-span-1 p-8 bg-gray-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800">Ma&apos;lumotlar</h2>
          <div className="flex items-center space-x-4">
            <Mail className="w-6 h-6 text-black" />
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-gray-600">info@techshop.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="w-6 h-6 text-black" />
            <div>
              <p className="font-semibold">Telefon</p>
              <p className="text-gray-600">+998 99 131 88 51</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <MapPin className="w-6 h-6 text-black flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold">Manzil</p>
              <p className="text-gray-600">
                Uzbekistan, Xorazm viloyati, Urganch shahri
              </p>
            </div>
          </div>
        </div>

        {/* Aloqa shakli (Forma) */}
        <div className="lg:col-span-2 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="To'liq ismingiz"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-black focus:border-black transition duration-200"
                required
              />
              <input
                type="email"
                placeholder="Email manzilingiz"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-black focus:border-black transition duration-200"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Mavzu"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-black focus:border-black transition duration-200"
              required
            />
            <textarea
              placeholder="Xabaringiz"
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-black focus:border-black transition duration-200"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              Xabar Yuborish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
