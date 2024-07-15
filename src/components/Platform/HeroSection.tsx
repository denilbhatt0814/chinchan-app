import { SelectBrand } from "@/db/schema";
import React from "react";

function HeroSection({ brand }: { brand: SelectBrand }) {
  return (
    <div className="relative h-[25vh] w-full overflow-hidden">
      <img
        src={brand.bannerUrl!}
        width={1920}
        height={1080}
        alt="Cover"
        className="h-full w-full object-cover blur-lg"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <img
            src={brand.logoUrl!}
            width={64}
            height={64}
            alt="Logo"
            className="rounded-full bg-white p-1"
          />
          <h1 className="text-4xl font-bold text-white">{brand.name}</h1>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
