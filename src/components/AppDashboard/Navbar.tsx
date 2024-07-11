import React from "react";
import UserNav from "./UserNav";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="h-[5%] grid grid-flow-col justify-between p-2 shadow-sm items-center border border-b-1">
      <div>
        <Link href="/dashboard">
          <h1 className="font-bold text-xl">ChinChan</h1>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center ">
        <ModeToggle />
        <UserNav />
      </div>
    </nav>
  );
}

export default Navbar;
