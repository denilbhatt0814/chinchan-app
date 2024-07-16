import BrandListSection from "@/components/AppDashboard/Brand/BrandListSection";
import ContentListSection from "@/components/AppDashboard/Content/ContentListSection";
import CreateBrandDialog from "@/components/AppDashboard/Brand/CreateBrandDialog";
import CreateBrandSection from "@/components/AppDashboard/Brand/CreateBrandSection";
import { Separator } from "@/components/ui/separator";
import {
  getAllBrandsByCreatorId,
  getAllBrandsByCreatorIdResponseSchema,
  getCreatorByUserId,
} from "@/db/queries";
import { cookies } from "next/headers";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession, User } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

async function page() {
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  const userId = user.id;
  const creatorId = user.creatorId;
  if (!creatorId) {
    redirect("/sign-in");
  }

  const creator = await getCreatorByUserId(parseInt(user.creatorId!));
  // get all brands registered under creator
  const brands = await getAllBrandsByCreatorId(creator?.id!);
  // const brands = [
  //   // {
  //   //   id: 4,
  //   //   name: "mybrand",
  //   //   subdomain: "mybrand",
  //   //   logoUrl: null,
  //   //   bannerUrl: null,
  //   //   creatorId: 1,
  //   // },
  // ] as getAllBrandsByCreatorIdResponseSchema;
  console.log(brands);

  return (
    <div className="flex flex-col w-full p-4 gap-2 min-h-screen">
      <div className="text-2xl font-semibold px-4">👋 Hi {user.name}!</div>

      <div className="flex-grow w-full flex flex-col gap-2">
        {brands.length === 0 ? (
          <CreateBrandSection />
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <BrandListSection brands={brands} />
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
