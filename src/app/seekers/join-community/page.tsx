"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SignUpModal from '@/components/signUp/Signup-Modals/SignUpModal';
import { hasReferrers } from '@/constants/referrerConfig';

// Component for no referrers message (copied from LinkedInPost component)
function NoReferrersMessage() {
  return (
    <div className="space-y-6 bg-gradient-to-b from-[#F0F9FF] to-[#EFF6FF] rounded-lg p-8">
      <div className="space-y-6 text-gray-700">
        <p className="font-medium text-2xl">We haven&apos;t found your ideal referrer match yet - but that&apos;s about to change! 🚀</p>
        <p className="text-lg">New employees join the ReferIn community daily, and your perfect match could arrive anytime.</p>
        <p className="text-lg">Join the ReferIn community by regisering via LinkedIn now so we can notify you as soonnas a matching referrer join us.</p>
        <p className="text-lg">Plus, employees from your target companies often see these posts and reach out directly!</p>
      </div>
    </div>
  );
}

export default function JoinCommunityPage() {
  const router = useRouter();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("free");

  const handleGoToLinkedIn = () => {
    setShowSignUpModal(true);
  };

  const handleModalComplete = (option) => {
    setShowSignUpModal(false);
    localStorage.setItem('userSignedUp', 'true');
    // Use centralized hasReferrers function
    router.push(`/seekers/linkedin-post?hasReferrers=${hasReferrers()}`);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Main Content */}
        <NoReferrersMessage />

        {/* Register Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleGoToLinkedIn}
            className="bg-[#0A66C2] text-white px-8 py-3 rounded-lg hover:bg-[#084e95] transition-colors font-medium text-lg shadow-md"
          >
            Register via LinkedIn
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          Powered by RefeRin Copyright 2025
        </div>
      </div>

      {/* SignUp Modal */}
      <SignUpModal 
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        selectedOption={selectedOption}
        onComplete={handleModalComplete}
      />
    </div>
  );
}
