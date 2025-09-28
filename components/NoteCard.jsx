import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Trash2, Edit } from "lucide-react"
import { usePopup } from "@/context/popupContext"
import NoteForm from "./popupForms/noteForm"

export default function NoteCard({ title, content }) {
  const { openPopup } = usePopup()
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{content}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        
        <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={()=>{openPopup('Edit note' , <NoteForm/>)}}>
                <Edit />
            </Button>
            <Button variant="destructive">
            <Trash2 />
            </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
