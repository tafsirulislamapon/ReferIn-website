'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function VerificationCode({ onSubmit }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = Array(6).fill(null).map(() => React.createRef());

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input if value is entered
      if (value && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-sm sm:text-base">
        Enter your email address and we&apos;ll send you a Verification Code to reset your password.
      </p>
      <h1 className="text-xl sm:text-2xl font-satoshi font-medium">
        Verification Code
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div className="flex gap-1.5 sm:gap-2 justify-between my-4 sm:my-6">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-9 h-9 sm:w-12 sm:h-12 border border-gray-300 rounded-lg text-center text-base sm:text-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ))}
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}