const { useState, useEffect } = React

const { useParams, useNavigate } = ReactRouterDOM

import { NoteEdit } from "../cmps/note-edit.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"
import { NoteAdd } from "../cmps/note-add.jsx"


//TODO: creat a cmps for img and video

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [noteToEdit, setNoteToEdit] = useState(null)
    const [isEditMode, setIsEditMode] = useState(false)

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
                const updatedNote = notes.filter(note => note.id !== noteId)
                setNotes(updatedNote)
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

    return <section onClick={(ev) => {
        ev.stopPropagation()
        setIsEditMode(false)
    }} className={`note-index ${isEditNote}`}>

        {!isEditMode && <div onClick={(ev) => {
            ev.stopPropagation()
            setIsEditMode(true)
        }} className="note-add-placeholder">Enter your note...</div>}

        {isEditMode && <NoteAdd loadNotes={loadNotes} />}

        <NoteList loadNotes={loadNotes} onEditNote={onEditNote} onRemoveNote={onRemoveNote} notes={notes} />
        {noteToEdit && <NoteEdit onRemoveNote={onRemoveNote} setNoteToEdit={setNoteToEdit} noteToEdit={noteToEdit} />}

    </section>
}
