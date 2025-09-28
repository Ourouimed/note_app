import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePopup } from "@/context/popupContext";
import { Save } from "lucide-react";
export default function NoteForm (){
    const { closePopup } = usePopup()
    return <>
        <div className="space-y-4">
            <div className="space-y-4">
                <Label>Note title</Label>
                <Input type='text' placeholder='Note title here'/>
            </div>
            <div className="space-y-2">
              <Label>Note Content</Label>
              <Textarea type='text' placeholder='Note title here'/>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant='outline' onClick={closePopup}>Cancel </Button>
              <Button><Save/> Save note </Button>
            </div>
        </div>
    </>
}