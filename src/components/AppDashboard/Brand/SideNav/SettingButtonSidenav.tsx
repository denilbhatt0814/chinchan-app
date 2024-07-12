"use client";
import { SettingsIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function SettingButtonSidenav() {
  return (
    <Link
      href={`/dashboard/${localStorage.getItem("brandId")}/settings`}
      className="flex gap-2 items-center"
    >
      <SettingsIcon className="h-4 w-4" /> <span>Settings</span>
    </Link>
  );
}

export default SettingButtonSidenav;
