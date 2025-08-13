import RefererLeftSide from "./RefererLeftSide";
import RefererRightSide from "./RefererRightSide";

export default function RefererDashboard() {
  return (
    <div className="min-h-screen bg-[#08498E] flex flex-col lg:flex-row items-center justify-center gap-0">
      <div className="w-full max-w-[1440px] flex flex-col lg:flex-row items-center justify-center">
        <RefererLeftSide />
        <RefererRightSide />
      </div>
    </div>
  );
} 