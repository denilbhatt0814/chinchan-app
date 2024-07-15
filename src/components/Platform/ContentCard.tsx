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
    <Link href={`/watch/${content.id}`}>
      <Card className="w-[300px] max-h-[172px] hover:z-20 hover:max-h-[500px] hover:scale-105 transition-all rounded-lg overflow-hidden border-none shadow-none hover:border hover:shadow-lg dark:hover:bg-slate-900 duration-300">
        <div className="relative">
          <img
            alt={content.title}
            className="w-full h-full object-cover rounded-md"
            width="300"
            height="172"
            src={content.thumbnailUrl}
            style={{
              aspectRatio: "315/180",
              objectFit: "cover",
            }}
          />
        </div>
        <CardContent className="p-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold hover:underline">
              {content.title}
            </CardTitle>
          </div>
          <CardDescription>{content.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ContentCard;
