"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProgressDots } from "@/components/ui/progress-dots";
import NetworkName from "@/components/signUp/networkName.jsx";
import CreateAccount from "@/components/signUp/createAccount.jsx";
import SignUpLeft from "@/components/signUp/SignUpLeft";
import Confetti from "@/components/Confetti";

// Define proper type for the data parameter
interface CreateAccountData {
  firstName: string;
  lastName: string;
}

export default function ReferrersSignup() {
  const [showNetworkName, setShowNetworkName] = useState(true);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    image: "/fallbackUserImg.png"
  });

  const handleImageChange = (imageUrl: string) => {
    setUserData(prev => ({
      ...prev,
      image: imageUrl
    }));
  };

  const handleCreateAccountData = (data: CreateAccountData | null) => {
    // Add null check to prevent the error
    if (!data) return;
    
    setUserData(prev => ({
      ...prev,
      name: `${data.firstName} ${data.lastName}`
    }));
  };

  const handleNext = () => {
    if (showNetworkName) {
      setShowCreateAccount(true);
      setShowNetworkName(false);
    } else if (showCreateAccount) {
      // Set authentication flag when account is created
      localStorage.setItem('userSignedUp', 'true');
      setShowConfetti(true);
    }
  };

  const getCurrentStep = () => {
    if (showCreateAccount) return 3;
    if (showNetworkName) return 2;
    return 2;
  };

  if (showConfetti) {
    return (
      <Confetti 
        userName={userData.name || "User"} 
        userImage={userData.image}
        temporary={false}
        message={`Welcome to ReferIn, ${userData.name || "User"}!`}
        redirectTo="/referrers?state=jobDescription"
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-[50%] min-h-[500px] md:min-h-screen bg-gradient-to-br from-[#0C549F] to-[#2E1FFF] flex items-center justify-center p-4 md:p-8">
        <SignUpLeft />
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-[#F9FAFB] flex items-center justify-center p-4 md:p-8">
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
            <ProgressDots currentStep={getCurrentStep()} totalSteps={4} />
            <div className="w-24 md:w-28" />
          </div>

          {/* Content Section with border */}
          <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-4 md:p-6 mb-4 md:mb-6">
            {showCreateAccount ? (
              <CreateAccount 
                onComplete={handleCreateAccountData}
                agreeToTerms={agreeToTerms}
                setAgreeToTerms={setAgreeToTerms}
              />
            ) : (
              <NetworkName onImageChange={handleImageChange} />
            )}
          </div>

          {/* Next Button */}
          <Button 
            onClick={handleNext}
            className="w-full py-3 md:py-6 rounded-lg text-white text-base font-medium bg-[#08498E] hover:bg-[#08498E]/90"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}