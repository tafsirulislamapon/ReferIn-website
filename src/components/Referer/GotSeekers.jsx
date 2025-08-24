"use client";

import { useEffect } from "react";
import confetti from 'canvas-confetti';

export default function GotSeekers({ companyName = "your company", seekerCount = 5 }) {

  useEffect(() => {
    // Simple confetti bursts 
    const triggerConfetti = () => {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.3, x: Math.random() },
        colors: ['#08498E', '#ffffff', '#4ADE80']
      });
    };

    // Initial burst
    triggerConfetti();

    // A few more bursts
    const interval = setInterval(triggerConfetti, 1000);
    
    // Stop after 3 bursts
    setTimeout(() => {
      clearInterval(interval);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center p-3 xs:p-4 md:p-6 lg:p-8">
      <div className="relative bg-theme-text/5 backdrop-blur-[2px] rounded-3xl p-6 sm:p-8 lg:p-10 w-full max-w-[600px]">
        
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-clash font-bold text-theme-text">
            Perfect Match Found!
          </h2>
          
          <div className="bg-theme-text/10 rounded-lg p-6 border border-theme-text/20">
            <p className="text-lg font-medium text-theme-text leading-relaxed">
              We've already found <span className="font-bold text-blue-600">{seekerCount} matching job seekers</span> registered on ReferIn that are interested in being referred to <span className="font-semibold">{companyName}</span>!
            </p>
          </div>

          <p className="text-base text-theme-text/80 font-medium">
            Continue your registration now so they can reach out to you for support.
          </p>

          {/* Call to Action */}
          <div className="mt-8 p-4 bg-theme-text/10 rounded-lg border border-theme-text/10">
            <p className="text-sm text-theme-text/80 mb-3">
              <span className="font-semibold">Next Steps:</span> Complete your profile to unlock direct communication with these qualified candidates.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-theme-text/70">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Your information is secure and verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}