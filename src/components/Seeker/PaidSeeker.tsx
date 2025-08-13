import { useState, useRef, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Input } from "@/components/ui/input";

// Dummy data for AI responses - later this will come from backend
const aiResponses = [
  "Have you thought about applying to roles at different companies in your field? The more applications you send, the more chances you have to connect with potential employers.",
  "Each interview — even if it doesn’t lead to a job — can help you grow your professional network.",
  "Plus, exploring various opportunities helps you figure out what kind of role is truly the best fit for you.",
];

type Message = {
  text: string;
  isAi: boolean;
};

export default function PaidSeeker({ onSubmit }: { onSubmit: (url: string) => void }) {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { text: aiResponses.join("\n\n"), isAi: true }
  ]);
  
  // Create ref for chat container
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.trim()) {
      // Add user message
      setMessages(prev => [...prev, { text: userInput, isAi: false }]);
      // Here you would make an API call to get AI's response
      // For now, just add a dummy response
      setMessages(prev => [...prev, { 
        text: "Yes — many companies hire throughout the year, not just in one season. Staying active and keeping an eye on job boards will make sure you don’t miss new opportunities. Would you like me to make a list of companies that typically have rolling openings?",
        isAi: true 
      }]);
      setUserInput("");
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center p-3 xs:p-4 md:p-6 lg:p-8 overflow-hidden">
      <div className="bg-white/5 backdrop-blur-[2px] rounded-3xl p-6 sm:p-8 w-full max-w-[900px] relative">
        {/* AI Response Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Keep going!
          </h1>

          {/* Chat Messages height max-h-[300px] */}
          <div 
            ref={chatContainerRef}
            className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent mb-6 rounded-xl bg-[#0A1A3B]/50 p-4"
          >
            <div className="flex flex-col space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.isAi ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] ${
                    message.isAi ? 'bg-[#1E3A8A]/80' : 'bg-[#001B5D]'
                  } rounded-2xl p-4 shadow-lg`}>
                    {message.isAi && index === 0 ? (
                      <TypeAnimation
                        sequence={[message.text]}
                        wrapper="div"
                        cursor={false}
                        speed={50}
                        className="text-left whitespace-pre-line text-[15px] xs:text-[16px] sm:text-[17px] text-white/90"
                        repeat={0}
                      />
                    ) : (
                      <div className="text-left text-[15px] xs:text-[16px] sm:text-[17px] text-white">
                        {message.text}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Input Section - increased input height and padding */}
        <form onSubmit={handleSubmit} className="space-y-4 px-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Type your message here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="text-white placeholder:text-white/70 border-white/20 bg-[#0A1A3B]/30 focus-visible:ring-[#1E3A8A]/50 h-14 !text-xl !md:text-xl px-5"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#001B5D] hover:bg-[#001B5D]/80 text-white py-4 sm:py-5 rounded-xl font-semibold transition-colors text-base sm:text-xl"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}