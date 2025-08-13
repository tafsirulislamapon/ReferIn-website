import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserAvatarProps {
  userEmail?: string;
  userName?: string;
}

export default function UserAvatar({ 
  userEmail = "example@gmail.com",
  userName = "First Last"
}: UserAvatarProps) {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex flex-col justify-center h-10">
        <span className="text-white font-medium text-sm">
          {userName}
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLogout}
          className="flex items-center gap-2 h-[18px] px-0 text-white hover:text-white/80 hover:bg-transparent"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar className="h-9 w-9 cursor-pointer border-2 border-white rounded-full">
            <AvatarImage src="/fallbackUserImg.png" alt="User avatar" />
            <AvatarFallback className="border-2 border-white">
              {userName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white text-gray-700">
          <DropdownMenuLabel className="sm:hidden text-gray-900">{userName}</DropdownMenuLabel>
          <DropdownMenuLabel className="text-sm text-gray-500">{userEmail}</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
            <User className="mr-2 h-4 w-4 text-gray-500" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
            <Settings className="mr-2 h-4 w-4 text-gray-500" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="sm:hidden bg-gray-200" />
          <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-50 sm:hidden" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}