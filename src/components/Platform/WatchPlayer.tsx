"use client";
import React, { useEffect, useRef, useState } from "react";
import Player from "next-video/player";
import { SelectVideo } from "@/db/schema";
import { ArrowLeft, ArrowLeftIcon, ChevronLeft, MoveLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const HIDE_TIMEOUT = 3000;

function WatchPlayer({ content }: { content: SelectVideo }) {
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const hideTimeout = useRef<NodeJS.Timeout>();
  const router = useRouter();

  const resetHideTimeout = () => {
    clearTimeout(hideTimeout.current);
    setIsTopBarVisible(true);
    hideTimeout.current = setTimeout(
      () => setIsTopBarVisible(false),
      HIDE_TIMEOUT
    );
  };

  useEffect(() => {
    document.addEventListener("mousemove", resetHideTimeout);
    document.addEventListener("touchstart", resetHideTimeout);
    hideTimeout.current = setTimeout(
      () => setIsTopBarVisible(false),
      HIDE_TIMEOUT
    );

    return () => {
      clearTimeout(hideTimeout.current);
      document.removeEventListener("mousemove", resetHideTimeout);
      document.removeEventListener("touchstart", resetHideTimeout);
    };
  }, []);

  return (
    <div className="relative w-full h-full text-white overflow-hidden">
      <div
        className={`absolute top-2 left-2 p-1 z-10 transition-opacity duration-300 ${
          isTopBarVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex gap-1 items-center">
          <button
            className="rounded-full hover:bg-slate-800 p-2 transition duration-200"
            onClick={() => {
              router.back();
            }}
          >
            <ChevronLeft strokeWidth="2" width="16" className="w-4 h-4" />
          </button>
          <h1 className="text-2xl font-bold">{content.title}</h1>
        </div>
      </div>
      <Player
        src={content.mediaUrl}
        poster={content.thumbnailUrl}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default WatchPlayer;
