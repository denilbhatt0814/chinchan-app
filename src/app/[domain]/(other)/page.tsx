import ContentCard from "@/components/Platform/ContentCard";
import HeroSection from "@/components/Platform/HeroSection";
import { getAllVideoBySubdomain, getBrandBySubdomain } from "@/db/queries";
import React from "react";

async function page({ params }: { params: { domain: string } }) {
  const subdomain = params.domain.split(".")[0];
  const brand = await getBrandBySubdomain(subdomain);
  console.log(subdomain, brand);
  if (!brand) {
    return (
      <div className="flex flex-col gap-1 w-full items-center justify-center">
        <h2 className="text-4xl ">😢 Brand Not Found!</h2>
      </div>
    );
  }

  const contents = await getAllVideoBySubdomain(subdomain);

  return (
    <div className="flex flex-col w-full gap-2 min-h-screen">
      <HeroSection brand={brand} />
      <div className="flex flex-col p-4 gap-3">
        <h3 className="text-3xl font-semibold">Latest Release</h3>
        <div className="flex flex-wrap gap-3">
          {contents.map((content) => {
            return <ContentCard key={content.id} content={content} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default page;
