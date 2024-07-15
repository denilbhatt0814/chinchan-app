"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";

const signInSchema = z.object({
  email: z.string().email("Email is invalid"),
  password: z.string().min(8, "Password must be atleast 8 characters long"),
});

function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    setIsLoading(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (result?.error) {
      if (result.error == "CredentialsSignIn") {
        toast({
          title: "Login Failed!",
          description: "Incorrect email or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    }
    console.log("RESULT:", result);
    if (result?.url) {
      router.replace("/dashboard");
    }
    setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-center m-3">
      <Card className="w-[350px]">
        <Form {...form}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Login to get started with chinchan
            </CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        required
                        placeholder="john@mail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        required
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-around">
              <Button type="submit" disabled={isLoading}>
                <div className="flex gap-1">
                  {isLoading && <LoaderCircleIcon className="animate-spin" />}
                  <div>Login</div>
                </div>
              </Button>
              <Button
                type="button"
                disabled={isLoading}
                onClick={() => {
                  signIn("google");
                }}
              >
                <div className="flex gap-1">
                  {isLoading && <LoaderCircleIcon className="animate-spin" />}
                  <div>Google</div>
                </div>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default SignInForm;
