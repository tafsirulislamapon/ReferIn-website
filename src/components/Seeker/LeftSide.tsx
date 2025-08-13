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

export default function LeftSide({ hasPaid = false }) {
  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center p-3 xs:p-4 md:p-6 lg:p-8 overflow-hidden">
      <div className="relative bg-white/5 backdrop-blur-[2px] rounded-3xl p-3 xs:p-4 sm:p-6 lg:p-8 w-full max-w-[900px] overflow-x-hidden">
        {/* Logo */}
        <div className="mb-4 xs:mb-6">
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
          <div className="relative w-full flex flex-col gap-4">
            {/* Top Text */}
            <div className="text-center mb-2">
              <p className="text-white max-w-[600px] mx-auto italic font-clash text-2xl">
                They&apos;ve walked your path <br />
                and can vouch for your potential
              </p>
            </div>

            {/* Cards Section */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col xs:flex-col sm:flex-col lg:flex-row justify-center sm:justify-between gap-3 sm:gap-4">
                <div className="mx-auto sm:mx-auto lg:-ml-3">
                  <ReferrerCard {...cardInfo[0]} hasPaid={hasPaid} />
                </div>
                <div className="mx-auto sm:mx-auto lg:-ml-10">
                  <ReferrerCard {...cardInfo[1]} hasPaid={hasPaid} />
                </div>
              </div>
              
              <div className="flex justify-center">
                <ReferrerCard {...cardInfo[2]} hasPaid={hasPaid} />
              </div>
            </div>

            {/* Bottom Text */}
            <div className="text-center mt-2">
              <p className="text-white italic font-clash text-2xl">
                They let them know you are serious
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}