"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Results from "./Results";
import PaidSeeker from "./PaidSeeker";
import Navbar from "../Navbar/Navbar";

export default function SeekerAiPov() {
  const router = useRouter();
  const [showCards, setShowCards] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [jobUrl, setJobUrl] = useState("");
  const [referrerCount, setReferrerCount] = useState(0);

  const handleSubmit = (url, count) => {
    setJobUrl(url);
    setReferrerCount(count || 0);
    setShowCards(true);
    
    // If no referrers, redirect to join community page
    if (count === 0) {
      router.push('/seekers/join-community');
    } else {
      setShowResults(true);
    }
  };

  const handlePayment = () => {
    setHasPaid(true);
  };

  const handlePaidSubmit = () => {
    // Redirect to payment page
    router.push('/seekers/payment');
  };

  const handleGoToLinkedIn = () => {
    // Redirect to LinkedIn post page
    router.push('/seekers/linkedin-post?hasReferrers=true');
  };

  // Main layout return
  return (
    <>
      <Navbar 
        userName="Tafsirul Islam"
        userEmail="tafsirulislamapon@gmail.com"
      />
      <main className="flex min-h-screen justify-center items-center w-full pt-16 bg-theme-bg">
        <div className="flex flex-col-reverse lg:flex-row w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <LeftSide showCards={showCards} hasPaid={hasPaid} showMatchesText={showResults} />
          {!showResults ? (
            <RightSide onSubmit={handleSubmit} />
          ) : hasPaid ? (
            <PaidSeeker onSubmit={handlePaidSubmit} />
          ) : (
            <Results 
              onPayment={handlePayment} 
              onGoToLinkedIn={handleGoToLinkedIn}
              referrerCount={referrerCount} 
            />
          )}
        </div>
      </main>
    </>
  );
}