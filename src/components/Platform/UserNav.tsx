import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function UserNav() {
  const isLoggedIn = false;

  return (
    <>
      {isLoggedIn ? (
        <Avatar className="w-6 h-6">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <Button>Login</Button>
      )}
    </>
  );
}

export default UserNav;
