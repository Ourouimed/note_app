'use client'

import ForgotPasswordForm from "@/components/forgotPassForm"
import { AuthProvider } from "@/context/AuthContext"

export default function ForgotPassword() {
    return <AuthProvider>
        <div className="w-full p-5 min-h-screen flex justify-center items-center">
            <ForgotPasswordForm/>
        </div>
    </AuthProvider>
}