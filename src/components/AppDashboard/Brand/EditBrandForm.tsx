"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  insertBrandFormSchema,
  SelectBrand,
  updateBrandFormSchema,
} from "@/db/schema";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { LoaderIcon, UploadIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  CldUploadButton,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

function EditBrandForm({ brand }: { brand: SelectBrand }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [logoResource, setLogoResource] =
    useState<CloudinaryUploadWidgetInfo | null>(null);
  const [bannerResource, setBannerResource] =
    useState<CloudinaryUploadWidgetInfo | null>(null);

  const form = useForm<z.infer<typeof updateBrandFormSchema>>({
    resolver: zodResolver(updateBrandFormSchema),
    defaultValues: brand,
  });

  async function onSubmit(values: z.infer<typeof updateBrandFormSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `/api/brand/${brand.id}`,
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      if (process.env.NODE_ENV != "production") console.log(response.data);
      toast({ title: "✅ Brand updated successfully..!!" });
      setIsLoading(false);
      router.push(`/dashboard/${brand.id}`);
    } catch (error) {
      if (process.env.NODE_ENV != "production") console.log(error);
      setIsLoading(false);
      toast({
        title: "😕 Opps, Something went wrong!",
        variant: "destructive",
      });
    }
  }

  const handleLogoUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as CloudinaryUploadWidgetInfo;
    setLogoResource(info);
    form.setValue("logoUrl", info.secure_url);
    if (process.env.NODE_ENV != "production") {
      console.log(info);
      console.log(form.getValues());
    }
  };
  const handleBannerUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as CloudinaryUploadWidgetInfo;
    setBannerResource(info);
    form.setValue("bannerUrl", info.secure_url);
    if (process.env.NODE_ENV != "production") {
      console.log(info);
      console.log(form.getValues());
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">
          ⚙️ Modify your Brand Details here.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4 items-start">
          <div className="flex flex-col items-start gap-2">
            <FormItem className="w-full">
              <FormLabel className="flex justify-between py-1 items-center">
                <div>Banner</div>
                {(bannerResource || form.getValues().bannerUrl) && (
                  <CldUploadButton
                    uploadPreset="chinchan_brand_assets"
                    onUpload={handleBannerUpload}
                  >
                    <div className="flex items-center p-0 gap-1 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-sm">
                      <p className="text-sm">Change</p>
                      <UploadIcon className="w-4 h-4" />
                    </div>
                  </CldUploadButton>
                )}
              </FormLabel>
              <FormControl>
                <>
                  {/* UPLOAD BOX */}
                  {!(bannerResource || form.getValues().bannerUrl) && (
                    <div className="flex flex-col h-[30vh] light:bg-slate-100 rounded-md w-full gap-2 items-center justify-center border border-dotted border-blue-400">
                      <p className="text-sm font-semibold">
                        🎞️ Select a Banner
                      </p>
                      <Button type="button" variant="outline" asChild>
                        <CldUploadButton
                          uploadPreset="chinchan_brand_assets"
                          onUpload={handleBannerUpload}
                        />
                      </Button>
                    </div>
                  )}
                  {/* BANNER BOX */}
                  {(bannerResource || form.getValues().bannerUrl) && (
                    <div className="">
                      <AspectRatio ratio={3 / 1}>
                        <Image
                          src={form.getValues().bannerUrl!}
                          alt="Banner Image"
                          height={500}
                          width={1500}
                          className="h-full w-full object-cover"
                        />
                      </AspectRatio>
                    </div>
                  )}
                </>
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="w-full">
              <FormLabel className="flex justify-between py-1 items-center">
                <div>Logo</div>
                {(logoResource || form.getValues().logoUrl) && (
                  <CldUploadButton
                    uploadPreset="chinchanuploads"
                    onUpload={handleLogoUpload}
                  >
                    <div className="flex items-center p-0 gap-1 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-sm">
                      <p className="text-sm">Change</p>
                      <UploadIcon className="w-4 h-4" />
                    </div>
                  </CldUploadButton>
                )}
              </FormLabel>
              <FormControl>
                <div className="grid grid-cols-2">
                  {/* UPLOAD BOX */}
                  {!(logoResource || form.getValues().logoUrl) && (
                    <div className="flex flex-col col-span-1 h-[20vh] light-slate-100 rounded-md w-full gap-2 items-center justify-center border border-dotted border-blue-400">
                      <p className="text-sm font-semibold">✨ Select a Logo</p>
                      <Button type="button" variant="outline" asChild>
                        <CldUploadButton
                          uploadPreset="chinchan_brand_assets"
                          onUpload={handleLogoUpload}
                        />
                      </Button>
                    </div>
                  )}
                  {/* LOGO PREVIEW BOX */}
                  {(logoResource || form.getValues().logoUrl) && (
                    <div className="col-span-1 w-[15vh] h-[15vh]">
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src={form.getValues().logoUrl!}
                          alt="Logo Image"
                          width={500}
                          height={500}
                          className="object-cover"
                        />
                      </AspectRatio>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subdomain"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subdomain</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-4 gap-0.5 items-center">
                      <Input
                        placeholder="<subdomain>"
                        className="col-span-3"
                        {...field}
                      />
                      <p>.chinchan.tv</p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 py-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  router.back();
                }}
              >
                Back
              </Button>
              <Button
                type="submit"
                onClick={() => {
                  if (process.env.NODE_ENV != "production")
                    console.log(form.getValues());
                }}
                disabled={isLoading}
              >
                <LoaderIcon
                  className={cn("animate-spin", isLoading ? "" : "hidden")}
                />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default EditBrandForm;
