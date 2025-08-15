import { useState } from 'react';

export default function PaidSeeker() {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.trim()) {
      // Handle form submission if needed
      setUserInput("");
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center p-3 xs:p-4 md:p-6 lg:p-8 overflow-hidden">
      <div className="w-full max-w-[900px] relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
            Keep going!
          </h1>

          {/* Formless.ai Iframe */}
          <div className="bg-[#1E3A8A]/80 rounded-2xl p-4 shadow-lg">
            <iframe
              src="https://formless.ai/c/0s5ORyyg0jQv"
              width="100%"
              height="450"
              frameBorder="0"
              className="rounded-xl"
              title="Formless AI Form"
            />
          </div>
        </div>

        {/* Input Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <button
            type="submit"
            className="w-full bg-[#001B5D] hover:bg-[#001B5D]/80 text-white py-5 rounded-xl font-semibold transition-colors text-xl"
          >
            Find more refer ready employees
          </button>
        </form>
      </div>
    </div>
  );
}