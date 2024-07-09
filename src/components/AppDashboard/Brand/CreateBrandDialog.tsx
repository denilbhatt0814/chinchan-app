"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { insertBrandFormSchema } from "@/db/schema";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

function CreateBrandDialog() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof insertBrandFormSchema>>({
    resolver: zodResolver(insertBrandFormSchema),
    defaultValues: {
      name: "",
      subdomain: "",
    },
  });

  const dialogClose = () => {
    document.getElementById("closeDialog")?.click();
  };

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
      dialogClose();
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Brand</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create your Brand</DialogTitle>
          <DialogDescription>
            Start your journey on Chinchan by adding your brand details. Click
            add when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
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
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                <LoaderIcon
                  className={cn("animate-spin", isLoading ? "" : "hidden")}
                />
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBrandDialog;
