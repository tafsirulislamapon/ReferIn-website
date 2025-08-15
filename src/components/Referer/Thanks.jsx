import { useState } from 'react';

export default function Thanks() {
  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-[600px] space-y-8">
        {/* Success Message */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-clash font-bold text-white mb-4">
            Vacancy Submitted
          </h1>
          <p className="text-white/90 text-xl mb-2">
            Thank you!
          </p>
        </div>

        {/* Notification Message */}
        <div className="text-center text-white text-lg">
          <p>
            We've notified the existing <span className="text-[#4ADE80] font-bold">5</span> matching candidates that have registered with us and we'll notify new candidates with your LinkedIn profile to connect.
          </p>
        </div>

        {/* Add More Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center cursor-pointer hover:bg-white/20 transition-colors"
          onClick={() => window.location.reload()}
        >
          <h2 className="text-2xl font-clash font-bold text-white mb-2">
            Any more vacancies to add?
          </h2>
          <p className="text-white/90 mb-4">
            Multiplying vacancies = multiple income!
          </p>
          <p className="text-white font-medium">
            Click to submit more vacancies
          </p>
        </div>

        {/* Finish Button */}
        <button 
          className="w-full bg-[#0A2472] text-white rounded-lg py-4 font-semibold hover:bg-[#0A2472]/90 transition-colors"
          onClick={() => {
            // This should take user back to initial state (iframe page)
            window.location.reload();
          }}
        >
          I've finished, thank you
        </button>
      </div>
    </div>
  );
}