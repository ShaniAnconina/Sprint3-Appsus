const { useState, useEffect } = React


import { NoteEdit } from "../cmps/note-edit.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"
import { NoteAdd } from "../cmps/note-add.jsx"

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [noteToEdit, setNoteToEdit] = useState(null)

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

            .catch((err) => { console.log(err) })
    }

    function onEditNote(id) {
        const note = noteService.get(id)
            .then(setNoteToEdit)
    }

    let isEditNote = (noteToEdit) ? 'edit-mode' : ''

    return <section className={isEditNote}>

        <NoteAdd loadNotes={loadNotes} />
        <NoteList onEditNote={onEditNote} onRemoveNote={onRemoveNote} notes={notes} />

        {noteToEdit && <NoteEdit noteToEdit={noteToEdit} />}

    </section>
}
