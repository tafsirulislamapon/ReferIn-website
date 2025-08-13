"use client";

import { useState } from "react";
import RefererLeftSide from "./RefererLeftSide";
import RefererRightSide from "./RefererRightSide";
import LinkedInPost from "./LinkedInPost/LinkedInPost";
import Thanks from "./Thanks";

export default function ReferrerAiPov() {
  const [showLinkedInPost, setShowLinkedInPost] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  const handleShowLinkedInPost = () => {
    setShowLinkedInPost(true);
  };

  const handlePostComplete = () => {
    setShowLinkedInPost(false);
    setShowThanks(true);
  };

  // Show LinkedIn post component full screen
  if (showLinkedInPost) {
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
            <LinkedInPost onPostComplete={handlePostComplete} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08498E] flex flex-col lg:flex-row items-center justify-center gap-0">
      <div className="w-full max-w-[1440px] flex flex-col lg:flex-row items-center justify-center">
        <RefererLeftSide />
        {showThanks ? (
          <Thanks />
        ) : (
          <RefererRightSide onShowLinkedInPost={handleShowLinkedInPost} />
        )}
      </div>
    </div>
  );
} 