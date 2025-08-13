"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CreateAccount({ onComplete }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newData = {
      ...formData,
      [name]: value,
    };
    setFormData(newData);
    
    // Pass data to parent when both names are filled
    if (newData.firstName && newData.lastName) {
      onComplete(newData);
    }
  };

  return (
    <div>
      <h1 className="text-lg md:text-xl font-satoshi mb-6">
        You're almost ready, just{" "}
        <span className="text-[#08498E] font-clash font-medium">
          create your account
        </span>
      </h1>

      {/* Social Login Buttons */}
      <div className="space-y-3 mb-6">
        <Button
          variant="outline"
          className="w-full h-12 flex items-center justify-center gap-2 text-gray-700 font-normal"
        >
          <Image
            src="/icons/linkedIn.png"
            alt="LinkedIn"
            width={24}
            height={24}
          />
          Continue with LinkedIn
        </Button>

        {/* <Button
          variant="outline"
          className="w-full h-12 flex items-center justify-center gap-2 text-gray-700 font-normal"
        >
          <Image
            src="/icons/google.png"
            alt="Google"
            width={24}
            height={24}
          />
          Continue with Google
        </Button> */}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-[1px] flex-1 bg-gray-200"></div>
        <span className="text-xs text-gray-500">OR CONTINUE WITH EMAIL</span>
        <div className="h-[1px] flex-1 bg-gray-200"></div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter first name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#08498E] focus:ring-1 focus:ring-[#08498E] outline-none transition-all text-sm md:text-base font-satoshi placeholder-gray-400"
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter last name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#08498E] focus:ring-1 focus:ring-[#08498E] outline-none transition-all text-sm md:text-base font-satoshi placeholder-gray-400"
            />
          </div>
        </div>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter email"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#08498E] focus:ring-1 focus:ring-[#08498E] outline-none transition-all text-sm md:text-base font-satoshi placeholder-gray-400"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Set password"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#08498E] focus:ring-1 focus:ring-[#08498E] outline-none transition-all text-sm md:text-base font-satoshi placeholder-gray-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <Image
              src="/svg/eye.svg"
              alt="Toggle password visibility"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>

      {/* Sign in Link */}
      <div className="text-center mt-6">
        <p className="text-gray-600">
          Already have an account?{" "}
          <a href="/sign-in" className="text-[#08498E] font-medium hover:underline">
            Sign in now
          </a>
        </p>
      </div>
    </div>
  );
}