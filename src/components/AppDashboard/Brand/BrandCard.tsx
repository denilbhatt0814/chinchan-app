import { getAllBrandsByCreatorIdResponseSchema } from "@/db/queries";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

function BrandCard({
  brand,
}: {
  brand: getAllBrandsByCreatorIdResponseSchema[number];
}) {
  return (
    <Card className="relative md:h-[20vh] md:w-[20vw] border bottom-2 overflow-hidden shadow-md hover:shadow-lg rounded-md">
      <img
        src={brand.bannerUrl!}
        width={1920}
        height={1080}
        alt="Cover"
        className="h-full w-full object-cover blur-lg"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <img
            src={brand.logoUrl!}
            width={64}
            height={64}
            alt="Logo"
            className="rounded-full bg-black dark:bg-white p-1"
          />

          <div className="p-2">
            <Link
              target="_blank"
              href={`http://${brand.subdomain}.localhost:3000`}
            >
              <h1 className="text-xl font-bold">{brand.name}</h1>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default BrandCard;
