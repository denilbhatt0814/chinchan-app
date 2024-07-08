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
    <Card>
      <Link target="_blank" href={`http://${brand.subdomain}.localhost:3000`}>
        <CardHeader>
          <CardTitle>{brand.name}</CardTitle>
          <CardDescription>{brand.subdomain}.chinchan.tv</CardDescription>
        </CardHeader>
        {/* <CardContent>
        <p>Card Content</p>
        </CardContent>
        <CardFooter>
        <p>Card Footer</p>
        </CardFooter> */}
      </Link>
    </Card>
  );
}

export default BrandCard;
