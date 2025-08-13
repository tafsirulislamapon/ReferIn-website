"use client";

import { useState } from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Results from "./Results";
import PaidSeeker from "./PaidSeeker";
import UserAvatar from "../User/UserAvatar";
import NoReferrer from "./NoReferrer";
import LinkedInPost from "./LinkedInPost/LinkedInPost";
import ThankYou from './ThankYou';

export default function SeekerAiPov() {
  const [showCards, setShowCards] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [jobUrl, setJobUrl] = useState("");
  const [referrerCount, setReferrerCount] = useState(0);
  const [showNoReferrer, setShowNoReferrer] = useState(false);
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = (url, count) => {
    setJobUrl(url);
    setReferrerCount(count || 0);
    setShowCards(true);
    setShowResults(true);
  };

  const handlePayment = () => {
    setHasPaid(true);
    if (referrerCount === 0) {
      setShowNoReferrer(true);
    }
    setShowResults(false);
    setShowCards(true);
  };

  const handlePaidSubmit = (url) => {
    setJobUrl(url);
    setShowCards(true);  // Just show cards directly
  };

  const handleGoToLinkedIn = () => {
    setShowLinkedIn(true);
    setShowNoReferrer(false);
    // Reset all other states
    setShowCards(false);
    setShowResults(false);
  };

  const handleGoBack = () => {
    setShowNoReferrer(false);
    setShowResults(true);
  };

  const handleStartWithAI = () => {
    // Reset modal states
    setShowThankYou(false);
    setShowLinkedIn(false);
    setShowNoReferrer(false);
    
    // Set states for PaidSeeker view
    setHasPaid(true);
    setShowResults(true);
    setShowCards(true);  // Add this to show the cards in LeftSide
  };

  const handlePostComplete = (hasReferrers = true) => {
    setShowLinkedIn(false);
    setShowThankYou(true);
    // Only set these if there are referrers
    if (hasReferrers) {
      setHasPaid(true);
      setShowCards(true);
    }
  };

  // Show NoReferrer component
  if (showNoReferrer) {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{
          background: 'linear-gradient(180deg, #2E1FFF 0%, #0C549F 100%)',
        }}
      >
        <div className="relative w-full max-w-[800px] mx-4">
          <div 
            className="backdrop-blur-[20px] rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <NoReferrer onGoBack={handleGoBack} onGoToLinkedIn={handleGoToLinkedIn} />
          </div>
        </div>
      </div>
    );
  }

  // Show LinkedIn post component
  if (showLinkedIn) {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{
          background: 'linear-gradient(180deg, #2E1FFF 0%, #0C549F 100%)',
        }}
      >
        <div className="relative w-full max-w-[800px] mx-4">
          <div 
            className="backdrop-blur-[20px] rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <LinkedInPost 
              onPostComplete={handlePostComplete} 
              hasReferrers={referrerCount > 0}
            />
          </div>
        </div>
      </div>
    );
  }

  // Show Thank You screen
  if (showThankYou) {
    return <ThankYou 
      onStartWithAI={handleStartWithAI} 
      hasReferrers={referrerCount > 0}
    />;
  }

  // Only render the main layout if NOT showing LinkedIn
  return (
    <>
      <nav className="w-full fixed top-0 right-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/referin-whiteTextLOGO.svg" 
              alt="Referin Logo" 
              className="h-8 w-auto"
            />
          </div>
          <UserAvatar 
            userName="Tafsirul Islam"
            userEmail="tafsirulislamapon@gmail.com"
          />
        </div>
      </nav>
      <main className="flex min-h-screen justify-center items-center w-full pt-16">
        <div className="flex flex-col-reverse lg:flex-row w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          {<LeftSide showCards={showCards} hasPaid={hasPaid} />}
          {showResults ? (
            hasPaid ? (
              <PaidSeeker onSubmit={handlePaidSubmit} />
            ) : (
              <Results 
                onPayment={handlePayment} 
                onGoToLinkedIn={handleGoToLinkedIn}
                referrerCount={referrerCount} // Add this prop
              />
            )
          ) : (
            <RightSide onSubmit={handleSubmit} />
          )}
        </div>
      </main>
    </>
  );
}