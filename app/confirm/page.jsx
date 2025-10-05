"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ConfirmEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="w-full p-5 min-h-screen flex justify-center items-center">
      <Card className="flex flex-col gap-6 w-full md:max-w-md text-center p-6">
        <CardHeader>
          <div className="flex justify-center mb-3">
            <Mail className="w-10 h-10 text-blue-500" />
          </div>
          <CardTitle className="text-xl font-semibold">
            Check your email
          </CardTitle>
          <CardDescription className="text-base">
            We’ve sent a confirmation link to{" "}
            <span className="font-medium text-white underline">
              {email || "your email"}
            </span>
            . Please check your inbox and follow the instructions to continue.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button onClick={() => router.push("/login")} className="w-full">
            Back to login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
