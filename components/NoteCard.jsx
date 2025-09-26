import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Trash2, Edit } from "lucide-react"

export default function NoteCard({ title, content, date }) {
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
            <Button variant="outline">
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
