import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import "./styles/Editor.scss";
import { useNotes } from "../../Context/NoteContext";

const Editor = ({ isEditMode, setIsEditMode }) => {
  const { selectedNote, setSelectedNote, updateNote, addNote, deleteNote } = useNotes();

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", "normal", "large", "huge"] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["blockquote", "code-block"],
    ],
  };

  if (!selectedNote) {
    return <div className="editor">Select a note to start editing.</div>;
  }

  const handleSave = () => {
    if (selectedNote.id) {
      updateNote(selectedNote.id, selectedNote.title, selectedNote.content);
    } else {
      addNote(selectedNote.title, selectedNote.content);
    }
    setIsEditMode(false);
  };

  const handleDelete = () =>{
    deleteNote(selectedNote.id);
    setSelectedNote(null);
  }
  return (
    <div className="editor">
      <div className="mode-buttons">
        {!isEditMode && (
          <div className="btns">
          <button className="edit-button" onClick={() => setIsEditMode(true)}>
            Edit
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
          </div>
        )}
        {isEditMode && (
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        )}
      </div>

      {isEditMode ? (
        <div className="editor-content">
          <input
            type="text"
            value={selectedNote.title}
            onChange={(e) => setSelectedNote({ ...selectedNote, title: e.target.value })}
            placeholder="Enter title"
            className="title-input"
          />
          <ReactQuill
            value={selectedNote.content}
            onChange={(content) => setSelectedNote({ ...selectedNote, content })}
            placeholder="Write your note here..."
            className="content-editor"
            theme="snow"
            modules={modules}
          />
        </div>
      ) : (
        <div className="read-only-content">
          <h2>{selectedNote.title}</h2>
          <div
            className="note-content"
            dangerouslySetInnerHTML={{ __html: selectedNote.content }}
          />
        </div>
      )}
    </div>
  );
};

export default Editor;
