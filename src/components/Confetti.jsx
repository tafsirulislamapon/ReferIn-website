"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';

export default function Confetti({ userName = "John Adam", userImage = "/fallbackUserImg.png" }) {
  const router = useRouter();

  useEffect(() => {
    // Multiple confetti bursts for more celebratory effect
    const triggerConfetti = () => {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.3, x: Math.random() }, // Start higher up
        colors: ['#ffffff', '#2E1FFF', '#0C549F']
      });
    };

    // Initial burst
    triggerConfetti();

    // Continuous bursts
    const interval = setInterval(triggerConfetti, 2000);

    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push('/referin-ai');
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        background: 'linear-gradient(180deg, #2E1FFF 0%, #0C549F 100%)',
      }}
    >
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
          className="backdrop-blur-[20px] rounded-3xl text-center overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '3rem'
          }}
        >
          {/* Profile image */}
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full border-4 border-white" />
            <Image
              src={userImage}
              alt={userName}
              width={96}
              height={96}
              className="rounded-full object-cover"
              priority
            />
          </div>

          {/* Network name */}
          <h1 className="text-4xl font-clash font-bold text-white mb-3">
            "{userName}'s Software Network"
          </h1>

          {/* Success message */}
          <p className="text-white/90 font-satoshi text-lg">
            Congratulation, Your network has been created successfully.
          </p>
        </div>
      </div>
    </div>
  );
}
