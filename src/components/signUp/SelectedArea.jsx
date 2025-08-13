"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { dummyUser } from "@/constants/dummyUser"; // Import dummyUser

export default function SelectedArea({ selected, setSelected }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    inBetweenJobs: false,
    selfEmployed: false,
    lookingForInternship: false,
    fullTimeEmployment: false,
    partTimeEmployment: false
  });

  const options = [
    "Actively job seeking",
    "Employed - Casually Browsing Opportunities",
    "I want to refer others to my company and earn",
    "Recent Graduate",
    "University Student (Final Year)"
  ];

  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);
    
    // Remove localStorage usage
    // Instead, use the callback to update parent state only
    setCheckboxes({
      inBetweenJobs: false,
      selfEmployed: false,
      lookingForInternship: false,
      fullTimeEmployment: false,
      partTimeEmployment: false
    });
  };

  const renderCheckboxes = () => {
    if (!selected || isOpen) return null;

    switch (selected) {
      case "Actively job seeking":
        return (
          <div className="mt-4">
            <div className="flex flex-col md:flex-row gap-4">
              <label className="flex items-center gap-2 text-sm lg:text-base text-gray-700">
                <input
                  type="checkbox"
                  checked={checkboxes.inBetweenJobs}
                  onChange={(e) => setCheckboxes(prev => ({ ...prev, inBetweenJobs: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                In between jobs
              </label>
              <label className="flex items-center gap-2 text-sm lg:text-base text-gray-700">
                <input
                  type="checkbox"
                  checked={checkboxes.selfEmployed}
                  onChange={(e) => setCheckboxes(prev => ({ ...prev, selfEmployed: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                Self-employed
              </label>
            </div>
          </div>
        );
      case "Recent Graduate":
        return (
          <div className="mt-4">
            <div className="flex flex-col md:flex-row gap-4">
              <label className="flex items-center gap-2 text-sm lg:text-base text-gray-700">
                <input
                  type="checkbox"
                  checked={checkboxes.lookingForInternship}
                  onChange={(e) => setCheckboxes(prev => ({ ...prev, lookingForInternship: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                Looking for internship
              </label>
              <label className="flex items-center gap-2 text-sm lg:text-base text-gray-700">
                <input
                  type="checkbox"
                  checked={checkboxes.fullTimeEmployment}
                  onChange={(e) => setCheckboxes(prev => ({ ...prev, fullTimeEmployment: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                Full time employment
              </label>
            </div>
          </div>
        );
      case "University Student (Final Year)":
        return (
          <div className="mt-4">
            <div className="flex flex-col md:flex-row gap-4">
              <label className="flex items-center gap-2 text-sm lg:text-base text-gray-700">
                <input
                  type="checkbox"
                  checked={checkboxes.lookingForInternship}
                  onChange={(e) => setCheckboxes(prev => ({ ...prev, lookingForInternship: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                Looking for internship
              </label>
              <label className="flex items-center gap-2 text-sm lg:text-base text-gray-700">
                <input
                  type="checkbox"
                  checked={checkboxes.partTimeEmployment}
                  onChange={(e) => setCheckboxes(prev => ({ ...prev, partTimeEmployment: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                Part time employment
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2 lg:space-y-3 mt-4 lg:mt-6">
      {/* Selected Option with Dropdown */}
      {selected ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between py-3 px-4 text-left rounded-lg transition-all 
            text-sm lg:text-base font-satoshi border-2 border-[#08498E] bg-[#F5F9FF] text-[#08498E]"
        >
          <span>{selected}</span>
          <svg 
            width="19" 
            height="11" 
            viewBox="0 0 19 11" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          >
            <path d="M0.663617 0.57285C0.916026 0.320518 1.25832 0.178764 1.61523 0.178764C1.97213 0.178764 2.31443 0.320518 2.56684 0.57285L9.22945 7.23546L15.8921 0.57285C16.1459 0.327668 16.4859 0.192001 16.8388 0.195067C17.1917 0.198134 17.5293 0.339689 17.7789 0.589246C18.0284 0.838801 18.17 1.17639 18.1731 1.5293C18.1761 1.88222 18.0405 2.22221 17.7953 2.47607L10.1811 10.0903C9.92865 10.3426 9.58635 10.4844 9.22945 10.4844C8.87254 10.4844 8.53025 10.3426 8.27784 10.0903L0.663617 2.47607C0.411284 2.22366 0.269531 1.88136 0.269531 1.52446C0.269531 1.16755 0.411284 0.825259 0.663617 0.57285Z" 
            fill="#08498E"/>
          </svg>
        </button>
      ) : (
        <div className="space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className="w-full py-3 px-4 text-left rounded-lg transition-all 
                text-sm lg:text-base font-satoshi border border-[#E5E7EB] bg-[#F5F9FF] hover:border-[#08498E]"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Options List when dropdown is open */}
      {isOpen && (
        <div className="space-y-2">
          {options.map((option, index) => (
            option !== selected && (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="w-full py-3 px-4 text-left rounded-lg transition-all 
                  text-sm lg:text-base font-satoshi border border-[#E5E7EB] bg-[#F5F9FF] hover:border-[#08498E]"
              >
                {option}
              </button>
            )
          ))}
        </div>
      )}

      {/* Checkboxes based on selection */}
      {renderCheckboxes()}

      {/* Remove the Terms and Conditions section from here since it's in Step1.jsx */}
    </div>
  );
}
