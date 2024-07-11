import AddContentForm from "@/components/AppDashboard/Content/AddContentForm";

function AddContentPage({ params }: { params: { brandId: number } }) {
  return (
    <div className="flex flex-col w-full p-6 md:py-6 gap-3">
      <AddContentForm brandId={params.brandId} />
    </div>
  );
}

export default AddContentPage;
