'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import VerificationCode from './verificationCode';
import SetPassword from './setPassword';

export default function RightSide() {
  const [email, setEmail] = useState('');
  const [currentStep, setCurrentStep] = useState('email'); // 'email' | 'verification' | 'setPassword'

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('verification');
  };

  const handleVerificationSubmit = () => {
    setCurrentStep('setPassword');
  };

  return (
    <div className="flex flex-col items-center justify-start lg:justify-center min-h-screen p-4 sm:p-6 md:p-8 pt-8 lg:pt-4">
      <div className="w-full max-w-[90%] sm:max-w-lg">
        <Image
          src="/referInLOGO.svg"
          alt="ReferIn Logo"
          width={120}
          height={32}
          className="mb-6 sm:mb-8 lg:mb-12 w-[100px] sm:w-[120px] h-auto"
        />

        <div className="space-y-6">
          {/* Main Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <Image
                src="/svg/keyIcon.svg"
                alt="Key Icon"
                width={24}
                height={24}
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
              <h1 className="text-xl sm:text-2xl font-satoshi font-medium">
                Reset Your <span className="text-blue-600 font-clash font-semibold">Password</span>
              </h1>
            </div>

            {currentStep === 'email' && (
              <>
                <p className="text-gray-600 mt-4 sm:mt-6 text-sm sm:text-base">
                  Enter your email address and we&apos;ll send you a Verification Code to reset your password.
                </p>

                <form onSubmit={handleEmailSubmit} className="space-y-4 mt-4 sm:mt-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Image
                      src="/svg/sendIcon.svg"
                      alt="Send Icon"
                      width={20}
                      height={20}
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                    Send Reset Link
                  </Button>
                </form>
              </>
            )}

            {currentStep === 'verification' && (
              <VerificationCode onSubmit={handleVerificationSubmit} />
            )}

            {currentStep === 'setPassword' && (
              <SetPassword />
            )}
          </div>

          {/* Info Section */}
          <div className="bg-blue-50 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-blue-500">
            <div className="flex items-start gap-2 sm:gap-3">
              <Image
                src="/svg/infoIcon-i.svg"
                alt="Info Icon"
                width={20}
                height={20}
                className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5"
              />
              <p className="text-xs sm:text-sm text-gray-600">
                If you don&apos;t receive the email within 10 minutes, check your spam folder or{' '}
                <a href="#" className="text-blue-600 underline">contact support</a>.
              </p>
            </div>
          </div>

          {/* Links Section */}
          <div className="text-center space-y-3 sm:space-y-5 pb-2">
            <p className="text-sm sm:text-base text-gray-600">
              Remember your password?{' '}
              <Link href="/sign-in" className="text-blue-600 font-medium">
                Sign in
              </Link>
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/sign-up" className="text-blue-600 font-medium">
                Join the Network
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
