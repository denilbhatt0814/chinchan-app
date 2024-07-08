import React from "react";
import UserNav from "./UserNav";
import { ModeToggle } from "@/components/mode-toggle";

function Navbar() {
  return (
    <nav className="grid grid-flow-col justify-between p-2 shadow-sm items-center border border-b-1">
      <h1 className="font-bold text-xl">Chai Aur Code 🍵</h1>

      <div className="flex gap-2 items-center ">
        <ModeToggle />
        <UserNav />
      </div>
    </nav>
  );
}

export default Navbar;
