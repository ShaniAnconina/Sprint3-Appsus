const { useState, useEffect } = React

const { useParams } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

export function NoteTypeVideo({ setGetNoteInfoToEdit,  loadNotes }) {

    const [noteInfoToEdit, setNoteInfoToEdit] = useState(noteService.getEmptyNoteInfoForImg())
    const [note, setNote] = useState(noteService.getEmptyNoteImg())
    const { noteId } = useParams()

    useEffect(() => {
        if (!noteId) return
        loadNote()
    }, [])

    function loadNote() {
        noteService.get(noteId)
            .then((note) => {
                setNote(note)
                setNoteInfoToEdit(note.info)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        if (setGetNoteInfoToEdit) setGetNoteInfoToEdit((prevNote) => ({ ...prevNote, [field]: value }))
        setNoteInfoToEdit((prevNote) => ({ ...prevNote, [field]: value }))
    }

    function saveNote(ev) {
        ev.preventDefault()
        note.type = 'note-video'
        note.info = noteInfoToEdit
        noteService.save(note)
            .then(() => {
                if (setGetNoteInfoToEdit) setGetNoteInfoToEdit(note.info)
                setNoteInfoToEdit(noteService.getEmptyNoteInfoForImg())
                loadNotes()
            })
    }

    return <section>
        <form onSubmit={saveNote}>
            <input type="text"
                name="title"
                id="title"
                value={noteInfoToEdit.title}
                onChange={handleChange}
                onClick={(ev) => { ev.stopPropagation() }}
                placeholder="Enter the video title..."
            />

            <input type="text"
                name="url"
                id="url"
                value={noteInfoToEdit.url}
                onChange={handleChange}
                onClick={(ev) => { ev.stopPropagation() }}
                placeholder="Enter the video url..."
                className="img-url-input"
            />
            <button hidden={true}></button>
        </form>

    </section >
}

