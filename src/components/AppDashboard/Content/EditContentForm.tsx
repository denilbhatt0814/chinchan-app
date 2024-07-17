"use client";
import React, { useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  insertVideoFormSchema,
  SelectVideo,
  updateVideoFormSchema,
} from "@/db/schema";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { LoaderIcon, PencilIcon, UploadIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  CldUploadButton,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Player from "next-video/player";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

function EditContentForm({ content }: { content: SelectVideo }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadVideoResource, setUploadVideoResource] =
    useState<CloudinaryUploadWidgetInfo | null>(null);
  const [uploadThumbnailResource, setUploadThumbnailResource] =
    useState<CloudinaryUploadWidgetInfo | null>(null);

  const form = useForm<z.infer<typeof updateVideoFormSchema>>({
    resolver: zodResolver(updateVideoFormSchema),
    defaultValues: content,
  });

  async function onSubmit(values: z.infer<typeof updateVideoFormSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `/api/video-content/${content.id}`,
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      toast({ title: "✅ Content updated successfully..!!" });
      setIsLoading(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast({
        title: "😕 Opps, Something went wrong!",
        variant: "destructive",
      });
    }
  }

  const handleVideoUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as CloudinaryUploadWidgetInfo;
    setUploadVideoResource(info);
    form.setValue("mediaUrl", info.secure_url);

    if (!form.getValues().thumbnailUrl) {
      form.setValue("thumbnailUrl", info.thumbnail_url);
    }

    console.log(info);
    console.log(form.getValues());
  };

  const handleThumbnailUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as CloudinaryUploadWidgetInfo;
    setUploadThumbnailResource(info);
    form.setValue("thumbnailUrl", info.secure_url);
    console.log(info);
    console.log(form.getValues());
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Edit Content</h1>
        <p className="text-muted-foreground">
          👀 Hmmm, Seems we&apos;re modifying something!
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-4 items-start">
          <div className="flex flex-col items-start gap-2">
            {/* CONTENT UPLOAD */}
            <FormItem className="w-full">
              <FormLabel className="flex justify-between py-1 items-center">
                <div>Content Upload</div>
                {(uploadVideoResource || form.getValues().mediaUrl) && (
                  <CldUploadButton
                    uploadPreset="chinchanuploads"
                    onUpload={handleVideoUpload}
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
                  {!(uploadVideoResource || form.getValues().mediaUrl) && (
                    <div className="flex flex-col h-[30vh] light:bg-slate-100 rounded-md w-full gap-2 items-center justify-center border border-dotted border-blue-400">
                      <p className="text-sm font-semibold">
                        🎞️ Select a Media File
                      </p>
                      <Button type="button" variant="outline" asChild>
                        <CldUploadButton
                          uploadPreset="chinchanuploads"
                          onUpload={handleVideoUpload}
                        />
                      </Button>
                    </div>
                  )}
                  {/* VIDEO BOX */}
                  {(uploadVideoResource || form.getValues().mediaUrl) && (
                    <div>
                      <AspectRatio ratio={16 / 9}>
                        <Player
                          src={form.getValues().mediaUrl}
                          className="h-full w-full object-cover"
                        ></Player>
                      </AspectRatio>
                    </div>
                  )}
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
            {/* THUMBNAIL UPLOAD */}
            <FormItem className="w-full">
              <FormLabel className="flex justify-between py-1 items-center">
                <div>Thumbnail Upload</div>
                {(uploadThumbnailResource || form.getValues().thumbnailUrl) && (
                  <CldUploadButton
                    uploadPreset="chinchanuploads"
                    onUpload={handleThumbnailUpload}
                  >
                    <div className="flex items-center p-0 gap-1 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-sm">
                      <p className="text-sm">Change</p>
                      <UploadIcon className="w-4 h-4" />
                    </div>
                  </CldUploadButton>
                )}
              </FormLabel>
              <FormControl>
                <div className="grid grid-cols-4">
                  {/* UPLOAD BOX */}
                  {!(
                    uploadThumbnailResource || form.getValues().thumbnailUrl
                  ) && (
                    <div className="flex flex-col col-span-2 h-[20vh] light-slate-100 rounded-md w-full gap-2 items-center justify-center border border-dotted border-blue-400">
                      <p className="text-sm font-semibold">
                        ✨ Select a Thumbnail
                      </p>
                      <Button type="button" variant="outline" asChild>
                        <CldUploadButton
                          uploadPreset="chinchanuploads"
                          onUpload={handleThumbnailUpload}
                        />
                      </Button>
                    </div>
                  )}
                  {/* THUMBNAIL PREVIEW BOX */}
                  {(uploadThumbnailResource ||
                    form.getValues().thumbnailUrl) && (
                    <div className="col-span-2 h-[20vh]">
                      <AspectRatio ratio={16 / 9}>
                        <Image
                          src={form.getValues().thumbnailUrl}
                          alt="Thumbnail Image"
                          className="h-full w-full object-cover"
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
            {/* MAIN FORM */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: 'Kaashi Vlog (Part 2)' "
                      {...field}
                    />
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

export default EditContentForm;
