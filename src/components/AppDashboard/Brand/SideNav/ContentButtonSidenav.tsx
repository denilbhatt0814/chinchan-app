"use client";
import { VideoIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function ContentButtonSidenav() {
  return (
    <Link
      href={`/dashboard/${localStorage.getItem("brandId")}`}
      className="flex gap-2 items-center"
    >
      <VideoIcon className="h-4 w-4" /> <span>Content</span>
    </Link>
  );
}

export default ContentButtonSidenav;
