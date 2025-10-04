'use client'
import { LoginForm } from "@/components/login-form";
import { AuthProvider } from "@/context/AuthContext";


export default function Login(){
    return <AuthProvider><div className="w-full p-5 min-h-screen flex justify-center items-center">
        <LoginForm/>
    </div></AuthProvider>
}