'use client';

interface MessageProps {
  onPost: () => void;
}

export default function Message({ onPost }: MessageProps) {
  const predefinedMessage = `Check out ReferIn.io to instantly match you to referral-ready employees at companies your interested in, with relevant vacancies.

Just thought I&apos;d share to help any jobseekers out there..

#JobReferrals #JobSeekers #ReferIn`;

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