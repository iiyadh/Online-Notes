import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import UserProfile from "./UserProfile";
import "./styles/NotesApp.scss";

const NotesApp = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: "First Note", content: "This is the first note." },
    { id: 2, title: "Second Note", content: "This is the second note." },
  ]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAddNote = () => {
    const newNote = {
      id: notes.length + 1,
      title: `New Note ${notes.length + 1}`,
      content: "",
    }; 
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
  };

  const handleSaveNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      )
    );
  };
  return (
    <div className="notes-app">
      <Sidebar
        notes={notes}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        handleAddNote={handleAddNote}
        isEditMode={isEditMode}
      />
      <Editor
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        handleSaveNote={handleSaveNote}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
      />
      <UserProfile
        user={{
          name: "John Doe",
          profilePicture: "https://via.placeholder.com/150",
        }}
      />
    </div>
  );
};

export default NotesApp;
