import Image from "next/image";
import { useState } from "react";
import ReferrerLanding from "./ReferrerLanding";

export default function Login({ onShowLinkedInPost }) {
  const [showLanding, setShowLanding] = useState(false);

  if (showLanding) {
    return <ReferrerLanding onShowLinkedInPost={onShowLinkedInPost} />;
  }

  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="relative w-full max-w-[480px]">
        {/* White Card Container */}
        <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-10">
          {/* Logo Container */}
          <div className="mb-12">
            <Image
              src="/referInLOGO.svg"
              alt="Referin Logo"
              width={100}
              height={25}
              className="mx-auto"
              priority
            />
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl font-clash font-bold text-[#0066CC] text-center">
              Reassure candidates by verifying your LinkedIn account
            </h1>

            {/* LinkedIn Button Container */}
            <div>
              <button 
                onClick={() => setShowLanding(true)}
                className="w-full bg-white border border-gray-200 text-gray-700 rounded-lg py-4 px-6 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
              >
                <Image
                  src="/icons/linkedIn.png"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                Continue with LinkedIn
              </button>
            </div>

            {/* Bottom Text */}
            <div className="text-center space-y-2">
              <button 
                onClick={() => setShowLanding(true)}
                className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
              >
                Don't have LinkedIn yet?
              </button>
              
              <a 
                href="https://www.linkedin.com/signup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-[#0066CC] text-sm font-medium hover:underline"
              >
                Get it now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}