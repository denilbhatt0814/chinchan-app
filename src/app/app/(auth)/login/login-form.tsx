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

import { login } from "./actions";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    await login({ email });
    setIsLoading(false);
    router.push("/dashboard");
    return;
  };

  return (
    <div className="flex items-center justify-center m-3">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to get started with chinchan</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="john@mail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-around">
            <Button type="submit" disabled={isLoading}>
              <div className="flex gap-1">
                {isLoading && <LoaderCircleIcon className="animate-spin" />}
                <div>Login</div>
              </div>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default LoginForm;
