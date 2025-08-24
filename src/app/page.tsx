"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <Image
          src="/referInLOGO.svg"
          alt="ReferIn"
          width={200}
          height={50}
          className="mx-auto mb-8"
          priority
        />
        <h1 className="text-4xl md:text-6xl font-clash font-bold text-[#08498E] mb-6">
          Welcome to ReferIn
        </h1>
        <p className="text-xl text-[#08498E]/80 mb-12 max-w-2xl mx-auto">
          Connect job seekers directly with employees who can refer them. 
          Choose your path below.
        </p>
      </div>

      <div className="flex flex-col-reverse md:flex-row-reverse gap-8 max-w-4xl w-full">
        {/* Referrers Card */}
        <Link 
          href="/referrers" 
          className="flex-1 bg-[#08498E] backdrop-blur-md rounded-2xl p-8 border border-[#08498E]/20 hover:bg-[#08498E]/90 transition-all duration-300 group"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-[#08498E] rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-clash font-bold text-white mb-4">
              I&apos;m a Referrer
            </h2>
            <p className="text-white/70">
              I want to refer others to my company and earn rewards
            </p>
          </div>
        </Link>

        {/* Seekers Card */}
        <Link 
          href="/seekers" 
          className="flex-1 bg-[#08498E] backdrop-blur-md rounded-2xl p-8 border border-[#08498E]/20 hover:bg-[#08498E]/90 transition-all duration-300 group"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-[#08498E] rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-clash font-bold text-white mb-4">
              I&apos;m a Job Seeker
            </h2>
            <p className="text-white/70">
              I&apos;m looking for job opportunities and referrals
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
