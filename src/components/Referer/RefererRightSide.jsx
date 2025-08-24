"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SuccessPage from "./SuccessPage";
import Login from "./Login";
import InfoTooltip from "../ui/InfoTooltip";

export default function RefererRightSide({ onShowLinkedInPost, onShowGotSeekers }) {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [companyDetails, setCompanyDetails] = useState("");
  const [canAssistCandidates, setCanAssistCandidates] = useState("");
  const [hasReferralScheme, setHasReferralScheme] = useState("");
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null); // 'found' | 'not-found' | null

  // Tooltip content
  const tooltipContent = {
    company: "Provide your company name and location. This helps job seekers understand where opportunities are located and builds trust through workplace transparency.",
    assistance: "Describe the support you can offer candidates during the referral process. This could include interview preparation, company insights, application guidance, or internal resume submission.",
    referral: "Employee referral programs reward employees for successfully referring qualified candidates. Typical rewards range from £500-£5000+ cash bonuses, extra vacation days, or other incentives when referrals are hired."
  };

  // Mock verification function - replace with actual API call
  const verifyCompany = async (companyName) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    //seeker count 
    const seekerCount = 20; 
    
    return {
      hasSeekersFound: seekerCount > 0,
      seekerCount: seekerCount
    };
  };

  const handleVerifyCompany = async () => {
    if (!companyDetails.trim()) return;
    
    setIsVerifying(true);
    setVerificationStatus(null);
    
    try {
      const result = await verifyCompany(companyDetails);
      
      if (result.hasSeekersFound) {
        setVerificationStatus('found');
        setIsVerified(true);
        // Trigger showing GotSeekers component on the left side
        if (onShowGotSeekers) {
          onShowGotSeekers(true, companyDetails, result.seekerCount);
        }
      } else {
        setVerificationStatus('not-found');
        setIsVerified(true);
      }
    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationStatus('error');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCalculate = () => {
    if (!companyDetails.trim() || !canAssistCandidates.trim() || !hasReferralScheme.trim()) return;
    
    // Navigate directly to referrer signup page
    router.push('/referrers/signup');
  };

  const toggleTooltip = (tooltipId) => {
    setActiveTooltip(activeTooltip === tooltipId ? null : tooltipId);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.tooltip-container')) {
      setActiveTooltip(null);
    }
  };

  if (showSuccess) {
    return <SuccessPage />;
  }

  if (showLogin) {
    return <Login onShowLinkedInPost={onShowLinkedInPost} />;
  }

  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-6">
      <div className="max-w-[600px] w-full">
        <h1 className="text-5xl font-clash font-bold text-theme-text mb-6">
          Don't pass on passive income
        </h1>
        <p className="text-xl text-theme-text/80 mb-8">
          Let serious candidates know you are open to consider them for a referral for vacancies at your company.
        </p>
        
        <div className="bg-theme-text/10 backdrop-blur-md rounded-lg p-6 border border-theme-text/30 space-y-3">
          {/* Company Details Field with Verify Button */}
          <div className="relative">
            <div className="flex items-center">
              <label className="text-theme-text text-sm mb-2 block pl-1">Company Details</label>
              <InfoTooltip
                content={tooltipContent.company}
                tooltipId="company"
                activeTooltip={activeTooltip}
                onToggle={toggleTooltip}
                className="ml-2 mb-2"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={companyDetails}
                onChange={(e) => {
                  setCompanyDetails(e.target.value);
                  // Reset verification status when user types
                  if (isVerified) {
                    setIsVerified(false);
                    setVerificationStatus(null);
                  }
                }}
                placeholder="Enter name and location of your company"
                className="flex-1 bg-theme-text/10 text-theme-text placeholder-theme-text/50 rounded-lg p-4 border border-theme-text/30"
              />
              <button
                onClick={handleVerifyCompany}
                disabled={!companyDetails.trim() || isVerifying}
                className={`px-6 py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                  isVerifying
                    ? 'bg-yellow-500/80 text-white cursor-not-allowed'
                    : isVerified
                    ? 'bg-green-50 text-theme-text border border-green-200 hover:bg-green-100/80' // New professional styling
                    : companyDetails.trim()
                    ? 'bg-theme-button-bg text-theme-button-text hover:bg-theme-button-hover'
                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }`}
              >
                {isVerifying ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Verifying...
                  </div>
                ) : isVerified ? (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-theme-text">Verified</span>
                  </div>
                ) : (
                  'Verify'
                )}
              </button>
            </div>
            
          </div>

          {/* Candidate Assistance Field */}
          <div className="relative">
            <div className="flex items-center">
              <label className="text-theme-text text-sm mb-2 block pl-1">Candidate Assistance</label>
              <InfoTooltip
                content={tooltipContent.assistance}
                tooltipId="assistance"
                activeTooltip={activeTooltip}
                onToggle={toggleTooltip}
                className="ml-2 mb-2"
              />
            </div>
            <input
              type="text"
              value={canAssistCandidates}
              onChange={(e) => setCanAssistCandidates(e.target.value)}
              placeholder="Are you able to offer assistance to potential candidates?"
              className="w-full bg-theme-text/10 text-theme-text placeholder-theme-text/50 rounded-lg p-4 border border-theme-text/30"
            />
          </div>

          {/* Referral Scheme Field */}
          <div className="relative">
            <div className="flex items-center">
              <label className="text-theme-text text-sm mb-2 block pl-1">Referral Scheme</label>
              <InfoTooltip
                content={tooltipContent.referral}
                tooltipId="referral"
                activeTooltip={activeTooltip}
                onToggle={toggleTooltip}
                className="ml-2 mb-2"
              />
            </div>
            <input
              type="text"
              value={hasReferralScheme}
              onChange={(e) => setHasReferralScheme(e.target.value)}
              placeholder="Does your company have an employee referral scheme in place?"
              className="w-full bg-theme-text/10 text-theme-text placeholder-theme-text/50 rounded-lg p-4 border border-theme-text/30"
            />
          </div>
          
          <button 
            onClick={handleCalculate}
            // Changed condition: Enable if ANY field has content
            disabled={!companyDetails.trim() && !canAssistCandidates.trim() && !hasReferralScheme.trim()}
            className={`w-full rounded-lg py-4 font-semibold transition-colors mt-4 ${
              // Changed condition here too: Enable if ANY field has content
              companyDetails.trim() || canAssistCandidates.trim() || hasReferralScheme.trim()
                ? 'bg-theme-button-bg text-theme-button-text hover:bg-theme-button-hover'
                : 'bg-theme-text/70 text-theme-bg cursor-not-allowed'
            }`}
          >
            Continue with Registration
          </button>
        </div>
      </div>
    </div>
  );
}