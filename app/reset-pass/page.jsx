'use client'

import ResetPasswordForm from "@/components/resetPasswordForm"
import { AuthProvider } from "@/context/AuthContext"

export default function ResetPass() {
    return (
        <AuthProvider>
            <div className="w-full p-5 min-h-screen flex justify-center items-center">
                <ResetPasswordForm/>
            </div>
        </AuthProvider>
    )
}