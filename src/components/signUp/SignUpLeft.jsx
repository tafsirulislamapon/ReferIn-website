import Image from "next/image";
import Cards from "@/components/signUpCards/cards";

export default function SignUpLeft() {
  return (
    <div className="relative max-w-[550px] w-full aspect-square rounded-xl border border-white/25 overflow-hidden">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
      
      <div className="relative h-full flex flex-col p-4 md:p-6">
        {/* Logo */}
        <Image 
          src="/referin-whiteTextLOGO.svg" 
          alt="ReferIn"
          width={20}
          height={18}
          priority
          className="w-16 md:w-20 h-auto"
        />
        
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Cards container with fixed height */}
          <div className="relative w-full h-[180px] md:h-[200px]">
            <Cards />
          </div>
          
          {/* Quote text */}
          <div className="w-full mt-4">
            <h2 className="text-white font-clash font-medium text-sm md:text-base lg:text-lg w-[90%] mx-auto text-center leading-relaxed">
              &quot;You&apos;re not just signing up — you&apos;re joining a Network that opens doors before you&apos;ve even knocked!&quot;
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
