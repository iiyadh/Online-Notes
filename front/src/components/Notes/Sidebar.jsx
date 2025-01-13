import React from "react";
import "./styles/Sidebar.scss";

const Sidebar = ({ notes, selectedNote, setSelectedNote, handleAddNote,isEditMode }) => {
  return (
    <div className="sidebar">
      <button className="add-note" disabled={isEditMode} onClick={handleAddNote}>
        + Add Note
      </button>
      <ul className={`note-list ${isEditMode===true ? "no-cursor" : ""}`}>
        {notes.map((note) => (
          <li
            key={note.id}
            className={`note-item ${selectedNote?.id === note.id ? "active" : ""}`}
            onClick={() => setSelectedNote(note)}
          >
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
