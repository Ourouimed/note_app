import NoteCard from "./NoteCard";

export default function NotesContainer() {
  return <div className="px-10 py-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <NoteCard title="My first note" content="This is my first note" date="20-09-2025" /> 
    <NoteCard title="My first note" content="This is my first note" date="20-09-2025" /> 
    <NoteCard title="My first note" content="This is my first note" date="20-09-2025" />  
  </div>;
}