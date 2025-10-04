import NoteCard from "./NoteCard";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNotes } from "@/context/NotesContext";

export default function NotesContainer() {
  const { user } = useAuth();
  const { notes, isLoading, getNotes } = useNotes();

  

  useEffect(() => {
    getNotes();
  }, []);

  if (!user) {
    return (
      <div className="px-10 py-4 flex justify-center items-center">
        <div className="text-lg text-gray-500">Please log in to view your notes</div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="px-10 py-4 flex justify-center items-center">
        <div className="text-lg text-gray-500">No notes found. Create your first note!</div>
      </div>
    );
  }

  return (
    <div className="px-10 py-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notes.map((note) => (
        <NoteCard 
          key={note.id} 
          id={note.id}
          title={note.note_title} 
          content={note.note_content} 
          date={note.created_at}
        />
      ))}
    </div>
  );
}