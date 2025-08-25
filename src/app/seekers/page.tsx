"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SeekerAiPov from "@/components/Seeker/SeekerAi-Pov";
import Navbar from "@/components/Navbar/Navbar";
import LeftSide from "@/components/Seeker/LeftSide";
import PaidSeeker from "@/components/Seeker/PaidSeeker";

// Create a separate component that uses useSearchParams
function SeekersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get the current state from URL params
  const [currentState, setCurrentState] = useState('initial'); // 'initial', 'dashboard'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    // Check URL params for state
    const state = searchParams.get('state');
    const paymentStatus = searchParams.get('payment');
    
    // Simple authentication check
    const userSignedUp = localStorage.getItem('userSignedUp') === 'true';
    let userHasPaid = localStorage.getItem('seekerHasPaid') === 'true';
    
    // If payment was successful, mark user as paid
    if (paymentStatus === 'success' && userSignedUp) {
      localStorage.setItem('seekerHasPaid', 'true');
      userHasPaid = true;
    }
    
    setIsAuthenticated(userSignedUp);
    setHasPaid(userHasPaid);
    
    // If trying to access dashboard without authentication, redirect to initial
    if (state === 'dashboard' && !userSignedUp) {
      router.push('/seekers');
      return;
    }
    
    if (state) {
      setCurrentState(state);
    }
  }, [searchParams, router]);

  // Dashboard State (authenticated users) - Show the exact layout from the image
  if (currentState === 'dashboard' && isAuthenticated) {
    return (
      <>
        <Navbar 
          userName="Tafsirul Islam"
          userEmail="tafsirulislamapon@gmail.com"
        />
        <main className="flex min-h-screen justify-center items-center w-full pt-16 bg-theme-bg">
          <div className="flex flex-col-reverse lg:flex-row w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            {/* Left Side - Shows referrer cards with "Keep going!" layout */}
            <LeftSide hasPaid={hasPaid} />
            
            {/* Right Side - Shows PaidSeeker component with the form */}
            <PaidSeeker />
          </div>
        </main>
      </>
    );
  }

  // Initial State (default) - Show the main SeekerAiPov component
  return (
    <div className="min-h-screen bg-theme-bg">
      <SeekerAiPov />
    </div>
  );
}

// Loading component for Suspense fallback
function SeekersLoading() {
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
export default function SeekersPage() {
  return (
    <Suspense fallback={<SeekersLoading />}>
      <SeekersContent />
    </Suspense>
  );
}
