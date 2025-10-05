'use client'

import { Suspense } from "react"
import ResetPasswordForm from "@/components/resetPasswordForm"
import { AuthProvider } from "@/context/AuthContext"

function ResetPasswordFormWrapper() {
    return (
        <AuthProvider>
            <div className="w-full p-5 min-h-screen flex justify-center items-center">
                <ResetPasswordForm/>
            </div>
        </AuthProvider>
    )
}

export default function ResetPass() {
    return (
        <Suspense fallback={
            <div className="w-full p-5 min-h-screen flex justify-center items-center">
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            </div>
        }>
            <ResetPasswordFormWrapper />
        </Suspense>
    )
}