import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  axios.defaults.withCredentials = true;

  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  // Fetch notes for the logged-in user
  const fetchNotes = async () => {
    if (!user) return;
    try {
      const response = await axios.get(`/notes/${user.id}`);
      setNotes(response.data);
    } catch (err) {
      console.error("Error fetching notes:", err.message);
    }
  };

  // Add a new note
  const addNote = async (title, content) => {
    try {
      setSelectedNote(null);
      const res = await axios.post(`/notes`, {
        title,
        content,
        user_id: user.id,
      });
      setNotes([...notes, { _id: res.data.id, title, content }]);
    } catch (err) {
      console.error("Error adding note:", err.message);
    }
  };

  // Update an existing note
  const updateNote = async (id, title, content) => {
    try {
      await axios.put(`/notes/${id}`, { title, content });
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? { ...note, title, content } : note))
      );
    } catch (err) {
      console.error("Error updating note:", err.message);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id)); // Use _id here
    } catch (err) {
      console.error("Error deleting note:", err.message);
    }
  };

  // Fetch notes when the user logs in
  useEffect(() => {
    fetchNotes();
  }, [user]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        selectedNote,
        setSelectedNote,
        addNote,
        updateNote,
        deleteNote,
        fetchNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

// Custom hook to use the NoteContext
export const useNotes = () => useContext(NoteContext);
export default NoteProvider;