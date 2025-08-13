"use client";

import Image from 'next/image';

export default function NoReferrer({ onGoBack, onGoToLinkedIn }) {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        background: 'linear-gradient(180deg, #2E1FFF 0%, #0C549F 100%)',
      }}
    >
      <div className="relative w-full max-w-[800px] mx-4">
        <div 
          className="backdrop-blur-[20px] rounded-3xl text-center overflow-hidden p-8 sm:p-12"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <div className="mb-8">
            <Image
              src="/referin-whiteTextLOGO.svg"
              alt="Referin Logo"
              width={120}
              height={30}
              className="mx-auto"
              priority
            />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-clash font-bold text-white mb-6">
            Each day, referrals are joining the
            <br />ReferIn network, we will notify
          </h1>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={onGoBack}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={onGoToLinkedIn}
              className="px-6 py-3 rounded-xl bg-[#0A66C2] hover:bg-[#0A66C2]/80 text-white font-semibold transition-colors"
            >
              Share on LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}