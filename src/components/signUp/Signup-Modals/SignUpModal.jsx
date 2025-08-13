"use client";

import { useState } from "react";
import CreateAccount from "../CreateAccount";
import PaidSeeker from "../../Seeker/PaidSeeker";
import LinkedInPost from "../../Seeker/LinkedInPost/LinkedInPost";

export default function SignUpModal({ isOpen, onClose, selectedOption, onComplete }) {
  const [currentStep, setCurrentStep] = useState("createAccount");
  const [formData, setFormData] = useState(null);

  // Handle modal close
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle completion of create account step
  const handleCreateAccountComplete = (data) => {
    setFormData(data);
  };

  // Handle next button click
  const handleNextClick = () => {
    if (formData) {
      onComplete(selectedOption); // Pass the selected option back
      onClose(); // Close the modal
    }
  };

  // Handle submission from PaidSeeker
  const handlePaidSeekerSubmit = (url) => {
    // Handle the URL submission
    console.log("Job URL submitted:", url);
    onClose();
  };

  // Handle completion of LinkedIn post
  const handleLinkedInPostComplete = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    // Full screen overlay with dark tint
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleClose}
    >
      {/* Content container */}
      <div 
        className="w-full h-full md:h-auto md:max-h-[90vh] md:w-auto md:min-w-[600px] md:max-w-2xl bg-white md:rounded-2xl overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Content based on current step */}
        <div className="p-6">
          {currentStep === "createAccount" && (
            <>
              <CreateAccount onComplete={handleCreateAccountComplete} />
              
              {/* Next/Signup Button */}
              <div className="mt-6">
                <button
                  onClick={handleNextClick}
                  className="w-full bg-[#08498E] text-white py-4 rounded-lg hover:bg-[#08498E]/90 transition-colors font-medium text-lg"
                  disabled={!formData?.firstName || !formData?.lastName || !formData?.email || !formData?.password}
                >
                  {selectedOption === "paid" ? "Continue to Payment" : "Continue to LinkedIn"}
                </button>
              </div>
            </>
          )}

          {currentStep === "paidSeeker" && (
            <div className="bg-[#08498E] -m-6">
              <PaidSeeker onSubmit={handlePaidSeekerSubmit} />
            </div>
          )}

          {currentStep === "linkedInPost" && (
            <LinkedInPost 
              onPostComplete={handleLinkedInPostComplete}
              hasReferrers={true}
            />
          )}
        </div>

        {/* Footer - Only show for create account step */}
        {currentStep === "createAccount" && (
          <div className="flex justify-center items-center gap-2 p-4 border-t">
            <span className="text-sm text-gray-500">
              {selectedOption === "paid" ? "£5 - Premium Access" : "Free Access - Share on LinkedIn"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}