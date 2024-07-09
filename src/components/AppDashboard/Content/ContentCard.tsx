import {
  getAllBrandsByCreatorIdResponseSchema,
  getAllVideosByCreatorIdResponseSchema,
} from "@/db/queries";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ContentCard({
  content,
}: {
  content: getAllVideosByCreatorIdResponseSchema[number];
}) {
  return (
    <Card className="w-[350px] rounded-lg overflow-hidden shadow-md">
      <div className="relative">
        <img
          alt={content.title}
          className="w-full h-48 object-cover"
          height="200"
          src={content.thumbnailUrl}
          style={{
            aspectRatio: "350/200",
            objectFit: "cover",
          }}
          width="350"
        />
      </div>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold hover:underline">
          {content.title}
        </CardTitle>
        <CardDescription>{content.description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default ContentCard;
