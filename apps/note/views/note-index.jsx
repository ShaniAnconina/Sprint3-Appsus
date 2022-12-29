const { useState, useEffect } = React

const { useParams, useNavigate } = ReactRouterDOM

import { NoteEdit } from "../cmps/note-edit.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"
import { NoteAdd } from "../cmps/note-add.jsx"


//DONE: rote the edit
//DONE: fixe the ui in the edit screen
//DONE: close the edit screen with click
//  DONE: add class to the selected note to edit
//TODO: finish the edit function
//TODO: creat a cmps for img and video

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [noteToEdit, setNoteToEdit] = useState(null)
    const { noteId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadNotes()
        if (noteId) {
            noteService.get(noteId)
                .then(setNoteToEdit)
        }
    }, [])

    useEffect(() => {
        loadNotes()
    }, [noteToEdit])

    function loadNotes() {
        noteService.query().then((setNotes))
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                navigate(`/note/`)
                setNoteToEdit(null)
                setNotes(updatedNote)
                const updatedNote = notes.filter(note => note.id !== noteId)
            })

            .catch((err) => { console.log(err) })
    }

    function onEditNote(id) {
        navigate(`/note/${id}`)
        const note = noteService.get(id)
            .then((note) => {
                setNoteToEdit(note)
            })
    }

    let isEditNote = (noteToEdit) ? 'edit-mode' : ''

    return <section className={`note-index ${isEditNote}`}>

        <NoteAdd loadNotes={loadNotes} />
        <NoteList onEditNote={onEditNote} onRemoveNote={onRemoveNote} notes={notes} />

        {noteToEdit && <NoteEdit onRemoveNote={onRemoveNote} setNoteToEdit={setNoteToEdit} noteToEdit={noteToEdit} />}

    </section>
}
