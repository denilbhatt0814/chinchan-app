import { getAllVideosByCreatorIdResponseSchema } from "@/db/queries";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EllipsisIcon, PencilIcon, TrashIcon } from "lucide-react";
import ContentCardDropDown from "./ConentCardDropDown";

function ContentCard({
  content,
}: {
  content: getAllVideosByCreatorIdResponseSchema[number];
}) {
  return (
    <Card className="w-[350px] rounded-lg overflow-hidden border-none shadow-none hover:border hover:shadow-lg dark:hover:bg-slate-900">
      <div className="relative">
        <img
          alt={content.title}
          className="w-full h-48 object-cover rounded-lg"
          width="350"
          height="200"
          src={content.thumbnailUrl}
          style={{
            aspectRatio: "350/200",
            objectFit: "cover",
          }}
        />
      </div>
      <CardContent className="p-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold hover:underline">
            {content.title}
          </CardTitle>
          <ContentCardDropDown contentId={content.id} />
        </div>
        <CardDescription>{content.description}</CardDescription>
        <div className="text-sm text-muted-foreground">
          <span>3 hours ago</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default ContentCard;
