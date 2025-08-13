"use client";

import Image from "next/image";
import { useState } from "react";
import Login from "./Login";

export default function RefererIncome() {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <Login />;
  }

  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
      <div className="max-w-[600px] w-full">
        {/* Logo */}
        <div className="mb-12">
          <Image
            src="/referin-whiteTextLOGO.svg"
            alt="Referin Logo"
            width={120}
            height={30}
            className="mx-auto"
            priority
          />
        </div>

        {/* Income Amount */}
        <div className="bg-[#4F6FE4]/20 backdrop-blur-md rounded-lg p-6 text-center mb-8">
          <h2 className="text-5xl font-clash font-bold text-white">
            £802.60 <span className="text-3xl">per month</span>
          </h2>
        </div>

        {/* Description */}
        <div className="text-center mb-12">
          <p className="text-xl text-white/90 leading-relaxed">
            Assuming you make just 1 successful referral and offer support services, we estimate you could make about £802.60 per month!*
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-[#4F6FE4]/20 backdrop-blur-md rounded-lg p-6 text-center mb-8">
          <p className="text-lg text-white/90">
            Let matching, paying candidates connect with you on LinkedIn by submitting vacancy details
          </p>
        </div>

        {/* Submit Button */}
        <button 
          onClick={() => setShowLogin(true)}
          className="w-full bg-blue-600 text-white rounded-lg py-4 text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Submit details of your vacancies
        </button>
      </div>
    </div>
  );
}