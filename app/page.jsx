"use client";
import Header from "@/components/Header";
import NotesContainer from "@/components/NotesContainer";
import { Popup } from "@/components/Popup";
import { PopupProvider } from "@/context/popupContext";

export default function Home() {
  return <>
    <PopupProvider>
        <Header/>
        <NotesContainer/>
        <Popup/>
    </PopupProvider>
    
  </>
}
