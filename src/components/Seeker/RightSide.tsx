"use client";

import { useState } from "react";
import LinkedInPost from "./LinkedInPost/LinkedInPost";
import ThankYou from "./ThankYou";

export default function RightSide({ 
  onSubmit 
}: { 
  onSubmit: (url: string, count: number) => void 
}) {
  const [jobUrl, setJobUrl] = useState("");
  const [jobDetails, setJobDetails] = useState("");
  const [companyName, setCompanyName] = useState("");
  const referrerCount = 10; 

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    setJobUrl(pastedText);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Allow onChange for React, but we'll still restrict typing via onKeyDown
    setJobUrl(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Allow paste (Ctrl+V/Cmd+V), backspace, delete, and navigation keys
    if (
      !((e.ctrlKey || e.metaKey) && e.key === 'v') && // Allow Ctrl+V or Cmd+V
      !((e.ctrlKey || e.metaKey) && e.key === 'a') && // Allow Ctrl+A or Cmd+A
      e.key !== 'Backspace' && 
      e.key !== 'Delete' && 
      e.key !== 'ArrowLeft' && 
      e.key !== 'ArrowRight' && 
      e.key !== 'ArrowUp' && 
      e.key !== 'ArrowDown' &&
      e.key !== 'Home' &&
      e.key !== 'End' &&
      e.key !== 'Tab' &&
      e.key !== 'Escape'
    ) {
      e.preventDefault();
    }
  };

  const clearUrl = () => {
    setJobUrl("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if at least one field has content
    const hasJobUrl = jobUrl.trim();
    const hasJobDetails = jobDetails.trim();
    const hasCompanyName = companyName.trim();
    
    if (hasJobUrl || hasJobDetails || hasCompanyName) {
      // Prioritize job URL, then job details, then company name
      let searchString = "";
      
      if (hasJobUrl) {
        searchString = jobUrl.trim();
      } else if (hasJobDetails) {
        searchString = jobDetails.trim();
      } else {
        searchString = companyName.trim();
      }
      
      if (onSubmit) {
        onSubmit(searchString, referrerCount);
      }
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center p-3 xs:p-4 md:p-6 lg:p-8 overflow-hidden">
      <div className="bg-theme-text/5 backdrop-blur-[2px] rounded-3xl p-3 xs:p-4 sm:p-6 lg:p-8 w-full max-w-[900px] relative min-h-[350px] xs:min-h-[400px] lg:min-h-[450px] flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col items-center text-center text-theme-text">
          <p className="text-base xs:text-lg lg:text-2xl mb-4 lg:mb-8 mx-3">
          Connect with employees that can refer you, while other candidates still wait to get noticed!
          </p>

          <div className="w-full space-y-3 mb-3">
            <div className="relative">
              <textarea
                placeholder={`Please paste here the url of a job spec for a vacancy you like.\n eg. https://companyname/jobs/1234`}
                value={jobUrl}
                onChange={handleUrlChange}
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                rows={2}
                className="w-full px-3 py-4 pr-12 rounded-xl bg-white text-sm lg:text-lg text-theme-text placeholder:text-theme-text/60 border-none focus-visible:ring-theme-text/20 resize-none text-center placeholder:text-center scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                title="Paste only - Use Ctrl+V to paste job URL"
              />
              {jobUrl && (
                <button
                  type="button"
                  onClick={clearUrl}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full bg-theme-text/10 hover:bg-theme-text/20 text-theme-text/70 hover:text-theme-text transition-all duration-200 group"
                  title="Clear URL"
                >
                  <svg 
                    className="w-4 h-4 group-hover:scale-110 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <p className="text-base xs:text-lg -mt-2 lg:text-2xl mb-6 lg:mb-4 mx-3">
              or
            </p>
            <div className="relative mt-4">
              <textarea
                placeholder={`Enter Job title, location and mode of work.\neg: Data Analyst / Hybrid / London, UK`}
                value={jobDetails}
                onChange={(e) => setJobDetails(e.target.value)}
                rows={2}
                className="w-full px-3 py-4 rounded-xl bg-white text-sm lg:text-lg text-theme-text placeholder:text-theme-text/60 border-none focus-visible:ring-theme-text/20 resize-none text-center placeholder:text-center scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
              />
            </div>
            <p className="text-base xs:text-lg -mt-2 lg:text-2xl mb-6 lg:mb-4 mx-3">
              or
            </p>
            <div className="relative mt-4">
              <textarea
                placeholder={`Enter Company Name\neg. Google, Amazon, Apple, Microsoft`}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                rows={2}
                className="w-full px-3 py-4 rounded-xl bg-white text-sm lg:text-lg text-theme-text placeholder:text-theme-text/60 border-none focus-visible:ring-theme-text/20 resize-none text-center placeholder:text-center scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-1/2 mx-auto mt-5 bg-theme-button-bg hover:bg-theme-button-hover cursor-pointer text-theme-button-text py-2.5 lg:py-3 rounded-xl text-sm lg:text-lg font-semibold transition-colors"
          >
            Find Referrers Now
          </button>
        </form>
      </div>
    </div>
  );
}