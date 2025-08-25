"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PaidSeeker from '@/components/Seeker/PaidSeeker';
import LeftSide from '@/components/Seeker/LeftSide';
import Navbar from '@/components/Navbar/Navbar';

export default function FeedbackPage() {
  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    const userSignedUp = localStorage.getItem('userSignedUp') === 'true';
    if (!userSignedUp) {
      router.push('/seekers');
      return;
    }
  }, [router]);

  return (
    <>
      <Navbar 
        userName="Tafsirul Islam"
        userEmail="tafsirulislamapon@gmail.com"
      />
      <main className="flex min-h-screen justify-center items-center w-full pt-16 bg-theme-bg">
        <div className="flex flex-col-reverse lg:flex-row w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          {/* Left Side - Shows referrer cards with "Keep going!" layout */}
          <LeftSide hasPaid={true} />
          
          {/* Right Side - Shows PaidSeeker component with the form */}
          <PaidSeeker />
        </div>
      </main>
    </>
  );
}
