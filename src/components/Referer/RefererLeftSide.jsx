import Image from "next/image";
import SeekerCard from "./SeekerCard";

const cardInfo = [
  {
    position: "Marketing Manager",
    company: "Meta",
    companyIcon: "/icons/google.png",
    location: "Dublin, Ireland",
    rating: 4.8,
    profileImg: "/fallbackUserImg.png",
    name: "John Doe",
    linkedInUrl: "#"
  },
  {
    position: "Senior Designer",
    company: "Apple",
    companyIcon: "/icons/google.png",
    location: "California, USA",
    rating: 4.9,
    profileImg: "/fallbackUserImg.png",
    name: "Jane Smith",
    linkedInUrl: "#"
  },
  {
    position: "Senior Software Engineer",
    company: "Google",
    companyIcon: "/icons/google.png",
    location: "London, UK",
    rating: 4.9,
    profileImg: "/fallbackUserImg.png",
    name: "Alex Johnson",
    linkedInUrl: "#"
  }
];

export default function RefererLeftSide() {
  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="relative bg-white/5 backdrop-blur-[2px] rounded-3xl p-4 sm:p-6 lg:p-8 w-full">
        {/* Logo */}
        <div className="mb-8 lg:mb-16">
          <Image
            src="/referin-whiteTextLOGO.svg"
            alt="Referin Logo"
            width={80}
            height={20}
            className="w-12 lg:w-16 h-auto"
            priority
          />
        </div>

        <div className="flex flex-col items-center">
          {/* Top row with two cards */}
          <div className="flex flex-col sm:flex-row justify-center w-full max-w-[900px] mx-auto">
            <div className="mb-4 sm:mb-0">
              <SeekerCard {...cardInfo[0]} />
            </div>
            <div className="sm:-ml-6 md:-ml-10 lg:-ml-16">
              <SeekerCard {...cardInfo[1]} />
            </div>
          </div>
          
          {/* Bottom row with single card */}
          <div className="mt-4 sm:-mt-1">
            <SeekerCard {...cardInfo[2]} />
          </div>
          
          {/* Text below cards */}
          <div className="text-white text-base lg:text-lg font-satoshi font-light text-center max-w-[90%] mx-auto mt-8">
            <p className="leading-relaxed">
              {"You know your company and what makes someone a great fit - why not get rewarded for it?"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}