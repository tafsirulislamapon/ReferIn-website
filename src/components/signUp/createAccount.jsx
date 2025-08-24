"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CreateAccount({ onComplete, agreeToTerms, setAgreeToTerms }) {
  const [linkedInClicked, setLinkedInClicked] = useState(false);
  const [showTermsMessage, setShowTermsMessage] = useState(false);

  // Handle LinkedIn button click
  const handleLinkedInClick = () => {
    if (!agreeToTerms) {
      // Show message to agree to terms first
      setShowTermsMessage(true);
      // Hide the message after 3 seconds
      setTimeout(() => setShowTermsMessage(false), 3000);
      return;
    }

    // If terms are agreed, proceed with LinkedIn connection
    setLinkedInClicked(true);
    setShowTermsMessage(false);
    // Simulate LinkedIn data (in real implementation, this would come from LinkedIn OAuth)
    const mockLinkedInData = {
      firstName: "LinkedIn",
      lastName: "User",
      email: "user@linkedin.com",
      password: "linkedin_auth"
    };
    onComplete(mockLinkedInData);
  };

  // Reset LinkedIn state if terms are unchecked
  useEffect(() => {
    if (!agreeToTerms) {
      setLinkedInClicked(false);
      onComplete(null);
    }
  }, [agreeToTerms, onComplete]);

  return (
    <div>
      <h1 className="text-lg md:text-xl font-satoshi mb-6">
        You're almost ready, just{" "}
        <span className="text-[#08498E] font-clash font-medium">
          create your account
        </span>
      </h1>

      {/* Social Login Buttons */}
      <div className="space-y-3 mb-6">
        <Button
          variant="outline"
          className={`w-full h-12 flex items-center justify-center gap-2 text-gray-700 font-normal transition-colors ${
            linkedInClicked ? 'bg-blue-50 border-blue-300' : ''
          }`}
          onClick={handleLinkedInClick}
        >
          <Image
            src="/icons/linkedIn.png"
            alt="LinkedIn"
            width={24}
            height={24}
          />
          {linkedInClicked ? 'LinkedIn Connected ✓' : 'Continue with LinkedIn'}
        </Button>
        
        {/* Terms Agreement Message */}
        {showTermsMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
            <p className="text-sm text-red-600">
              Please agree to the Terms & Conditions first to continue with LinkedIn
            </p>
          </div>
        )}
      </div>

      {/* Terms and Sign in Link */}
      <div className="text-center mt-6">
        <label className="flex items-center gap-2 mb-4 text-sm text-gray-700 cursor-pointer justify-center">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => {
              setAgreeToTerms(e.target.checked);
              // Clear the terms message when user checks the box
              if (e.target.checked) {
                setShowTermsMessage(false);
              }
            }}
            className="rounded border-gray-300 text-[#08498E] focus:ring-[#08498E]"
          />
          <span>
            I agree to the{" "}
            <a 
              href="/terms-and-conditons" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#08498E] hover:underline"
            >
              Terms of services
            </a>
            {" "}& {" "}
            <a 
              href="/privacy-policy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#08498E] hover:underline"
            >
              Privacy Policies
            </a>
          </span>
        </label>
        <p className="text-gray-600">
          Already have an account?{" "}
          <a href="/sign-in" className="text-[#08498E] font-medium hover:underline">
            Sign in now
          </a>
        </p>
      </div>
    </div>
  );
}