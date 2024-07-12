import { HomeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import BrandSelectOnNav from "./BrandSelectOnNav";
import { cookies } from "next/headers";
import { getAllBrandsByCreatorId, getCreatorByUserId } from "@/db/queries";
import ContentButtonSidenav from "./ContentButtonSidenav";
import SettingButtonSidenav from "./SettingButtonSidenav";

async function BrandDashboardSideNav() {
  const userId = cookies().get("userId")?.value;
  const creator = await getCreatorByUserId(parseInt(userId!));
  // get all brands registered under creator
  const brands = await getAllBrandsByCreatorId(creator?.id!);

  return (
    <div className="w-[20%] flex flex-col gap-2 shadow-md p-4 border border-r-1 border-y-0">
      <BrandSelectOnNav brands={brands} />
      <div>
        <ul className="texl-lg grid items-start gap-2">
          <li className=" hover:shadow-md rounded-md py-2 px-3 dark:hover:bg-slate-900 transition duration-300">
            <Link href={`/dashboard`} className="flex gap-2 items-center">
              <HomeIcon className="h-4 w-4" /> <span>Home</span>
            </Link>
          </li>
          <li className=" hover:shadow-md rounded-md py-2 px-3 dark:hover:bg-slate-900 transition duration-300">
            <ContentButtonSidenav />
          </li>
          <li className=" hover:shadow-md rounded-md py-2 px-3 dark:hover:bg-slate-900 transition duration-300">
            <SettingButtonSidenav />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BrandDashboardSideNav;
