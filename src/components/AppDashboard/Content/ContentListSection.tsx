import { getAllVideoByCreatorId } from "@/db/queries";
import React from "react";
import ContentCard from "./ContentCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function ContentListSection() {
  const creatorId = 1;
  const contents = await getAllVideoByCreatorId(creatorId);
  return (
    <div className="flex w-full p-4 flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="font-semibold">Your Content</div>

        <Link href="/dashboard/content-upload">
          <Button variant="outline">Add Content </Button>
        </Link>
      </div>
      <div className="flex gap-2">
        {contents.map((content) => {
          return <ContentCard key={content.id} content={content} />;
        })}
      </div>
    </div>
  );
}

export default ContentListSection;
