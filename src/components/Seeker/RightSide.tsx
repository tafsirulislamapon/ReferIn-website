"use client";

import { useState } from "react";
import NoReferrer from "./NoReferrer";
import LinkedInPost from "./LinkedInPost/LinkedInPost";
import ThankYou from "./ThankYou";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function RightSide({ 
  onSubmit 
}: { 
  onSubmit: (url: string, count: number) => void 
}) {
  const [jobSearch, setJobSearch] = useState("");
  const [location, setLocation] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [referrerCount, setReferrerCount] = useState(1);
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
          <h1 className="text-2xl xs:text-3xl lg:text-5xl font-bold mb-6 lg:mb-8">
            Seen a vacancy <br /> you like?
          </h1>
          <h2 className="text-xl xs:text-2xl lg:text-3xl font-bold mb-6 lg:mb-8">
              9x your chances of getting hired
          </h2>
          <p className="text-base xs:text-lg lg:text-2xl mb-4 lg:mb-8 mx-3">
            Connect with employees at that  company who can guide and refer you while others wait.
          </p>

          <div className="w-full space-y-3 mb-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                <Image
                  src="/svg/SearchIcon.svg"
                  alt="Search"
                  width={16}
                  height={16}
                  className="text-gray-400"
                />
              </div>
              <Input
                type="text"
                placeholder="Search by job title, company, or department"
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                className="pl-10 pr-3 py-6 lg:py-7 rounded-xl bg-white/10 text-sm lg:text-lg text-white placeholder:text-white/70 border-none focus-visible:ring-white/20"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                <Image
                  src="/svg/LocationIcon.svg"
                  alt="Location"
                  width={16}
                  height={16}
                  className="text-gray-400"
                />
              </div>
              <Input
                type="text"
                placeholder="Search and select city"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 pr-3 py-6 lg:py-7 rounded-xl bg-white/10 text-sm lg:text-lg text-white placeholder:text-white/70 border-none focus-visible:ring-white/20"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#0037FF] hover:bg-[#0037FF]/80 cursor-pointer text-white py-3 lg:py-4 rounded-xl text-sm lg:text-base font-semibold transition-colors"
          >
            Search job
          </button>
        </form>
      </div>
    </div>
  );
}