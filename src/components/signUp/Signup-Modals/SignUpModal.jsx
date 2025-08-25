"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CreateAccount from "@/components/signUp/createAccount";
import PaidSeeker from "../../Seeker/PaidSeeker";
import LinkedInPost from "../../Seeker/LinkedInPost/LinkedInPost";
import Loading from "../../ui/Loading";
import { hasReferrers } from '@/constants/referrerConfig';

export default function SignUpModal({ isOpen, onClose, selectedOption, onComplete }) {
  const [currentStep, setCurrentStep] = useState("createAccount");
  const [formData, setFormData] = useState(null);
  const router = useRouter();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  // Handle modal close
  const handleClose = (e) => {
    if (e.target === e.currentTarget && !isProcessingPayment && !isCreatingAccount) {
      onClose();
    }
  };

  // Update the handleCreateAccountComplete function
  const handleCreateAccountComplete = (data) => {
    setFormData(data);
  };

  // Handle Stripe payment
  const handleStripePayment = async () => {
    try {
      setIsProcessingPayment(true);
      console.log('Starting Stripe payment...'); // Add this for debugging
      
      // Create Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'price_1RwsnV5MNqM5TusZ1jyKRA2s', 
          userId: formData.email,
          successUrl: `${window.location.origin}/seekers/feedback`,
          cancelUrl: `${window.location.origin}/seekers`,
        }),
      });

      console.log('API response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`API Error: ${errorData.error || 'Unknown error'}`);
      }

      const { sessionId } = await response.json();
      console.log('Session ID received:', sessionId);

      // Load Stripe
      const { loadStripe } = await import('@stripe/stripe-js');
      
      // Check if publishable key exists
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        throw new Error('Stripe publishable key is not configured');
      }
      
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      
      if (stripe && sessionId) {
        console.log('Redirecting to Stripe checkout...');
        await stripe.redirectToCheckout({ sessionId });
      } else {
        throw new Error('Failed to load Stripe or get session ID');
      }

    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessingPayment(false);
      
      // Provide more specific error messages
      let errorMessage = 'An unexpected error occurred';
      
      if (error.message.includes('STRIPE_SECRET_KEY')) {
        errorMessage = 'Payment system is not properly configured. Please contact support.';
      } else if (error.message.includes('API Error')) {
        errorMessage = error.message.replace('API Error: ', '');
      } else if (error.message.includes('publishable key')) {
        errorMessage = 'Payment system configuration error. Please contact support.';
      } else {
        errorMessage = error.message;
      }
      
      alert(`Payment failed: ${errorMessage}. Please try again.`);
    }
  };

  // Simulate account creation for free users
  const handleFreeAccountCreation = async () => {
    setIsCreatingAccount(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsCreatingAccount(false);
    localStorage.setItem('userSignedUp', 'true');
    
    // Use centralized hasReferrers function
    window.location.href = `/seekers/linkedin-post?hasReferrers=${hasReferrers()}`;
  };

  // Modify the handleNextClick function
  const handleNextClick = async () => {
    if (formData && agreeToTerms) {
      if (selectedOption === "paid") {
        await handleStripePayment();
      } else {
        await handleFreeAccountCreation();
      }
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

  // Show loading overlay when processing payment or creating account
  if (isProcessingPayment) {
    return (
      <Loading 
        variant="gradient"
        size="lg"
        message="Setting up your premium account"
        showMessage={true}
        overlay={true}
      />
    );
  }

  if (isCreatingAccount) {
    return (
      <Loading 
        variant="gradient"
        size="lg"
        message="Creating your account"
        showMessage={true}
        overlay={true}
      />
    );
  }

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
            disabled={isProcessingPayment || isCreatingAccount}
          >
            ✕
          </button>
        </div>

        {/* Content based on current step */}
        <div className="p-6">
          {currentStep === "createAccount" && (
            <>
              <CreateAccount 
                onComplete={handleCreateAccountComplete} 
                agreeToTerms={agreeToTerms}
                setAgreeToTerms={setAgreeToTerms}
              />
              
              {/* Next/Signup Button */}
              <div className="mt-6">
                <button
                  onClick={handleNextClick}
                  className={`w-full bg-[#08498E] text-white py-4 rounded-lg transition-colors font-medium text-lg ${
                    (!formData || !agreeToTerms || isProcessingPayment || isCreatingAccount)
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-[#08498E]/90'
                  }`}
                  disabled={!formData || !agreeToTerms || isProcessingPayment || isCreatingAccount}
                >
                  {isProcessingPayment || isCreatingAccount ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {isProcessingPayment ? 'Processing...' : 'Creating Account...'}
                    </div>
                  ) : (
                    'Create Account'
                  )}
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
              hasReferrers={hasReferrers()}
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