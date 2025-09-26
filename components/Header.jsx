import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Plus } from "lucide-react"

export default function Header() {
  return (
    <header className="px-6 py-4 border-b flex items-center justify-between bg-background/70 backdrop-blur-md sticky top-0 z-50">
      {/* Logo / Title */}
      <h3 className="text-2xl font-semibold tracking-tight">
        NoteApp
      </h3>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <Button size="sm"><Plus/> New note </Button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 focus:outline-none">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder-avatar.png" alt="User avatar" />
              <AvatarFallback>MO</AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col items-start">
              <span className="font-medium">Medamine Ouroui</span>
              <span className="text-xs text-muted-foreground">@ourouimed</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
