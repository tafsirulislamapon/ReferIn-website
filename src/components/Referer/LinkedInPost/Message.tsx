'use client';

interface MessageProps {
  onPost: () => void;
}

export default function Message({ onPost }: MessageProps) {
  const predefinedMessage = `Just joined ReferIn.io — a platform that connects job seekers directly with employees who can refer them.

I'm happy to support talented professionals by pointing them in the right direction when possible.

If you're exploring new opportunities, feel free to check it out.

#ReferIn #CareerGrowth #JobReferrals #Networking`;

  return (
    <div className="min-h-[200px]">
      <textarea
        className="w-full min-h-[200px] p-4 border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
        defaultValue={predefinedMessage}
        placeholder="Write your post..."
      />
    </div>
  );
}