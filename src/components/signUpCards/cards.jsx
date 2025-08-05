export default function Cards() {
  const cards = [
    {
      role: "Marketing Manager",
      company: "Meta",
      location: "Dublin, Ireland",
      rating: 5.0,
      members: "25+",
      vacancies: "3"
    },
    {
      role: "Senior Designer",
      company: "Apple",
      location: "California, USA",
      rating: 4.9,
      members: "35+",
      vacancies: "2"
    },
    {
      role: "Senior Software Engineer",
      company: "Google",
      location: "London, UK",
      rating: 4.8,
      members: "40+",
      vacancies: "5"
    }
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {cards.map((card, index) => (
        <div 
          key={index}
          className="absolute"
          style={{
            transform: `translate(-50%, -50%) rotate(${-6 + (index * 6)}deg)`,
            width: 'min(240px, 90%)',
            left: '50%',
            top: '50%',
            zIndex: index
          }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 md:p-4 text-white border border-white/20">
            <div className="flex items-start gap-2 mb-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/20 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-clash font-medium text-xs md:text-sm">{card.role}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] md:text-xs text-white/90">{card.company}</span>
                    </div>
                    <p className="text-[10px] md:text-xs text-white/70">{card.location}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-xs">{card.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[10px] md:text-xs text-white/70 mb-2">
              <span className="text-green-400">{card.members} Members</span>
              <span className="mx-1">•</span>
              <span className="text-green-400">{card.vacancies} Vacancies</span>
            </div>

            <button className="w-full py-1.5 md:py-2 bg-white/20 hover:bg-white/30 transition rounded-md text-white text-xs md:text-sm font-medium">
              Join My Referral Network
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
