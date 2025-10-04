import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePopup } from "@/context/popupContext";
import { useState } from "react";
import { Save } from "lucide-react";
import { useNotes } from "@/context/NotesContext";
export default function NoteForm ({ note : {id, title, content, created_at} }){
    const { addNewNote , updateNote , isLoading ,  status , statusMsg} = useNotes()
    const { closePopup } = usePopup()
    const [noteForm , setNoteForm ] = useState({
      note_title : title || '', note_content : content || ''
    })

    const handleChange = (e)=>{
      setNoteForm({...noteForm , [e.target.id] : e.target.value})
    }

    const handleSubmit = async()=>{
      let res
      if (id) {
        const { success } = await updateNote(id , noteForm)
        res = success
      }
      else {
        const { success } = await addNewNote(noteForm)
        res = success
      }
      if (res){
        setNoteForm({note_title : '', note_content : ''})
        closePopup()
      }

    }
    return <>
        <div className="space-y-4">
            <div className="space-y-4">
                <Label>Note title</Label>
                <Input id='note_title' type='text' placeholder='Note title here' onChange={handleChange} value={noteForm.note_title}/>
            </div>
            <div className="space-y-2">
              <Label>Note Content</Label>
              <Textarea id='note_content' type='text' placeholder='Note title here' onChange={handleChange}  value={noteForm.note_content}/>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant='outline' onClick={closePopup}>Cancel </Button>
              <Button onClick={handleSubmit} disabled={isLoading}><Save/> {isLoading ? id? 'Updating note...' : 'Saving note...' : id ? 'Update note' : 'Save note'}</Button>
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