import EditContentForm from "@/components/AppDashboard/Content/EditContentForm";
import { getVideoById } from "@/db/queries";

async function EditContentPage({
  params,
}: {
  params: { brandId: number; contentId: number };
}) {
  const content = await getVideoById(params.contentId);
  if (!content) {
    return (
      <div className="flex flex-col h-full w-full p-8 items-center">
        <h1 className="text-2xl">Content Not Found!</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full p-6 md:py-6 gap-3">
      <EditContentForm content={content} />
    </div>
  );
}

export default EditContentPage;
