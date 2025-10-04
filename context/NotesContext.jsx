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

  // Fetch all notes for the logged-in user
  const getNotes = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setStatus(false);
      setStatusMsg(error.message);
    } else {
      setNotes(data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.id) getNotes();
  }, [user]);

  // Add new note
  const addNewNote = async ({ note_title, note_content }) => {
    if (!user?.id) return { success: false, message: "User not logged in" };

    setIsLoading(true);
    const { error } = await supabase
      .from("notes")
      .insert([{ note_title, note_content, user_id: user.id }]);
    setIsLoading(false);

    if (error) {
      setStatus(false);
      setStatusMsg(error.message);
      return { success: false, message: error.message };
    }

    setStatus(true);
    await getNotes();
    return { success: true };
  };

  //  Delete note
  const deleteNote = async (note_id) => {
    if (!user?.id) return { success: false, message: "User not logged in" };

    setIsLoading(true);
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", note_id);
    setIsLoading(false);

    if (error) {
      setStatus(false);
      setStatusMsg(error.message);
      return { success: false, message: error.message };
    }

    setStatus(true);
    await getNotes();
    return { success: true };
  };

  // update note 
  const updateNote = async (note_id , {note_title, note_content }) => {
    if (!user?.id) return { success: false, message: "User not logged in" };

    setIsLoading(true);
    const { error } = await supabase
      .from("notes")
      .update([{ note_title, note_content, user_id: user.id }])
      .eq('id' , note_id)
    setIsLoading(false);

    if (error) {
      setStatus(false);
      setStatusMsg(error.message);
      return { success: false, message: error.message };
    }

    setStatus(true);
    await getNotes();
    return { success: true };
  };

  // Auto clear status messages
  useEffect(() => {
    if (statusMsg) {
      const timer = setTimeout(() => setStatusMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMsg]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        isLoading,
        status,
        statusMsg,
        getNotes,
        addNewNote,
        deleteNote,
        updateNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
