import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllVideosBySubdomainResponseSchema } from "@/db/queries";
import Link from "next/link";

function ContentCard({
  content,
}: {
  content: getAllVideosBySubdomainResponseSchema[number];
}) {
  return (
    <Card className="w-64 h-72 shadow-sm">
      <Link href={`/watch/${content.id}`}>
        <div className="relative h-48 overflow-hidden rounded-t-xl">
          <img
            src={content.thumbnailUrl}
            alt="Video Thumbnail"
            className="object-cover w-full h-full"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold line-clamp-2">
            {content.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {content.description}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}

export default ContentCard;
