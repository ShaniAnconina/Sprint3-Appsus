const { useState, useEffect } = React


import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"
import { NoteEdit } from "./note-edit.jsx"

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query().then((setNotes))
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                const updatedNote = notes.filter(note => note.id !== noteId)
                setNotes(updatedNote)
            })

            .catch((err) => {console.log(err)})
    }

    function onEditNote(id){
        console.log(id)
    }

    return <section>
        <NoteEdit />
        <NoteList onEditNote={onEditNote} onRemoveNote={onRemoveNote} notes={notes} />
    </section>
}
