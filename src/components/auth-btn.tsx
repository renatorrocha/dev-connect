"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Github, LogOut, MessageSquareDot, Settings } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "authenticated" && session.user.name)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar>
              <AvatarImage src={session.user.image ?? ""} />
              <AvatarFallback>{session.user.name[0] ?? ""}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MessageSquareDot className="mr-2 h-4 w-4" />
            Support
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="items-center focus:bg-destructive focus:font-semibold focus:text-white"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  if (status === "unauthenticated")
    return (
      <Button
        className="flex gap-2 font-semibold"
        onClick={() => signIn("github")}
      >
        <Github className="size-4" />
        Sign-in
      </Button>
    );

  return <Skeleton className="size-9 rounded-full" />;
}
