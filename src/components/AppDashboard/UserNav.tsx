"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import { redirect } from "next/navigation";
import posthog from "posthog-js";

function UserNav() {
  const { data: session } = useSession();
  if (process.env.NODE_ENV != "production") console.log("DATA:", session);
  const user: User = session?.user as User;

  if (!session) {
    return (
      <Button
        onClick={() => {
          redirect("/sign-in");
        }}
      >
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full" asChild>
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.image!} />
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            signOut();
            if (process.env.NODE_ENV == "production") posthog.reset();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNav;
