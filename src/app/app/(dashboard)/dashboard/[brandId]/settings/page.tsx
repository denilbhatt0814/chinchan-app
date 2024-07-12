import EditBrandForm from "@/components/AppDashboard/Brand/EditBrandForm";
import { getBrandById } from "@/db/queries";
import React from "react";

async function BrandSettingsPage({ params }: { params: { brandId: number } }) {
  const brand = await getBrandById(params.brandId);
  if (!brand) {
    return (
      <div className="flex flex-col h-full w-full p-8 items-center">
        <h1 className="text-2xl">Brand Not Found!</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full p-6 gap-3">
      <EditBrandForm brand={brand} />
    </div>
  );
}

export default BrandSettingsPage;
