"use client";

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LinkedInPost from '@/components/Seeker/LinkedInPost/LinkedInPost';

// Create a separate component that uses useSearchParams
function LinkedInPostContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get hasReferrers from URL params
  const hasReferrers = searchParams.get('hasReferrers') === 'true';

  const handlePostComplete = (hasReferrers?: boolean) => {
    // Navigate to thanks page
    router.push(`/seekers/linkedin-post/thanks?hasReferrers=${hasReferrers || false}`);
  };

  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center p-4">
      <LinkedInPost 
        onPostComplete={handlePostComplete} 
        hasReferrers={hasReferrers}
        showSignUpModal={!hasReferrers}
      />
    </div>
  );
}

// Loading component for Suspense fallback
function LinkedInPostLoading() {
  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function LinkedInPostPage() {
  return (
    <Suspense fallback={<LinkedInPostLoading />}>
      <LinkedInPostContent />
    </Suspense>
  );
}
