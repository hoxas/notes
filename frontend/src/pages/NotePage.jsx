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
        let response = await fetch(`/api/notes/${noteId}`);
        let data = await response.json();
        setNote(data);
    };

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to="/">
                        <ArrowLeft className="note-back-button" />
                    </Link>
                </h3>
            </div>
            <textarea defaultValue={note?.body}></textarea>
        </div>
    );
};

export default NotePage;
