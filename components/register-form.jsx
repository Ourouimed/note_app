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

export function RegisterForm({ className, ...props }) {
  const { registerUser, isLoading, status, statusMsg } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
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

    if (!formData.username.trim()) errors.username = "Username is required";
    else if (formData.username.length < 3) errors.username = "Username must be at least 3 characters";

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
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Sign up with GitHub or Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6">
              {/* Social buttons */}
              <div className="flex flex-col gap-4">
                <Button type="button" variant="outline" className="w-full">
                  <GithubIcon />
                  Sign up with GitHub
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  <GoogleIcon />
                  Sign up with Google
                </Button>
              </div>

              {/* Divider */}
              <div className="relative text-center text-sm after:border-border after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              {/* Form fields */}
              <div className="grid gap-4">
                {/* Username */}
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" type="text" placeholder="johndoe123" onChange={handleChange} />
                  {formErrors.username && <p className="text-red-500 text-sm">{formErrors.username}</p>}
                </div>

                {/* Name */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" onChange={handleChange} />
                  {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" onChange={handleChange} />
                  {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                </div>

                {/* Password */}
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" onChange={handleChange} />
                  {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" onChange={handleChange} />
                  {formErrors.confirmPassword && <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>

              {/* Footer */}
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="./login" className="underline underline-offset-4">
                  Login
                </a>
              </div>

              {/* Error status message */}
              {status === false && (
                <p className="bg-red-100 text-red-700 font-medium text-sm p-3 rounded-md border border-red-400 text-center">
                  {statusMsg}
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-muted-foreground text-center text-xs">
        By signing up, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a> and{" "}
        <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
      </div>
    </div>
  );
}
