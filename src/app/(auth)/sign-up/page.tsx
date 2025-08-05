import SignUpLeft from "@/components/signUp/SignUpLeft";
import Step1 from "@/components/signUp/Step1";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-[50%] min-h-[500px] md:min-h-screen bg-gradient-to-br from-[#0C549F] to-[#2E1FFF] flex items-center justify-center p-4 md:p-8">
        <SignUpLeft />
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-[#F9FAFB] flex items-center justify-center p-4 md:p-8">
        <Step1 />
      </div>
    </div>
  );
}