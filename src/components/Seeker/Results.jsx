import Image from "next/image";
import { useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import BlueTick from '../ui/BlueTick';
import SignUpModal from '../signUp/Signup-Modals/SignUpModal';

export default function Results({ onPayment, onGoToLinkedIn, referrerCount = 0 }) {
  const [cvFile, setCvFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Enhanced confetti effect function
    const triggerConfetti = () => {
      const count = 70;
      const defaults = {
        spread: 150, 
        ticks: 70,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 25, 
        colors: ['#ffffff', '#2E1FFF', '#0C549F', '#4ADE80']
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
      onPayment(); // Transition to PaidSeeker
    } else {
      onGoToLinkedIn(); // Transition to LinkedIn Post
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center p-3 xs:p-4 md:p-6 lg:p-8 overflow-hidden">
      <div className="bg-white/5 backdrop-blur-[2px] rounded-3xl p-6 sm:p-8 w-full max-w-[900px] relative">
          {/* Stats Section */}
          <div className="space-y-3 mb-8 text-center">
            <div className="bg-[#2563EB]/20 backdrop-blur-md rounded-xl p-4 text-white text-2xl sm:text-3xl font-bold">
              Here are your matches
            </div>
          </div>

          {/* Action Items */}
          <div className="space-y-6">
            {/* LinkedIn Connection */}
            <div className="flex items-start gap-3">
              <BlueTick />
              <div>
                <h3 className="text-white text-xl font-semibold mb-1">
                  Connect with them on LinkedIn
                </h3>
                <p className="text-white/80 text-sm">
                  Built your professional network at the same time
                </p>
              </div>
            </div>

            {/* CV Upload */}
            <div className="flex items-start gap-3">
              <BlueTick checked={Boolean(cvFile)} />
              <div className="flex-1">
                <h3 className="text-white text-xl font-semibold mb-1">
                  Upload your CV for match insights
                </h3>
                <p className="text-white/80 text-sm mb-4">(Optional)</p>
                <div
                  {...getRootProps()}
                  className="flex flex-col items-center justify-center"
                >
                  <input {...getInputProps()} />
                  <div className="mb-2 [&>img]:brightness-0 [&>img]:invert">
                    <Image
                      src="/svg/dropCv.svg"
                      alt="Upload"
                      width={40}
                      height={40}
                      className="opacity-70"
                    />
                  </div>
                  <span className="text-white text-center">
                    {cvFile ? cvFile.name : 'Upload your CV here'}
                  </span>
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="flex items-start gap-3">
              <BlueTick />
              <div>
                <h3 className="text-white text-xl font-semibold mb-1">
                  Get feedback from Employees
                </h3>
                <p className="text-white/80 text-sm">
                  Check suitability, maximise your chances - before you apply
                </p>
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
                    <div className="text-white text-2xl font-bold">£5</div>
                    <div className="text-white/80 text-sm">Click to Pay Now</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">Prepare to get referred</div>
                    <div className="text-white/80 text-sm">While others <span className="line-through">wait</span> to get noticed</div>
                  </div>
                </div>
              </button>

              {/* Free Option Button */}
              <button
                onClick={handleFreeClick}
                className="w-full border border-white/20 hover:bg-white/5 rounded-xl p-4 transition-colors group"
              >
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <div className="text-white text-2xl font-bold">Free</div>
                    <div className="text-white/80 text-sm">Available in 24 hours</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">Share on LinkedIn</div>
                    <div className="text-white/80 text-sm group-hover:text-white transition-colors">Get early access →</div>
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