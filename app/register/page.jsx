import { RegisterForm } from "@/components/register-form";
import { AuthProvider } from "@/context/AuthContext";

export default function Register(){
    return <AuthProvider><div className="w-full p-5 min-h-screen flex justify-center items-center">
        <RegisterForm/>
    </div>
    </AuthProvider>
}