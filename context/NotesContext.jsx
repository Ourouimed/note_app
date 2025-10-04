"use client";
import { supabase } from "@/lib/supabaseClient";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);
  const { user } = useAuth();

  const getNotes = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id);

    if (error) console.error(error);
    else setNotes(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.id) getNotes();
  }, [user]);

  const addNewNote = async ({note_title , note_content})=>{
    if (!user?.id) return; 
    setIsLoading(true)
    const { data , error }  = await supabase.from('notes').insert([{note_title , note_content , user_id : user.id}])
    if (error){
        setStatus(false)
        setStatusMsg(error.message)
        setIsLoading(false)
        return true
    } 
    else {
        setStatus(true)
        getNotes()
        setIsLoading(false)
        return true
    }
   
  }

  return (
    <NotesContext.Provider value={{ notes, isLoading, getNotes , addNewNote}}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
