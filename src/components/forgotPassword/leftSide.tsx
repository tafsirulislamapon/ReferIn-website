import Image from 'next/image';

export default function LeftSide() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="flex flex-col items-center max-w-md text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 gap-y-8 flex flex-col items-center">
            <Image
              src="/referin-whiteTextLOGO.svg"
              alt="ReferIn Logo"
              width={70}
              height={50}
              className="mb-4"
            />
            
            <Image
              src="/svg/lockIcon.svg"
              alt="Lock Icon"
              width={80}
              height={80}
              className="mx-auto"
            />

            <h2 className="text-lg xs:text-sm font-medium text-white">
              Don&apos;t worry we got your back, just reset your password and get your account running like before.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
