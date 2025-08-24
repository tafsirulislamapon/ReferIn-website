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
    <div className="bg-card-blue backdrop-blur-md rounded-lg p-2.5 sm:p-3 md:p-4 text-card-white border border-card-white w-[180px] xs:w-[200px] sm:w-[240px] md:w-[280px] lg:w-[300px] shadow-lg">
      <div className="flex items-start gap-2 sm:gap-3">
        <div className="relative">
          <Image
            src={profileImg}
            alt={name || "Profile"}
            width={28}
            height={28}
            className="rounded-full object-cover ring-1 ring-white/20 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-clash font-semibold text-[13px] sm:text-sm md:text-base leading-tight mb-0.5 truncate text-card-blue">
            {name || position}
          </h3>
          <div className="flex items-center gap-1 mb-0.5">
            {companyIcon && (
              <Image
                src={companyIcon}
                alt={company}
                width={10}
                height={10}
                className="object-contain w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5"
              />
            )}
            <span className="text-[11px] sm:text-xs md:text-sm text-card-blue truncate">{company}</span>
          </div>
          <div className="text-[11px] sm:text-xs md:text-sm text-card-blue truncate">{location}</div>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <Image
            src="/svg/starRating.svg"
            alt="star"
            width={12}
            height={12}
            className="text-yellow-400 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
          />
          <span className="text-[11px] sm:text-xs md:text-sm font-medium text-yellow-400">{rating}</span>
        </div>
      </div>

      <a 
        href={linkedInUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-full mt-2 sm:mt-3 bg-white text-theme-text cursor-pointer rounded-md py-1 sm:py-1.5 md:py-2 px-2 sm:px-3 text-[11px] sm:text-xs md:text-sm font-semibold active:bg-gray-100 transition-colors flex items-center justify-center gap-1.5 shadow-sm hover:bg-white/90"
      >
        <Image
          src="/icons/linkedIn.png"
          alt="LinkedIn"
          width={12}
          height={12}
          className="object-contain w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
        />
        Message me on LinkedIn
      </a>
    </div>
  );
}