const { useState, useEffect } = React

const { useParams } = ReactRouterDOM


import { noteService } from "../services/note.service.js"

export function NoteTypeTxt({ setGetNoteInfoToEdit, loadNotes }) {
    const { noteId } = useParams()
    
    const [noteInfoToEdit, setNoteInfoToEdit] = useState(noteService.getEmptyNoteInfoForTxt())
    const [note, setNote] = useState(noteService.getEmptyNoteTxt())

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
        note.info = noteInfoToEdit
        noteService.save(note)
            .then(() => {
                if (setGetNoteInfoToEdit) setGetNoteInfoToEdit(note.info)

                setNoteInfoToEdit(noteService.getEmptyNoteInfoForTxt())
                loadNotes()
            })
    }

    return <section className="note-add-input-txt">
        <form onSubmit={saveNote}>
            <input type="text"
                name="txt"
                id="title"
                value={noteInfoToEdit.txt}
                onChange={handleChange}
                onClick={(ev) => { ev.stopPropagation() }}
                placeholder="Enter your note..."
            />
        </form>
    </section >
}

