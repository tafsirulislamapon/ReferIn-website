import Image from "next/image";
import UserAvatar from "../User/UserAvatar";

interface NavbarProps {
  userName?: string;
  userEmail?: string;
  logoSrc?: string;
}

export default function Navbar({ 
  userName = "John Doe",
  userEmail = "john@example.com",
  logoSrc = "/referInLOGO.svg"
}: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-navbar bg-navbar backdrop-blur-sm">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={logoSrc}
            alt="Referin Logo"
            width={100}
            height={25}
            className="h-8 w-auto"
            priority
          />
        </div>
        <UserAvatar 
          userName={userName}
          userEmail={userEmail}
        />
      </div>
    </nav>
  );
}
