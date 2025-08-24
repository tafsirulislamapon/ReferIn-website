"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation to ensure fields are not empty
    if (formData.email && formData.password) {
      router.push("/referin-ai");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full max-w-[500px] space-y-6">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/referInLOGO.svg"
          alt="ReferIn"
          width={70}
          height={50}
          priority
          className="h-auto"
        />
      </div>

      {/* Main Form Container with Border */}
      <div className="border border-gray-300 rounded-lg p-8 space-y-6">
        {/* Welcome Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-clash font-semibold text-[#0C549F]">Welcome Back</h1>
          <p className="text-gray-600">
            Sign in to access your referral network and job opportunities.
          </p>
        </div>

        {/* Sign In Form */}
        <form id="signin-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <Image
                  src="/svg/eye.svg"
                  alt="Toggle password visibility"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <Link 
              href="/sign-in/forgot-password" 
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot password?
            </Link>
          </div>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#F9FAFB] text-gray-500">OR CONTINUE WITH</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition">
            <Image
              src="/icons/linkedIn.png"
              alt="LinkedIn"
              width={20}
              height={20}
            />
            <span>Continue with LinkedIn</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition">
            <Image
              src="/icons/google.png"
              alt="Google"
              width={20}
              height={20}
            />
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="space-y-3 text-center text-sm text-gray-600">
          <p>
            By signing in, you agree to our{" "}
            <Link 
              href="/terms-and-conditons" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Terms of services
            </Link>
            {" "}& {" "}
            <Link 
              href="/privacy-policy" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Privacy Policies
            </Link>
          </p>
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up now
            </Link>
          </p>
        </div>
      </div>

      {/* Sign In Button (Outside Border) */}
      <button
        type="submit"
        form="signin-form"
        className="w-full bg-[#0C549F] text-white font-bold py-2 rounded-md hover:bg-[#0A4A8F] transition"
      >
        Sign in
      </button>
    </div>
  );
}
