import Image from "next/image";
import { useState } from "react";
import UserAvatar from "../User/UserAvatar";
import ReferrerLanding from "./ReferrerLanding";
import Thanks from "./Thanks"; // Add this import

export default function NoJobDes({ isDashboard = false }) {
  const [showVacancyForm, setShowVacancyForm] = useState(false);
  const [hasSubmittedVacancy, setHasSubmittedVacancy] = useState(false);

  const handleAddVacancy = () => {
    setShowVacancyForm(true);
  };

  const handleVacancySubmitted = () => {
    setHasSubmittedVacancy(true);
    localStorage.setItem('hasSubmittedVacancy', 'true');
    setShowVacancyForm(false);
  };

  // Show Thanks component if vacancy was submitted
  if (hasSubmittedVacancy) {
    return <Thanks />;
  }

  if (showVacancyForm) {
    return (
      <ReferrerLanding 
        onShowLinkedInPost={handleVacancySubmitted} 
        onSkip={() => setShowVacancyForm(false)} 
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
      <div className="w-full lg:w-[40%] flex flex-col justify-center items-center p-3 sm:p-4 lg:p-6 pt-24">
        <div className="w-full max-w-[500px]">
          <div className="space-y-8">
            {/* Title and Description */}
            <div className="space-y-4 text-center">
              <h1 className="text-3xl sm:text-4xl font-clash font-bold text-white">
                Ready to Grow Your Network?
              </h1>
              <p className="text-lg text-white/80 leading-relaxed">
                Start by adding job vacancies to connect with potential candidates and expand your professional network.
              </p>
            </div>

            {/* Action Button */}
            <div className="space-y-4">
              <button 
                onClick={handleAddVacancy}
                className="w-full bg-blue-600 text-white rounded-lg py-5 text-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>Add Your First Vacancy</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Help Text */}
            <div className="text-center">
              <p className="text-sm text-white/60">
                Adding job vacancies helps you connect with the right candidates and grow your professional network
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}