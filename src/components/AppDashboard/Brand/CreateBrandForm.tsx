"use client";
import React, { useEffect, useState } from "react";
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
import axios, { AxiosError } from "axios";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  Loader2,
  Loader2Icon,
  LoaderIcon,
  UploadIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  CldUploadButton,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useDebounceCallback } from "usehooks-ts";

function CreateBrandForm() {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [logoResource, setLogoResource] =
    useState<CloudinaryUploadWidgetInfo | null>(null);
  const [bannerResource, setBannerResource] =
    useState<CloudinaryUploadWidgetInfo | null>(null);

  const [subdomain, setSubdomain] = useState<string>("");
  const debounceSetSubdomain = useDebounceCallback(setSubdomain, 500);
  const [isCheckingSubdomain, setIsCheckingSubdomain] =
    useState<boolean>(false);
  const [subdomainMessage, setSubdomainMessage] = useState<{
    status: "ERROR" | "SUCCESS" | "NA";
    message: string;
  }>({ status: "NA", message: "" });

  const form = useForm<z.infer<typeof insertBrandFormSchema>>({
    resolver: zodResolver(insertBrandFormSchema),
    defaultValues: {
      name: "",
      subdomain: "",
      logoUrl: "",
      bannerUrl: "",
    },
  });

  async function checkSubdomainUnique() {
    if (subdomain) {
      setIsCheckingSubdomain(true);
      setSubdomainMessage({ status: "NA", message: "" });

      try {
        const response = await axios.get(
          `/api/brand/check-subdomain-unique?subdomain=${subdomain}`
        );
        setSubdomainMessage({
          status: "SUCCESS",
          message: response.data.message,
        });
      } catch (error) {
        const axiosError = error as AxiosError<{
          message: string;
        }>;
        setSubdomainMessage({
          status: "ERROR",
          message:
            axiosError.response?.data.message ?? "Error checking subdomain",
        });
      } finally {
        setIsCheckingSubdomain(false);
      }
    } else {
      setSubdomainMessage({
        status: "NA",
        message: "",
      });
    }
  }

  useEffect(() => {
    checkSubdomainUnique();
  }, [subdomain]);

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
                    onChange={(e) => {
                      field.onChange(e);
                      debounceSetSubdomain(e.target.value);
                    }}
                  />
                  <p>.chinchan.tv</p>
                </div>
              </FormControl>
              <FormMessage>
                {isCheckingSubdomain && (
                  <div className="flex gap-1 items-center text-muted-foreground text-sm">
                    <Loader2Icon className="animate-spin w-4 h-4" />
                    <span>Checking if your subdomain is available...</span>
                  </div>
                )}
                {subdomainMessage.status == "ERROR" && (
                  <div className="flex gap-1 items-center text-sm">
                    <CircleAlertIcon className="w-4 h-4" />
                    <span>{subdomainMessage.message}</span>
                  </div>
                )}
                {subdomainMessage.status == "SUCCESS" && (
                  <div className="flex gap-1 items-center text-sm text-green-500">
                    <CircleCheckIcon className="w-4 h-4" />
                    <span>{subdomainMessage.message}</span>
                  </div>
                )}
              </FormMessage>
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
        <div className="py-2">
          <Button
            type="submit"
            disabled={isLoading || subdomainMessage.status == "ERROR"}
          >
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
