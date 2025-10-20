import React from "react";
import Image from "next/image";
// Asosiy rasm uchun joy (siz o'zingizning rasmingizni joylashtiring)
import CompanyImage from "@/assets/icons/Logo.svg";

const AboutPage = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      {/* Sarlavha qismi */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Bizning Hikoyamiz
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Texnologiyani hamma uchun yaqin qilish.
        </p>
      </div>

      {/* Asosiy kontent - Rasm va Matn */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Rasm */}
        <div className="order-2 lg:order-1 rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={CompanyImage}
            alt="Kompaniya jamoasi"
            width={700}
            height={450}
            layout="responsive"
            className="object-cover"
          />
        </div>

        {/* Matn */}
        <div className="order-1 lg:order-2 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-black pb-2">
            Biz Kimmiz?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            **TechShop** 2018-yilda kichik bir ehtiros bilan tashkil etilgan.
            Bizning asosiy maqsadimiz — mijozlarga faqat sifatli va eng so&apos;nggi
            texnologiya mahsulotlarini taqdim etish, ularga nafaqat savdo, balki
            tajriba ulashish. Biz har bir xaridning qulay, ishonchli va esda
            qolarli bo&apos;lishini ta&apos;minlaymiz.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Biz doimiy innovatsiyaga intilamiz. Jamoamiz texnologiya sohasidagi
            eng yaxshi mutaxassislardan tashkil topgan bo&apos;lib, ular sizga eng
            mos mahsulotni tanlashda yordam berishga tayyor. Ishonchimiz komil,
            kelajak texnologiyada!
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300"
          >
            Jamoa bilan tanishing
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
