import Image from "next/image";
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UserAvatar from "../User/UserAvatar";
import { Input } from "../ui/input";
import PopUpInfoModal from "../ui/PopUpInfoModal";
import Thanks from './Thanks';

export default function ReferrerLanding({ onShowLinkedInPost, onSkip }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [vacancyUrl, setVacancyUrl] = useState('');
  const [jobDetails, setJobDetails] = useState(''); // New state for second input
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [showSkipModal, setShowSkipModal] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  });

  const handleSubmitVacancy = () => {
    if ((vacancyUrl.trim() || jobDetails.trim()) && !isSubmitting) { // Updated condition
      setIsSubmitting(true);
      // Simulate a small delay to show loading state
      setTimeout(() => {
        setShowThanks(true);
        setIsSubmitting(false);
        if (onShowLinkedInPost) {
          onShowLinkedInPost();
        }
      }, 500);
    }
  };

  const handleSkip = () => {
    setShowSkipModal(true);
  };

  const handleConfirmSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  if (showThanks) {
    return <Thanks />;
  }

  return (
    <>
      {/* Skip Confirmation Modal */}
      <PopUpInfoModal
        isOpen={showSkipModal}
        onClose={() => setShowSkipModal(false)}
        onConfirm={handleConfirmSkip}
        type="confirmation"
        title="Are you sure?"
        message="Adding a vacancy will 5x chances of being found by matching job seekers"
        benefits={[
          "Increasing your chances of earning a referral bonus",
          "Boost your chances of offering a paid service if they dont match"
        ]}
        confirmText="Yes I am sure, please skip for now"
        cancelText="Go back and add vacancy"
      />
    
      {/* Main Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 pt-24">
        <div className="w-full max-w-[600px]">
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-clash font-bold text-theme-text text-center">
              Please paste the url of the job spec vacancies your company has, mode of work and Title of role.
            </h1>

            {/* Vacancy URL Input */}
            <textarea
              placeholder={`Please paste here the url of the job spec\neg: Apple.co.uk/great-job-designer`}
              value={vacancyUrl}
              onChange={(e) => setVacancyUrl(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-xl bg-theme-text/10 text-theme-text placeholder:text-theme-text/60 border-none focus-visible:ring-theme-text/20 resize-none text-center placeholder:text-center scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent text-sm lg:text-lg"
              required
            />
            
            {/* Job Details Input */}
            <textarea
              placeholder={`Enter Job title, location and mode of work.\neg: Data Analyst / Hybrid / London, UK`}
              value={jobDetails}
              onChange={(e) => setJobDetails(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-xl bg-theme-text/10 text-theme-text placeholder:text-theme-text/60 border-none focus-visible:ring-theme-text/20 resize-none text-center placeholder:text-center scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent text-sm lg:text-lg"
              required
            />

            {/* Upload Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#4ADE80]" />
                <span className="text-theme-text text-sm font-medium">Upload Job Description (Optional)</span>
              </div>

              {/* Dropzone */}
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-theme-text/30 rounded-lg p-6 text-center cursor-pointer hover:border-theme-text/50 transition-colors"
              >
                <input {...getInputProps()} />
                <Image
                  src="/svg/dropCv.svg"
                  alt="Upload"
                  width={40}
                  height={40}
                  className="mx-auto mb-3"
                  style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(204deg) brightness(97%) contrast(97%)' }}
                />
                {selectedFile ? (
                  <div className="text-theme-text space-y-1">
                    <p className="font-medium text-sm">{selectedFile.name}</p>
                    <p className="text-xs text-theme-text/70">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : isDragActive ? (
                  <p className="text-sm text-theme-text">Drop the file here...</p>
                ) : (
                  <p className="text-sm text-theme-text/70">pdf or word document only</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Submit Button */}
              <button 
                className={`w-full bg-theme-button-bg text-theme-button-text rounded-lg py-5 text-sm sm:text-xl cursor-pointer font-semibold transition-colors flex items-center justify-center gap-2 ${
                  (!vacancyUrl.trim() && !jobDetails.trim()) || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-theme-button-hover'
                }`}
                disabled={(!vacancyUrl.trim() && !jobDetails.trim()) || isSubmitting}
                onClick={handleSubmitVacancy}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-theme-button-text border-t-transparent rounded-full" />
                    <span>Processing...</span>
                  </>
                ) : (
                  'Continue'
                )}
              </button>

              {/* Skip Button */}
              <button 
                onClick={handleSkip}
                className="w-full bg-transparent border-2 border-theme-text/30 text-theme-text rounded-lg py-5 text-sm sm:text-xl font-semibold hover:bg-theme-text/10 transition-colors"
              >
                Skip for Now
              </button>
            </div>

            {/* Help Text */}
            <div className="text-center text-sm text-theme-text/60">
              <p>You can always add job vacancies later from your dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}