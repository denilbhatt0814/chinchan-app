import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function UserNav() {
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src="https://pbs.twimg.com/profile_images/1280536603757166592/9sdH9Hxp_400x400.jpg" />
      <AvatarFallback>DB</AvatarFallback>
    </Avatar>
  );
}

export default UserNav;
