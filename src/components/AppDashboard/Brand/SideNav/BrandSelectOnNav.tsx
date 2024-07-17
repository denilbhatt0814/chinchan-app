"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectBrand } from "@/db/schema";
import { getAllBrandsByCreatorIdResponseSchema } from "@/db/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export function BrandSelectOnNav({
  brands,
}: {
  brands: getAllBrandsByCreatorIdResponseSchema;
}) {
  const router = useRouter();
  const brandId = localStorage.getItem("brandId");
  return (
    <Select
      value={brandId!}
      onValueChange={(value: string) => {
        console.log(value);
        localStorage.setItem("brandId", value);
        router.push(`/dashboard/${value}`);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a Brand" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Your Brands</SelectLabel>
          {brands.map((brand, index) => (
            <SelectItem value={brand.id.toString()} key={index}>
              <div className="flex items-center gap-2">
                <Avatar className="w-4 h-4">
                  <AvatarImage src={brand.logoUrl!} />
                  <AvatarFallback>
                    {brand.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{brand.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default BrandSelectOnNav;
