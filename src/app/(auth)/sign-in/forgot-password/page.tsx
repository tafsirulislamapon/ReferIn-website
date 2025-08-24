import LeftSide from '@/components/forgotPassword/leftSide';
import RightSide from '@/components/forgotPassword/rightSide';

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:block lg:w-1/2 xl:w-[45%]">
        <LeftSide />
      </div>
      <div className="w-full lg:w-1/2 xl:w-[55%]">
        <RightSide />
      </div>
    </div>
  );
}