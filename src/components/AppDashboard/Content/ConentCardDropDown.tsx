"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { SelectVideo } from "@/db/schema";
import axios from "axios";
import { EllipsisIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

function ContentCardDropDown({
  contentId,
  brandId,
}: {
  contentId: SelectVideo["id"];
  brandId: SelectVideo["brandId"];
}) {
  const { toast } = useToast();
  const router = useRouter();

  function handleEdit() {
    router.push(`/dashboard/${brandId}/content-edit/${contentId}`);
  }

  async function handleDelete() {
    try {
      const response = await axios.delete(`/api/video-content/${contentId}`, {
        withCredentials: true,
      });
      if (process.env.NODE_ENV != "production") console.log(response.data);
      toast({ title: "✅ Content deleted successfully..!!" });

      router.refresh();
    } catch (error) {
      if (process.env.NODE_ENV != "production") console.log(error);
      toast({
        title: "😕 Opps, Something went wrong!",
        variant: "destructive",
      });
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="rounded-full outline-none border-none"
        >
          <EllipsisIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="flex gap-3 items-center"
          onClick={handleEdit}
        >
          <PencilIcon className="h-4 w-4" /> <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-3 items-center text-red-500 focus:text-white focus:bg-red-500"
          onClick={handleDelete}
        >
          <TrashIcon className="h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default ContentCardDropDown;
