import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePopup } from "@/context/popupContext";
import { useState } from "react";
import { Save } from "lucide-react";
import { useNotes } from "@/context/NotesContext";

export default function NoteForm({ note }) {
  const { addNewNote, updateNote, isLoading, status, statusMsg } = useNotes();
  const { closePopup } = usePopup();

  const [noteForm, setNoteForm] = useState({
    note_title: note?.title || "",
    note_content: note?.content || "",
  });

  const handleChange = (e) => {
    setNoteForm({ ...noteForm, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    if (isLoading) return;

    let res;
    if (note?.id) {
      const { success } = await updateNote(note.id, noteForm);
      res = success;
    } else {
      const { success } = await addNewNote(noteForm);
      res = success;
    }

    if (res) {
      setNoteForm({ note_title: "", note_content: "" });
      closePopup();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="note_title">Note title</Label>
        <Input
          id="note_title"
          type="text"
          placeholder="Note title here"
          onChange={handleChange}
          value={noteForm.note_title}
          autoFocus
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="note_content">Note Content</Label>
        <Textarea
          id="note_content"
          placeholder="Note content here"
          onChange={handleChange}
          value={noteForm.note_content}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={closePopup}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          <Save className="mr-2" />
          {isLoading
            ? note?.id
              ? "Updating note..."
              : "Saving note..."
            : note?.id
            ? "Update note"
            : "Save note"}
        </Button>
      </div>

      {status === false && (
        <p className="bg-red-100 text-red-700 font-medium text-sm p-3 rounded-md border border-red-400 text-center">
          {statusMsg}
        </p>
      )}
    </div>
  );
}
