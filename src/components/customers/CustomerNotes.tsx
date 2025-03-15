
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Plus, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Note {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

interface CustomerNotesProps {
  customerId: string;
}

export function CustomerNotes({ customerId }: CustomerNotesProps) {
  const [newNote, setNewNote] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  
  // Mock data for customer notes
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "n1",
      content: "Customer has been experiencing issues with deliveries. We should prioritize their orders in the future.",
      createdAt: "2023-07-15T13:45:00",
      createdBy: "Alex Johnson"
    },
    {
      id: "n2",
      content: "Customer requested special packaging for fragile items. Make sure to add extra padding to their shipments.",
      createdAt: "2023-08-02T10:30:00",
      createdBy: "Sarah Chen"
    }
  ]);
  
  const handleAddNote = () => {
    if (newNote.trim() === "") return;
    
    const newNoteItem: Note = {
      id: `n${notes.length + 1}`,
      content: newNote,
      createdAt: new Date().toISOString(),
      createdBy: "Current User"
    };
    
    setNotes([...notes, newNoteItem]);
    setNewNote("");
    setIsAddingNote(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Customer Notes</h2>
        {!isAddingNote && (
          <Button onClick={() => setIsAddingNote(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        )}
      </div>
      
      {isAddingNote && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add New Note</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Enter your note here..." 
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddingNote(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNote}>
              Save Note
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {notes.length === 0 ? (
        <div className="text-center p-6 border rounded-md">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium">No notes found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Add a note to keep track of important information about this customer.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{note.createdBy}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(note.createdAt)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{note.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
