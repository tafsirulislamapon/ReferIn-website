"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Message from './Message';
import HelpUs from './HelpUs';
import SignUpModal from '../../signUp/Signup-Modals/SignUpModal';

// Component for after signup when no referrers (modified HelpUs without step 2)
function PostSignupHelpNoReferrers() {
  return (
    <div className="space-y-6 bg-gradient-to-b from-[#F0F9FF] to-[#EFF6FF] rounded-lg p-8">
      <h3 className="text-2xl font-semibold">Help others find opportunities</h3>
      <div className="space-y-4 text-gray-600">
        <div className="space-y-4">
          <p className="font-medium text-xl">Here&apos;s your next steps:</p>
          <div className="pl-6 space-y-4">
            <div className="flex gap-3">
              <span className="text-[#0A66C2] text-lg">1.</span>
              <p className="text-lg">Share ReferIn on LinkedIn using #ReferIn</p>
            </div>
            <div className="flex gap-3">
              <span className="text-[#0A66C2] text-lg">2.</span>
              <p className="text-lg">Our community will help amplify your post</p>
            </div>
            <div className="flex gap-3">
              <span className="text-[#0A66C2] text-lg">3.</span>
              <p className="text-lg">You might get additional referral offers from our community, from people who see your post!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LinkedInPostProps {
  onPostComplete: (hasReferrers?: boolean) => void;
  hasReferrers?: boolean;
  showSignUpModal?: boolean;
}

export default function LinkedInPost({ 
  onPostComplete, 
  hasReferrers = false, 
  showSignUpModal: showSignUpModalProp = false 
}: LinkedInPostProps) {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("free");
  const [userSignedUp, setUserSignedUp] = useState(false);

  useEffect(() => {
    // Check if user is already signed up from localStorage
    const isSignedUp = localStorage.getItem('userSignedUp') === 'true';
    setUserSignedUp(isSignedUp);
  }, []); // Only run once on component mount

  const handlePostToLinkedIn = () => {
    // If user hasn't signed up, show signup modal first
    if (!userSignedUp) {
      setShowSignUpModal(true);
      return;
    }

    const predefinedMessage = `Check out ReferIn.io to instantly match you to referral-ready employees at companies your interested in, with relevant vacancies.

Just thought I'd share to help any jobseekers out there..

#JobReferrals #JobSeekers #ReferIn`;

    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=https://referin.io&text=${encodeURIComponent(predefinedMessage)}`;
    window.open(linkedInShareUrl, '_blank');
    
    if (onPostComplete) {
      onPostComplete(hasReferrers);
    }
  };

  const handleGoBack = () => {
    onPostComplete(); // Use this instead of window.history.back()
  };

  const handleModalComplete = (option: string) => {
    setShowSignUpModal(false);
    setUserSignedUp(true);
    localStorage.setItem('userSignedUp', 'true');
    // User has completed signup, they can now post
  };

  // Determine the state
  const isNoReferrersFlow = !hasReferrers;
  const isNoReferrersAfterSignup = isNoReferrersFlow && userSignedUp;
  const isNormalFlow = hasReferrers; // Free seekers with referrers

  return (
    <>
      {/* Made the container bigger */}
      <div className="w-full max-w-4xl mx-auto bg-white rounded-xl p-8 sm:p-10">
        {/* Main Content */}
        <div className="bg-white rounded-lg">
          {/* LinkedIn Header - Show for all flows */}
          <div className="flex items-center gap-3 border-b pb-4 mb-6">
            <Image
              src="/icons/linkedIn.png"
              alt="LinkedIn"
              width={32}
              height={32}
            />
            <span className="font-medium text-lg">Share on LinkedIn</span>
          </div>
          
          {/* Show content based on flow */}
          {isNoReferrersFlow && (
            // No referrers flow - show help content
            <PostSignupHelpNoReferrers />
          )}
          
          {isNormalFlow && (
            // Normal flow with referrers - show original help (with step 2)
            <HelpUs />
          )}

          {/* LinkedIn Post Editor - Show for all flows */}
          <div className="mt-6 border rounded-lg p-4">
            <Message onPost={handlePostToLinkedIn} />
            
            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between gap-2 mt-4 border-t pt-4">
              {/* Post Button */}
              <div className="ml-auto">
                <button 
                  onClick={handlePostToLinkedIn}
                  className="bg-[#0A66C2] text-white px-6 py-2 rounded-lg hover:bg-[#084e95] transition-colors font-medium text-base"
                >
                  Post on LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center items-center gap-2 mt-8 text-sm text-gray-500">
          <span>Powered by</span>
          <Image
            src="/referInLOGO.svg"
            alt="ReferIn Logo"
            width={50}
            height={10}
            className="-mt-2"
          />
          <span>Copyright 2025</span>
        </div>
      </div>

      {/* SignUp Modal - Shows when needed */}
      <SignUpModal 
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        selectedOption={selectedOption}
        onComplete={handleModalComplete}
      />
    </>
  );
}