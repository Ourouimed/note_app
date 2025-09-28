"use client";
import { supabase } from "@/lib/supabaseClient";
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation"; 
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [status, setStatus] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);
  const router = useRouter();

  const registerUser = async ({ name, email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name } 
      }
    });

    if (error) {
      setStatus(false);
      setStatusMsg(error.message);
      console.log(error);
    } else {
      setStatus(true);
      setStatusMsg("User registered successfully!");
      console.log(data);

      // Redirect to login page
      router.push("/login"); 
    }
  };

  const loginUser = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus(false);
      setStatusMsg(error.message);
      console.log(error);
    } else {
        setStatus(true);
        setStatusMsg("Login successfully!");
        console.log(data);
  
        // Redirect to home page
        router.push("/"); 
      }
  }

  


  return (
    <AuthContext.Provider value={{ registerUser , loginUser, status, statusMsg }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
