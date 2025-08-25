"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PaidSeeker from '@/components/Seeker/PaidSeeker';
import LeftSide from '@/components/Seeker/LeftSide';
import Navbar from '@/components/Navbar/Navbar';

// Create a separate component that uses useSearchParams
function FeedbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated and handle payment success
  useEffect(() => {
    const userSignedUp = localStorage.getItem('userSignedUp') === 'true';
    const userHasPaid = localStorage.getItem('seekerHasPaid') === 'true';
    
    // Check if this is a payment success redirect
    const sessionId = searchParams.get('session_id');
    const paymentStatus = searchParams.get('payment_status');
    
    // If user just completed payment, mark them as signed up and paid
    if (sessionId && paymentStatus === 'complete') {
      localStorage.setItem('userSignedUp', 'true');
      localStorage.setItem('seekerHasPaid', 'true');
      setIsLoading(false);
      return;
    }
    
    // If user has already paid, allow access
    if (userHasPaid) {
      setIsLoading(false);
      return;
    }
    
    // If user is signed up but not paid, allow access (they might be in the process)
    if (userSignedUp) {
      setIsLoading(false);
      return;
    }
    
    // If none of the above, redirect to seekers page
    router.push('/seekers');
  }, [router, searchParams]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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

// Loading component for Suspense fallback
function FeedbackLoading() {
  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function FeedbackPage() {
  return (
    <Suspense fallback={<FeedbackLoading />}>
      <FeedbackContent />
    </Suspense>
  );
}
