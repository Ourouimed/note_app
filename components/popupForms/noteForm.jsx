import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePopup } from "@/context/popupContext";
import { useState } from "react";
import { Save } from "lucide-react";
import { useNotes } from "@/context/NotesContext";
export default function NoteForm (){
    const { addNewNote , isLoading ,  status , statusMsg} = useNotes()
    const { closePopup } = usePopup()
    const [noteForm , setNoteForm ] = useState({
      note_title : '', note_content : ''
    })

    const handleChange = (e)=>{
      setNoteForm({...noteForm , [e.target.id] : e.target.value})
    }

    const handleAddNote = async()=>{
      const success = await addNewNote(noteForm)
      if (success){
        setNoteForm({note_title : '', note_content : ''})
        closePopup()
      }

    }
    return <>
        <div className="space-y-4">
            <div className="space-y-4">
                <Label>Note title</Label>
                <Input id='note_title' type='text' placeholder='Note title here' onChange={handleChange}/>
            </div>
            <div className="space-y-2">
              <Label>Note Content</Label>
              <Textarea id='note_content' type='text' placeholder='Note title here' onChange={handleChange}/>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant='outline' onClick={closePopup}>Cancel </Button>
              <Button onClick={handleAddNote} disabled={isLoading}><Save/> {isLoading ? 'Saving note...' : 'Save note'}</Button>
            </div>

             {/* Error status message */}
             {status === false && (
                <p className="bg-red-100 text-red-700 font-medium text-sm p-3 rounded-md border border-red-400 text-center">
                  {statusMsg}
                </p>
              )}

        </div>
    </>
}