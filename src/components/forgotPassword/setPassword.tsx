'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function SetPassword() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // password update logic goes here
    router.push('/sign-in');
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-sm sm:text-base">
        Set a new password, make sure to use Upper case character, Lower case character, Numbers, Special character.
      </p>
      <h1 className="text-xl sm:text-2xl font-satoshi font-medium">
        Set New Password
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Go to Sign in
        </Button>
      </form>
    </div>
  );
}