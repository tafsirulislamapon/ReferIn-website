"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import ThankYou from '@/components/Seeker/ThankYou';

export default function LinkedInPostThanksPage() {
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
