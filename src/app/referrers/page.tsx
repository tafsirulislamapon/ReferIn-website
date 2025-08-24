"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RefererLeftSide from "@/components/Referer/RefererLeftSide";
import ReferrerLanding from "@/components/Referer/ReferrerLanding";
import NoJobDes from "@/components/Referer/NoJobDes";
import LinkedInPost from "@/components/Referer/LinkedInPost/LinkedInPost";
import Thanks from "@/components/Referer/Thanks";
import Navbar from "@/components/Navbar/Navbar";
import InfoTooltipThemed from "@/components/ui/InfoTooltipThemed";
import RefererRightSide from "@/components/Referer/RefererRightSide";
import GotSeekers from "@/components/Referer/GotSeekers";

export default function ReferrersLanding() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State management
  const [currentState, setCurrentState] = useState('initial');
  const [companyDetails, setCompanyDetails] = useState("");
  const [canAssistCandidates, setCanAssistCandidates] = useState("");
  const [hasReferralScheme, setHasReferralScheme] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSkippedJobDescription, setHasSkippedJobDescription] = useState(false);
  const [hasSubmittedVacancy, setHasSubmittedVacancy] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  
  // State for GotSeekers functionality
  const [showGotSeekers, setShowGotSeekers] = useState(false);
  const [verifiedCompanyName, setVerifiedCompanyName] = useState("");
  const [seekerCount, setSeekerCount] = useState(0);

  // Tooltip content
  const tooltipContent = {
    company: "Provide your company name and location. This helps job seekers understand where opportunities are located and builds trust through workplace transparency.",
    assistance: "Describe the support you can offer candidates during the referral process. This could include interview preparation, company insights, application guidance, or internal resume submission.",
    referral: "Employee referral programs reward employees for successfully referring qualified candidates. Typical rewards range from £500-£5000+ cash bonuses, extra vacation days, or other incentives when referrals are hired."
  };

  useEffect(() => {
    const state = searchParams.get('state');
    const userSignedUp = localStorage.getItem('userSignedUp') === 'true';
    const skippedJobDesc = localStorage.getItem('skippedJobDescription') === 'true';
    const submittedVacancy = localStorage.getItem('hasSubmittedVacancy') === 'true';
    
    setIsAuthenticated(userSignedUp);
    setHasSkippedJobDescription(skippedJobDesc);
    setHasSubmittedVacancy(submittedVacancy);
    
    if (state === 'dashboard' && !userSignedUp) {
      router.push('/referrers');
      return;
    }
    
    if (state) {
      setCurrentState(state);
    }
  }, [searchParams, router]);

  // Navigation handlers
  const handleContinueWithRegistration = () => {
    router.push('/referrers/signup');
  };

  const handleJobDescriptionSubmit = () => {
    localStorage.removeItem('skippedJobDescription');
    setHasSkippedJobDescription(false);
    localStorage.setItem('hasSubmittedVacancy', 'true');
    setHasSubmittedVacancy(true);
    setCurrentState('linkedin');
    window.history.pushState(null, '', '/referrers?state=linkedin');
  };

  const handleSkipJobDescription = () => {
    localStorage.setItem('skippedJobDescription', 'true');
    setHasSkippedJobDescription(true);
    localStorage.removeItem('hasSubmittedVacancy');
    setHasSubmittedVacancy(false);
    setCurrentState('linkedin');
    window.history.pushState(null, '', '/referrers?state=linkedin');
  };

  const handlePostComplete = () => {
    setCurrentState('dashboard');
    window.history.pushState(null, '', '/referrers?state=dashboard');
  };

  // New handler for GotSeekers
  const handleShowGotSeekers = (show, companyName, count) => {
    setShowGotSeekers(show);
    setVerifiedCompanyName(companyName);
    setSeekerCount(count);
  };

  // Tooltip handlers
  const toggleTooltip = (tooltipId) => {
    setActiveTooltip(activeTooltip === tooltipId ? null : tooltipId);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.tooltip-container')) {
      setActiveTooltip(null);
    }
  };

  // Render different states
  if (currentState === 'linkedin') {
    return (
      <>
        <Navbar userName="John Doe" userEmail="john@example.com" />
        <div className="min-h-screen bg-theme-bg flex items-center justify-center p-4 pt-16">
          <div className="w-full max-w-[800px]">
            <LinkedInPost onPostComplete={handlePostComplete} />
          </div>
        </div>
      </>
    );
  }

  if (currentState === 'dashboard') {
    const DashboardLayout = ({ children }) => (
      <>
        <Navbar userName="John Doe" userEmail="john@example.com" />
        <div className="min-h-screen bg-theme-bg flex flex-col lg:flex-row items-center justify-center pt-16">
          <div className="w-full max-w-[1440px] flex flex-col lg:flex-row items-center justify-center gap-0">
            <RefererLeftSide showCards={true} />
            {children}
          </div>
        </div>
      </>
    );

    if (hasSubmittedVacancy || !hasSkippedJobDescription) {
      return <DashboardLayout><Thanks /></DashboardLayout>;
    }
    
    if (hasSkippedJobDescription) {
      return <DashboardLayout><NoJobDes isDashboard={true} /></DashboardLayout>;
    }
  }

  if (currentState === 'noJobDescription') {
    return (
      <>
        <Navbar userName="John Doe" userEmail="john@example.com" />
        <div className="min-h-screen bg-theme-bg flex flex-col lg:flex-row items-center justify-center pt-16">
          <div className="w-full max-w-[1440px] flex flex-col lg:flex-row items-center justify-center gap-0">
            <RefererLeftSide showCards={false} />
            <NoJobDes isDashboard={true} />
          </div>
        </div>
      </>
    );
  }

  if (currentState === 'jobDescription') {
    return (
      <>
        <Navbar userName="John Doe" userEmail="john@example.com" />
        <div className="min-h-screen bg-theme-bg flex flex-col lg:flex-row items-center justify-center pt-16">
          <div className="w-full max-w-[1440px] flex flex-col lg:flex-row items-center justify-center gap-0">
            <RefererLeftSide showCards={false} />
            <ReferrerLanding 
              onShowLinkedInPost={handleJobDescriptionSubmit}
              onSkip={handleSkipJobDescription}
            />
          </div>
        </div>
      </>
    );
  }

  // Initial state (default)
  return (
    <>
      <Navbar userName="John Doe" userEmail="john@example.com" />
      <div className="min-h-screen bg-theme-bg flex flex-col lg:flex-row items-center justify-center pt-16" onClick={handleOutsideClick}>
        <div className="w-full max-w-[1440px] flex flex-col lg:flex-row items-center justify-center gap-0">
          {/* Left Side - Show GotSeekers if seekers found, otherwise show iframe/cards */}
          {showGotSeekers ? (
            <GotSeekers 
              companyName={verifiedCompanyName} 
              seekerCount={seekerCount} 
            />
          ) : (
            <RefererLeftSide showCards={false} />
          )}
          
          {/* Right Side - Enhanced form with verify button */}
          <RefererRightSide 
            onShowLinkedInPost={() => {}} 
            onShowGotSeekers={handleShowGotSeekers}
          />
        </div>
      </div>
    </>
  );
}