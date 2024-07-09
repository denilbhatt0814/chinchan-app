"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { insertVideoFormSchema } from "@/db/schema";
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

function AddContentForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadVideoResource, setUploadVideoResource] =
    useState<CloudinaryUploadWidgetInfo | null>(null);

  const form = useForm<z.infer<typeof insertVideoFormSchema>>({
    resolver: zodResolver(insertVideoFormSchema),
    defaultValues: {
      title: "",
      description: "",
      mediaUrl: "",
      thumbnailUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof insertVideoFormSchema>) {
    setIsLoading(true);
    console.log(values);
    try {
      const response = await axios.post(
        "/api/video-content",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      toast({ title: "🤘 New content added successfully..!!" });
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
        <h1 className="text-2xl font-semibold">Add Content</h1>
        <p className="text-muted-foreground">
          😄 We are excited to roll out your new content on chinchan.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="ex: 'Kaashi Vlog (Part 2)' " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Add a short description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-start gap-2">
          <FormLabel>Content Upload</FormLabel>
          <FormControl>
            <div className="flex gap-2 items-center">
              <Button type="button" variant="outline" asChild>
                <CldUploadButton
                  uploadPreset="chinchanuploads"
                  onUpload={(result: CloudinaryUploadWidgetResults) => {
                    const info = result.info as CloudinaryUploadWidgetInfo;
                    setUploadVideoResource(info);
                    form.setValue("mediaUrl", info.secure_url);
                    form.setValue("thumbnailUrl", info.thumbnail_url);
                    console.log(info);
                    console.log(form.getValues());
                  }}
                />
              </Button>
              {uploadVideoResource && (
                <div className="flex flex-col ">
                  <p className="text-sm font-light">File Name:</p>
                  <p className="text-sm font-light">
                    {uploadVideoResource.original_filename +
                      "." +
                      uploadVideoResource.format}
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
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AddContentForm;
