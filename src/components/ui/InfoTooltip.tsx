"use client";

import { useState } from "react";
import Image from "next/image";

interface InfoTooltipProps {
  content: string;
  tooltipId: string;
  activeTooltip: string | null;
  onToggle: (tooltipId: string) => void;
  className?: string;
}

export default function InfoTooltip({ 
  content, 
  tooltipId, 
  activeTooltip, 
  onToggle,
  className = ""
}: InfoTooltipProps) {
  return (
    <div className={`relative inline-flex tooltip-container ${className}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle(tooltipId);
        }}
        className="group focus:outline-none"
        aria-label="Information"
      >
        <Image
          src="/svg/infoIcon-i.svg"
          alt="Info"
          width={14}
          height={14}
          className="opacity-60 group-hover:opacity-100 transition-opacity cursor-help"
        />
        
        {/* Desktop Hover Tooltip */}
        <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-max max-w-[280px] z-50 hidden lg:block">
          <div className="bg-white rounded-lg py-2 px-3 shadow-lg border border-gray-100">
            <p className="text-xs text-[#08498E] whitespace-normal">
              {content}
            </p>
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white"></div>
        </div>
      </button>
      
      {/* Mobile/Touch Tooltip */}
      {activeTooltip === tooltipId && (
        <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-max max-w-[280px] z-50 lg:hidden">
          <div className="bg-white rounded-lg py-2 px-3 shadow-lg border border-gray-100">
            <p className="text-xs text-[#08498E] whitespace-normal">
              {content}
            </p>
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white"></div>
        </div>
      )}
    </div>
  );
}
