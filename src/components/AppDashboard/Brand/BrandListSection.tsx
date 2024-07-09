import { getAllBrandsByCreatorIdResponseSchema } from "@/db/queries";
import React from "react";
import BrandCard from "./BrandCard";
import CreateBrandDialog from "./CreateBrandDialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function BrandListSection({
  brands,
}: {
  brands: getAllBrandsByCreatorIdResponseSchema;
}) {
  return (
    <div className="flex w-full p-4 flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Select your brand</div>
        <Button asChild variant="outline">
          <Link href="/dashboard/create-brand">Create Brand</Link>
        </Button>
      </div>
      <div className="grid py-2 items-center grid-cols-1 md:grid-cols-4 justify-start gap-3 md:gap-6">
        {brands.map((brand) => {
          return (
            <Link href={`/dashboard/${brand.id}`}>
              <BrandCard key={brand.id} brand={brand} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BrandListSection;
