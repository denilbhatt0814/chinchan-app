import { Button } from "@/components/ui/button";
import Link from "next/link";

function CreateBrandSection() {
  return (
    <div className="flex-grow  w-full text-center flex flex-col items-center py-8 rounded-lg gap-2  border-dashed border-blue-600">
      <div className="font-semibold text-xl">Welcome in Creator!</div>
      <div className="">Let's get started with setting up your brand</div>

      <Button asChild variant="outline">
        <Link href="/dashboard/create-brand">Create Brand</Link>
      </Button>
    </div>
  );
}

export default CreateBrandSection;
