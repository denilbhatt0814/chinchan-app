import ContentListSection from "@/components/AppDashboard/Content/ContentListSection";
import React from "react";

function page({ params }: { params: { brandId: number } }) {
  return (
    <div className="flex flex-col h-full w-full p-6">
      <ContentListSection brandId={params.brandId} />
    </div>
  );
}

export default page;
