import Image from "next/image";
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UserAvatar from "../User/UserAvatar";
import { Input } from "../ui/input";

export default function ReferrerLanding({ onShowLinkedInPost }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [vacancyUrl, setVacancyUrl] = useState('');

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
    if (selectedFile && onShowLinkedInPost) {
      onShowLinkedInPost();
    }
  };

  return (
    <>
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/referin-whiteTextLOGO.svg"
              alt="Referin Logo"
              width={100}
              height={25}
              className="h-8 w-auto"
              priority
            />
          </div>
          <UserAvatar 
            userName="John Doe"
            userEmail="john@example.com"
          />
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 pt-24">
        <div className="w-full max-w-[600px]">
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-clash font-bold text-white text-center">
              Please paste the url of the job spec vacancies your company has, mode of work and Title of role.
            </h1>

            {/* Vacancy Input */}
            <Input
              type="text"
              placeholder="eg: Apple.co.uk/great-job-designer, hybrid, Web designer"
              value={vacancyUrl}
              onChange={(e) => setVacancyUrl(e.target.value)}
              className="bg-white/10 text-white placeholder:text-white/80 h-14 !text-xl !md:text-xl px-5"
            />

            {/* Upload Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#4ADE80]" />
                <span className="text-white text-sm font-medium">Upload Job Description</span>
              </div>

              {/* Dropzone */}
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center cursor-pointer hover:border-white/50 transition-colors"
              >
                <input {...getInputProps()} />
                <Image
                  src="/svg/dropCv.svg"
                  alt="Upload"
                  width={40}
                  height={40}
                  className="mx-auto mb-3 invert"
                />
                {selectedFile ? (
                  <div className="text-white space-y-1">
                    <p className="font-medium text-sm">{selectedFile.name}</p>
                    <p className="text-xs text-white/70">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : isDragActive ? (
                  <p className="text-sm text-white">Drop the file here...</p>
                ) : (
                  <p className="text-sm text-white/70">pdf or word document only</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button 
              className={`w-full bg-blue-600 text-white rounded-lg py-5 text-sm sm:text-xl cursor-pointer font-semibold transition-colors ${
                selectedFile ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!selectedFile}
              onClick={handleSubmitVacancy}
            >
              Submit Vacancy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}