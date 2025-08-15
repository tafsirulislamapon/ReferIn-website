import { useState, useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Input } from "@/components/ui/input";

const initialResponse = `Have you thought about applying to roles at different companies in your field? The more applications you send, the more chances you have to connect with potential employers.

Each interview — even if it doesn't lead to a job — can help you grow your professional network.

Plus, exploring various opportunities helps you figure out what kind of role is truly the best fit for you.`;

export default function PaidSeeker() {
  const [userInput, setUserInput] = useState("");
  const [currentAiResponse, setCurrentAiResponse] = useState(initialResponse);
  const [isTyping, setIsTyping] = useState(true);
  
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll only while typing
  useEffect(() => {
    if (messageContainerRef.current && isTyping) {
      const scrollContainer = messageContainerRef.current;
      const scrollToBottom = () => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      };
      
      // Initial scroll
      scrollToBottom();
      
      // Set up an interval to keep scrolling while typing
      const scrollInterval = setInterval(scrollToBottom, 100);
      
      // Handle typing completion
      const typingTimeout = setTimeout(() => {
        clearInterval(scrollInterval);
      }, (currentAiResponse.length * 50) + 500); // Rough estimate of typing duration
      
      // Clean up
      return () => {
        clearInterval(scrollInterval);
        clearTimeout(typingTimeout);
      };
    }
  }, [currentAiResponse, isTyping]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.trim()) {
      setIsTyping(false);
      
      const newResponse = "Yes — many companies hire throughout the year, not just in one season. Staying active and keeping an eye on job boards will make sure you don't miss new opportunities. Would you like me to make a list of companies that typically have rolling openings?";
      
      setTimeout(() => {
        setCurrentAiResponse(newResponse);
        setIsTyping(true);
      }, 100);

      setUserInput("");
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center p-3 xs:p-4 md:p-6 lg:p-8 overflow-hidden">
      <div className="w-full max-w-[900px] relative">
        {/* AI Response Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
            Keep going!
          </h1>

          {/* AI Message - Reduced height */}
          <div 
            ref={messageContainerRef}
            className="bg-[#1E3A8A]/80 rounded-2xl p-8 shadow-lg max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
          >
            {isTyping && (
              <TypeAnimation
                sequence={[currentAiResponse]}
                wrapper="div"
                cursor={false}
                speed={50}
                className="text-left whitespace-pre-line text-lg xs:text-xl sm:text-2xl text-white/90 leading-relaxed"
                repeat={0}
              />
            )}
          </div>
        </div>

        {/* Input Section - Increased text size */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* <div className="relative">
            <Input
              type="text"
              placeholder="Enter url of job spec here"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="text-white placeholder:text-white/70 border-white/20 bg-[#0A1A3B]/30 focus-visible:ring-[#1E3A8A]/50 h-16 text-xl md:text-2xl px-6"
            />
          </div> */}

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