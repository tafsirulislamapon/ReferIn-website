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
  const [jobSearch, setJobSearch] = useState("");
  const [location, setLocation] = useState("");
  const [showResult, setShowResult] = useState(false);
  const referrerCount = 2;
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (jobSearch.trim()) {
      // Combine both fields into one string for the existing onSubmit handler
      const searchString = `${jobSearch.trim()} ${location.trim()}`;
      if (onSubmit) {
        onSubmit(searchString, referrerCount);
      }
    }
  };

  const handleGoBack = () => {
    setShowResult(false);
    setJobSearch("");
    setLocation("");
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
      const searchString = `${jobSearch.trim()} ${location.trim()}`;
      onSubmit(searchString, referrerCount);
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
      onSubmit(`${jobSearch.trim()} ${location.trim()}`, referrerCount)
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
          {/* <h1 className="text-2xl xs:text-3xl lg:text-5xl font-bold mb-6 lg:mb-8">
            Seen a vacancy <br /> you like?
          </h1>
          <h2 className="text-xl xs:text-2xl lg:text-3xl font-bold mb-6 lg:mb-8">
              9x your chances of getting hired
          </h2> */}
          <p className="text-base xs:text-lg lg:text-2xl mb-4 lg:mb-8 mx-3">
          Connect with employees that can refer you, while other candidates still wait to get noticed!
          </p>

          <div className="w-full space-y-3 mb-3">
            <div className="relative">
              {/* <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                <Image
                  src="/svg/SearchIcon.svg"
                  alt="Search"
                  width={16}
                  height={16}
                  className="text-gray-400"
                />
              </div> */}
              <textarea
                placeholder={`Please paste here the url of a job spec for a vacancy you like.\n eg. https://companyname/jobs/1234`}
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                rows={2}
                className="w-full px-3 py-4 rounded-xl bg-white text-sm lg:text-lg text-[#08218E] placeholder:text-[#08218E]/60 border-none focus-visible:ring-white/20 resize-none text-center placeholder:text-center"
              />
            </div>
            <p className="text-base xs:text-lg -mt-2 lg:text-2xl mb-6 lg:mb-4 mx-3">
              or
            </p>
            <div className="relative mt-4">
              {/* <div className="absolute top-4 left-3 flex items-center pointer-events-none z-10">
                <Image
                  src="/svg/SearchIcon.svg"
                  alt="Location"
                  width={16}
                  height={16}
                  className="text-gray-400 mt-2"
                />
              </div> */}
              <textarea
                placeholder={`Enter Job title, location and mode of work.\neg: Data Analyst / Hybrid / London, UK`}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                rows={2}
                className="w-full px-3 py-4 rounded-xl bg-white text-sm lg:text-lg text-[#08218E] placeholder:text-[#08218E]/60 border-none focus-visible:ring-white/20 resize-none text-center placeholder:text-center"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-1/2 mx-auto mt-5 bg-[#08218E] hover:bg-[#0037FF]/80 cursor-pointer text-white py-2.5 lg:py-3 rounded-xl text-sm lg:text-lg font-semibold transition-colors"
          >
            Find Referrers Now
          </button>
        </form>
      </div>
    </div>
  );
}