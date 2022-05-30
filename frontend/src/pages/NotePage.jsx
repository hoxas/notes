import React, { useState, useEffect } from "react";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

const NotePage = () => {
    let params = useParams();
    let noteId = params.id;
    let [note, setNote] = useState(null);

    useEffect(() => {
        getNote();
    }, [noteId]);

    let getNote = async () => {
        if (noteId === "create") return;
        let response = await fetch(`/api/notes/${noteId}`);
        let data = await response.json();
        setNote(data);
    };

    let createNote = async () => {
        fetch(`/api/notes/create/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });
    };

    let updateNote = async () => {
        fetch(`/api/notes/${noteId}/update/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });
    };

    let deleteNote = async () => {
        fetch(`/api/notes/${noteId}/delete/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    let handleSubmit = () => {
        if (noteId !== "create" && note.body == "") {
            deleteNote();
        } else if (noteId !== "create") {
            updateNote();
        } else if (noteId === "create" && note.body !== null) {
            createNote();
        }
    };

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to="/">
                        <ArrowLeft
                            onClick={handleSubmit}
                            className="note-back-button"
                        />
                    </Link>
                </h3>
                <Link to="/">
                    {noteId !== "create" ? (
                        <button onClick={deleteNote}>&#9932; Delete</button>
                    ) : (
                        <button onClick={handleSubmit}>&#10004; Done</button>
                    )}
                </Link>
            </div>
            <textarea
                onChange={(e) => {
                    setNote({ ...note, body: e.target.value });
                }}
                value={note?.body}
            ></textarea>
        </div>
    );
};

export default NotePage;
