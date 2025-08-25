"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import LinkedInPost from '@/components/Seeker/LinkedInPost/LinkedInPost';

export default function LinkedInPostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get hasReferrers from URL params
  const hasReferrers = searchParams.get('hasReferrers') === 'true';

  const handlePostComplete = (hasReferrers: boolean) => {
    // Navigate to thanks page
    router.push(`/seekers/linkedin-post/thanks?hasReferrers=${hasReferrers}`);
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
