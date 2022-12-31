const { useState, useEffect } = React

const { useParams, useNavigate } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

import { NoteEdit } from "../cmps/note-edit.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteAdd } from "../cmps/note-add.jsx"
import { NoteHeader } from "../cmps/note-header.jsx"

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [noteToEdit, setNoteToEdit] = useState(null)
    const [isEditMode, setIsEditMode] = useState(false)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())


    const { noteId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadNotes()
    }, [filterBy])


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
        noteService.query(filterBy).then((setNotes))
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                showSuccessMsg('Note remove succsecsfuly')
                navigate(`/note/`)
                setNoteToEdit(null)
                const updatedNote = notes.filter(note => note.id !== noteId)
                setNotes(updatedNote)
            })
            .catch(() => { showErrorMsg(`Note cano't remove, tray again`) })
    }

    function onEditNote(id) {
        noteService.get(id)
            .then((note) => {
                if (note.type === 'note-todos') return
                navigate(`/note/${id}`)
                setNoteToEdit(note)
            })
    }

    function onDuplicatNote(noteId) {
        noteService.get(noteId)
            .then((note) => {
                const newNote = note
                newNote.id = null
                newNote.style.backgroundColor = '#fff'
                noteService.save(newNote)
                    .then(() => {
                        showSuccessMsg('Note duplicated succsecsfuly')
                        loadNotes()
                    })
                    .catch(() => { showErrorMsg(`Note cano't duplicated, tray again`) })
            })
    }

    let isEditNote = (noteToEdit) ? 'edit-mode' : ''

    return <section onClick={(ev) => {
        ev.stopPropagation()
        setIsEditMode(false)
    }} className={`note-index ${isEditNote}`}>

        <NoteHeader setFilterBy={setFilterBy} />

        <div className="add-input-container">
            <NoteAdd loadNotes={loadNotes} />
        </div>

        <NoteList notes={notes} loadNotes={loadNotes} onEditNote={onEditNote} onRemoveNote={onRemoveNote} onDuplicatNote={onDuplicatNote} />
        {noteToEdit && <NoteEdit loadNotes={loadNotes} onDuplicatNote={onDuplicatNote} onRemoveNote={onRemoveNote} setNoteToEdit={setNoteToEdit} noteToEdit={noteToEdit} />}

    </section>
}
