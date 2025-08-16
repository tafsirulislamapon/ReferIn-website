"use client";

import { useState } from "react";
import Image from "next/image";
import SuccessPage from "./SuccessPage";
import Login from "./Login";

export default function RefererRightSide({ onShowLinkedInPost }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [companyDetails, setCompanyDetails] = useState("");
  const [canAssistCandidates, setCanAssistCandidates] = useState("");
  const [hasReferralScheme, setHasReferralScheme] = useState("");

  const handleCalculate = () => {
    if (!companyDetails.trim() || !canAssistCandidates.trim() || !hasReferralScheme.trim()) return;
    
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setShowLogin(true);
    }, 3000);
  };

  if (showSuccess) {
    return <SuccessPage />;
  }

  if (showLogin) {
    return <Login onShowLinkedInPost={onShowLinkedInPost} />;
  }

  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
      <div className="max-w-[600px] w-full">
        <h1 className="text-5xl font-clash font-bold text-white mb-6">
          Don't pass on passive income
        </h1>
        <p className="text-xl text-white/80 mb-8">
          Let serious, paying candidates know you are open to consider them for a referral for vacancies at your company.
        </p>
        
        <div className="bg-[#4F6FE4]/20 backdrop-blur-md rounded-lg p-6 border border-white/30 space-y-3">
          <div>
            <label className="text-white text-sm mb-2 block pl-1">Company Details</label>
            <input
              type="text"
              value={companyDetails}
              onChange={(e) => setCompanyDetails(e.target.value)}
              placeholder="Enter name and location of your company"
              className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg p-4 border border-white/30"
            />
          </div>

          <div>
            <label className="text-white text-sm mb-2 block pl-1">Candidate Assistance</label>
            <input
              type="text"
              value={canAssistCandidates}
              onChange={(e) => setCanAssistCandidates(e.target.value)}
              placeholder="Are you able to offer assistance to potential candidates?"
              className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg p-4 border border-white/30"
            />
          </div>

          <div>
            <label className="text-white text-sm mb-2 block pl-1">Referral Scheme</label>
            <input
              type="text"
              value={hasReferralScheme}
              onChange={(e) => setHasReferralScheme(e.target.value)}
              placeholder="Does your company have an employee referral scheme in place?"
              className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg p-4 border border-white/30"
            />
          </div>
          
          <button 
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white rounded-lg py-4 font-semibold hover:bg-blue-700 transition-colors mt-4"
          >
            Continue with Registration
          </button>
        </div>
      </div>
    </div>
  );
}