"use client";

import { useState } from "react";
import NoReferrer from "./NoReferrer";
import LinkedInPost from "./LinkedInPost/LinkedInPost";
import ThankYou from "./ThankYou";

export default function RightSide({ 
  onSubmit 
}: { 
  onSubmit: (url: string, count: number) => void 
}) {
  const [jobUrl, setJobUrl] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [referrerCount, setReferrerCount] = useState(3);
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (jobUrl.trim()) {
      // Instead of showing result, directly call onSubmit
      if (onSubmit) {
        onSubmit(jobUrl, referrerCount);
      }
    }
  };

  // Remove handleComplete since we don't need it anymore

  const handleGoBack = () => {
    setShowResult(false);
    setJobUrl("");
  };

  const handleGoToLinkedIn = () => {
    setShowLinkedIn(true);
  };

  const handlePostComplete = () => {
    setShowLinkedIn(false);
    setShowThankYou(true);
  };

  const handleStartWithAI = () => {
    setShowThankYou(false);
    if (onSubmit) {
      onSubmit(jobUrl, referrerCount);
    }
  };

  // Show Thank You screen
  if (showThankYou) {
    return <ThankYou 
      onStartWithAI={handleStartWithAI}
      hasReferrers={referrerCount > 0}
    />;
  }

  // Show LinkedIn post component
  if (showLinkedIn) {
    return <LinkedInPost 
      onPostComplete={handlePostComplete}
      hasReferrers={referrerCount > 0}
    />;
  }

  if (showResult) {
    return referrerCount > 0 ? (
      // Remove SuccessPage and directly call onSubmit
      onSubmit(jobUrl, referrerCount)
    ) : (
      <NoReferrer 
        onGoBack={handleGoBack}
        onGoToLinkedIn={handleGoToLinkedIn}
      />
    );
  }

  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center p-3 xs:p-4 md:p-6 lg:p-8 overflow-hidden">
      <div className="bg-white/5 backdrop-blur-[2px] rounded-3xl p-3 xs:p-4 sm:p-6 lg:p-8 w-full max-w-[900px] relative min-h-[350px] xs:min-h-[400px] lg:min-h-[450px] flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col items-center text-center text-white">
          <h1 className="text-2xl xs:text-3xl lg:text-4xl font-bold mb-2 lg:mb-4">
            Seen a vacancy<br /> you like?
          </h1>
          
          <p className="text-xl xs:text-xl lg:text-2xl font-semibold mb-2">
            9x your chances of getting hired
          </p>

          <p className="text-base xs:text-lg lg:text-lg mb-4 lg:mb-8">
            Connect with employees at that company who can guide and refer you while others wait.
          </p>

          <input
            type="text"
            placeholder="Enter url of job spec here"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            className="w-full p-3 lg:p-4 rounded-xl bg-white/10 mb-3 lg:mb-4 text-center text-sm lg:text-base text-white placeholder:text-white/70"
          />

          <button 
            type="submit"
            className="w-full bg-[#001B5D] hover:bg-[#001B5D]/50 cursor-pointer text-white py-3 lg:py-4 rounded-xl text-sm lg:text-base font-semibold transition-colors"
          >
            Find Referrers for this Role
          </button>
        </form>
      </div>
    </div>
  );
}