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
import { insertBrandFormSchema } from "@/db/schema";
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

function CreateBrandForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [logoResource, setLogoResource] =
    useState<CloudinaryUploadWidgetInfo | null>(null);
  const [bannerResource, setBannerResource] =
    useState<CloudinaryUploadWidgetInfo | null>(null);

  const form = useForm<z.infer<typeof insertBrandFormSchema>>({
    resolver: zodResolver(insertBrandFormSchema),
    defaultValues: {
      name: "",
      subdomain: "",
      logoUrl: "",
      bannerUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof insertBrandFormSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "/api/brand",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      toast({ title: "🥳 New brand created successfully..!!" });
      setIsLoading(false);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
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
    console.log(info);
    console.log(form.getValues());
  };
  const handleBannerUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as CloudinaryUploadWidgetInfo;
    setBannerResource(info);
    form.setValue("bannerUrl", info.secure_url);
    console.log(info);
    console.log(form.getValues());
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Create your Brand</h1>
        <p className="text-muted-foreground">
          🚀 Start your journey on chinchan by adding your brand details.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <FormItem className="w-full">
          <FormLabel className="flex justify-between py-1 items-center">
            <div>Banner</div>
            {(bannerResource || form.getValues().bannerUrl) && (
              <CldUploadButton
                uploadPreset="chinchan_brand_assets"
                onUpload={handleBannerUpload}
                children={
                  <div className="flex items-center p-0 gap-1 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-sm">
                    <p className="text-sm">Change</p>
                    <UploadIcon className="w-4 h-4" />
                  </div>
                }
              />
            )}
          </FormLabel>
          <FormControl>
            <>
              {/* UPLOAD BOX */}
              {!(bannerResource || form.getValues().bannerUrl) && (
                <div className="flex flex-col h-[30vh] light:bg-slate-100 rounded-md w-full gap-2 items-center justify-center border border-dotted border-blue-400">
                  <p className="text-sm font-semibold">🎞️ Select a Banner</p>
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
                    <img
                      src={form.getValues().bannerUrl!}
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
                children={
                  <div className="flex items-center p-0 gap-1 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-sm">
                    <p className="text-sm">Change</p>
                    <UploadIcon className="w-4 h-4" />
                  </div>
                }
              />
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
                    <img
                      src={form.getValues().logoUrl!}
                      className="object-cover"
                    />
                  </AspectRatio>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* <div className="flex flex-col items-start gap-2">
          <FormLabel>Upload Logo</FormLabel>
          <FormControl>
            <div className="flex gap-2 items-center">
              <Button type="button" variant="outline" asChild>
                <CldUploadButton
                  uploadPreset="chinchan_brand_assets"
                  onUpload={(result: CloudinaryUploadWidgetResults) => {
                    const info = result.info as CloudinaryUploadWidgetInfo;
                    setLogoResource(info);
                    form.setValue("logoUrl", info.secure_url);
                    console.log(info);
                    console.log(form.getValues());
                  }}
                />
              </Button>
              {logoResource && (
                <div className="flex flex-col ">
                  <p className="text-sm font-light">File Name:</p>
                  <p className="text-sm font-light">
                    {logoResource.original_filename + "." + logoResource.format}
                  </p>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </div>
        <div className="flex flex-col items-start gap-2">
          <FormLabel>Upload Banner</FormLabel>
          <FormControl>
            <div className="flex gap-2 items-center">
              <Button type="button" variant="outline" asChild>
                <CldUploadButton
                  uploadPreset="chinchan_brand_assets"
                  onUpload={(result: CloudinaryUploadWidgetResults) => {
                    const info = result.info as CloudinaryUploadWidgetInfo;
                    setBannerResource(info);
                    form.setValue("bannerUrl", info.secure_url);
                    console.log(info);
                    console.log(form.getValues());
                  }}
                />
              </Button>
              {bannerResource && (
                <div className="flex flex-col ">
                  <p className="text-sm font-light">File Name:</p>
                  <p className="text-sm font-light">
                    {bannerResource.original_filename +
                      "." +
                      bannerResource.format}
                  </p>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </div> */}

        <div className="py-2">
          <Button type="submit" disabled={isLoading}>
            <LoaderIcon
              className={cn("animate-spin", isLoading ? "" : "hidden")}
            />
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateBrandForm;
