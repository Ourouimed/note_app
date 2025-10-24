'use client';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GithubIcon from "./social-icons/github-icon"
import GoogleIcon from "./social-icons/google-icon"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext";
import { UserPlus, AlertCircle } from "lucide-react";

export function RegisterForm({ className, ...props }) {
  const { registerUser, isLoading, status, statusMsg , handleGithubLogin , handleGoogleLogin} = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setFormErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Name is required";

    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Invalid email address";

    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword) errors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    registerUser(formData);
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full md:max-w-md", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-950">
              <UserPlus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Sign up with GitHub or Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          
            <div className="grid gap-6">
              {/* Social buttons */}
              <div className="flex flex-col gap-4">
                <Button type="button" variant="outline" className="w-full" onClick={handleGithubLogin}>
                  <GithubIcon />
                  Sign up with GitHub
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={handleGoogleLogin}>
                  <GoogleIcon />
                  Sign up with Google
                </Button>
              </div>

            
              <div className="relative text-center text-sm after:border-border after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              <form onSubmit={handleSubmit} noValidate>

              {/* Form fields */}
              <div className="grid gap-4">
  

                {/* Name */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="John Doe" 
                    onChange={handleChange}
                    className={formErrors.name ? "border-red-500 focus:border-red-500" : ""}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    onChange={handleChange}
                    className={formErrors.email ? "border-red-500 focus:border-red-500" : ""}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    onChange={handleChange}
                    className={formErrors.password ? "border-red-500 focus:border-red-500" : ""}
                  />
                  {formErrors.password && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {formErrors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="••••••••" 
                    onChange={handleChange}
                    className={formErrors.confirmPassword ? "border-red-500 focus:border-red-500" : ""}
                  />
                  {formErrors.confirmPassword && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {formErrors.confirmPassword}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>

              </form>

              {/* Footer */}
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="./login" className="underline underline-offset-4">
                  Login
                </a>
              </div>

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
        </CardContent>
      </Card>

      <div className="text-muted-foreground text-center text-xs">
        By signing up, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a> and{" "}
        <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
      </div>
    </div>
  );
}
