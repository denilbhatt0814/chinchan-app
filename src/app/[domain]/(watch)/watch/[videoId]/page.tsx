import React from "react";
import Player from "next-video/player";
import { getVideoById } from "@/db/queries";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function page({
  params,
}: {
  params: { domain: string; videoId: string };
}) {
  const content = await getVideoById(parseInt(params.videoId));

  if (!content) {
    return (
      <div className="flex flex-col gap-1 w-full items-center justify-center">
        <h2 className="text-4xl ">😢 Content Not Found!</h2>
        <Link className="text-lg hover:underline" href={`/${params.domain}`}>
          Home
        </Link>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full max-w-[1920px] max-h-[1080px] overflow-hidden">
      <Player
        src={content.mediaUrl}
        poster={content.thumbnailUrl}
        className="w-full h-full object-cover"
      >
        <h1>{content.title}</h1>
      </Player>
    </div>
  );
}

export default page;
