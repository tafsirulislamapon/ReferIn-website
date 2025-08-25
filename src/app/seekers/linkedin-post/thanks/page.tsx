"use client";

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ThankYou from '@/components/Seeker/ThankYou';

// Create a separate component that uses useSearchParams
function ThanksContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasReferrers = searchParams.get('hasReferrers') === 'true';

  const handleStartWithAI = () => {
    router.push('/seekers');
  };

  return (
    <ThankYou 
      onStartWithAI={handleStartWithAI} 
      hasReferrers={hasReferrers}
    />
  );
}

// Loading component for Suspense fallback
function ThanksLoading() {
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
export default function LinkedInPostThanksPage() {
  return (
    <Suspense fallback={<ThanksLoading />}>
      <ThanksContent />
    </Suspense>
  );
}
