import Image from "next/image";
import { useState, useEffect } from "react";
import Toast from "../ui/Toast";

export default function ReferrerCard({ 
  position, 
  company,
  companyIcon, 
  location, 
  rating, 
  profileImg,
  vacancies,
  name,
  linkedInUrl,
  hasPaid = false,
  className = ""
}) {
  const [showToast, setShowToast] = useState(false);
  const [isInitiallyBlurred, setIsInitiallyBlurred] = useState(true);

  // Remove initial blur after a short delay 
  useEffect(() => {
    if (hasPaid) {
      const timer = setTimeout(() => {
        setIsInitiallyBlurred(false);
      }, 1000); // Adjust timing as needed
      
      return () => clearTimeout(timer);
    }
  }, [hasPaid]);

  const handleLinkedInClick = (e) => {
    if (!hasPaid) {
      e.preventDefault();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Show blur if either not paid OR initially blurred
  const shouldBlur = !hasPaid || isInitiallyBlurred;

  return (
    <>
      <div 
        className={`bg-card-blue backdrop-blur-md rounded-lg p-2.5 sm:p-3 md:p-4 text-card-white border border-card-white w-[180px] xs:w-[200px] sm:w-[240px] md:w-[280px] lg:w-[300px] shadow-lg transform transition-transform ${className}`}
      >
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="relative">
            <Image
              src={profileImg}
              alt={name || "Profile"}
              width={28}
              height={28}
              className={`rounded-full object-cover ring-1 ring-white/20 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 transition-all duration-500 ${shouldBlur ? 'blur-[2px] opacity-70' : ''}`}
            />
            {shouldBlur && (
              <div className="absolute inset-0 bg-white/10 rounded-full" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 
              className={`font-clash font-semibold text-[13px] sm:text-sm md:text-base leading-tight mb-0.5 truncate text-card-blue transition-all duration-500 ${shouldBlur ? 'blur-[2px] opacity-70 select-none' : ''}`}
              onCopy={shouldBlur ? (e) => {
                e.preventDefault();
                e.clipboardData?.setData('text/plain', 'You can\'t copy this');
                return false;
              } : undefined}
              onMouseDown={shouldBlur ? (e) => e.preventDefault() : undefined}
              onDragStart={shouldBlur ? (e) => e.preventDefault() : undefined}
              style={shouldBlur ? { 
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
              } : undefined}
            >
              {name || position}
            </h3>
            <div className="flex items-center gap-1 mb-0.5">
              {companyIcon && (
                <Image
                  src={companyIcon}
                  alt={company}
                  width={10}
                  height={10}
                  className="object-contain w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5"
                />
              )}
              <span className="text-[11px] sm:text-xs md:text-sm text-card-blue truncate">{company}</span>
            </div>
            <div className="text-[11px] sm:text-xs md:text-sm text-card-blue truncate">{location}</div>
          </div>
          <div className="flex items-center gap-0.5 sm:gap-1">
            <Image
              src="/svg/starRating.svg"
              alt="star"
              width={12}
              height={12}
              className="text-yellow-400 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
            />
            <span className="text-[11px] sm:text-xs md:text-sm font-medium text-yellow-400">{rating}</span>
          </div>
        </div>

        <div className="mt-2 sm:mt-3 text-[11px] sm:text-xs md:text-sm font-medium text-[#4ADE80]">
          {vacancies}
        </div>

        <a 
          href={linkedInUrl || "#"} 
          onClick={handleLinkedInClick}
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full mt-2 sm:mt-3 bg-white text-theme-text cursor-pointer rounded-md py-1 sm:py-1.5 md:py-2 px-2 sm:px-3 text-[11px] sm:text-xs md:text-sm font-semibold active:bg-gray-100 transition-colors flex items-center justify-center gap-1.5 shadow-sm hover:bg-white/90"
        >
          <Image
            src="/icons/linkedIn.png"
            alt="LinkedIn"
            width={12}
            height={12}
            className="object-contain w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
          />
          Message me on LinkedIn
        </a>
      </div>

      <Toast 
        message="Please pay £5 to connect with referrers"
        isVisible={showToast}
        type="info"
      />
    </>
  );
}

