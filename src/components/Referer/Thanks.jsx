import { useState } from 'react';
import ReferrerLanding from './ReferrerLanding';

export default function Thanks() {
  const [showAddMore, setShowAddMore] = useState(false);

  if (showAddMore) {
    return (
      <ReferrerLanding 
        onShowLinkedInPost={() => setShowAddMore(false)}
        onSkip={() => setShowAddMore(false)}
      />
    );
  }

  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 pt-24">
      <div className="w-full max-w-[600px] space-y-8">
          {/* Success Message */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-clash font-bold text-theme-text mb-4">
            Vacancy Submitted
          </h1>
          <p className="text-theme-text text-xl mb-2">
            Thank you!
          </p>
        </div>

        {/* Notification Message */}
        <div className="text-center text-theme-text text-lg">
          <p>
            We've notified the existing <span className="text-[#4ADE80] font-bold">5</span> matching candidates that have registered with us and we'll notify new candidates with your LinkedIn profile to connect.
          </p>
        </div>

        {/* Add More Section */}
        <div 
          className="bg-gray-100 backdrop-blur-md rounded-2xl p-6 text-center cursor-pointer hover:bg-theme-text/20 transition-colors"
          onClick={() => setShowAddMore(true)}
        >
          <h2 className="text-2xl font-clash font-bold text-theme-text mb-2">
            Any more vacancies to add?
          </h2>
          <p className="text-theme-text mb-4">
            Multiplying vacancies = multiple income!
          </p>
          <p className="text-theme-text font-medium">
            Click to submit more vacancies
          </p>
        </div>
      </div>
    </div>
  );
}