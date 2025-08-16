"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RefererLeftSide from "@/components/Referer/RefererLeftSide";
import ReferrerLanding from "@/components/Referer/ReferrerLanding";
import NoJobDes from "@/components/Referer/NoJobDes";
import LinkedInPost from "@/components/Referer/LinkedInPost/LinkedInPost";
import Thanks from "@/components/Referer/Thanks";

export default function ReferrersLanding() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get the current state from URL params or localStorage
  const [currentState, setCurrentState] = useState('initial'); // 'initial', 'jobDescription', 'noJobDescription', 'linkedin', 'dashboard'
  const [companyDetails, setCompanyDetails] = useState("");
  const [canAssistCandidates, setCanAssistCandidates] = useState("");
  const [hasReferralScheme, setHasReferralScheme] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSkippedJobDescription, setHasSkippedJobDescription] = useState(false);
  const [hasSubmittedVacancy, setHasSubmittedVacancy] = useState(false);

  useEffect(() => {
    // Check URL params for state
    const state = searchParams.get('state');
    
    // Simple authentication check - you can replace this with your actual auth logic
    const userSignedUp = localStorage.getItem('userSignedUp') === 'true';
    const skippedJobDesc = localStorage.getItem('skippedJobDescription') === 'true';
    const submittedVacancy = localStorage.getItem('hasSubmittedVacancy') === 'true';
    
    setIsAuthenticated(userSignedUp);
    setHasSkippedJobDescription(skippedJobDesc);
    setHasSubmittedVacancy(submittedVacancy);
    
    // If trying to access dashboard without authentication, redirect to initial
    if (state === 'dashboard' && !userSignedUp) {
      router.push('/referrers');
      return;
    }
    
    if (state) {
      setCurrentState(state);
    }
  }, [searchParams, router]);

  const handleContinueWithRegistration = () => {
    router.push('/referrers/signup');
  };

  const handleJobDescriptionSubmit = () => {
    // Clear the skip flag since user submitted a job description
    localStorage.removeItem('skippedJobDescription');
    setHasSkippedJobDescription(false);
    
    setCurrentState('linkedin');
    // Update URL without page reload
    window.history.pushState(null, '', '/referrers?state=linkedin');
  };

  const handleSkipJobDescription = () => {
    // Store that user skipped job description
    localStorage.setItem('skippedJobDescription', 'true');
    setHasSkippedJobDescription(true);
    
    setCurrentState('linkedin');
    // Update URL without page reload
    window.history.pushState(null, '', '/referrers?state=linkedin');
  };

  const handleShowNoJobDescription = () => {
    setCurrentState('noJobDescription');
    window.history.pushState(null, '', '/referrers?state=noJobDescription');
  };

  const handleAddVacancy = () => {
    setCurrentState('jobDescription');
    window.history.pushState(null, '', '/referrers?state=jobDescription');
  };

  const handleAddVacancyFromDashboard = () => {
    // Clear the skip flag and go to job description
    localStorage.removeItem('skippedJobDescription');
    setHasSkippedJobDescription(false);
    setCurrentState('jobDescription');
    window.history.pushState(null, '', '/referrers?state=jobDescription');
  };

  const handleSkipFromDashboard = () => {
    // Keep the skip flag and show regular dashboard
    setCurrentState('dashboard');
    window.history.pushState(null, '', '/referrers?state=dashboard');
  };

  const handlePostComplete = () => {
    setCurrentState('dashboard');
    window.history.pushState(null, '', '/referrers?state=dashboard');
  };

  const handleVacancySubmit = () => {
    // Handle vacancy submission logic here
    console.log('Vacancy submitted');
  };

  // LinkedIn Post State
  if (currentState === 'linkedin') {
    return (
      <div className="min-h-screen bg-[#08498E] flex items-center justify-center p-4">
        <div className="w-full max-w-[800px]">
          <LinkedInPost onPostComplete={handlePostComplete} />
        </div>
      </div>
    );
  }

  // Dashboard State (after LinkedIn post)
  if (currentState === 'dashboard') {
    // If user has submitted a vacancy later, show Thanks component
    if (hasSubmittedVacancy) {
      return (
        <div className="min-h-screen bg-[#08498E] flex flex-col lg:flex-row items-center justify-center">
          <div className="w-full max-w-[1440px] flex flex-col lg:flex-row items-center justify-center gap-0">
            <RefererLeftSide showCards={true} />
            <Thanks />
          </div>
        </div>
      );
    }
    
    // If user skipped job description and hasn't submitted a vacancy yet, show NoJobDes component
    if (hasSkippedJobDescription && !hasSubmittedVacancy) {
      return (
        <div className="min-h-screen bg-[#08498E] flex flex-col lg:flex-row items-center justify-center">
          <div className="w-full max-w-[1440px] flex flex-col lg:flex-row items-center justify-center gap-0">
            <RefererLeftSide showCards={true} />
            <NoJobDes 
              onAddVacancy={handleAddVacancyFromDashboard}
              onSkip={handleSkipFromDashboard}
              isDashboard={true}
            />
          </div>
        </div>
      );
    }
    
    // Regular dashboard with Thanks component
    return (
      <div className="min-h-screen bg-[#08498E] flex flex-col lg:flex-row items-center justify-center">
        <div className="w-full max-w-[1440px] flex flex-col lg:flex-row items-center justify-center gap-0">
          <RefererLeftSide showCards={true} />
          <Thanks />
        </div>
      </div>
    );
  }

  // No Job Description State
  if (currentState === 'noJobDescription') {
    return (
      <div className="min-h-screen bg-[#08498E] flex flex-col lg:flex-row items-center justify-center">
        <div className="w-full max-w-[1440px] flex flex-col lg:flex-row items-center justify-center gap-0">
          {/* Left Side - AI Calculator */}
          <RefererLeftSide showCards={false} />
          
          {/* Right Side - NoJobDes Component */}
          <NoJobDes 
            onAddVacancy={handleAddVacancy}
            onSkip={handleSkipJobDescription}
          />
        </div>
      </div>
    );
  }

  // Job Description State (after signup) - Using ReferrerLanding component
  if (currentState === 'jobDescription') {
    return (
      <div className="min-h-screen bg-[#08498E] flex flex-col lg:flex-row items-center justify-center">
        <div className="w-full max-w-[1440px] flex flex-col lg:flex-row items-center justify-center gap-0">
          {/* Left Side - AI Calculator */}
          <RefererLeftSide showCards={false} />
          
          {/* Right Side - ReferrerLanding Component */}
          <ReferrerLanding 
            onShowLinkedInPost={handleJobDescriptionSubmit}
            onSkip={handleSkipJobDescription}
          />
        </div>
      </div>
    );
  }

  // Initial State (default) - Reduce gap between components
  return (
    <div className="min-h-screen bg-[#08498E] flex flex-col lg:flex-row items-center justify-center">
      <div className="w-full max-w-[1440px] flex flex-col lg:flex-row items-center justify-center gap-0">
        {/* Left Side - AI Calculator */}
        <RefererLeftSide showCards={false} />
        
        {/* Right Side - Don't pass on passive income form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-6">
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
                onClick={handleContinueWithRegistration}
                className="w-full bg-blue-600 text-white rounded-lg py-4 font-semibold hover:bg-blue-700 transition-colors mt-4"
              >
                Continue with Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}