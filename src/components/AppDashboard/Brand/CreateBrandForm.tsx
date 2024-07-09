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
import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  CldUploadButton,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

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
        <div className="flex flex-col items-start gap-2">
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
        </div>

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
