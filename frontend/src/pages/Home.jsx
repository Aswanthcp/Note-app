import React, { useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note deleted");
          getNotes();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created");
        else alert("Failed to create note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="notes-section">
          <h2>Notes</h2>
          {notes.map((note) => (
            <div className="note" key={note.id}>
              <Note note={note} onDelete={() => deleteNote(note.id)} />
            </div>
          ))}
        </div>
        <div>
          <form onSubmit={createNote}>
            <h2>Create Note</h2>
            <label htmlFor="title">Title:</label>
            <br />
            <input
              type="text"
              name="title"
              id="title"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <br />
            <label htmlFor="content">Content:</label>
            <br />
            <textarea
              name="content"
              id="content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
}
