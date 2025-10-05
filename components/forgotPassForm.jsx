"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft, CheckCircle, RefreshCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const router = useRouter();
  const { resetPass, isLoading, status, statusMsg } = useAuth();

  // Handle success state when reset email is sent
  useEffect(() => {
    if (status === true && statusMsg === "Reset Link Sent Succefully") {
      setIsSubmitted(true);
    }
  }, [status, statusMsg]);

  // Countdown timer for resend functionality
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setFormErrors((prev) => ({
      ...prev,
      [e.target.name]: ""
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Invalid email address";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      await resetPass(email);
      setCanResend(false);
      setTimeLeft(60);
    } catch (error) {
      console.error("Error sending reset email:", error);
    }
  };

  const handleResendEmail = async () => {
    if (!canResend || !email) return;
    
    try {
      await resetPass(email);
      setCanResend(false);
      setTimeLeft(60);
    } catch (error) {
      console.error("Error resending reset email:", error);
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  const handleTryAnotherEmail = () => {
    setIsSubmitted(false);
    setEmail("");
    setFormErrors({});
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col gap-6 w-full md:max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 rounded-full bg-green-50 dark:bg-green-950">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-xl">Check your email</CardTitle>
            <CardDescription>
              We've sent a password reset link to{" "}
              <span className="font-semibold text-foreground">
                {email}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium">Reset link sent successfully</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Please check your inbox and click the reset link to change your password.
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
                        Resend reset link
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
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={handleTryAnotherEmail}
                >
                  Try another email
                </Button>

                <Button 
                  type="button" 
                  className="w-full"
                  onClick={handleBackToLogin}
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
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full md:max-w-md">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-950">
              <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <CardTitle className="text-xl">Forgot your password?</CardTitle>
          <CardDescription>
            No worries! Enter your email address and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email" 
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleChange}
                  className={formErrors.email ? "border-red-500 focus:border-red-500" : ""}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm">{formErrors.email}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending reset link...
                  </>
                ) : (
                  "Send reset link"
                )}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={handleBackToLogin}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to login
              </Button>

              {/* Status message */}
              {status !== null && (
                <div className={`${
                  status 
                    ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800" 
                    : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800"
                } font-medium text-sm p-3 rounded-md border text-center`}>
                  {statusMsg}
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-muted-foreground text-center text-xs">
        Remember your password?{" "}
        <a 
          href="/login" 
          className="underline hover:text-primary underline-offset-4"
        >
          Sign in
        </a>
      </div>
    </div>
  );
}
