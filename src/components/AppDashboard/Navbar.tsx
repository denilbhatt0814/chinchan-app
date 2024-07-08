import React from "react";
import UserNav from "./UserNav";
import { ModeToggle } from "@/components/mode-toggle";

function Navbar() {
  return (
    <nav className="grid grid-flow-col justify-between p-2 shadow-sm items-center border border-b-1">
      <div>
        <h1 className="font-bold text-xl">ChinChan</h1>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center ">
        <ModeToggle />
        <UserNav />
      </div>
    </nav>
  );
}

export default Navbar;
