"use client";
import Header from "@/components/Header";
import NotesContainer from "@/components/NotesContainer";
import { Popup } from "@/components/Popup";
import { AuthProvider } from "@/context/AuthContext";
import { PopupProvider } from "@/context/popupContext";

export default function Home() {
  return <>
  <AuthProvider>
    <PopupProvider>
        <Header/>
        <NotesContainer/>
        <Popup/>
    </PopupProvider>
  </AuthProvider>
    
  </>
}
