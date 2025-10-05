"use client";

import { useState, useEffect, Suspense } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft, RefreshCw, CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function ConfirmEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResendEmail = async () => {
    if (!canResend) return;
    
    // Simulate resending email
    setCanResend(false);
    setTimeLeft(60);
    
    
    
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="w-full p-5 min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-6 w-full md:max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 rounded-full bg-green-50 dark:bg-green-950">
                <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-xl">Check your email</CardTitle>
            <CardDescription>
              We've sent a confirmation link to{" "}
              <span className="font-semibold text-foreground">
                {email || "your email"}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium">Email sent successfully</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Please check your inbox and click the confirmation link to activate your account.
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Didn't receive the email?
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleResendEmail}
                    disabled={!canResend}
                  >
                    {canResend ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Resend confirmation email
                      </>
                    ) : (
                      `Resend in ${timeLeft}s`
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Check your spam folder or try a different email address.
                  </p>
                </div>

                <Button 
                  onClick={handleBackToLogin}
                  className="w-full"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to login
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-muted-foreground text-center text-xs">
          Having trouble?{" "}
          <a 
            href="/contact" 
            className="underline hover:text-primary underline-offset-4"
          >
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmEmail() {
  return (
    <Suspense fallback={
      <div className="w-full p-5 min-h-screen flex justify-center items-center">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    }>
      <ConfirmEmailContent />
    </Suspense>
  );
}
