"use client";
import Image from "next/image";
import SeekerCard from "./SeekerCard";
import { useState } from "react";

const cardInfo = [
  {
    position: "Marketing Manager",
    company: "Meta",
    companyIcon: "/icons/google.png",
    location: "Dublin, Ireland",
    rating: 4.8,
    profileImg: "/fallbackUserImg.png",
    name: "John Doe",
    linkedInUrl: "#"
  },
  {
    position: "Senior Designer",
    company: "Apple",
    companyIcon: "/icons/google.png",
    location: "California, USA",
    rating: 4.9,
    profileImg: "/fallbackUserImg.png",
    name: "Jane Smith",
    linkedInUrl: "#"
  },
  {
    position: "Senior Software Engineer",
    company: "Google",
    companyIcon: "/icons/google.png",
    location: "London, UK",
    rating: 4.9,
    profileImg: "/fallbackUserImg.png",
    name: "Alex Johnson",
    linkedInUrl: "#"
  }
];

export default function RefererLeftSide({ showCards = false }) {
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  return (
   
    <div className="w-full lg:w-[50%] flex justify-center items-center">
      <div className="relative bg-theme-text/5 backdrop-blur-[2px] rounded-3xl p-3 sm:p-4 w-full max-w-[600px] overflow-visible">
        {showCards ? (
          /* Cards Content */
          <div className="flex flex-col items-center">
            {/* Top row with two cards */}
            <div className="flex flex-col sm:flex-row justify-center w-full max-w-[700px] mx-auto overflow-visible">
              <div className="mb-4 sm:mb-0">
                <SeekerCard {...cardInfo[0]} />
              </div>
              <div className="sm:-ml-6 md:-ml-10 lg:-ml-16">
                <SeekerCard {...cardInfo[1]} />
              </div>
            </div>
            
            {/* Bottom row with single card */}
            <div className="mt-4 sm:-mt-1">
              <SeekerCard {...cardInfo[2]} />
            </div>
            
            {/* Text below cards */}
            <div className="text-theme-text text-base lg:text-lg font-satoshi font-light text-center max-w-[90%] mx-auto mt-8">
              <p className="leading-relaxed">
                {"You know your company and what makes someone a great fit - why not get rewarded for it?"}
              </p>
            </div>
          </div>
        ) : (
          /* Formless AI Iframe with Loading State */
          <div className="flex flex-col items-center">
            {/* iframe container */}
            <div className="w-full max-w-[580px] mx-auto relative">
              {isIframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-theme-text/20 backdrop-blur-sm rounded-2xl z-10">
                  {/* Rectangular loading animation */}
                  <div className="relative w-[320px] h-[180px] flex items-center justify-center">
                    {/* Outer pulsing border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-theme-text/20 animate-pulse-ring"></div>
                    {/* Inner pulsing background */}
                    <div className="absolute inset-0 bg-theme-text/5 rounded-2xl animate-pulse"></div>
                    {/* Content container */}
                    <div className="relative z-10 flex flex-col items-center">
                      <Image
                        src="/referInLOGO.svg"
                        alt="Referin Logo"
                        width={120}
                        height={30}
                        className="mb-4 animate-pulse"
                        priority
                      />
                      {/* Loading dots */}
                      <div className="flex gap-1.5 mt-2">
                        <div className="w-2 h-2 rounded-full bg-theme-text/80 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-theme-text/80 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-theme-text/80 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <p className="text-theme-text/80 mt-4 font-satoshi text-sm">
                        Loading calculator...
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <iframe
                src="https://formless.ai/c/K2MQwIXkqnLi"
                width="100%"
                height="600"
                frameBorder="0"
                className="rounded-2xl bg-theme-text/10 backdrop-blur-sm"
                title="Formless AI Calculator"
                allowFullScreen
                onLoad={() => setIsIframeLoading(false)}
                style={{ opacity: isIframeLoading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}