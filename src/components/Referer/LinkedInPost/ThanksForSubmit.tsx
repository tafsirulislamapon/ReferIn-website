"use client";

export default function ThanksForSubmit() {
  return (
    <div className="space-y-4 bg-gradient-to-b from-[#F0F9FF] to-[#EFF6FF] rounded-lg p-6">
      <h3 className="text-lg font-semibold">Thanks for submitting, Now boost your chances of getting noticed by potential referrals:</h3>
      <div className="space-y-2 text-gray-600">
        <p>Sharing that you&rsquo;re open to referring can help more great candidates find you.</p>
        <div className="pl-4 space-y-2">
          <div className="flex gap-2">
            <span className="text-[#0A66C2]">✅</span>
            <p>Increase the number of quality seekers reaching you</p>
          </div>
          <div className="flex gap-2">
            <span className="text-[#0A66C2]">✅</span>
            <p>Help build a stronger ReferIn network (more roles, more matches)</p>
          </div>
          <div className="flex gap-2">
            <span className="text-[#0A66C2]">✅</span>
            <p>Earn our &rdquo;Verified Referrer&rdquo; badge - shown on your profile to build trust</p>
          </div>
        </div>
      </div>
    </div>
  );
}