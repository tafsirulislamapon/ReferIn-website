"use client";

import { useState } from "react";
import Image from "next/image";

export default function NetworkName({ onImageChange }) {
  const [networkName, setNetworkName] = useState("");
  const [networkUrl, setNetworkUrl] = useState("");
  const [profileImage, setProfileImage] = useState("/fallbackUserImg.png");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      // Pass the image URL to parent component
      onImageChange?.(imageUrl);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg md:text-xl font-satoshi">
          Give your{" "}
          <span className="font-clash font-medium text-2xl text-[#08498E]">
            Referral Network
          </span>{" "}
          a name
        </h2>
        <p className="text-sm text-gray-500">
          You can always change it later.
        </p>
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Image
            src={profileImage}
            alt="Profile"
            width={56}
            height={56}
            className="rounded-full bg-gray-100 object-cover"
          />
          <input
            type="file"
            id="profileImageInput"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <button 
            className="absolute -right-1 -bottom-1 border-3 border-white rounded-full hover:cursor-pointer"
            onClick={() => document.getElementById('profileImageInput').click()}
          >
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="0.5" width="24" height="24" rx="12" fill="#08498E"/>
              <path d="M16.587 9.90619C16.8513 9.6419 16.9999 9.28342 16.9999 8.90962C17 8.53581 16.8515 8.1773 16.5872 7.91294C16.3229 7.64859 15.9645 7.50005 15.5906 7.5C15.2168 7.49995 14.8583 7.6484 14.594 7.91269L7.92097 14.5872C7.80488 14.7029 7.71902 14.8455 7.67097 15.0022L7.01047 17.1782C6.99754 17.2214 6.99657 17.2674 7.00764 17.3111C7.01872 17.3549 7.04143 17.3948 7.07337 17.4267C7.1053 17.4586 7.14528 17.4812 7.18905 17.4922C7.23282 17.5032 7.27875 17.5022 7.32197 17.4892L9.49847 16.8292C9.65505 16.7816 9.79755 16.6962 9.91347 16.5807L16.587 9.90619Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Network Name Input */}
      <div className="space-y-4">
        <div className="space-y-2">
          <input
            type="text"
            value={networkName}
            onChange={(e) => setNetworkName(e.target.value)}
            placeholder="e.g. My Amazing Engineering Network"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#08498E] focus:ring-1 focus:ring-[#08498E] outline-none transition-all text-sm md:text-base font-satoshi placeholder-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>The url of your Referral Network will be:</span>
          </div>
          <input
            type="text"
            value={networkUrl}
            onChange={(e) => setNetworkUrl(e.target.value)}
            placeholder="Referin.com/"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#08498E] focus:ring-1 focus:ring-[#08498E] outline-none transition-all text-sm md:text-base font-satoshi placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
}