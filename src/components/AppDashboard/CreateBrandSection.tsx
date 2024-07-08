import React from "react";
import CreateBrandDialog from "./CreateBrandDialog";

function CreateBrandSection() {
  return (
    <div className="flex-grow  w-full text-center flex flex-col items-center py-8 rounded-lg gap-2  border-dashed border-blue-600">
      <div className="font-semibold text-xl">Heyo Creator!</div>
      <div className="">new to chinchan? start by creating your brand</div>
      <CreateBrandDialog />
    </div>
  );
}

export default CreateBrandSection;
