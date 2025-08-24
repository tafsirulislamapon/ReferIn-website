import Image from "next/image";
import { useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import BlueTick from '../ui/BlueTick';
import SignUpModal from '../signUp/Signup-Modals/SignUpModal';

export default function Results({ onPayment, onGoToLinkedIn, referrerCount = 0 }) {
  const router = useRouter();
  const [cvFile, setCvFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // confetti effect function
    const triggerConfetti = () => {
      const count = 70;
      const defaults = {
        spread: 150, 
        ticks: 70,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 25, 
        colors: ['#08498E', '#ffffff', '#4ADE80']
      };

      function shoot() {
        // Left side burst
        confetti({
          ...defaults,
          particleCount: count,
          origin: { x: 0.1, y: 0.1 } 
        });

        // Center burst
        confetti({
          ...defaults,
          particleCount: count,
          origin: { x: 0.5, y: 0.5 } 
        });

        // Right side burst
        confetti({
          ...defaults,
          particleCount: count,
          origin: { x: 0.9, y: 0.1 } 
        });
      }

      shoot();
    };

    // Only show confetti if we have referrers
    if (referrerCount > 0) {
      triggerConfetti();

      const interval = setInterval(triggerConfetti, 1200);

      const timer = setTimeout(() => {
        clearInterval(interval);
      }, 2000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [referrerCount]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.length > 0) {
        setCvFile(acceptedFiles[0]);
      }
    }
  });

  const handlePaymentClick = () => {
    // Later this will be replaced with Stripe integration
    onPayment(); // This will trigger the state change in parent component
  };

  const handlePaidClick = () => {
    setSelectedOption("paid");
    setIsModalOpen(true);
  };

  const handleFreeClick = () => {
    setSelectedOption("free");
    setIsModalOpen(true);
  };

  const handleModalComplete = (option) => {
    if (option === "paid") {
      // Redirect to feedback page
      router.push('/seekers/feedback');
    } else {
      // Redirect to LinkedIn post page
      router.push('/seekers/linkedin-post?hasReferrers=true');
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center p-3 xs:p-4 md:p-6 lg:p-8 overflow-hidden">
      <div className="bg-theme-text/5 backdrop-blur-[2px] rounded-3xl p-6 sm:p-8 w-full max-w-[900px] relative">
          {/* Removed Stats Section - moved to LeftSide component */}

          {/* Action Items */}
          <div className="space-y-6">
            {/* LinkedIn Connection */}
            <div className="flex items-start gap-3">
              <BlueTick />
              <div>
                <h3 className="text-theme-text text-xl font-semibold mb-1">
                  Connect with them on LinkedIn
                </h3>
                <p className="text-theme-text/80 text-sm">
                  Built your professional network at the same time
                </p>
              </div>
            </div>

            {/* CV Upload */}
            <div className="flex items-start gap-3">
              <BlueTick checked={Boolean(cvFile)} />
              <div className="flex-1">
                <h3 className="text-theme-text text-xl font-semibold mb-1">
                  Upload your CV / Resume for match insights
                </h3>
                <p className="text-theme-text/80 text-sm mb-4">(Optional)</p>
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-theme-text/30 rounded-lg p-4 text-center cursor-pointer hover:border-theme-text/50 transition-colors max-w-[400px]"
                >
                  <input {...getInputProps()} />
                  <Image
                    src="/svg/dropCv.svg"
                    alt="Upload"
                    width={32}
                    height={32}
                    className="mx-auto mb-2"
                    style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(204deg) brightness(97%) contrast(97%)' }}
                  />
                  <span className="text-theme-text text-sm text-center">
                    {cvFile ? cvFile.name : 'Upload your CV / Resume here'}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Buttons */}
            <div className="space-y-4 mt-8">
              {/* Paid Button */}
              <button
                onClick={handlePaidClick}
                className="w-full bg-[#10B981] hover:bg-[#10B981]/90 rounded-xl p-4 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <div className="text-white text-2xl font-bold">£5 For Instant Access</div>
                    <div className="text-white/80 text-sm">Click to Pay Now</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">Prepare to get referred</div>
                    <div className="text-white/80 text-sm">While others wait to get noticed</div>
                  </div>
                </div>
              </button>

              {/* Free Option Button */}
              <button
                onClick={handleFreeClick}
                className="w-full border border-theme-text/20 hover:bg-[#10B981]/80 rounded-xl p-4 transition-colors group"
              >
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <div className="text-theme-text text-2xl font-bold">Free</div>
                    <div className="text-theme-text/80 text-sm">Access in 24 hours</div>
                  </div>
                  <div className="text-right">
                    <div className="text-theme-text font-semibold">Share on LinkedIn</div>
                    {/* <div className="text-theme-text/80 text-sm group-hover:text-white transition-colors">Get early access →</div> */}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

      {/* Modal */}
      <SignUpModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedOption={selectedOption}
        onComplete={handleModalComplete}  // Add this new prop
      />
    </div>
  );
}