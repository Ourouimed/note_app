import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Trash2, Edit } from "lucide-react";
import { usePopup } from "@/context/popupContext";
import NoteForm from "./popupForms/noteForm";
import { useNotes } from "@/context/NotesContext";
import { useState } from "react";

export default function NoteCard({ id, title, content, created_at }) {
  const { openPopup } = usePopup();
  const { deleteNote, isLoading } = useNotes();
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    setIsDeleting(true);
    await deleteNote(id);
    setIsDeleting(false);
  };

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription className="break-words line-clamp-3">
          {content}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex justify-between gap-2">
        <span className="text-gray-400 text-sm">{formatDate(created_at)}</span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => openPopup("Edit note", <NoteForm note={{ id, title, content, created_at }}/>)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting || isLoading}
          >
            {isDeleting ? "..." : <Trash2 className="w-4 h-4" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
