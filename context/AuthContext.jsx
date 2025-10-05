"use client";
import { supabase } from "@/lib/supabaseClient";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Register
  const registerUser = async ({ name, email, password , username }) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name , username},
      },
    });

    if (error) {
      setStatus(false);
      setStatusMsg(error.message);
    } else {
      setStatus(true);
      setStatusMsg("User registered successfully!");
      router.push(`/confirm?email=${encodeURIComponent(email)}`);
    }
    setIsLoading(false);
  };

  // Login
  const loginUser = async ({ email, password }) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus(false);
      setStatusMsg(error.message);
    } else {
      setStatus(true);
      setStatusMsg("Login successfully!");
      setUser(data.user); 
      router.push("/");
    }
    setIsLoading(false);
  };

  // Logout
  const logoutUser = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  };


  const resetPass = async (email)=>{
    setIsLoading(true);
    const {data , error } = await supabase.auth.resetPasswordForEmail(email , {
        redirectTo: `${window.location.origin}/reset-pass`,
    })
    if (error) {
      setStatus(false);
      setStatusMsg(error.message);
    } else {
      setStatus(true);
      setStatusMsg("Reset Link Sent Succefully");
    }
    setIsLoading(false);
  }

  // Update password
  const updatePassword = async (newPassword) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      setStatus(false);
      setStatusMsg(error.message);
    } else {
      setStatus(true);
      setStatusMsg("Password updated successfully!");
    }
    setIsLoading(false);
  };
  // On mount, get user + listen for changes
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };
    getUser();
  
    // listen for login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
  
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  


  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        resetPass,
        updatePassword,
        registerUser,
        loginUser,
        logoutUser,
        status,
        statusMsg,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
