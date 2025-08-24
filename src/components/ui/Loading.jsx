"use client";

import { useState, useEffect } from "react";

export default function Loading({ 
  variant = "spinner", 
  size = "md", 
  message = "Loading...",
  showMessage = true,
  overlay = false 
}) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (variant === "dots") {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? "" : prev + ".");
      }, 500);
      return () => clearInterval(interval);
    }
  }, [variant]);

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  const containerClass = overlay 
    ? "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    : "flex flex-col items-center justify-center gap-4 p-8";

  const renderSpinner = () => (
    <div className={`${sizeClasses[size]} relative`}>
      {/* Outer ring */}
      <div className={`${sizeClasses[size]} rounded-full border-4 border-gray-200 absolute`}></div>
      {/* Spinning ring */}
      <div className={`${sizeClasses[size]} rounded-full border-4 border-transparent border-t-[#08498E] animate-spin`}></div>
    </div>
  );

  const renderPulse = () => (
    <div className="flex space-x-2">
      <div className="w-3 h-3 bg-[#08498E] rounded-full animate-pulse"></div>
      <div className="w-3 h-3 bg-[#08498E] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-3 h-3 bg-[#08498E] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );

  const renderBounce = () => (
    <div className="flex space-x-1">
      <div className="w-3 h-3 bg-[#08498E] rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-[#08498E] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-3 h-3 bg-[#08498E] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  );

  const renderDots = () => (
    <div className="text-[#08498E] font-medium text-lg">
      Loading{dots}
    </div>
  );

  const renderGradient = () => (
    <div className={`${sizeClasses[size]} relative`}>
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-[#08498E] via-blue-500 to-[#08498E] animate-spin`}
           style={{ 
             background: 'conic-gradient(from 0deg, #08498E, #3b82f6, #08498E, transparent)',
             borderRadius: '50%'
           }}>
      </div>
      <div className={`absolute inset-2 bg-white rounded-full`}></div>
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case "pulse":
        return renderPulse();
      case "bounce":
        return renderBounce();
      case "dots":
        return renderDots();
      case "gradient":
        return renderGradient();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={containerClass}>
      {overlay && (
        <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4">
          {renderLoader()}
          {showMessage && (
            <div className="text-center">
              <p className="text-gray-700 font-medium text-lg">{message}</p>
              <p className="text-gray-500 text-sm mt-1">Please wait a moment...</p>
            </div>
          )}
        </div>
      )}
      
      {!overlay && (
        <>
          {renderLoader()}
          {showMessage && (
            <div className="text-center">
              <p className="text-gray-700 font-medium text-lg">{message}</p>
              <p className="text-gray-500 text-sm mt-1">Please wait a moment...</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}