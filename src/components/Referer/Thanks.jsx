import { useState } from 'react';
import Image from "next/image";
import UserAvatar from "../User/UserAvatar";
import ReferrerLanding from './ReferrerLanding';

export default function Thanks() {
  const [showAddMore, setShowAddMore] = useState(false);

  if (showAddMore) {
    return (
      <ReferrerLanding 
        onShowLinkedInPost={() => setShowAddMore(false)}
        onSkip={() => setShowAddMore(false)}
      />
    );
  }

  return (
    <>
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/referin-whiteTextLOGO.svg"
              alt="Referin Logo"
              width={100}
              height={25}
              className="h-8 w-auto"
              priority
            />
          </div>
          <UserAvatar 
            userName="John Doe"
            userEmail="john@example.com"
          />
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 pt-24">
        <div className="w-full max-w-[600px] space-y-8">
          {/* Success Message */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-clash font-bold text-white mb-4">
              Vacancy Submitted
            </h1>
            <p className="text-white/90 text-xl mb-2">
              Thank you!
            </p>
          </div>

          {/* Notification Message */}
          <div className="text-center text-white text-lg">
            <p>
              We've notified the existing <span className="text-[#4ADE80] font-bold">5</span> matching candidates that have registered with us and we'll notify new candidates with your LinkedIn profile to connect.
            </p>
          </div>

          {/* Add More Section */}
          <div 
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center cursor-pointer hover:bg-white/20 transition-colors"
            onClick={() => setShowAddMore(true)}
          >
            <h2 className="text-2xl font-clash font-bold text-white mb-2">
              Any more vacancies to add?
            </h2>
            <p className="text-white/90 mb-4">
              Multiplying vacancies = multiple income!
            </p>
            <p className="text-white font-medium">
              Click to submit more vacancies
            </p>
          </div>

          {/* Finish Button */}
          <button 
            className="w-full bg-[#0A2472] text-white rounded-lg py-4 font-semibold hover:bg-[#0A2472]/90 transition-colors"
            onClick={() => {
              // This should take user back to initial state (iframe page)
              window.location.reload();
            }}
          >
            I've finished, thank you
          </button>
        </div>
      </div>
    </>
  );
}