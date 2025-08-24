import Image from "next/image";
import { useState } from "react";
import ReferrerLanding from "./ReferrerLanding";
import Thanks from "./Thanks";

export default function NoJobDes({ isDashboard = false }) {
  const [showAddVacancy, setShowAddVacancy] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  const handleAddVacancy = () => {
    setShowAddVacancy(true);
  };

  const handleVacancySubmit = () => {
    // Update localStorage to reflect that user has submitted a vacancy
    localStorage.setItem('hasSubmittedVacancy', 'true');
    // Remove the skip flag since user has now submitted a vacancy
    localStorage.removeItem('skippedJobDescription');
    setShowAddVacancy(false);
    setShowThanks(true);
  };

  const handleSkipVacancy = () => {
    setShowAddVacancy(false);
  };

  if (showThanks) {
    return <Thanks />;
  }

  if (showAddVacancy) {
    return (
      <ReferrerLanding 
        onShowLinkedInPost={handleVacancySubmit}
        onSkip={handleSkipVacancy}
      />
    );
  }

  return (
    <>
      {/* Main Content */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center items-center p-3 sm:p-4 lg:p-6">
        <div className="w-full max-w-[500px]">
          <div className="space-y-8">
            {/* Title and Description */}
            <div className="space-y-4 text-center">
              <h1 className="text-3xl sm:text-4xl font-clash font-bold text-theme-text">
                Ready to Grow Your Network?
              </h1>
              <p className="text-lg text-theme-text/80">
                Add a vacancy to start connecting with qualified candidates who are actively seeking referrals.
              </p>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <button
                onClick={handleAddVacancy}
                className="bg-theme-button text-theme-button-text rounded-lg py-4 px-8 font-semibold hover:bg-theme-button-hover transition-colors text-lg"
              >
                Add Your First Vacancy
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-theme-text/5 rounded-lg p-6 space-y-4">
              <h3 className="font-clash font-semibold text-theme-text">
                Why add a vacancy?
              </h3>
              
              <ul className="space-y-2 text-theme-text/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Matching job seekers will be able to find you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>5x your chances of receiving your referral bonus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>3x your chances of offering a paid service</span>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}