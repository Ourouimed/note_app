"use client";
import { Button } from "./ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Plus } from "lucide-react";
import { usePopup } from "@/context/popupContext";
import NoteForm from "./popupForms/noteForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logoutUser } = useAuth();
  const { openPopup } = usePopup();
  const router = useRouter();

  const userMeta = user?.user_metadata ?? null;

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <header className="px-10 py-4 border-b flex items-center justify-between bg-background/70 backdrop-blur-md sticky top-0 z-50">
      <h3 className="text-2xl font-semibold tracking-tight">
        NoteApp
      </h3>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {userMeta ? (
          <>
            <Button
              onClick={() =>
                openPopup("Add new note", <NoteForm />)
              }
            >
              <Plus className="mr-2 h-4 w-4" /> New note
            </Button>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-3 focus:outline-none">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="/placeholder-avatar.png"
                    alt={`${userMeta.name}'s avatar`}
                  />
                  <AvatarFallback aria-label="User initials">
                    {getInitials(userMeta.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="font-medium">{userMeta.name}</span>
                  {/* {userMeta.username && (
                    <span className="text-xs text-muted-foreground">
                      @{userMeta.username}
                    </span>
                  )} */}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={logoutUser}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button onClick={()=>{
            router.push('/login')
          }}>Login</Button>
        )}
      </div>
    </header>
  );
}
