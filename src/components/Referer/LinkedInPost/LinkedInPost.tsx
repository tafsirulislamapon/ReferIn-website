"use client";

import Image from 'next/image';
import Message from './Message';
import ThanksForSubmit from './ThanksForSubmit';

export default function LinkedInPost({ onPostComplete }: { onPostComplete: () => void }) {
  const handlePostToLinkedIn = () => {
    const predefinedMessage = `Just joined ReferIn.io — a platform that connects job seekers directly with employees who can refer them.

I'm happy to support talented professionals by pointing them in the right direction when possible.

If you're exploring new opportunities, feel free to check it out.

#ReferIn #CareerGrowth #JobReferrals #Networking`;

    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=https://referin.io&text=${encodeURIComponent(predefinedMessage)}`;
    window.open(linkedInShareUrl, '_blank');
    
    if (onPostComplete) {
      onPostComplete();
    }
  };

  return (
    <div className="w-full bg-white rounded-xl p-6 sm:p-8">
      {/* Main Content */}
      <div className="bg-white rounded-lg">
        {/* LinkedIn Header */}
        <div className="flex items-center gap-3 border-b pb-4 mb-6">
          <Image
            src="/icons/linkedIn.png"
            alt="LinkedIn"
            width={32}
            height={32}
          />
          <span className="font-medium text-lg">Share on LinkedIn</span>
        </div>

        {/* Help Text Component */}
        <ThanksForSubmit />

        {/* LinkedIn Post Editor */}
        <div className="mt-6 border rounded-lg p-4">
          <Message onPost={handlePostToLinkedIn} />
          
          {/* Bottom Actions Bar */}
          <div className="flex items-center justify-between gap-2 mt-4 border-t pt-4">
            {/* Post Button - Made smaller */}
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
  );
}