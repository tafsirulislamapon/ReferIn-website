"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function DropCv({ onSkip, onDone }) {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  });

  return (
    <div>
      <h2 className="text-lg md:text-xl font-satoshi">
        Optional step to save{" "}
        <span className="font-clash font-medium text-2xl text-[#08498E]">
          your time
        </span>
      </h2>
      <p className="text-sm text-gray-500 mt-2 mb-6">
        Upload CV/Resume
      </p>

      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
          ${isDragActive ? 'border-[#08498E] bg-[#F5F9FF]' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} />
        <Image
          src="/svg/dropCv.svg"
          alt="Drop CV"
          width={43}
          height={44}
          className="mx-auto mb-4"
        />
        <p className="text-base font-satoshi mb-2">
          {file ? file.name : "Drag and drop files here"}
        </p>
        <p className="text-sm text-gray-500 mb-4">or</p>
        <Button
          variant="outline"
          className="bg-[#08498E] text-white hover:bg-[#08498E]/90"
        >
          Browse files
        </Button>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        * Will not be shared without your permission
      </p>

      <div className="flex gap-4 mt-8">
        <Button
          variant="outline"
          className="flex-1 py-6 border-[#08498E] text-[#08498E] hover:bg-[#F5F9FF]"
          onClick={onSkip}
        >
          Skip for now
        </Button>
        <Button
          className={`flex-1 p-6  ${
            file 
              ? 'bg-[#08498E] text-white hover:bg-[#08498E]/90' 
              : 'bg-[#08498E]/50 text-white cursor-not-allowed'
          }`}
          onClick={() => {
            if (file) {
              // Here you can handle the file upload to your server if needed
              onDone();
            }
          }}
          disabled={!file}
        >
          Done
        </Button>
      </div>
    </div>
  );
}