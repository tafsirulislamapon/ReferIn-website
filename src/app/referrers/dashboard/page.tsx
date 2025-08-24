"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReferrersDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const userSignedUp = localStorage.getItem('userSignedUp') === 'true';
    
    if (!userSignedUp) {
      // Redirect to main referrers page if not authenticated
      router.push('/referrers');
    } else {
      // Redirect to main referrers page with dashboard state
      router.push('/referrers?state=dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center">
      <div className="text-theme-text text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-text mx-auto mb-4"></div>
        <p>Redirecting...</p>
      </div>
    </div>
  );
}

