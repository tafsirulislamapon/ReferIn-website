"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RefererLeftSide from "@/components/Referer/RefererLeftSide";
import ReferrerLanding from "@/components/Referer/ReferrerLanding";
import NoJobDes from "@/components/Referer/NoJobDes";
import LinkedInPost from "@/components/Referer/LinkedInPost/LinkedInPost";
import Thanks from "@/components/Referer/Thanks";
import Navbar from "@/components/Navbar/Navbar";
import RefererRightSide from "@/components/Referer/RefererRightSide";
import GotSeekers from "@/components/Referer/GotSeekers";

// Create a separate component that uses useSearchParams
function ReferrersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State management
  const [currentState, setCurrentState] = useState('initial');
  const [hasSkippedJobDescription, setHasSkippedJobDescription] = useState(false);
  const [hasSubmittedVacancy, setHasSubmittedVacancy] = useState(false);
  
  // State for GotSeekers functionality
  const [showGotSeekers, setShowGotSeekers] = useState(false);
  const [verifiedCompanyName, setVerifiedCompanyName] = useState("");
  const [seekerCount, setSeekerCount] = useState(0);

  useEffect(() => {
    const state = searchParams.get('state');
    const userSignedUp = localStorage.getItem('userSignedUp') === 'true';
    const skippedJobDesc = localStorage.getItem('skippedJobDescription') === 'true';
    const submittedVacancy = localStorage.getItem('hasSubmittedVacancy') === 'true';
    
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
    setCurrentState('vacancy-submitted');
    window.history.pushState(null, '', '/referrers?state=vacancy-submitted');
  };

  // New handler for GotSeekers
  const handleShowGotSeekers = (show: boolean, companyName: string, count: number) => {
    setShowGotSeekers(show);
    setVerifiedCompanyName(companyName);
    setSeekerCount(count);
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
    const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
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

  if (currentState === 'vacancy-submitted') {
    const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
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

    // Show Thanks component for vacancy-submitted state
    return <DashboardLayout><Thanks /></DashboardLayout>;
  }

  // Initial state (default)
  return (
    <>
      <Navbar userName="John Doe" userEmail="john@example.com" />
      <div className="min-h-screen bg-theme-bg flex flex-col lg:flex-row items-center justify-center pt-16">
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

// Loading component for Suspense fallback
function ReferrersLoading() {
  return (
    <>
      <Navbar userName="John Doe" userEmail="john@example.com" />
      <div className="min-h-screen bg-theme-bg flex flex-col lg:flex-row items-center justify-center pt-16">
        <div className="w-full max-w-[1440px] flex flex-col lg:flex-row items-center justify-center gap-0">
          <RefererLeftSide showCards={false} />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Main component with Suspense boundary
export default function ReferrersLanding() {
  return (
    <Suspense fallback={<ReferrersLoading />}>
      <ReferrersContent />
    </Suspense>
  );
}