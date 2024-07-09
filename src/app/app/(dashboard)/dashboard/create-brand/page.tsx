import CreateBrandForm from "@/components/AppDashboard/Brand/CreateBrandForm";
import React from "react";

function CreateBrandPage() {
  return (
    <div className="flex flex-col w-full p-6 md:py-6 md:px-64 gap-3">
      <CreateBrandForm />
    </div>
  );
}

export default CreateBrandPage;
