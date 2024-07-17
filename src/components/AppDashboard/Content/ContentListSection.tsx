import { getAllVideoByBrandId, getAllVideoByCreatorId } from "@/db/queries";
import React from "react";
import ContentCard from "./ContentCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function ContentListSection({ brandId }: { brandId: number }) {
  const contents = await getAllVideoByBrandId(brandId);
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold">Your Content</div>

        {contents.length > 0 && (
          <Link href={`/dashboard/${brandId}/content-upload`}>
            <Button variant="outline">Add Content </Button>
          </Link>
        )}
      </div>
      {contents.length > 0 ? (
        // <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div className="flex w-full flex-wrap items-center gap-4">
          {contents.map((content) => {
            return <ContentCard key={content.id} content={content} />;
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-1 justify-center items-center h-[30vh] w-full rounded-md border border-dotted border-blue-300 bg-slate-100 dark:bg-slate-900">
          <span className="text-lg font-medium">
            Let&apos;s add your First Video!!
          </span>
          <Link href={`/dashboard/${brandId}/content-upload`}>
            <Button variant="default">Add Content </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ContentListSection;
