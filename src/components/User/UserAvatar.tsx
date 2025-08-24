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
        <span className="text-navbar font-medium text-sm">
          {userName}
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLogout}
          className="flex items-center gap-2 h-[18px] px-0 text-navbar-logout hover:text-navbar-logout-hover hover:bg-transparent"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar className="h-9 w-9 cursor-pointer border-2 border-theme-text rounded-full">
            <AvatarImage src="/fallbackUserImg.png" alt="User avatar" />
            <AvatarFallback className="border-2 border-theme-text bg-theme-bg text-theme-text">
              {userName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-theme-bg text-theme-text border-theme-text/20">
          <DropdownMenuLabel className="sm:hidden text-theme-text">{userName}</DropdownMenuLabel>
          <DropdownMenuLabel className="text-sm text-theme-text/70">{userEmail}</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-theme-text/20" />
          <DropdownMenuItem className="cursor-pointer hover:bg-theme-text/5 text-theme-text">
            <User className="mr-2 h-4 w-4 text-theme-text/70" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-theme-text/5 text-theme-text">
            <Settings className="mr-2 h-4 w-4 text-theme-text/70" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="sm:hidden bg-theme-text/20" />
          <DropdownMenuItem className="cursor-pointer text-navbar-logout hover:text-navbar-logout-hover hover:bg-red-50 sm:hidden" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}