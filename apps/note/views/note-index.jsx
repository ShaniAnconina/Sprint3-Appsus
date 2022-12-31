const { useState, useEffect } = React

const { useParams, useNavigate } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"

import { NoteEdit } from "../cmps/note-edit.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteAdd } from "../cmps/note-add.jsx"


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

    function onDuplicatNote(noteId) {
        noteService.get(noteId)
            .then((note) => {
                const newNote = note
                newNote.id = null
                newNote.style.backgroundColor = utilService.getRandomColor()
                noteService.save(newNote)
                    .then(() => loadNotes())
            })
    }



    let isEditNote = (noteToEdit) ? 'edit-mode' : ''

    return <section onClick={(ev) => {
        ev.stopPropagation()
        setIsEditMode(false)
    }} className={`note-index ${isEditNote}`}>

//TODO: imploment thevideo suction with url like those
        {/* <video className="note-vid" src="https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/dash/SintelVideo.mp4" controls="" autoplay=""></video>
        <video className="note-vid" src="http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4" controls="" autoplay=""></video> */}


        <div className="add-input-container">
            <NoteAdd loadNotes={loadNotes} />
        </div>

        <NoteList notes={notes} loadNotes={loadNotes} onEditNote={onEditNote} onRemoveNote={onRemoveNote} onDuplicatNote={onDuplicatNote} />
        {noteToEdit && <NoteEdit onRemoveNote={onRemoveNote} setNoteToEdit={setNoteToEdit} noteToEdit={noteToEdit} />}

    </section>
}
