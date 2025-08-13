"use client";

export default function HelpUs() {
  return (
    <div className="space-y-4 bg-gradient-to-b from-[#F0F9FF] to-[#EFF6FF] rounded-lg p-6">
      <h3 className="text-lg font-semibold">Help others find opportunities</h3>
      <div className="space-y-2 text-gray-600">
        <div className="space-y-2">
          <p className="font-medium">Here&rsquo;s your next steps:</p>
          <div className="pl-4 space-y-2">
            <div className="flex gap-2">
              <span className="text-[#0A66C2]">1.</span>
              <p>Share ReferIn on LinkedIn using #ReferIn</p>
            </div>
            <div className="flex gap-2">
              <span className="text-[#0A66C2]">2.</span>
              <p>Your connection unlocks in 24 hours</p>
            </div>
            <div className="flex gap-2">
              <span className="text-[#0A66C2]">3.</span>
              <p>Our community will help amplify your post</p>
            </div>
            <div className="flex gap-2">
              <span className="text-[#0A66C2]">4.</span>
              <p>You might get additional referral offers from our community, from people who see your post!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}