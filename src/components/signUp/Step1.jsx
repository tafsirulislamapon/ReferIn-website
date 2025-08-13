"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProgressDots } from "@/components/ui/progress-dots";
import SelectedArea from "./SelectedArea";
import NetworkName from "./NetworkName";
import CreateAccount from "./CreateAccount";
import DropCv from "./DropCv";
import Confetti from "@/components/Confetti";

export default function Step1() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  // Commenting out network name state as it's not needed for now
  // const [showNetworkName, setShowNetworkName] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showDropCv, setShowDropCv] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    image: "/fallbackUserImg.png"
  });

  // Keep this handler for future use
  /* const handleImageChange = (imageUrl) => {
    setUserData(prev => ({
      ...prev,
      image: imageUrl
    }));
  }; */

  // Update this when user data is available from CreateAccount
  const handleCreateAccountData = (data) => {
    setUserData(prev => ({
      ...prev,
      name: `${data.firstName} ${data.lastName}`
    }));
  };

  const cvRequiredOptions = [
    "Actively job seeking",
    "Employed - Casually Browsing Opportunities",
    "University Student (Final Year)"
  ];

  const handleNext = () => {
    if (showCreateAccount) {
      if (cvRequiredOptions.includes(selected)) {
        setShowDropCv(true);
      } else {
        setShowConfetti(true);
      }
    // Remove the network name condition and go directly to create account
    } else if (selected && agreeToTerms) {
      setShowCreateAccount(true);
    }
  };

  const handleSkipOrDone = () => {
    setShowConfetti(true);
  };

  // Update step calculation to skip network name
  const getCurrentStep = () => {
    if (showDropCv) return 3; // Updated step numbers
    if (showCreateAccount) return 2;
    return 1;
  };

  // Update button enable logic to skip network name
  const isNextButtonEnabled = () => {
    if (showDropCv) return true;
    if (showCreateAccount) return true;
    return selected && agreeToTerms;
  };

  return (
    <>
      <div className="w-full max-w-[550px] lg:max-w-[650px] xl:max-w-[750px] mx-auto">
        {/* Header with logo and centered dots */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="w-24 md:w-28">
            <Image 
              src="/referInLOGO.svg" 
              alt="ReferIn"
              width={80}
              height={20}
              priority
              className="w-16 md:w-20 h-auto"
            />
          </div>
          {/* Update total steps to 3 since we're skipping network name */}
          <ProgressDots currentStep={getCurrentStep()} totalSteps={3} />
          <div className="w-24 md:w-28" />
        </div>

        {/* Question Section with border */}
        <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-4 md:p-6 mb-4 md:mb-6">
          {showDropCv ? (
            <DropCv 
              onSkip={handleSkipOrDone} 
              onDone={handleSkipOrDone}
            />
          ) : showCreateAccount ? (
            <CreateAccount onComplete={handleCreateAccountData} />
          // Comment out the network name condition
          /* ) : showNetworkName ? (
            <NetworkName onImageChange={handleImageChange} */
          ) : (
            <>
              <h2 className="text-lg md:text-xl font-satoshi mb-1">
                What best describes your{" "}
                <span className="font-clash font-medium text-[#08498E]">
                  current situation?
                </span>
              </h2>

              <SelectedArea selected={selected} setSelected={setSelected} />

              {selected && (
                <label className="flex items-center gap-2 mt-4 text-sm lg:text-base text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    checked={agreeToTerms}
                    onChange={() => setAgreeToTerms(!agreeToTerms)}
                    className="text-[#08498E]"
                  />
                  <span className="select-none">
                    Agree to our{" "}
                    <a href="#" className="text-[#08498E] hover:underline">Terms of services</a>
                    {" "}& {" "}
                    <a href="#" className="text-[#08498E] hover:underline">Privacy Policies</a>
                  </span>
                </label>
              )}
            </>
          )}
        </div>

        {/* Next Button - Only show if not on CV upload step */}
        {!showDropCv && (
          <Button 
            onClick={handleNext}
            className={`w-full py-3 md:py-6 rounded-lg text-white text-base font-medium ${
              isNextButtonEnabled()
                ? 'bg-[#08498E] hover:bg-[#08498E]/90' 
                : 'bg-[#08498E] opacity-50 cursor-not-allowed'
            }`}
            disabled={!isNextButtonEnabled()}
          >
            Next
          </Button>
        )}
      </div>
      {showConfetti && (
        <Confetti 
          userName={userData.name || "User"} 
          userImage={userData.image}
        />
      )}
    </>
  );
}