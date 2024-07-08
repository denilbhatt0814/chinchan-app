import { getAllBrandsByCreatorIdResponseSchema } from "@/db/queries";
import React from "react";
import BrandCard from "./BrandCard";
import CreateBrandDialog from "./CreateBrandDialog";

function BrandListSection({
  brands,
}: {
  brands: getAllBrandsByCreatorIdResponseSchema;
}) {
  return (
    <div className="flex w-full p-4 flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="font-semibold">Your Brands</div>
        <CreateBrandDialog />
      </div>
      <div className="grid grid-cols-4 md:grid-cols-6 justify-between">
        {brands.map((brand) => {
          return <BrandCard key={brand.id} brand={brand} />;
        })}
      </div>
    </div>
  );
}

export default BrandListSection;
