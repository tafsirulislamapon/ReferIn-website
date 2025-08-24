import { useState } from 'react';
import Image from "next/image";

export default function PaidSeeker() {
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.trim()) {
      setUserInput("");
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center p-3 xs:p-4 md:p-6 lg:p-8 overflow-hidden">
      <div className="w-full max-w-[900px] relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-theme-text mb-5">
            Keep going!
          </h1>

          {/* Formless.ai Iframe with Loading State */}
          <div className="bg-loading border border-loading rounded-2xl p-4 shadow-lg relative">
            {isIframeLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100/80 backdrop-blur-sm rounded-xl z-10">
                {/* loading animation */}
                <div className="relative w-[280px] h-[160px] flex items-center justify-center">
                  {/* Outer pulsing border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-gray-300/40 animate-pulse-ring"></div>
                  {/* Inner pulsing background */}
                  <div className="absolute inset-0 bg-gray-200/30 rounded-2xl animate-pulse"></div>
                  {/* Content container */}
                  <div className="relative z-10 flex flex-col items-center">
                    <Image
                      src="/referInLOGO.svg"
                      alt="Referin Logo"
                      width={120}
                      height={30}
                      className="mb-4 animate-pulse"
                      priority
                    />
                    {/* Loading dots */}
                    <div className="flex gap-1.5 mt-2">
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <p className="text-gray-600 mt-4 font-satoshi text-sm">
                      Loading form...
                    </p>
                  </div>
                </div>
              </div>
            )}
            <iframe
              src="https://formless.ai/c/0s5ORyyg0jQv"
              width="100%"
              height="450"
              frameBorder="0"
              className="rounded-xl"
              title="Formless AI Form"
              onLoad={() => setIsIframeLoading(false)}
              style={{ opacity: isIframeLoading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
            />
          </div>
        </div>

        {/* Input Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <button
            type="submit"
            className="w-full bg-theme-button hover:bg-theme-button-hover text-theme-button py-5 rounded-xl font-semibold transition-colors text-xl"
          >
            Find more refer ready employees
          </button>
        </form>
      </div>
    </div>
  );
}