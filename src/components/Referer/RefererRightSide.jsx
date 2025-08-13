"use client";

import { useState } from "react";
import Image from "next/image";
import SuccessPage from "./SuccessPage";
import RefererIncome from "./RefererIncome";

export default function RefererRightSide() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showIncome, setShowIncome] = useState(false);
  const [companyDetails, setCompanyDetails] = useState("");

  const handleCalculate = () => {
    if (!companyDetails.trim()) return;
    
    // Show success page
    setShowSuccess(true);

    // After 3 seconds, hide success and show income
    setTimeout(() => {
      setShowSuccess(false);
      setShowIncome(true);
    }, 3000);
  };

  if (showSuccess) {
    return <SuccessPage />;
  }

  if (showIncome) {
    return <RefererIncome />;
  }

  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
      <div className="max-w-[600px] w-full">
        <h1 className="text-5xl font-clash font-bold text-white mb-6">
          Don't pass on passive income
        </h1>
        <p className="text-xl text-white/80 mb-12">
          Let serious, paying candidates know you are open to consider them for a referral for vacancies at your company.
        </p>
        
        <div className="bg-[#4F6FE4]/20 backdrop-blur-md rounded-lg p-6 border border-white/30">
          <input
            type="text"
            value={companyDetails}
            onChange={(e) => setCompanyDetails(e.target.value)}
            placeholder="Enter name and location of your company"
            className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg p-4 mb-6 border border-white/30"
          />
          
          <button 
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white rounded-lg py-4 font-semibold hover:bg-blue-700 transition-colors"
          >
            Calculate your Potential Earnings
          </button>
        </div>
      </div>
    </div>
  );
}