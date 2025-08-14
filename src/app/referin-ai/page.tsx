"use client";

import SeekerAiPov from "@/components/Seeker/SeekerAi-Pov";
import RefererAiPov from "@/components/Referer/Referrer-Ai-Pov";

export default function ReferinAi() {
  const isSeeker = false;

  return (
    <div className="min-h-screen bg-[#08498E]">
      {isSeeker ? (
        <SeekerAiPov />
      ) : (
        <RefererAiPov />
      )}
    </div>
  );
}