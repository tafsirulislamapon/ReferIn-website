import Image from "next/image";
import ReferrerCard from "./ReferrerCard";

const cardInfo = [
  {
    position: "Marketing Manager",
    company: "Meta",
    companyIcon: "/icons/meta-icon.png",
    location: "Dublin, Ireland",
    rating: 5.0,
    profileImg: "/fallbackUserImg.png",
    vacancies: "3+ Vacancies",
     name: "Senior Designer",
    linkedInUrl: "#"
  },
  {
    position: "Senior Designer",
    company: "Apple",
    companyIcon: "/icons/apple-icon.png",
    location: "California, USA",
    rating: 4.9,
    profileImg: "/fallbackUserImg.png",
    vacancies: "3+ Vacancies",
    name: "Suhaib Safwan",
    linkedInUrl: "https://www.linkedin.com/in/suhaib-safwan/"
   
  },
  {
    position: "Senior Software Engineer",
    company: "Google",
    companyIcon: "/icons/google-icon.png",
    location: "London, UK",
    rating: 4.9,
    profileImg: "/fallbackUserImg.png",
    vacancies: "3+ Vacancies",
    name: "Senior Software Engineer",
    linkedInUrl: "#"
  },
];

export default function LeftSide({ showCards = false, hasPaid = false }) {
  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center p-3 xs:p-4 md:p-6 lg:p-8 overflow-hidden">
      <div className="relative bg-white/5 backdrop-blur-[2px] rounded-3xl p-3 xs:p-4 sm:p-6 lg:p-8 w-full max-w-[900px] overflow-x-hidden">
        {/* Logo */}
        <div className="mb-6 xs:mb-8 sm:mb-12 lg:mb-16">
          <Image
            src="/referin-whiteTextLOGO.svg"
            alt="Referin Logo"
            width={80}
            height={20}
            className="w-10 xs:w-12 lg:w-16 h-auto"
            priority
          />
        </div>

        <div className="relative min-h-[400px] xs:min-h-[450px] flex flex-col justify-center items-center">
          {!showCards ? (
            // Initial state - showing welcome message
            <div className="text-center text-white max-w-[600px] mx-auto">
              <h2 className="text-2xl xs:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome to Referin AI
              </h2>
              <p className="text-base xs:text-lg lg:text-xl mb-4 leading-relaxed">
                Enter the job URL on the right to discover amazing referral opportunities from employees at your dream company.
              </p>
              <div className="mt-8">
                <Image
                  src="/svg/starRating.svg"
                  alt="star"
                  width={40}
                  height={40}
                  className="mx-auto mb-4"
                />
                <p className="text-sm xs:text-base lg:text-lg text-gray-300">
                  Get personalized referrals and increase your chances of landing the job by 9x
                </p>
              </div>
            </div>
          ) : (
            // After submission - showing cards
            <div className="relative w-full flex flex-col">
              <div className="flex flex-col xs:flex-col sm:flex-col lg:flex-row justify-center sm:justify-between gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-6">
                <div className="mx-auto sm:mx-auto lg:-ml-3">
                  <ReferrerCard {...cardInfo[0]} hasPaid={hasPaid} />
                </div>
                <div className="mx-auto sm:mx-auto lg:-ml-10">
                  <ReferrerCard {...cardInfo[1]} hasPaid={hasPaid} />
                </div>
              </div>
              
              <div className="flex justify-center mb-6 sm:mb-12">
                <ReferrerCard {...cardInfo[2]} hasPaid={hasPaid} />
              </div>
              
              <div className="text-white text-xs xs:text-sm lg:text-lg font-satoshi font-light text-center max-w-[95%] sm:max-w-[90%] mx-auto">
                <p className="leading-relaxed whitespace-pre-line">
                  {"You've seen some great vacancies.\nNow it's time to get referred and out-smart the other candidates."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}