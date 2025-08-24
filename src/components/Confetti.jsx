"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';

export default function Confetti({ 
  userName = "John Adam", 
  userImage = "/fallbackUserImg.png",
  temporary = false,
  message,
  redirectTo = '/referin-ai'
}) {
  const router = useRouter();

  useEffect(() => {
    // Multiple confetti bursts for more celebratory effect
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

    // Continuous bursts
    const interval = setInterval(triggerConfetti, 2000);

    // Only redirect if not in temporary mode
    let timer;
    if (!temporary) {
      timer = setTimeout(() => {
        router.push(redirectTo);
      }, 5000);
    }

    return () => {
      clearInterval(interval);
      if (timer) clearTimeout(timer);
    };
  }, [router, temporary, redirectTo]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-theme-bg">
      {/* Confetti background - top 40% only */}
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
          className="backdrop-blur-[20px] rounded-3xl text-center overflow-hidden p-12 bg-theme-text/10 border border-theme-text/20"
        >
          {/* Only show profile image if not temporary */}
          {!temporary && (
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <Image
                src={userImage}
                alt="User Profile"
                width={96}
                height={96}
                className="w-full h-full rounded-full object-cover border-4 border-theme-text/20"
              />
            </div>
          )}

          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/referInLOGO.svg"
              alt="Referin Logo"
              width={120}
              height={30}
              className="mx-auto"
              priority
            />
          </div>

          {/* Content */}
          <div className="text-theme-text space-y-6">
            <h2 className="text-3xl md:text-4xl font-clash font-bold">
              {message || `Welcome to ReferIn, ${userName}!`}
            </h2>
            <p className="text-xl">
              {temporary 
                ? "Success! Your action has been completed." 
                : "Your account has been created successfully. Redirecting you to get started..."
              }
            </p>
            
            {!temporary && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-theme-text"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
