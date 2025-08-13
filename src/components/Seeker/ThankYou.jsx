import Image from 'next/image';

export default function ThankYou({ onStartWithAI, hasReferrers = true }) {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        background: 'linear-gradient(180deg, #2E1FFF 0%, #0C549F 100%)',
      }}
    >
      <div className="relative w-full max-w-[800px] mx-4">
        <div 
          className="backdrop-blur-[20px] rounded-3xl overflow-hidden p-8 sm:p-12"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/referin-whiteTextLOGO.svg"
              alt="Referin Logo"
              width={120}
              height={30}
              className="mx-auto"
              priority
            />
          </div>

          {/* Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">
                Thanks for sharing! {hasReferrers ? "Your connection unlocks in 24 hours ⏰" : "We'll notify you when referrers join 🎯"}
              </h2>
              <p className="text-xl text-center">
                Your post is now live and here's what you do next:
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-4 max-w-[600px] mx-auto">
              <div className="flex items-center gap-3">
                <span className="text-[#4ADE80] text-xl">✓</span>
                <p>Our ReferIn community will help amplify your post</p>
              </div>
              {hasReferrers ? (
                <div className="flex items-center gap-3">
                  <span className="text-[#4ADE80] text-xl">✓</span>
                  <p>You'll get access to your referrer connection in 24 hours</p>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-[#4ADE80] text-xl">✓</span>
                  <p>We'll notify you as soon as referrers join for your role</p>
                </div>
              )}
              <div className="flex items-center gap-3">
                <span className="text-[#4ADE80] text-xl">✓</span>
                <p>People who see your post might reach out directly with referrals</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#4ADE80] text-xl">✓</span>
                <p>You're helping build the referral network for everyone</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-center space-y-4">
              <p>
                Keep an eye on your LinkedIn - referrers often engage with #ReferIn posts directly!
              </p>
              <p className="font-semibold">
                {hasReferrers 
                  ? "We will notify you in 24 hours💝"
                  : "We'll email you as soon as referrers join the network! 💝"
                }
              </p>
            </div>

            {/* Start with AI Button - Only show if there are referrers */}
            {/* {hasReferrers && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={onStartWithAI}
                  className="bg-[#10B981] hover:bg-[#10B981]/90 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
                >
                  Start with AI Now
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}