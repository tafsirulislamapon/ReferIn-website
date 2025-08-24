"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';

export default function SuccessPage({ onComplete }) {
  useEffect(() => {
    // Multiple confetti bursts for more celebratory effect
    const triggerConfetti = () => {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.3, x: Math.random() },
        colors: ['#ffffff', '#2E1FFF', '#0C549F']
      });
    };

    // Initial confetti burst
    triggerConfetti();

    // Continuous confetti every 2 seconds
    const interval = setInterval(triggerConfetti, 2000);

    // Auto-hide after 3 seconds
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        background: 'linear-gradient(180deg, #2E1FFF 0%, #0C549F 100%)',
      }}
    >
      {/* Confetti background - top 40% */}
      <div 
        className="absolute top-0 left-0 right-0"
        style={{
          height: '40%',
          backgroundImage: `url('/svg/conffetti-bg.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0.8
        }}
      />

      {/* Content container */}
      <div className="relative w-full max-w-[800px] mx-4">
        {/* Glass card effect */}
        <div 
          className="backdrop-blur-[20px] rounded-3xl text-center overflow-hidden p-8 sm:p-12"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* Logo */}
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

          {/* Success message */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-clash font-bold text-white mb-4">
            Great! There are <span className="text-[#4ADE80]">05</span> candidates
            <br />that want to connect with you for a potential referral.
          </h1>
        </div>
      </div>
    </div>
  );
}