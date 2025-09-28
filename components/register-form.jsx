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

export function RegisterForm({
  className,
  ...props
}) {
    const { registerUser } = useAuth()
    const [registerForm , setRegisterForm] = useState({
        name :  '' , 
        password : '', 
        confirmPassword : '',
        email : '',
    })



    const handleChange = (e)=>{
        setRegisterForm({
            ...registerForm , 
            [e.target.id] : e.target.value
        })
    }

    
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
          <form onSubmit={(e)=>{
            e.preventDefault()
            registerUser(registerForm)
          }}>
            <div className="grid gap-6">
              {/* Social buttons */}
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                <GithubIcon/>
                  Sign up with GitHub
                </Button>
                <Button variant="outline" className="w-full">
                  <GoogleIcon/>
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
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" required onChange={handleChange} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required onChange={handleChange} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required onChange={handleChange} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" required onChange={handleChange} />
                </div>
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>

              {/* Footer */}
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="./login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs *:[a]:underline *:[a]:underline-offset-4">
        By signing up, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
