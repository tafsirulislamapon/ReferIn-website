import Image from "next/image";

export default function SeekerCard({ 
  position, 
  company,
  companyIcon, 
  location, 
  rating, 
  profileImg,
  name,
  linkedInUrl,
}) {
  return (
    <div className="bg-[#2563EB]/20 backdrop-blur-md rounded-lg p-3 sm:p-4 text-white border border-white/30 w-[280px] sm:w-[280px] lg:w-[300px] shadow-lg">
      <div className="flex items-start gap-2 sm:gap-3">
        <div className="relative">
          <Image
            src={profileImg}
            alt={name || "Profile"}
            width={36}
            height={36}
            className="rounded-full object-cover ring-1 ring-white/20 w-8 h-8 sm:w-9 sm:h-9"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-clash font-semibold text-sm sm:text-base leading-tight mb-0.5 truncate">
            {position}
          </h3>
          <div className="flex items-center gap-1 mb-0.5">
            {companyIcon && (
              <Image
                src={companyIcon}
                alt={company}
                width={14}
                height={14}
                className="object-contain w-3 h-3 sm:w-3.5 sm:h-3.5"
              />
            )}
            <span className="text-xs sm:text-sm text-gray-200 truncate">{company}</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-300/90 truncate">{location}</div>
        </div>
        <div className="flex items-center gap-1">
          <Image
            src="/svg/starRating.svg"
            alt="star"
            width={16}
            height={16}
            className="text-yellow-400 w-3 h-3 sm:w-4 sm:h-4"
          />
          <span className="text-xs sm:text-sm font-medium text-yellow-400">{rating}</span>
        </div>
      </div>

      <a 
        href={linkedInUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block w-full mt-2 sm:mt-3 bg-white text-[#0066CC] rounded-md py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm font-semibold active:bg-gray-100 transition-colors flex items-center justify-center gap-1.5 shadow-sm hover:bg-white/80"
      >
        <Image
          src="/icons/linkedIn.png"
          alt="LinkedIn"
          width={16}
          height={16}
          className="object-contain w-3 h-3 sm:w-4 sm:h-4"
        />
        Message me on LinkedIn
      </a>
    </div>
  );
}