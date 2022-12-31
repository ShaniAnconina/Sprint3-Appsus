const { useState, useEffect } = React

const { useParams, useNavigate } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"


import { NoteEdit } from "../cmps/note-edit.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteAdd } from "../cmps/note-add.jsx"




//DONE: msg off secses
//DONE: create a several edit screens
//DDONE: about text
//DONE: imploment the video adding and edit
//DONE: add a bable to regular note

//TODO: TODOS- edit, show as done, add time to done todos
//TODO: serch and filter
//TODO: improve the demo data
//TODO: CSS

//TODO: improve the note to show wene they create
//TODO: color pallete
//TODO: send a email and get emails








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
                showSuccessMsg('Note remove succsecsfuly')
                navigate(`/note/`)
                setNoteToEdit(null)
                const updatedNote = notes.filter(note => note.id !== noteId)
                setNotes(updatedNote)
            })
            .catch(() => { showErrorMsg(`Note cano't remove, tray again`) })
    }

    function onEditNote(id) {
        navigate(`/note/${id}`)
        const note = noteService.get(id)
            .then((note) => {
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
                        showSuccessMsg('Note duplicated')
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

        <div className="add-input-container">
            <NoteAdd loadNotes={loadNotes} />
        </div>

        <NoteList notes={notes} loadNotes={loadNotes} onEditNote={onEditNote} onRemoveNote={onRemoveNote} onDuplicatNote={onDuplicatNote} />
        {noteToEdit && <NoteEdit loadNotes={loadNotes} onDuplicatNote={onDuplicatNote} onRemoveNote={onRemoveNote} setNoteToEdit={setNoteToEdit} noteToEdit={noteToEdit} />}

    </section>
}
