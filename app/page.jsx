"use client";
import Header from "@/components/Header";
import NotesContainer from "@/components/NotesContainer";
import { Popup } from "@/components/Popup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PopupProvider } from "@/context/popupContext";
import { Save } from "lucide-react";

export default function Home() {
  return <>
    
    <PopupProvider>
      <Header/>
      <NotesContainer/>
      <Popup title='add new note'>
      <div className="space-y-4">
          <div className="space-y-4">
              <Label>Note title</Label>
              <Input type='text' placeholder='Note title here'/>
          </div>
          <div className="space-y-2">
            <Label>Note Content</Label>
            <Textarea type='text' placeholder='Note title here'/>
          </div>
          <div className="flex justify-end">
            <Button><Save/> Save note </Button>
          </div>
      </div>
          
      </Popup>
    </PopupProvider>
    
  </>
}
