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
import { useAuth } from "@/context/AuthContext"
import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogIn, AlertCircle } from "lucide-react";

export function LoginForm({
  className,
  ...props
}) {
  const { loginUser, isLoading, status, statusMsg , handleGithubLogin} = useAuth()
  const [loginForm , setLoginForm ] = useState({
    email : '' , 
    password : ''
  })

  const [formErrors, setFormErrors] = useState({});
  const { user } = useAuth()
  const router = useRouter()

  const handleChange = (e)=>{
      setLoginForm({
          ...loginForm , 
          [e.target.id] : e.target.value
      })
      setFormErrors((prev)=>({
        ...prev,
        [e.target.id] : ""
      }))
  }
  
  const validateForm = ()=>{
    const errors = {};
    
    if(!loginForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(loginForm.email)) {
      errors.email = "Invalid email address";
    }
    
    if(!loginForm.password.trim()) {
      errors.password = "Password is required";
    } else if (loginForm.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    if (!validateForm()) return;
    loginUser(loginForm)
   }

   useEffect(() => {
     if (user) router.push("/");
   }, [user, router]);
   
  return (
    <div className={cn("flex flex-col gap-6 w-full md:max-w-md", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-950">
              <LogIn className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Github or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" onClick={handleGithubLogin}>
                  <GithubIcon/>
                  Login with Github
                </Button>
                <Button variant="outline" className="w-full">
                  <GoogleIcon/>
                  Login with Google
                </Button>
              </div>
              <div
                className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    value={loginForm.email}
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
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="./forgot-pass" className="ml-auto text-sm underline-offset-4 hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={loginForm.password}
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
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </div>

              </form>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="./register" className="underline underline-offset-4">
                  Sign up
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
      <div
        className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
