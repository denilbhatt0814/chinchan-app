import { HomeIcon, SettingsIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function BrandDashboardSideNav() {
  return (
    <div className="w-[20%] shadow-md p-4 border border-r-1 border-y-0">
      <ul className="texl-lg grid items-start gap-2">
        <li className=" hover:shadow-md rounded-md py-2 px-3 dark:hover:bg-slate-900 transition duration-300">
          <Link href={`/dashboard`} className="flex gap-2 items-center">
            <HomeIcon className="h-4 w-4" /> <span>Home</span>
          </Link>
        </li>
        <li className=" hover:shadow-md rounded-md py-2 px-3 dark:hover:bg-slate-900 transition duration-300">
          <Link href={""} className="flex gap-2 items-center">
            <VideoIcon className="h-4 w-4" /> <span>Content</span>
          </Link>
        </li>
        <li className=" hover:shadow-md rounded-md py-2 px-3 dark:hover:bg-slate-900 transition duration-300">
          <Link href={""} className="flex gap-2 items-center">
            <SettingsIcon className="h-4 w-4" /> <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default BrandDashboardSideNav;
