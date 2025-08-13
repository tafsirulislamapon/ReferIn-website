import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

// Dummy data for AI responses - later this will come from backend
const aiResponses = [
  "Have you considered exploring similar opportunities in your field?",
  "The more you apply, the more visibility you gain with employers!",
  "Every application is a step toward discovering the right fit for you.",
  "Even if you don’t take the offer, you’ve still expanded your professional network.",
  "Each role you explore helps refine your career preferences.",
];


export default function PaidSeeker({ onSubmit }: { onSubmit: (url: string) => void }) {
  const [jobUrl, setJobUrl] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (jobUrl.trim()) {
      onSubmit(jobUrl);
    }
  };

  // Create the sequence with all messages
  const fullText = aiResponses.join("\n\n");

  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center p-3 xs:p-4 md:p-6 lg:p-8 overflow-hidden">
      <div className="bg-white/5 backdrop-blur-[2px] rounded-3xl p-6 sm:p-8 w-full max-w-[900px] relative">
        {/* AI Response Section */}
        <div className="text-center mb-8">
          {/* Constant "Keep going!" text */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Keep going!
          </h1>

          {/* AI Response typing animation */}
          <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent px-4">
            <TypeAnimation
              sequence={[fullText]}
              wrapper="div"
              cursor={true}
              speed={50}
              className="leading-relaxed whitespace-pre-line text-left text-white/90 text-[17px] xs:text-[19px] sm:text-[22px]"
              repeat={0}
            />
          </div>
        </div>

        {/* URL Input Section */}
        <form onSubmit={handleSubmit} className="space-y-4 px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter url of job spec here"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              className="w-full p-4 sm:p-5 rounded-xl bg-white/10 text-center text-white placeholder:text-white/70 border border-white/20 text-base sm:text-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#001B5D] hover:bg-[#001B5D]/80 text-white py-4 sm:py-5 rounded-xl font-semibold transition-colors text-base sm:text-lg"
          >
            Find Referrers for this Role
          </button>
        </form>
      </div>
    </div>
  );
}